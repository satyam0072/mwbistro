from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

import os
import uuid
import logging
from datetime import datetime, timezone, timedelta
from typing import List, Optional

import bcrypt
import jwt
from fastapi import FastAPI, APIRouter, HTTPException, Depends, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field

mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

JWT_ALGORITHM = "HS256"
JWT_SECRET = os.environ["JWT_SECRET"]
ADMIN_EMAIL = os.environ["ADMIN_EMAIL"].lower()
ADMIN_PASSWORD = os.environ["ADMIN_PASSWORD"]

app = FastAPI()
api_router = APIRouter(prefix="/api")
security = HTTPBearer()

MENU_CATEGORIES = ["Starters", "Main Course", "Fast Food", "Snacks", "Beverages", "Desserts"]


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))


def create_access_token(user_id: str, email: str) -> str:
    payload = {
        "sub": user_id,
        "email": email,
        "exp": datetime.now(timezone.utc) + timedelta(hours=12),
        "type": "access",
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


class LoginInput(BaseModel):
    email: str
    password: str


class MenuItemInput(BaseModel):
    name: str
    description: str = ""
    price: int = 0
    category: str
    veg: bool = True
    available: bool = True


async def get_admin(creds: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(creds.credentials, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Invalid token type")
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = await db.users.find_one({"_id": payload["sub"]}, {"password_hash": 0})
    if not user or user.get("role") != "admin":
        raise HTTPException(status_code=401, detail="Not authorized")
    user["id"] = user.pop("_id")
    return user


@api_router.get("/")
async def root():
    return {"message": "MW Bistro API"}


@api_router.get("/menu")
async def get_menu():
    items = await db.menu_items.find({}, {"_id": 0}).to_list(500)
    order = {c: i for i, c in enumerate(MENU_CATEGORIES)}
    items.sort(key=lambda x: (order.get(x.get("category"), 99), x.get("created_at", "")))
    return {"categories": MENU_CATEGORIES, "items": items}


@api_router.post("/auth/login")
async def login(input: LoginInput, request: Request):
    email = input.email.lower().strip()
    identifier = f"{request.client.host}:{email}"
    attempt = await db.login_attempts.find_one({"identifier": identifier})
    if attempt and attempt.get("locked_until"):
        locked_until = attempt["locked_until"]
        if isinstance(locked_until, str):
            locked_until = datetime.fromisoformat(locked_until)
        if locked_until > datetime.now(timezone.utc):
            raise HTTPException(status_code=429, detail="Too many attempts. Try again in 15 minutes.")
    user = await db.users.find_one({"email": email})
    if not user or not verify_password(input.password, user["password_hash"]):
        await db.login_attempts.update_one(
            {"identifier": identifier},
            {
                "$inc": {"count": 1},
                "$setOnInsert": {"identifier": identifier},
            },
            upsert=True,
        )
        updated = await db.login_attempts.find_one({"identifier": identifier})
        if updated and updated.get("count", 0) >= 5:
            await db.login_attempts.update_one(
                {"identifier": identifier},
                {"$set": {"locked_until": datetime.now(timezone.utc) + timedelta(minutes=15), "count": 0}},
            )
        raise HTTPException(status_code=401, detail="Invalid email or password")
    await db.login_attempts.delete_one({"identifier": identifier})
    token = create_access_token(user["_id"], email)
    return {"token": token, "user": {"id": user["_id"], "email": email, "name": user.get("name", "Admin"), "role": user.get("role")}}


@api_router.get("/auth/me")
async def me(admin=Depends(get_admin)):
    return admin


@api_router.post("/admin/menu")
async def create_menu_item(input: MenuItemInput, admin=Depends(get_admin)):
    if input.category not in MENU_CATEGORIES:
        raise HTTPException(status_code=400, detail="Invalid category")
    doc = input.model_dump()
    doc["id"] = str(uuid.uuid4())
    doc["is_sample"] = False
    now = datetime.now(timezone.utc).isoformat()
    doc["created_at"] = now
    doc["updated_at"] = now
    await db.menu_items.insert_one(doc)
    doc.pop("_id", None)
    return doc


@api_router.put("/admin/menu/{item_id}")
async def update_menu_item(item_id: str, input: MenuItemInput, admin=Depends(get_admin)):
    if input.category not in MENU_CATEGORIES:
        raise HTTPException(status_code=400, detail="Invalid category")
    update = input.model_dump()
    update["updated_at"] = datetime.now(timezone.utc).isoformat()
    update["is_sample"] = False
    result = await db.menu_items.update_one({"id": item_id}, {"$set": update})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Item not found")
    doc = await db.menu_items.find_one({"id": item_id}, {"_id": 0})
    return doc


@api_router.delete("/admin/menu/{item_id}")
async def delete_menu_item(item_id: str, admin=Depends(get_admin)):
    result = await db.menu_items.delete_one({"id": item_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"deleted": True}


@api_router.post("/admin/menu/reset")
async def reset_menu(admin=Depends(get_admin)):
    await db.menu_items.delete_many({})
    await seed_menu()
    items = await db.menu_items.find({}, {"_id": 0}).to_list(500)
    return {"reset": True, "count": len(items)}


SAMPLE_MENU = {
    "Starters": ["Sample Crispy Corn", "Sample Paneer Tikka", "Sample Masala Fries"],
    "Main Course": ["Sample Chef's Special Curry", "Sample Veg Biryani", "Sample Dal & Roti Combo"],
    "Fast Food": ["Sample Classic Burger", "Sample Veg Pizza", "Sample Loaded Sandwich"],
    "Snacks": ["Sample Steamed Momos", "Sample Chaat Plate", "Sample Maggi Bowl"],
    "Beverages": ["Sample Cold Coffee", "Sample Masala Chai", "Sample Fresh Lime Soda"],
    "Desserts": ["Sample Choco Brownie", "Sample Ice Cream Sundae", "Sample Gulab Jamun"],
}


async def seed_menu():
    now = datetime.now(timezone.utc).isoformat()
    docs = []
    for category, names in SAMPLE_MENU.items():
        for name in names:
            docs.append(
                {
                    "id": str(uuid.uuid4()),
                    "name": name,
                    "description": "Sample description — replace with the real dish details.",
                    "price": 0,
                    "category": category,
                    "veg": True,
                    "available": True,
                    "is_sample": True,
                    "created_at": now,
                    "updated_at": now,
                }
            )
    if docs:
        await db.menu_items.insert_many(docs)


async def seed_admin():
    existing = await db.users.find_one({"email": ADMIN_EMAIL})
    if existing is None:
        await db.users.insert_one(
            {
                "_id": str(uuid.uuid4()),
                "email": ADMIN_EMAIL,
                "password_hash": hash_password(ADMIN_PASSWORD),
                "name": "MW Bistro Admin",
                "role": "admin",
                "created_at": datetime.now(timezone.utc).isoformat(),
            }
        )
    elif not verify_password(ADMIN_PASSWORD, existing["password_hash"]):
        await db.users.update_one({"email": ADMIN_EMAIL}, {"$set": {"password_hash": hash_password(ADMIN_PASSWORD)}})


@app.on_event("startup")
async def startup():
    await db.users.create_index("email", unique=True)
    await db.login_attempts.create_index("identifier")
    await seed_admin()
    if await db.menu_items.count_documents({}) == 0:
        await seed_menu()


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

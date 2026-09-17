# Auth Testing Playbook — MW Bistro

## Step 1: MongoDB Verification
```
mongosh
use test_database
db.users.find({role: "admin"}).pretty()
db.users.findOne({role: "admin"}, {password_hash: 1})
```
Verify: bcrypt hash starts with `$2b$`, unique index on users.email, index on login_attempts.identifier.

## Step 2: API Testing
```
TOKEN=$(curl -s -X POST $API_URL/api/auth/login -H "Content-Type: application/json" -d '{"email":"admin@mwbistro.in","password":"MWBistro@2026"}' | python3 -c "import sys,json;print(json.load(sys.stdin)['token'])")
curl -s $API_URL/api/auth/me -H "Authorization: Bearer $TOKEN"
curl -s $API_URL/api/menu
curl -s -X POST $API_URL/api/admin/menu -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"name":"Test Item","category":"Starters","price":100,"description":"test","veg":true,"available":true}'
```
Login returns a JWT token; /auth/me returns the admin user; menu CRUD works with the Bearer token and returns 401 without it.

## Step 3: Brute force
5 failed logins for the same email -> 429 with 15-minute lockout.

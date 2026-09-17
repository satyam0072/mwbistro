# Test Credentials
# Agent writes here when creating/modifying auth credentials (admin accounts, test users).
# Testing agent reads this before auth tests. Fork/continuation agents read on startup.

## MW Bistro (Bus Cafe)

### Admin account (menu manager)
- Email: admin@mwbistro.in
- Password: MWBistro@2026
- Role: admin
- Admin page: /admin

### Auth endpoints
- POST /api/auth/login  {email, password} -> {token, user}
- GET  /api/auth/me  (Authorization: Bearer <token>)

### Menu endpoints
- GET    /api/menu  (public)
- POST   /api/admin/menu  (Bearer token)
- PUT    /api/admin/menu/{item_id}  (Bearer token)
- DELETE /api/admin/menu/{item_id}  (Bearer token)
- POST   /api/admin/menu/reset  (Bearer token, restores sample menu)

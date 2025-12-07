# 🔐 Test Login Credentials

## Quick Reference - Copy & Paste

### 👤 Customer Accounts

```
Email: john.doe@example.com
Password: password123
```

```
Email: jane.smith@example.com
Password: password123
```

```
Email: mike.wilson@example.com
Password: password123
```

### 👨‍💼 Admin Account

```
Email: admin@foodapp.com
Password: admin123
```

### 🍕 Restaurant Owner Accounts

```
Pizza Palace Owner:
Email: owner.pizza@example.com
Password: owner123
```

```
Burger Haven Owner:
Email: owner.burger@example.com
Password: owner123
```

```
Sushi Express Owner:
Email: owner.sushi@example.com
Password: owner123
```

---

## All Test Credentials

| Email                      | Password    | Role     | Notes                                    |
| -------------------------- | ----------- | -------- | ---------------------------------------- |
| john.doe@example.com       | password123 | Customer | Wallet: $125.50, Loyalty: 450 pts        |
| jane.smith@example.com     | password123 | Customer | Wallet: $78.25, Loyalty: 320 pts         |
| mike.wilson@example.com    | password123 | Customer | Wallet: $250.00, Loyalty: 890 pts        |
| sarah.johnson@example.com  | password123 | Customer | Wallet: $0, Loyalty: 150 pts             |
| david.brown@example.com    | password123 | Customer | Wallet: $50.00, Loyalty: 210 pts         |
| emily.davis@example.com    | password123 | Customer | Wallet: $180.75, Loyalty: 560 pts        |
| chris.martinez@example.com | password123 | Customer | Wallet: $35.00, Loyalty: 95 pts          |
| lisa.anderson@example.com  | password123 | Customer | Wallet: $420.00, Loyalty: 1250 pts (VIP) |
| admin@foodapp.com          | admin123    | Admin    | Full access to admin panel               |
| owner.pizza@example.com    | owner123    | Owner    | Pizza Palace (Restaurant ID: 1)          |
| owner.burger@example.com   | owner123    | Owner    | Burger Haven (Restaurant ID: 2)          |
| owner.sushi@example.com    | owner123    | Owner    | Sushi Express (Restaurant ID: 3)         |

---

## ⚠️ Important Notes

1. **All customer passwords are the same**: `password123`
2. **Admin password**: `admin123`
3. **All owner passwords are the same**: `owner123`
4. **Mock data is enabled** when `NEXT_PUBLIC_USE_MOCK_DATA=true`
5. **No backend required** - all data is in frontend

---

## 🧪 Testing Scenarios

### New User Registration

- Register a new account on `/register`
- Login will work immediately
- First order gets 50% off with code `FIRST50`

### Order Flow

1. Login as any customer
2. Browse restaurants at `/restaurants`
3. Click a restaurant to see menu
4. Add items to cart
5. Go to checkout
6. Use coupon codes (see below)
7. Place order

### Active Coupon Codes

- `SAVE20` - 20% off orders above $30 (max $15 discount)
- `FLAT10` - $10 off orders above $20
- `FIRST50` - 50% off for new users above $25 (max $25 discount)
- `WEEKEND15` - 15% off orders above $35 (max $20 discount)
- `LUNCH5` - $5 off orders above $15
- `FREESHIP` - Free delivery on orders above $25

### Admin Testing

1. Login as `admin@foodapp.com`
2. Access `/admin` panel
3. View all users, restaurants, orders
4. Manage system settings

### Restaurant Owner Testing

1. Login as any owner account
2. Access `/owner` dashboard
3. View analytics and statistics
4. Manage menu items
5. Update order statuses

---

Last Updated: December 8, 2024

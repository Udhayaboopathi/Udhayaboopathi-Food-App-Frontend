# Complete Dummy Data Overview

## 📊 Summary Statistics

### Users

- **Total Users**: 12
  - 8 Customers
  - 1 Admin
  - 3 Restaurant Owners
- All users have complete profiles with wallet balances, loyalty points, and avatars

### Restaurants & Menu

- **Restaurants**: 10 (from CSV)
- **Menu Items**: 40 items (4 per restaurant, from CSV)
- **Cuisines**: Italian, American, Japanese, Mexican, Chinese, BBQ, Thai, Indian, Mediterranean

### Orders

- **Total Orders**: 10 comprehensive orders
- **Statuses**: delivered (6), on_the_way (1), preparing (1), pending (1), cancelled (1)
- Each order includes:
  - Complete item details with images
  - Subtotal, delivery fee, tax, discount breakdown
  - Payment method and status
  - Delivery tracking (driver info, timestamps)
  - Full delivery address with instructions

### Financial Data

- **Coupons**: 6 active coupons with usage statistics
- **Transactions**: 7 transaction records
- **Payment Methods**: 7 saved payment methods across users
- **Wallet Balances**: All users have wallet balances ranging from $0 to $420

### User Engagement

- **Addresses**: 9 saved addresses with GPS coordinates
- **Reviews**: 5 restaurant reviews with ratings
- **Favorites**: 8 users with 3-4 favorite restaurants each
- **Notifications**: 10 notifications (order updates, promotions, system alerts)
- **Support Tickets**: 4 support tickets with various statuses

### Marketing

- **Promo Banners**: 4 active promotional banners
- **User Preferences**: 3 detailed user preference profiles

### Analytics

- **Restaurant Analytics**: Complete analytics for 3 restaurants
  - Revenue tracking (daily, weekly, monthly)
  - Top-selling items
  - Peak hours data
  - Average order values

---

## 👥 User Accounts (Login Credentials)

### Customers

1. **john.doe@example.com** / password123

   - Wallet: $125.50 | Loyalty: 450 points
   - 2 orders, 2 addresses, 2 payment methods

2. **jane.smith@example.com** / password123

   - Wallet: $78.25 | Loyalty: 320 points
   - 1 active order, 1 address

3. **mike.wilson@example.com** / password123

   - Wallet: $250.00 | Loyalty: 890 points
   - 1 order preparing, vegetarian preferences

4. **sarah.johnson@example.com** / password123

   - Wallet: $0 | Loyalty: 150 points
   - 1 pending order

5. **david.brown@example.com** / password123

   - Wallet: $50.00 | Loyalty: 210 points
   - 1 cancelled order with refund

6. **emily.davis@example.com** / password123

   - Wallet: $180.75 | Loyalty: 560 points
   - PayPal payment method

7. **chris.martinez@example.com** / password123

   - Wallet: $35.00 | Loyalty: 95 points
   - Google Pay user

8. **lisa.anderson@example.com** / password123
   - Wallet: $420.00 | Loyalty: 1250 points
   - VIP customer, Apple Pay

### Admin

- **admin@foodapp.com** / admin123
  - Full access to all admin features
  - Can view all users, restaurants, orders

### Restaurant Owners

1. **owner.pizza@example.com** / owner123

   - Restaurant: Pizza Palace (ID: 1)
   - 234 total orders, $5,678.90 revenue

2. **owner.burger@example.com** / owner123

   - Restaurant: Burger Haven (ID: 2)
   - 189 total orders, $4,234.50 revenue

3. **owner.sushi@example.com** / owner123
   - Restaurant: Sushi Express (ID: 3)
   - 156 total orders, $3,890.25 revenue

---

## 🍕 Restaurants (CSV Data)

All restaurants located in New York City:

1. **Pizza Palace** - Italian, Manhattan
2. **Burger Haven** - American, Brooklyn
3. **Sushi Express** - Japanese, Queens
4. **Taco Fiesta** - Mexican, Bronx
5. **Dragon Wok** - Chinese, Manhattan
6. **Pasta Paradise** - Italian, Brooklyn
7. **BBQ Nation** - BBQ, Queens
8. **Thai Delight** - Thai, Manhattan
9. **Curry House** - Indian, Brooklyn
10. **Mediterranean Grill** - Mediterranean, Manhattan

---

## 💳 Payment Methods Supported

- **Credit Cards**: Visa, Mastercard
- **Debit Cards**: Visa, Mastercard
- **Digital Wallets**: PayPal, Google Pay, Apple Pay
- **UPI**: For Indian users
- **Wallet**: In-app wallet with balance
- **Cash on Delivery**: Available

---

## 🎫 Active Coupons

| Code      | Type          | Discount | Min Order | Description                   |
| --------- | ------------- | -------- | --------- | ----------------------------- |
| SAVE20    | Percentage    | 20%      | $30       | Get 20% off (max $15)         |
| FLAT10    | Fixed         | $10      | $20       | Flat $10 off                  |
| FIRST50   | Percentage    | 50%      | $25       | First order special (max $25) |
| WEEKEND15 | Percentage    | 15%      | $35       | Weekend special (max $20)     |
| LUNCH5    | Fixed         | $5       | $15       | Lunch deal                    |
| FREESHIP  | Free Delivery | 0        | $25       | Free delivery                 |

---

## 📦 Order Statuses

- **pending**: Order received, awaiting confirmation
- **confirmed**: Restaurant confirmed order
- **preparing**: Food being prepared
- **on_the_way**: Driver picked up, en route
- **delivered**: Successfully delivered
- **cancelled**: Order cancelled (with reason)

Each order tracks:

- Created time
- Confirmed time
- Preparing time
- Picked up time
- Delivered time
- Driver details (name, phone, rating)

---

## 🔔 Notification Types

- **order_update**: Status changes, delivery updates
- **promotion**: Special offers, discount codes
- **refund**: Refund processed notifications
- **loyalty**: Loyalty points earned
- **wallet**: Wallet balance updates
- **system**: App updates, maintenance alerts

---

## 📍 Address Data

All addresses include:

- Label (Home, Office, Apartment, etc.)
- Full address with line1, line2
- City, State, ZIP code
- GPS coordinates (latitude, longitude)
- Delivery instructions
- Default address flag

---

## 🎯 User Preferences

Tracked preferences:

- **Cuisine Preferences**: Italian, Japanese, Mexican, etc.
- **Dietary Restrictions**: Vegetarian, vegan, etc.
- **Notification Settings**: Email, SMS, Push
- **Theme**: Light/Dark mode
- **Language**: Default English
- **Default Payment & Address**

---

## 📈 Restaurant Analytics (Owner Dashboard)

For each restaurant:

- **Order Metrics**: Today, This Week, This Month
- **Revenue Tracking**: Total and period-wise
- **Average Order Value**
- **Top-Selling Items**: With quantities and revenue
- **Peak Hours**: Hourly order distribution
- **Review Stats**: Total reviews and average rating
- **Menu Stats**: Active items count

---

## 🎟️ Support Ticket System

Categories:

- **delivery_issue**: Problems with delivery
- **cancellation**: Cancellation requests
- **account**: Account-related issues
- **payment**: Payment problems

Statuses:

- **open**: Just created
- **in_progress**: Being worked on
- **resolved**: Issue fixed

Priorities:

- **low**: Minor issues
- **medium**: Standard issues
- **high**: Urgent problems

---

## 🎨 Promo Banners

4 active promotional banners with:

- Title and subtitle
- Description and coupon code
- Banner image (Unsplash)
- Start and end dates
- Display order for carousel

---

## 💰 Transaction History

Tracks:

- **payment**: Order payments
- **refund**: Order refunds
- **wallet_topup**: Wallet recharges

Each transaction includes:

- Amount
- Payment method and provider
- Status (success/failed)
- Transaction reference
- Timestamp

---

## 🛡️ Data Validation

All data includes:

- **Timestamps**: ISO 8601 format
- **IDs**: Unique identifiers
- **Status Tracking**: Full lifecycle
- **Relationships**: User ↔ Order ↔ Restaurant
- **GPS Coordinates**: Valid NYC locations
- **Images**: Unsplash CDN links
- **Phone Numbers**: US format

---

## 🔄 Mock API Methods

Complete API coverage for:

- ✅ Restaurants (CRUD)
- ✅ Menu Items (CRUD)
- ✅ Authentication (login, register, profile)
- ✅ Orders (create, read, update, cancel, tracking)
- ✅ Addresses (CRUD)
- ✅ Payment Methods (CRUD)
- ✅ Transactions (read, create)
- ✅ Wallet (balance, topup, deduct)
- ✅ Notifications (read, mark read)
- ✅ Support Tickets (CRUD)
- ✅ Reviews (CRUD)
- ✅ Favorites (add, remove, list)
- ✅ Coupons (validate, list)
- ✅ User Preferences (read, update)
- ✅ Admin Dashboard (users, orders, stats)
- ✅ Owner Dashboard (analytics, menu, orders)

---

## 🚀 Usage

All mock data is automatically loaded when:

```
NEXT_PUBLIC_USE_MOCK_DATA=true
```

The API client automatically falls back to mock data on network errors or when backend is unavailable.

---

## 📝 Test Scenarios

You can test:

1. **New User Registration** → First order with FIRST50 coupon
2. **Multiple Orders** → Different statuses and payment methods
3. **Order Tracking** → Real-time status updates with driver info
4. **Wallet Topup** → Add balance and use for orders
5. **Loyalty Points** → Earn on each order
6. **Favorites** → Save and browse favorite restaurants
7. **Reviews** → Rate restaurants after delivery
8. **Support** → Create tickets for issues
9. **Notifications** → Receive order updates and promos
10. **Admin Panel** → Manage users, restaurants, orders
11. **Owner Dashboard** → View analytics, manage menu, update orders
12. **Multiple Addresses** → Save home, office, etc.
13. **Payment Methods** → Multiple cards, wallets
14. **Coupons** → Apply various discount codes
15. **Order Cancellation** → Cancel with refund

---

## 📦 Data Files

- **lib/mockData.ts**: Main mock data file (1,900+ lines)

  - All user data with complete profiles
  - 10 detailed orders with full tracking
  - 9 addresses with GPS coordinates
  - 7 payment methods
  - 7 transactions
  - 10 notifications
  - 4 support tickets
  - 4 promo banners
  - 5 reviews
  - Favorites for 8 users
  - 6 coupons with usage stats
  - Analytics for 3 restaurants
  - 3 user preference profiles
  - 60+ API methods

- **public/data/restaurants.csv**: 10 restaurants
- **public/data/menu.csv**: 40 menu items

---

## 🎯 Next Steps

All dummy data is now complete! You can:

1. Test all user flows end-to-end
2. Develop new features with realistic data
3. Demo the app to stakeholders
4. Test edge cases (cancelled orders, refunds, etc.)
5. Build admin and owner dashboards
6. Implement real-time order tracking UI
7. Create notification center
8. Build wallet and transaction history pages
9. Develop support ticket system
10. Add review and rating features

---

**Last Updated**: December 8, 2024
**Total Lines of Mock Data**: 1,900+
**API Methods**: 60+
**Test Accounts**: 12

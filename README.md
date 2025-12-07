# 🍔 EatUpNow - Food Delivery App

A modern, fully responsive food delivery application built with Next.js, Material-UI, and Zustand. Order delicious food from your favorite restaurants and get it delivered fast!

## 🚀 Features

### Core Features

- 🏪 **Browse Restaurants** - Explore 10+ restaurants across multiple cities
- 🍽️ **View Menus** - Check out 40+ menu items with images, prices, and descriptions
- 🛒 **Shopping Cart** - Add/remove items and manage quantities
- 📦 **Place Orders** - Checkout with delivery details
- 📋 **Order History** - View past orders and track status
- 👤 **User Authentication** - Login/Register functionality
- 📱 **Mobile Responsive** - Fully optimized for all devices

### Additional Features

- 🔍 **Search & Filter** - Find restaurants and dishes easily
- 🏷️ **Category Filtering** - Browse by food type
- 🌃 **Multi-city Support** - Restaurants in New York, Los Angeles, San Francisco, Chicago
- 🌱 **Veg Indicator** - Know which dishes are vegetarian
- ⚡ **Fast Delivery** - Real-time delivery time estimates
- 🎨 **Beautiful UI** - Modern Material-UI design system

## 📋 Prerequisites

- **Node.js** 16.0 or higher
- **npm** or **yarn**
- **Backend API** running on `http://localhost:8000` (or update `.env.local`)

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Udhayaboopathi/Udhayaboopathi-Food-App-Frontend.git
cd frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Edit or create `.env.local`:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000

# Use mock data (CSV files) - no backend needed
# Set to 'true' for offline development, 'false' for real backend
NEXT_PUBLIC_USE_MOCK_DATA=false
```

### 4. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

## 📁 Project Structure

```
frontend/
├── app/                      # Next.js app directory
│   ├── admin/               # Admin dashboard
│   ├── cart/                # Shopping cart page
│   ├── checkout/            # Checkout page
│   ├── food/                # All food items page
│   ├── login/               # Login page
│   ├── orders/              # Order history
│   ├── owner/               # Restaurant owner dashboard
│   ├── profile/             # User profile
│   ├── register/            # Registration page
│   ├── restaurant/[id]/     # Restaurant detail page
│   ├── restaurants/         # Restaurants listing
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   └── globals.css          # Global styles
│
├── components/              # Reusable React components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── RestaurantCard.tsx
│   ├── MenuCard.tsx
│   ├── admin/
│   ├── owner/
│   └── ...
│
├── lib/                     # Utilities & state management
│   ├── api.ts              # API client with mock fallback
│   ├── authStore.ts        # Authentication (Zustand)
│   ├── cartStore.ts        # Shopping cart (Zustand)
│   ├── mockData.ts         # Mock data service
│   └── theme.ts            # Material-UI theme
│
├── public/
│   ├── data/               # CSV data files
│   │   ├── restaurants.csv # Restaurant data
│   │   └── menu.csv        # Menu items data
│   └── logo.png
│
├── .env.local              # Environment variables
├── .env.example            # Example env file
├── next.config.js          # Next.js config
├── tsconfig.json           # TypeScript config
├── package.json            # Dependencies
└── README.md               # This file
```

## 🎯 How to Use

### For Customers

1. **Browse** - Go to homepage or `/restaurants` to browse restaurants
2. **Search** - Use search bar to find specific dishes or restaurants
3. **Add to Cart** - Click "Add to Cart" on menu items
4. **Checkout** - Click cart icon and proceed to checkout
5. **Login** - Sign in or register (mock auth accepts any email/password)
6. **Place Order** - Fill delivery details and place order
7. **Track** - View your orders at `/orders`

### For Admins

Visit `/admin` to manage the platform (if authenticated as admin)

### For Owners

Visit `/owner` to manage restaurant menus and orders

## 🔌 API Endpoints

The app expects these endpoints from your backend:

### Restaurants

- `GET /restaurants` - List all restaurants
- `GET /restaurants?limit=6` - Get featured restaurants
- `GET /restaurants/:id` - Get restaurant details

### Menu Items

- `GET /menu` - Get all menu items
- `GET /menu/restaurant/:id` - Get restaurant menu
- `POST /menu` - Create menu item (admin)

### Authentication

- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /auth/me` - Get current user

### Orders

- `POST /orders` - Create order
- `GET /orders` - Get user's orders
- `GET /orders/:id` - Get order details

## 🗂️ Data Management

### Using Mock Data (No Backend)

Set `NEXT_PUBLIC_USE_MOCK_DATA=true` in `.env.local`

The app uses CSV files in `public/data/`:

- `restaurants.csv` - 10 sample restaurants
- `menu.csv` - 40 sample menu items

Edit these files to add/modify data, then refresh the page.

### Using Real Backend

Set `NEXT_PUBLIC_USE_MOCK_DATA=false` and ensure backend API is running.

## 🛠️ Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Format code
npm run format
```

## 🎨 Customization

### Styling

- Material-UI theme in `lib/theme.ts`
- Global styles in `app/globals.css`
- Component-level sx props in component files

### Colors

- Primary: `#FF6B35` (Deep Orange)
- Secondary: `#264653` (Royal Blue)
- Success: `#C6FF00` (Lime)

### Fonts

- Family: Inter, Roboto, Helvetica, Arial
- Weights: 600 (semi-bold), 700 (bold)

## 📦 Dependencies

Key packages:

- **Next.js 14** - React framework
- **Material-UI (MUI)** - UI components
- **Zustand** - State management
- **Axios** - HTTP client
- **js-cookie** - Cookie management
- **TypeScript** - Type safety

See `package.json` for complete list.

## 🚀 Deployment

### Deploy to Vercel

```bash
vercel
```

### Deploy to Netlify

```bash
npm run build
# Upload dist folder to Netlify
```

### Environment Variables for Production

```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com
NEXT_PUBLIC_USE_MOCK_DATA=false
```

## 📱 Mobile Responsiveness

The app is fully responsive with breakpoints:

- **xs** (Mobile): < 600px
- **sm** (Tablet): 600px - 960px
- **md** (Laptop): 960px - 1280px
- **lg** (Desktop): 1280px+

All features work seamlessly on mobile, tablet, and desktop.

## 🔐 Security Notes

⚠️ **Important**: This is a frontend application. For production:

- Implement proper authentication with JWT tokens
- Secure sensitive data in backend
- Use HTTPS for all API calls
- Implement rate limiting
- Validate all inputs on backend

## 🐛 Troubleshooting

### "No items found" on Food page

- Check if backend is running on configured URL
- Verify CSV files exist in `public/data/`
- Check browser console for errors

### Images not loading

- Verify image URLs are accessible
- Check internet connection for Unsplash images
- Ensure CORS is enabled on backend

### Login not working

- Mock auth accepts any credentials
- Check if `NEXT_PUBLIC_USE_MOCK_DATA` is correctly set
- Verify backend auth endpoint

### Build errors

- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check Node.js version compatibility

## 📚 Documentation

- [Mock Data Guide](./MOCK_DATA_README.md)
- [Setup Guide](./SETUP_COMPLETE.md)
- [CSV Templates](./CSV_TEMPLATE.md)
- [Quick Start](./QUICKSTART.md)

## 👨‍💻 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 👤 Author

**Udhayaboopathi**

- GitHub: [@Udhayaboopathi](https://github.com/Udhayaboopathi)
- Repository: [Food-App-Frontend](https://github.com/Udhayaboopathi/Udhayaboopathi-Food-App-Frontend)

## 🙋 Support

Having issues?

1. Check the [Troubleshooting](#troubleshooting) section
2. Review the documentation files
3. Check browser console for errors
4. Open an issue on GitHub

## 🎉 Features Roadmap

- [ ] Real-time order tracking with maps
- [ ] Payment gateway integration
- [ ] User ratings and reviews
- [ ] Favorite restaurants/dishes
- [ ] Promo codes and discounts
- [ ] Push notifications
- [ ] Multiple delivery addresses
- [ ] Admin analytics dashboard
- [ ] Dark mode theme
- [ ] Multi-language support

---

**Made with ❤️ for food lovers everywhere!** 🍕🍔🍜

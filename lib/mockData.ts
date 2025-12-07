/**
 * Mock Data System
 * Provides fallback data when backend is unavailable
 */

// ==================== MOCK USERS ====================
const mockUsers = [
  {
    id: "user_001",
    email: "john.doe@example.com",
    name: "John Doe",
    password: "password123",
    phone: "+1 (555) 123-4567",
    role: "customer",
    profile_image: "https://i.pravatar.cc/150?img=12",
    is_active: true,
    wallet_balance: 125.5,
    loyalty_points: 450,
    created_at: "2024-01-15T10:30:00Z",
    last_login: "2024-12-08T09:15:00Z",
  },
  {
    id: "user_002",
    email: "jane.smith@example.com",
    name: "Jane Smith",
    password: "password123",
    phone: "+1 (555) 234-5678",
    role: "customer",
    profile_image: "https://i.pravatar.cc/150?img=5",
    is_active: true,
    wallet_balance: 78.25,
    loyalty_points: 320,
    created_at: "2024-02-20T14:45:00Z",
    last_login: "2024-12-08T08:30:00Z",
  },
  {
    id: "user_003",
    email: "mike.wilson@example.com",
    name: "Mike Wilson",
    password: "password123",
    phone: "+1 (555) 345-6789",
    role: "customer",
    profile_image: "https://i.pravatar.cc/150?img=33",
    is_active: true,
    wallet_balance: 250.0,
    loyalty_points: 890,
    created_at: "2023-11-10T16:20:00Z",
    last_login: "2024-12-07T19:45:00Z",
  },
  {
    id: "user_004",
    email: "sarah.johnson@example.com",
    name: "Sarah Johnson",
    password: "password123",
    phone: "+1 (555) 456-7890",
    role: "customer",
    profile_image: "https://i.pravatar.cc/150?img=9",
    is_active: true,
    wallet_balance: 0,
    loyalty_points: 150,
    created_at: "2024-03-05T11:00:00Z",
    last_login: "2024-12-08T07:20:00Z",
  },
  {
    id: "user_005",
    email: "david.brown@example.com",
    name: "David Brown",
    password: "password123",
    phone: "+1 (555) 567-8901",
    role: "customer",
    profile_image: "https://i.pravatar.cc/150?img=14",
    is_active: true,
    wallet_balance: 50.0,
    loyalty_points: 210,
    created_at: "2024-04-12T09:30:00Z",
    last_login: "2024-12-06T18:10:00Z",
  },
  {
    id: "user_006",
    email: "emily.davis@example.com",
    name: "Emily Davis",
    password: "password123",
    phone: "+1 (555) 678-9012",
    role: "customer",
    profile_image: "https://i.pravatar.cc/150?img=20",
    is_active: true,
    wallet_balance: 180.75,
    loyalty_points: 560,
    created_at: "2024-05-18T13:15:00Z",
    last_login: "2024-12-08T10:05:00Z",
  },
  {
    id: "user_007",
    email: "chris.martinez@example.com",
    name: "Chris Martinez",
    password: "password123",
    phone: "+1 (555) 789-0123",
    role: "customer",
    profile_image: "https://i.pravatar.cc/150?img=51",
    is_active: true,
    wallet_balance: 35.0,
    loyalty_points: 95,
    created_at: "2024-06-22T15:40:00Z",
    last_login: "2024-12-05T20:30:00Z",
  },
  {
    id: "user_008",
    email: "lisa.anderson@example.com",
    name: "Lisa Anderson",
    password: "password123",
    phone: "+1 (555) 890-1234",
    role: "customer",
    profile_image: "https://i.pravatar.cc/150?img=26",
    is_active: true,
    wallet_balance: 420.0,
    loyalty_points: 1250,
    created_at: "2023-09-08T12:00:00Z",
    last_login: "2024-12-08T11:30:00Z",
  },
  {
    id: "admin_001",
    email: "admin@foodapp.com",
    name: "Admin User",
    password: "admin123",
    phone: "+1 (555) 000-0001",
    role: "admin",
    profile_image: "https://i.pravatar.cc/150?img=68",
    is_active: true,
    created_at: "2023-01-01T00:00:00Z",
    last_login: "2024-12-08T08:00:00Z",
  },
  {
    id: "owner_001",
    email: "owner.pizza@example.com",
    name: "Tony Romano",
    password: "owner123",
    phone: "+1 (555) 100-0001",
    role: "owner",
    restaurant_id: "1",
    profile_image: "https://i.pravatar.cc/150?img=60",
    is_active: true,
    created_at: "2023-05-10T10:00:00Z",
    last_login: "2024-12-08T06:30:00Z",
  },
  {
    id: "owner_002",
    email: "owner.burger@example.com",
    name: "Bob Henderson",
    password: "owner123",
    phone: "+1 (555) 100-0002",
    role: "owner",
    restaurant_id: "2",
    profile_image: "https://i.pravatar.cc/150?img=57",
    is_active: true,
    created_at: "2023-06-15T11:30:00Z",
    last_login: "2024-12-08T07:45:00Z",
  },
  {
    id: "owner_003",
    email: "owner.sushi@example.com",
    name: "Kenji Tanaka",
    password: "owner123",
    phone: "+1 (555) 100-0003",
    role: "owner",
    restaurant_id: "3",
    profile_image: "https://i.pravatar.cc/150?img=59",
    is_active: true,
    created_at: "2023-07-20T14:00:00Z",
    last_login: "2024-12-08T05:20:00Z",
  },
];

// ==================== MOCK ORDERS ====================
const mockOrders = [
  {
    id: "ORD-2024-001",
    user_id: "user_001",
    restaurant_id: "1",
    restaurant_name: "Pizza Palace",
    items: [
      {
        id: "1",
        name: "Margherita Pizza",
        price: 12.99,
        quantity: 2,
        image:
          "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop",
      },
      {
        id: "2",
        name: "Pepperoni Pizza",
        price: 14.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop",
      },
    ],
    subtotal: 40.97,
    delivery_fee: 3.99,
    tax: 3.28,
    discount: 8.19,
    total_amount: 40.05,
    coupon_code: "SAVE20",
    status: "delivered",
    payment_method: "Credit Card",
    payment_status: "paid",
    delivery_address:
      "742 Evergreen Terrace, Apartment 4B, Manhattan, NY 10001",
    delivery_instructions: "Ring doorbell twice, leave at door",
    driver_name: "Carlos Rodriguez",
    driver_phone: "+1 (555) 900-1001",
    driver_rating: 4.8,
    estimated_delivery_time: "2024-12-07T12:45:00Z",
    created_at: "2024-12-07T11:30:00Z",
    confirmed_at: "2024-12-07T11:32:00Z",
    preparing_at: "2024-12-07T11:35:00Z",
    picked_up_at: "2024-12-07T12:10:00Z",
    delivered_at: "2024-12-07T12:42:00Z",
  },
  {
    id: "ORD-2024-002",
    user_id: "user_002",
    restaurant_id: "2",
    restaurant_name: "Burger Haven",
    items: [
      {
        id: "5",
        name: "Classic Burger",
        price: 9.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
      },
      {
        id: "6",
        name: "Cheese Burger",
        price: 11.99,
        quantity: 2,
        image:
          "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400&h=300&fit=crop",
      },
    ],
    subtotal: 33.97,
    delivery_fee: 2.99,
    tax: 2.72,
    discount: 0,
    total_amount: 39.68,
    coupon_code: null,
    status: "on_the_way",
    payment_method: "Debit Card",
    payment_status: "paid",
    delivery_address: "1428 Elm Street, Brooklyn, NY 11201",
    delivery_instructions: "Call on arrival",
    driver_name: "Maria Santos",
    driver_phone: "+1 (555) 900-1002",
    driver_rating: 4.9,
    estimated_delivery_time: "2024-12-08T13:30:00Z",
    created_at: "2024-12-08T12:15:00Z",
    confirmed_at: "2024-12-08T12:17:00Z",
    preparing_at: "2024-12-08T12:20:00Z",
    picked_up_at: "2024-12-08T12:55:00Z",
    delivered_at: null,
  },
  {
    id: "ORD-2024-003",
    user_id: "user_003",
    restaurant_id: "3",
    restaurant_name: "Sushi Express",
    items: [
      {
        id: "9",
        name: "California Roll",
        price: 8.99,
        quantity: 3,
        image:
          "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
      },
      {
        id: "10",
        name: "Spicy Tuna Roll",
        price: 9.99,
        quantity: 2,
        image:
          "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=400&h=300&fit=crop",
      },
    ],
    subtotal: 46.95,
    delivery_fee: 4.49,
    tax: 3.76,
    discount: 0,
    total_amount: 55.2,
    coupon_code: null,
    status: "preparing",
    payment_method: "UPI",
    payment_status: "paid",
    delivery_address: "221B Baker Street, Queens, NY 11354",
    delivery_instructions: "Meet in lobby",
    driver_name: null,
    driver_phone: null,
    driver_rating: null,
    estimated_delivery_time: "2024-12-08T14:00:00Z",
    created_at: "2024-12-08T13:05:00Z",
    confirmed_at: "2024-12-08T13:07:00Z",
    preparing_at: "2024-12-08T13:10:00Z",
    picked_up_at: null,
    delivered_at: null,
  },
  {
    id: "ORD-2024-004",
    user_id: "user_004",
    restaurant_id: "4",
    restaurant_name: "Taco Fiesta",
    items: [
      {
        id: "13",
        name: "Chicken Tacos",
        price: 7.99,
        quantity: 2,
        image:
          "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop",
      },
    ],
    subtotal: 15.98,
    delivery_fee: 2.49,
    tax: 1.28,
    discount: 7.99,
    total_amount: 11.76,
    coupon_code: "FIRST50",
    status: "pending",
    payment_method: "Wallet",
    payment_status: "paid",
    delivery_address: "90 Bedford Street, Apartment 20, Manhattan, NY 10014",
    delivery_instructions: null,
    driver_name: null,
    driver_phone: null,
    driver_rating: null,
    estimated_delivery_time: "2024-12-08T14:45:00Z",
    created_at: "2024-12-08T13:45:00Z",
    confirmed_at: null,
    preparing_at: null,
    picked_up_at: null,
    delivered_at: null,
  },
  {
    id: "ORD-2024-005",
    user_id: "user_005",
    restaurant_id: "5",
    restaurant_name: "Dragon Wok",
    items: [
      {
        id: "17",
        name: "Sweet and Sour Chicken",
        price: 11.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=400&h=300&fit=crop",
      },
      {
        id: "18",
        name: "Fried Rice",
        price: 8.99,
        quantity: 2,
        image:
          "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
      },
    ],
    subtotal: 29.97,
    delivery_fee: 3.49,
    tax: 2.4,
    discount: 0,
    total_amount: 35.86,
    coupon_code: null,
    status: "delivered",
    payment_method: "Cash on Delivery",
    payment_status: "paid",
    delivery_address: "321 Elm St, Floor 2, Manhattan, NY 10002",
    delivery_instructions: "Contactless delivery",
    driver_name: "James Wilson",
    driver_phone: "+1 (555) 900-1003",
    driver_rating: 4.7,
    estimated_delivery_time: "2024-12-06T19:00:00Z",
    created_at: "2024-12-06T18:00:00Z",
    confirmed_at: "2024-12-06T18:02:00Z",
    preparing_at: "2024-12-06T18:05:00Z",
    picked_up_at: "2024-12-06T18:35:00Z",
    delivered_at: "2024-12-06T19:05:00Z",
  },
  {
    id: "ORD-2024-006",
    user_id: "user_005",
    restaurant_id: "6",
    restaurant_name: "Pasta Paradise",
    items: [
      {
        id: "21",
        name: "Spaghetti Carbonara",
        price: 13.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=300&fit=crop",
      },
    ],
    subtotal: 13.99,
    delivery_fee: 2.99,
    tax: 1.12,
    discount: 0,
    total_amount: 18.1,
    coupon_code: null,
    status: "cancelled",
    payment_method: "Credit Card",
    payment_status: "refunded",
    delivery_address: "321 Elm St, Floor 2, Manhattan, NY 10002",
    delivery_instructions: null,
    driver_name: null,
    driver_phone: null,
    driver_rating: null,
    cancellation_reason: "Changed my mind",
    cancelled_by: "customer",
    estimated_delivery_time: "2024-12-05T20:30:00Z",
    created_at: "2024-12-05T19:45:00Z",
    confirmed_at: "2024-12-05T19:47:00Z",
    preparing_at: null,
    picked_up_at: null,
    delivered_at: null,
    cancelled_at: "2024-12-05T19:52:00Z",
  },
  {
    id: "ORD-2024-007",
    user_id: "user_006",
    restaurant_id: "7",
    restaurant_name: "BBQ Nation",
    items: [
      {
        id: "25",
        name: "BBQ Ribs",
        price: 16.99,
        quantity: 2,
        image:
          "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop",
      },
      {
        id: "26",
        name: "Pulled Pork Sandwich",
        price: 12.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400&h=300&fit=crop",
      },
    ],
    subtotal: 46.97,
    delivery_fee: 4.99,
    tax: 3.76,
    discount: 9.39,
    total_amount: 46.33,
    coupon_code: "SAVE20",
    status: "delivered",
    payment_method: "PayPal",
    payment_status: "paid",
    delivery_address: "555 Park Avenue, Penthouse, Manhattan, NY 10022",
    delivery_instructions: "Use service entrance",
    driver_name: "Ahmed Khan",
    driver_phone: "+1 (555) 900-1004",
    driver_rating: 5.0,
    estimated_delivery_time: "2024-12-04T20:15:00Z",
    created_at: "2024-12-04T19:00:00Z",
    confirmed_at: "2024-12-04T19:02:00Z",
    preparing_at: "2024-12-04T19:05:00Z",
    picked_up_at: "2024-12-04T19:45:00Z",
    delivered_at: "2024-12-04T20:12:00Z",
  },
  {
    id: "ORD-2024-008",
    user_id: "user_007",
    restaurant_id: "8",
    restaurant_name: "Thai Delight",
    items: [
      {
        id: "29",
        name: "Pad Thai",
        price: 10.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400&h=300&fit=crop",
      },
      {
        id: "30",
        name: "Green Curry",
        price: 11.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop",
      },
    ],
    subtotal: 22.98,
    delivery_fee: 2.99,
    tax: 1.84,
    discount: 0,
    total_amount: 27.81,
    coupon_code: null,
    status: "delivered",
    payment_method: "Google Pay",
    payment_status: "paid",
    delivery_address: "88 University Place, Apartment 5C, Manhattan, NY 10003",
    delivery_instructions: "Buzzer broken, please call",
    driver_name: "Lisa Chen",
    driver_phone: "+1 (555) 900-1005",
    driver_rating: 4.8,
    estimated_delivery_time: "2024-12-03T21:00:00Z",
    created_at: "2024-12-03T19:50:00Z",
    confirmed_at: "2024-12-03T19:52:00Z",
    preparing_at: "2024-12-03T19:55:00Z",
    picked_up_at: "2024-12-03T20:30:00Z",
    delivered_at: "2024-12-03T20:58:00Z",
  },
  {
    id: "ORD-2024-009",
    user_id: "user_008",
    restaurant_id: "9",
    restaurant_name: "Curry House",
    items: [
      {
        id: "33",
        name: "Chicken Tikka Masala",
        price: 12.99,
        quantity: 2,
        image:
          "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop",
      },
      {
        id: "34",
        name: "Naan Bread",
        price: 2.99,
        quantity: 4,
        image:
          "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop",
      },
    ],
    subtotal: 37.94,
    delivery_fee: 3.99,
    tax: 3.04,
    discount: 0,
    total_amount: 44.97,
    coupon_code: null,
    status: "delivered",
    payment_method: "Apple Pay",
    payment_status: "paid",
    delivery_address: "15 Central Park West, Tower A, Manhattan, NY 10023",
    delivery_instructions: "Concierge will accept delivery",
    driver_name: "Michael Brown",
    driver_phone: "+1 (555) 900-1006",
    driver_rating: 4.9,
    estimated_delivery_time: "2024-12-02T19:45:00Z",
    created_at: "2024-12-02T18:30:00Z",
    confirmed_at: "2024-12-02T18:32:00Z",
    preparing_at: "2024-12-02T18:35:00Z",
    picked_up_at: "2024-12-02T19:10:00Z",
    delivered_at: "2024-12-02T19:42:00Z",
  },
  {
    id: "ORD-2024-010",
    user_id: "user_001",
    restaurant_id: "10",
    restaurant_name: "Mediterranean Grill",
    items: [
      {
        id: "37",
        name: "Chicken Shawarma",
        price: 9.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400&h=300&fit=crop",
      },
      {
        id: "38",
        name: "Falafel Wrap",
        price: 8.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1593858509729-7b1b6c3fe2f0?w=400&h=300&fit=crop",
      },
    ],
    subtotal: 18.98,
    delivery_fee: 2.49,
    tax: 1.52,
    discount: 3.8,
    total_amount: 19.19,
    coupon_code: "SAVE20",
    status: "delivered",
    payment_method: "Credit Card",
    payment_status: "paid",
    delivery_address:
      "742 Evergreen Terrace, Apartment 4B, Manhattan, NY 10001",
    delivery_instructions: "Ring doorbell twice, leave at door",
    driver_name: "Sofia Martinez",
    driver_phone: "+1 (555) 900-1007",
    driver_rating: 4.7,
    estimated_delivery_time: "2024-12-01T13:30:00Z",
    created_at: "2024-12-01T12:15:00Z",
    confirmed_at: "2024-12-01T12:17:00Z",
    preparing_at: "2024-12-01T12:20:00Z",
    picked_up_at: "2024-12-01T12:55:00Z",
    delivered_at: "2024-12-01T13:28:00Z",
  },
];

// ==================== SAVED ADDRESSES ====================
const mockAddresses = [
  {
    id: "ADDR_001",
    user_id: "user_001",
    label: "Home",
    address_line1: "742 Evergreen Terrace",
    address_line2: "Apartment 4B",
    city: "Manhattan",
    state: "NY",
    zip_code: "10001",
    latitude: 40.7589,
    longitude: -73.9851,
    is_default: true,
    delivery_instructions: "Ring doorbell twice, leave at door",
  },
  {
    id: "ADDR_002",
    user_id: "user_001",
    label: "Office",
    address_line1: "350 Fifth Avenue",
    address_line2: "Floor 34",
    city: "Manhattan",
    state: "NY",
    zip_code: "10118",
    latitude: 40.7484,
    longitude: -73.9857,
    is_default: false,
    delivery_instructions: "Reception desk",
  },
  {
    id: "ADDR_003",
    user_id: "user_002",
    label: "Home",
    address_line1: "1428 Elm Street",
    address_line2: "",
    city: "Brooklyn",
    state: "NY",
    zip_code: "11201",
    latitude: 40.6982,
    longitude: -73.9442,
    is_default: true,
    delivery_instructions: "Call on arrival",
  },
  {
    id: "ADDR_004",
    user_id: "user_003",
    label: "Home",
    address_line1: "221B Baker Street",
    address_line2: "",
    city: "Queens",
    state: "NY",
    zip_code: "11354",
    latitude: 40.7614,
    longitude: -73.8267,
    is_default: true,
    delivery_instructions: "Meet in lobby",
  },
  {
    id: "ADDR_005",
    user_id: "user_004",
    label: "Apartment",
    address_line1: "90 Bedford Street",
    address_line2: "Apartment 20",
    city: "Manhattan",
    state: "NY",
    zip_code: "10014",
    latitude: 40.7331,
    longitude: -74.0044,
    is_default: true,
    delivery_instructions: null,
  },
  {
    id: "ADDR_006",
    user_id: "user_005",
    label: "Home",
    address_line1: "321 Elm St",
    address_line2: "Floor 2",
    city: "Manhattan",
    state: "NY",
    zip_code: "10002",
    latitude: 40.7209,
    longitude: -73.9896,
    is_default: true,
    delivery_instructions: "Contactless delivery",
  },
  {
    id: "ADDR_007",
    user_id: "user_006",
    label: "Penthouse",
    address_line1: "555 Park Avenue",
    address_line2: "Penthouse",
    city: "Manhattan",
    state: "NY",
    zip_code: "10022",
    latitude: 40.7614,
    longitude: -73.9776,
    is_default: true,
    delivery_instructions: "Use service entrance",
  },
  {
    id: "ADDR_008",
    user_id: "user_007",
    label: "Apartment",
    address_line1: "88 University Place",
    address_line2: "Apartment 5C",
    city: "Manhattan",
    state: "NY",
    zip_code: "10003",
    latitude: 40.7336,
    longitude: -73.9927,
    is_default: true,
    delivery_instructions: "Buzzer broken, please call",
  },
  {
    id: "ADDR_009",
    user_id: "user_008",
    label: "Home",
    address_line1: "15 Central Park West",
    address_line2: "Tower A",
    city: "Manhattan",
    state: "NY",
    zip_code: "10023",
    latitude: 40.7688,
    longitude: -73.983,
    is_default: true,
    delivery_instructions: "Concierge will accept delivery",
  },
];

// ==================== PAYMENT METHODS ====================
const mockPaymentMethods = [
  {
    id: "PAY_001",
    user_id: "user_001",
    type: "credit_card",
    provider: "Visa",
    card_number: "**** **** **** 1234",
    card_holder: "John Doe",
    expiry_month: "12",
    expiry_year: "2026",
    is_default: true,
    billing_zip: "10001",
  },
  {
    id: "PAY_002",
    user_id: "user_001",
    type: "debit_card",
    provider: "Mastercard",
    card_number: "**** **** **** 5678",
    card_holder: "John Doe",
    expiry_month: "08",
    expiry_year: "2025",
    is_default: false,
    billing_zip: "10001",
  },
  {
    id: "PAY_003",
    user_id: "user_002",
    type: "debit_card",
    provider: "Visa",
    card_number: "**** **** **** 9012",
    card_holder: "Jane Smith",
    expiry_month: "03",
    expiry_year: "2027",
    is_default: true,
    billing_zip: "11201",
  },
  {
    id: "PAY_004",
    user_id: "user_003",
    type: "upi",
    provider: "UPI",
    upi_id: "mike.wilson@upi",
    is_default: true,
  },
  {
    id: "PAY_005",
    user_id: "user_006",
    type: "paypal",
    provider: "PayPal",
    email: "emily.davis@example.com",
    is_default: true,
  },
  {
    id: "PAY_006",
    user_id: "user_007",
    type: "google_pay",
    provider: "Google Pay",
    email: "chris.martinez@example.com",
    is_default: true,
  },
  {
    id: "PAY_007",
    user_id: "user_008",
    type: "apple_pay",
    provider: "Apple Pay",
    device_name: "iPhone 14 Pro",
    is_default: true,
  },
];

// ==================== TRANSACTIONS ====================
const mockTransactions = [
  {
    id: "TXN_001",
    user_id: "user_001",
    order_id: "ORD-2024-001",
    type: "payment",
    amount: 40.05,
    payment_method: "Credit Card",
    payment_provider: "Visa",
    status: "success",
    transaction_ref: "TXN_REF_20241207_001",
    created_at: "2024-12-07T11:30:00Z",
  },
  {
    id: "TXN_002",
    user_id: "user_002",
    order_id: "ORD-2024-002",
    type: "payment",
    amount: 39.68,
    payment_method: "Debit Card",
    payment_provider: "Mastercard",
    status: "success",
    transaction_ref: "TXN_REF_20241208_001",
    created_at: "2024-12-08T12:15:00Z",
  },
  {
    id: "TXN_003",
    user_id: "user_003",
    order_id: "ORD-2024-003",
    type: "payment",
    amount: 55.2,
    payment_method: "UPI",
    payment_provider: "UPI",
    status: "success",
    transaction_ref: "TXN_REF_20241208_002",
    created_at: "2024-12-08T13:05:00Z",
  },
  {
    id: "TXN_004",
    user_id: "user_004",
    order_id: "ORD-2024-004",
    type: "payment",
    amount: 11.76,
    payment_method: "Wallet",
    payment_provider: "Wallet",
    status: "success",
    transaction_ref: "TXN_REF_20241208_003",
    created_at: "2024-12-08T13:45:00Z",
  },
  {
    id: "TXN_005",
    user_id: "user_005",
    order_id: "ORD-2024-006",
    type: "refund",
    amount: 18.1,
    payment_method: "Credit Card",
    payment_provider: "Visa",
    status: "success",
    transaction_ref: "TXN_REF_20241205_REFUND",
    created_at: "2024-12-05T20:00:00Z",
  },
  {
    id: "TXN_006",
    user_id: "user_001",
    type: "wallet_topup",
    amount: 100.0,
    payment_method: "Credit Card",
    payment_provider: "Visa",
    status: "success",
    transaction_ref: "TXN_REF_20241201_TOPUP",
    created_at: "2024-12-01T10:00:00Z",
  },
  {
    id: "TXN_007",
    user_id: "user_008",
    type: "wallet_topup",
    amount: 500.0,
    payment_method: "Apple Pay",
    payment_provider: "Apple Pay",
    status: "success",
    transaction_ref: "TXN_REF_20241120_TOPUP",
    created_at: "2024-11-20T14:30:00Z",
  },
];

// ==================== NOTIFICATIONS ====================
const mockNotifications = [
  {
    id: "NOTIF_001",
    user_id: "user_001",
    type: "order_update",
    title: "Order Delivered!",
    message: "Your order from Pizza Palace has been delivered successfully.",
    order_id: "ORD-2024-001",
    is_read: true,
    created_at: "2024-12-07T12:42:00Z",
  },
  {
    id: "NOTIF_002",
    user_id: "user_002",
    type: "order_update",
    title: "Order On The Way",
    message: "Your order from Burger Haven is on the way. Driver: Maria Santos",
    order_id: "ORD-2024-002",
    is_read: false,
    created_at: "2024-12-08T12:55:00Z",
  },
  {
    id: "NOTIF_003",
    user_id: "user_003",
    type: "order_update",
    title: "Order Confirmed",
    message:
      "Your order from Sushi Express has been confirmed and is being prepared.",
    order_id: "ORD-2024-003",
    is_read: false,
    created_at: "2024-12-08T13:07:00Z",
  },
  {
    id: "NOTIF_004",
    user_id: "user_001",
    type: "promotion",
    title: "Weekend Special - 20% Off!",
    message:
      "Use code WEEKEND20 on orders above $30. Valid till Sunday midnight.",
    is_read: false,
    created_at: "2024-12-08T09:00:00Z",
  },
  {
    id: "NOTIF_005",
    user_id: "user_004",
    type: "order_update",
    title: "Order Received",
    message:
      "Your order from Taco Fiesta has been received and will be confirmed shortly.",
    order_id: "ORD-2024-004",
    is_read: false,
    created_at: "2024-12-08T13:45:00Z",
  },
  {
    id: "NOTIF_006",
    user_id: "user_005",
    type: "refund",
    title: "Refund Processed",
    message:
      "$18.10 has been refunded to your original payment method for cancelled order.",
    order_id: "ORD-2024-006",
    is_read: true,
    created_at: "2024-12-05T20:00:00Z",
  },
  {
    id: "NOTIF_007",
    user_id: "user_006",
    type: "promotion",
    title: "New Restaurant Alert!",
    message:
      "Mediterranean Grill just joined! Get 50% off on your first order.",
    is_read: false,
    created_at: "2024-12-08T08:00:00Z",
  },
  {
    id: "NOTIF_008",
    user_id: "user_001",
    type: "loyalty",
    title: "Loyalty Points Earned!",
    message: "You earned 40 points from your recent order. Total: 450 points.",
    is_read: true,
    created_at: "2024-12-07T12:45:00Z",
  },
  {
    id: "NOTIF_009",
    user_id: "user_008",
    type: "wallet",
    title: "Wallet Recharged",
    message: "$500 has been added to your wallet. Current balance: $420.00",
    is_read: true,
    created_at: "2024-11-20T14:30:00Z",
  },
  {
    id: "NOTIF_010",
    user_id: "user_002",
    type: "system",
    title: "App Update Available",
    message:
      "Version 2.1.0 is now available with new features and improvements.",
    is_read: false,
    created_at: "2024-12-08T07:00:00Z",
  },
];

// ==================== SUPPORT TICKETS ====================
const mockSupportTickets = [
  {
    id: "TICKET_001",
    user_id: "user_001",
    order_id: "ORD-2024-001",
    category: "delivery_issue",
    subject: "Food was cold",
    description: "The pizza arrived cold even though delivery was on time.",
    status: "resolved",
    priority: "medium",
    assigned_to: "support_agent_01",
    created_at: "2024-12-07T13:00:00Z",
    updated_at: "2024-12-07T14:30:00Z",
    resolved_at: "2024-12-07T14:30:00Z",
    resolution:
      "Refunded $10 to wallet as compensation. Sorry for the inconvenience.",
  },
  {
    id: "TICKET_002",
    user_id: "user_005",
    order_id: "ORD-2024-006",
    category: "cancellation",
    subject: "Want to cancel order",
    description: "I changed my mind and want to cancel the order.",
    status: "resolved",
    priority: "high",
    assigned_to: "support_agent_02",
    created_at: "2024-12-05T19:50:00Z",
    updated_at: "2024-12-05T19:52:00Z",
    resolved_at: "2024-12-05T19:52:00Z",
    resolution: "Order cancelled successfully. Full refund processed.",
  },
  {
    id: "TICKET_003",
    user_id: "user_003",
    category: "account",
    subject: "Can't update phone number",
    description:
      "Getting error when trying to update my phone number in profile.",
    status: "open",
    priority: "low",
    assigned_to: "support_agent_01",
    created_at: "2024-12-08T10:00:00Z",
    updated_at: "2024-12-08T10:15:00Z",
    resolved_at: null,
    resolution: null,
  },
  {
    id: "TICKET_004",
    user_id: "user_007",
    category: "payment",
    subject: "Double charge on card",
    description:
      "I was charged twice for the same order but only received one.",
    status: "in_progress",
    priority: "high",
    assigned_to: "support_agent_03",
    created_at: "2024-12-04T11:00:00Z",
    updated_at: "2024-12-04T15:00:00Z",
    resolved_at: null,
    resolution: null,
  },
];

// ==================== PROMO BANNERS ====================
const mockPromoBanners = [
  {
    id: "BANNER_001",
    title: "Weekend Special",
    subtitle: "Get 20% off on all orders",
    description: "Use code WEEKEND20 on orders above $30",
    coupon_code: "WEEKEND20",
    image_url:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=400&fit=crop",
    start_date: "2024-12-07T00:00:00Z",
    end_date: "2024-12-09T23:59:59Z",
    is_active: true,
    display_order: 1,
  },
  {
    id: "BANNER_002",
    title: "First Order Special",
    subtitle: "New users get 50% off",
    description: "Sign up and use code FIRST50 on your first order above $25",
    coupon_code: "FIRST50",
    image_url:
      "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&h=400&fit=crop",
    start_date: "2024-01-01T00:00:00Z",
    end_date: "2025-12-31T23:59:59Z",
    is_active: true,
    display_order: 2,
  },
  {
    id: "BANNER_003",
    title: "Free Delivery",
    subtitle: "On orders above $25",
    description: "Use code FREESHIP for free delivery",
    coupon_code: "FREESHIP",
    image_url:
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&h=400&fit=crop",
    start_date: "2024-12-01T00:00:00Z",
    end_date: "2024-12-15T23:59:59Z",
    is_active: true,
    display_order: 3,
  },
  {
    id: "BANNER_004",
    title: "Lunch Special",
    subtitle: "$5 off on lunch orders",
    description: "Order between 11 AM - 3 PM and save $5",
    coupon_code: "LUNCH5",
    image_url:
      "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800&h=400&fit=crop",
    start_date: "2024-12-01T00:00:00Z",
    end_date: "2024-12-31T23:59:59Z",
    is_active: true,
    display_order: 4,
  },
];

// ==================== REVIEWS ====================
const mockReviews = [
  {
    id: "REV_001",
    user_id: "user_001",
    user_name: "John Doe",
    restaurant_id: "1",
    order_id: "ORD-2024-001",
    rating: 5,
    comment:
      "Amazing pizza! The crust was perfectly crispy and the toppings were fresh. Definitely ordering again.",
    food_rating: 5,
    delivery_rating: 4,
    created_at: "2024-12-07T13:00:00Z",
  },
  {
    id: "REV_002",
    user_id: "user_002",
    user_name: "Jane Smith",
    restaurant_id: "2",
    order_id: "ORD-2024-002",
    rating: 4,
    comment:
      "Great burgers! Juicy and flavorful. Delivery was a bit slow but worth the wait.",
    food_rating: 5,
    delivery_rating: 3,
    created_at: "2024-12-08T13:30:00Z",
  },
  {
    id: "REV_003",
    user_id: "user_008",
    user_name: "Lisa Anderson",
    restaurant_id: "1",
    rating: 5,
    comment: "Best pizza in town! Love their pepperoni pizza.",
    food_rating: 5,
    delivery_rating: 5,
    created_at: "2024-11-30T15:20:00Z",
  },
  {
    id: "REV_004",
    user_id: "user_003",
    user_name: "Mike Wilson",
    restaurant_id: "3",
    rating: 5,
    comment: "Fresh sushi, great variety. The California rolls were perfect!",
    food_rating: 5,
    delivery_rating: 5,
    created_at: "2024-11-28T18:45:00Z",
  },
  {
    id: "REV_005",
    user_id: "user_006",
    user_name: "Emily Davis",
    restaurant_id: "7",
    order_id: "ORD-2024-007",
    rating: 5,
    comment:
      "BBQ ribs were fall-off-the-bone tender. Amazing flavor and generous portions!",
    food_rating: 5,
    delivery_rating: 5,
    created_at: "2024-12-04T20:30:00Z",
  },
];

// ==================== FAVORITES ====================
const mockFavorites: { [key: string]: string[] } = {
  user_001: ["1", "3", "6", "9"],
  user_002: ["2", "7", "8", "10"],
  user_003: ["3", "8", "9", "1"],
  user_004: ["5", "6", "3", "8"],
  user_005: ["1", "2", "10", "6"],
  user_006: ["4", "7", "9"],
  user_007: ["2", "5", "8"],
  user_008: ["3", "6", "9", "10"],
};

// ==================== COUPONS ====================
const mockCoupons = [
  {
    id: "COUP_001",
    code: "SAVE20",
    discount: 20,
    type: "percentage",
    min_order: 30,
    expiry: "2025-12-31",
    active: true,
    description: "Get 20% off on orders above $30",
    max_discount: 15,
    usage_limit: 1000,
    used_count: 245,
  },
  {
    id: "COUP_002",
    code: "FLAT10",
    discount: 10,
    type: "fixed",
    min_order: 20,
    expiry: "2025-12-31",
    active: true,
    description: "Flat $10 off on orders above $20",
    usage_limit: 500,
    used_count: 156,
  },
  {
    id: "COUP_003",
    code: "FIRST50",
    discount: 50,
    type: "percentage",
    min_order: 25,
    expiry: "2025-12-31",
    active: true,
    new_users_only: true,
    description: "First order special - 50% off!",
    max_discount: 25,
    usage_limit: 5000,
    used_count: 1234,
  },
  {
    id: "COUP_004",
    code: "WEEKEND15",
    discount: 15,
    type: "percentage",
    min_order: 35,
    expiry: "2025-12-31",
    active: true,
    description: "Weekend special - 15% off",
    max_discount: 20,
    usage_limit: 2000,
    used_count: 567,
  },
  {
    id: "COUP_005",
    code: "LUNCH5",
    discount: 5,
    type: "fixed",
    min_order: 15,
    expiry: "2025-12-31",
    active: true,
    description: "Lunch deal - $5 off on orders above $15",
    usage_limit: 3000,
    used_count: 890,
  },
  {
    id: "COUP_006",
    code: "FREESHIP",
    discount: 0,
    type: "free_delivery",
    min_order: 25,
    expiry: "2025-12-31",
    active: true,
    description: "Free delivery on orders above $25",
    usage_limit: 10000,
    used_count: 3456,
  },
];

// ==================== RESTAURANT ANALYTICS (For Owner Dashboard) ====================
const mockRestaurantAnalytics = {
  "1": {
    restaurant_id: "1",
    total_orders: 234,
    total_revenue: 5678.9,
    avg_order_value: 24.27,
    active_menu_items: 12,
    total_reviews: 45,
    avg_rating: 4.6,
    orders_today: 12,
    revenue_today: 289.5,
    orders_this_week: 56,
    revenue_this_week: 1356.8,
    orders_this_month: 234,
    revenue_this_month: 5678.9,
    top_items: [
      { item_id: "1", name: "Margherita Pizza", orders: 89, revenue: 1156.11 },
      { item_id: "2", name: "Pepperoni Pizza", orders: 76, revenue: 1139.24 },
      { item_id: "3", name: "Veggie Supreme", orders: 45, revenue: 674.55 },
    ],
    peak_hours: [
      { hour: "12:00", orders: 25 },
      { hour: "13:00", orders: 32 },
      { hour: "18:00", orders: 28 },
      { hour: "19:00", orders: 35 },
    ],
  },
  "2": {
    restaurant_id: "2",
    total_orders: 189,
    total_revenue: 4234.5,
    avg_order_value: 22.4,
    active_menu_items: 10,
    total_reviews: 38,
    avg_rating: 4.5,
    orders_today: 8,
    revenue_today: 178.2,
    orders_this_week: 42,
    revenue_this_week: 940.8,
    orders_this_month: 189,
    revenue_this_month: 4234.5,
    top_items: [
      { item_id: "5", name: "Classic Burger", orders: 72, revenue: 719.28 },
      { item_id: "6", name: "Cheese Burger", orders: 65, revenue: 779.35 },
      { item_id: "7", name: "Bacon Burger", orders: 42, revenue: 545.58 },
    ],
    peak_hours: [
      { hour: "12:00", orders: 18 },
      { hour: "13:00", orders: 24 },
      { hour: "18:00", orders: 22 },
      { hour: "19:00", orders: 29 },
    ],
  },
  "3": {
    restaurant_id: "3",
    total_orders: 156,
    total_revenue: 3890.25,
    avg_order_value: 24.94,
    active_menu_items: 15,
    total_reviews: 42,
    avg_rating: 4.7,
    orders_today: 10,
    revenue_today: 249.4,
    orders_this_week: 38,
    revenue_this_week: 947.72,
    orders_this_month: 156,
    revenue_this_month: 3890.25,
    top_items: [
      { item_id: "9", name: "California Roll", orders: 58, revenue: 521.42 },
      { item_id: "10", name: "Spicy Tuna Roll", orders: 52, revenue: 519.48 },
      { item_id: "11", name: "Salmon Nigiri", orders: 34, revenue: 374.66 },
    ],
    peak_hours: [
      { hour: "12:00", orders: 15 },
      { hour: "13:00", orders: 20 },
      { hour: "18:00", orders: 25 },
      { hour: "19:00", orders: 30 },
    ],
  },
};

// ==================== USER PREFERENCES ====================
const mockUserPreferences = [
  {
    user_id: "user_001",
    cuisine_preferences: ["Italian", "Japanese", "Mexican"],
    dietary_restrictions: [],
    favorite_restaurants: ["1", "3", "6", "9"],
    default_address_id: "ADDR_001",
    default_payment_id: "PAY_001",
    notifications_enabled: true,
    email_notifications: true,
    sms_notifications: false,
    push_notifications: true,
    order_updates: true,
    promotional_offers: true,
    theme: "light",
    language: "en",
  },
  {
    user_id: "user_002",
    cuisine_preferences: ["American", "BBQ", "Thai"],
    dietary_restrictions: [],
    favorite_restaurants: ["2", "7", "8", "10"],
    default_address_id: "ADDR_003",
    default_payment_id: "PAY_003",
    notifications_enabled: true,
    email_notifications: true,
    sms_notifications: true,
    push_notifications: true,
    order_updates: true,
    promotional_offers: false,
    theme: "light",
    language: "en",
  },
  {
    user_id: "user_003",
    cuisine_preferences: ["Japanese", "Thai", "Chinese"],
    dietary_restrictions: ["vegetarian"],
    favorite_restaurants: ["3", "8", "9", "1"],
    default_address_id: "ADDR_004",
    default_payment_id: "PAY_004",
    notifications_enabled: true,
    email_notifications: false,
    sms_notifications: false,
    push_notifications: true,
    order_updates: true,
    promotional_offers: true,
    theme: "dark",
    language: "en",
  },
];

// Parse CSV helper - handles quoted fields properly
export const parseCSV = (csv: string): any[] => {
  const lines = csv.trim().split("\n");
  if (lines.length < 2) return [];

  // Parse CSV line considering quoted fields
  const parseLine = (line: string): string[] => {
    const result: string[] = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        result.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    return result;
  };

  const headers = parseLine(lines[0]);
  const data = lines.slice(1).map((line) => {
    const values = parseLine(line);
    const obj: any = {};
    headers.forEach((header, index) => {
      obj[header.trim()] = values[index]?.trim() || "";
    });
    return obj;
  });

  return data;
};

// Fetch CSV helper
export const fetchCSV = async (filename: string): Promise<any[]> => {
  try {
    const response = await fetch(`/data/${filename}`);
    const text = await response.text();
    return parseCSV(text);
  } catch (error) {
    console.error(`Error fetching ${filename}:`, error);
    return [];
  }
};

// Mock API
export const mockAPI = {
  // ==================== RESTAURANTS ====================
  async getRestaurants(filters?: {
    city?: string;
    cuisine?: string;
    search?: string;
  }) {
    let restaurants = await fetchCSV("restaurants.csv");

    // Apply filters
    if (filters?.city) {
      restaurants = restaurants.filter(
        (r: any) => r.city.toLowerCase() === filters.city!.toLowerCase()
      );
    }

    if (filters?.cuisine) {
      restaurants = restaurants.filter(
        (r: any) => r.cuisine.toLowerCase() === filters.cuisine!.toLowerCase()
      );
    }

    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      restaurants = restaurants.filter(
        (r: any) =>
          r.name.toLowerCase().includes(searchLower) ||
          r.cuisine.toLowerCase().includes(searchLower) ||
          r.city.toLowerCase().includes(searchLower)
      );
    }

    return restaurants;
  },

  async getRestaurant(id: string) {
    const restaurants = await fetchCSV("restaurants.csv");
    return restaurants.find((r: any) => r.id === id);
  },

  // ==================== MENU ITEMS ====================
  async getMenuItems(restaurantId: string) {
    const allItems = await fetchCSV("menu.csv");
    return allItems.filter((item: any) => item.restaurant_id === restaurantId);
  },

  async getAllMenuItems() {
    return await fetchCSV("menu.csv");
  },

  async getMenuItem(id: string) {
    const allItems = await fetchCSV("menu.csv");
    return allItems.find((item: any) => item.id === id);
  },

  // ==================== AUTH ====================
  async login(email: string, password: string) {
    // Try CSV users first
    const users = await fetchCSV("users.csv");
    let user = users.find(
      (u: any) => u.email === email && u.password === password
    );

    // Fallback to mockUsers if not found in CSV
    if (!user) {
      user = mockUsers.find(
        (u) => u.email === email && u.password === password
      );
    }

    if (user) {
      // Convert numeric fields from CSV strings
      const processedUser = {
        ...user,
        wallet_balance: parseFloat(user.wallet_balance || 0),
        loyalty_points: parseInt(user.loyalty_points || 0),
        is_active: user.is_active === "true" || user.is_active === true,
      };

      const { password: _, ...userWithoutPassword } = processedUser;
      return {
        access_token: "mock_token_" + user.id,
        refresh_token: "mock_refresh_" + user.id,
        user: userWithoutPassword,
      };
    }
    throw new Error("Invalid credentials");
  },

  async getCurrentUser(token: string) {
    // Extract user ID from token (format: mock_token_user_001)
    const userId = token.replace("mock_token_", "");

    // Try CSV users first
    const users = await fetchCSV("users.csv");
    let user = users.find((u: any) => u.id === userId);

    // Fallback to mockUsers
    if (!user) {
      user = mockUsers.find((u) => u.id === userId);
    }

    if (user) {
      // Convert numeric fields from CSV strings
      const processedUser = {
        ...user,
        wallet_balance: parseFloat(user.wallet_balance || 0),
        loyalty_points: parseInt(user.loyalty_points || 0),
        is_active: user.is_active === "true" || user.is_active === true,
      };

      const { password: _, ...userWithoutPassword } = processedUser;
      return userWithoutPassword;
    }

    throw new Error("User not found");
  },

  async register(data: any) {
    const existingUser = mockUsers.find((u) => u.email === data.email);
    if (existingUser) {
      throw new Error("Email already exists");
    }
    const newUser = {
      id: "user_" + Date.now(),
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone || "",
      role: "customer",
      profile_image: `https://i.pravatar.cc/150?img=${Math.floor(
        Math.random() * 70
      )}`,
      is_active: true,
      wallet_balance: 0,
      loyalty_points: 0,
      created_at: new Date().toISOString(),
      last_login: new Date().toISOString(),
    };
    mockUsers.push(newUser);
    const { password, ...userWithoutPassword } = newUser;
    return {
      access_token: "mock_token_" + newUser.id,
      refresh_token: "mock_refresh_" + newUser.id,
      user: userWithoutPassword,
    };
  },

  async getProfile(userId: string) {
    const user = mockUsers.find((u) => u.id === userId);
    if (user) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    throw new Error("User not found");
  },

  async updateProfile(userId: string, data: any) {
    const userIndex = mockUsers.findIndex((u) => u.id === userId);
    if (userIndex !== -1) {
      mockUsers[userIndex] = { ...mockUsers[userIndex], ...data };
      const { password, ...userWithoutPassword } = mockUsers[userIndex];
      return userWithoutPassword;
    }
    throw new Error("User not found");
  },

  // ==================== ORDERS ====================
  async createOrder(orderData: any) {
    const newOrder = {
      id:
        "ORD-" +
        new Date().getFullYear() +
        "-" +
        (mockOrders.length + 1).toString().padStart(3, "0"),
      ...orderData,
      status: "pending",
      payment_status: "paid",
      created_at: new Date().toISOString(),
      confirmed_at: null,
      preparing_at: null,
      picked_up_at: null,
      delivered_at: null,
    };
    mockOrders.push(newOrder);
    return newOrder;
  },

  async getUserOrders(userId: string) {
    return mockOrders
      .filter((order) => order.user_id === userId)
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
  },

  async getOrder(orderId: string) {
    return mockOrders.find((order) => order.id === orderId);
  },

  async updateOrderStatus(orderId: string, status: string) {
    const orderIndex = mockOrders.findIndex((o) => o.id === orderId);
    if (orderIndex !== -1) {
      mockOrders[orderIndex].status = status;
      const now = new Date().toISOString();
      if (status === "confirmed") mockOrders[orderIndex].confirmed_at = now;
      if (status === "preparing") mockOrders[orderIndex].preparing_at = now;
      if (status === "on_the_way") mockOrders[orderIndex].picked_up_at = now;
      if (status === "delivered") mockOrders[orderIndex].delivered_at = now;
      if (status === "cancelled") mockOrders[orderIndex].cancelled_at = now;
      return mockOrders[orderIndex];
    }
    throw new Error("Order not found");
  },

  async cancelOrder(orderId: string, reason: string, cancelledBy: string) {
    const orderIndex = mockOrders.findIndex((o) => o.id === orderId);
    if (orderIndex !== -1) {
      mockOrders[orderIndex].status = "cancelled";
      mockOrders[orderIndex].cancellation_reason = reason;
      mockOrders[orderIndex].cancelled_by = cancelledBy;
      mockOrders[orderIndex].cancelled_at = new Date().toISOString();
      mockOrders[orderIndex].payment_status = "refunded";
      return mockOrders[orderIndex];
    }
    throw new Error("Order not found");
  },

  // ==================== ADDRESSES ====================
  async getUserAddresses(userId: string) {
    return mockAddresses.filter((addr) => addr.user_id === userId);
  },

  async getAddress(addressId: string) {
    return mockAddresses.find((addr) => addr.id === addressId);
  },

  async createAddress(data: any) {
    const newAddress = {
      id: "ADDR_" + Date.now(),
      ...data,
      created_at: new Date().toISOString(),
    };
    mockAddresses.push(newAddress);
    return newAddress;
  },

  async updateAddress(addressId: string, data: any) {
    const index = mockAddresses.findIndex((a) => a.id === addressId);
    if (index !== -1) {
      mockAddresses[index] = { ...mockAddresses[index], ...data };
      return mockAddresses[index];
    }
    throw new Error("Address not found");
  },

  async deleteAddress(addressId: string) {
    const index = mockAddresses.findIndex((a) => a.id === addressId);
    if (index !== -1) {
      mockAddresses.splice(index, 1);
      return { success: true };
    }
    throw new Error("Address not found");
  },

  // ==================== PAYMENT METHODS ====================
  async getPaymentMethods(userId: string) {
    return mockPaymentMethods.filter((pm) => pm.user_id === userId);
  },

  async createPaymentMethod(data: any) {
    const newPaymentMethod = {
      id: "PAY_" + Date.now(),
      ...data,
      created_at: new Date().toISOString(),
    };
    mockPaymentMethods.push(newPaymentMethod);
    return newPaymentMethod;
  },

  async deletePaymentMethod(paymentId: string) {
    const index = mockPaymentMethods.findIndex((p) => p.id === paymentId);
    if (index !== -1) {
      mockPaymentMethods.splice(index, 1);
      return { success: true };
    }
    throw new Error("Payment method not found");
  },

  // ==================== TRANSACTIONS ====================
  async getUserTransactions(userId: string) {
    return mockTransactions
      .filter((txn) => txn.user_id === userId)
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
  },

  async getTransaction(transactionId: string) {
    return mockTransactions.find((txn) => txn.id === transactionId);
  },

  async createTransaction(data: any) {
    const newTransaction = {
      id: "TXN_" + Date.now(),
      ...data,
      status: "success",
      transaction_ref: "TXN_REF_" + Date.now(),
      created_at: new Date().toISOString(),
    };
    mockTransactions.push(newTransaction);
    return newTransaction;
  },

  // ==================== WALLET ====================
  async getWalletBalance(userId: string) {
    const user = mockUsers.find((u) => u.id === userId);
    return {
      balance: user?.wallet_balance || 0,
      loyalty_points: user?.loyalty_points || 0,
    };
  },

  async addWalletBalance(userId: string, amount: number) {
    const userIndex = mockUsers.findIndex((u) => u.id === userId);
    if (userIndex !== -1) {
      mockUsers[userIndex].wallet_balance =
        (mockUsers[userIndex].wallet_balance || 0) + amount;
      return { balance: mockUsers[userIndex].wallet_balance };
    }
    throw new Error("User not found");
  },

  async deductWalletBalance(userId: string, amount: number) {
    const userIndex = mockUsers.findIndex((u) => u.id === userId);
    if (userIndex !== -1) {
      if ((mockUsers[userIndex].wallet_balance || 0) < amount) {
        throw new Error("Insufficient balance");
      }
      mockUsers[userIndex].wallet_balance =
        (mockUsers[userIndex].wallet_balance || 0) - amount;
      return { balance: mockUsers[userIndex].wallet_balance };
    }
    throw new Error("User not found");
  },

  // ==================== NOTIFICATIONS ====================
  async getUserNotifications(userId: string) {
    return mockNotifications
      .filter((n) => n.user_id === userId)
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
  },

  async markNotificationRead(notificationId: string) {
    const index = mockNotifications.findIndex((n) => n.id === notificationId);
    if (index !== -1) {
      mockNotifications[index].is_read = true;
      return mockNotifications[index];
    }
    throw new Error("Notification not found");
  },

  async markAllNotificationsRead(userId: string) {
    mockNotifications.forEach((n) => {
      if (n.user_id === userId) {
        n.is_read = true;
      }
    });
    return { success: true };
  },

  async createNotification(data: any) {
    const newNotification = {
      id: "NOTIF_" + Date.now(),
      ...data,
      is_read: false,
      created_at: new Date().toISOString(),
    };
    mockNotifications.push(newNotification);
    return newNotification;
  },

  // ==================== SUPPORT TICKETS ====================
  async getUserTickets(userId: string) {
    return mockSupportTickets
      .filter((t) => t.user_id === userId)
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
  },

  async getTicket(ticketId: string) {
    return mockSupportTickets.find((t) => t.id === ticketId);
  },

  async createTicket(data: any) {
    const newTicket = {
      id: "TICKET_" + Date.now(),
      ...data,
      status: "open",
      priority: "medium",
      assigned_to: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      resolved_at: null,
      resolution: null,
    };
    mockSupportTickets.push(newTicket);
    return newTicket;
  },

  // ==================== PROMO BANNERS ====================
  async getActiveBanners() {
    return mockPromoBanners
      .filter((b) => b.is_active)
      .sort((a, b) => a.display_order - b.display_order);
  },

  // ==================== REVIEWS ====================
  async getRestaurantReviews(restaurantId: string) {
    return mockReviews
      .filter((r) => r.restaurant_id === restaurantId)
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
  },

  async createReview(data: any) {
    const newReview = {
      id: "REV_" + Date.now(),
      ...data,
      created_at: new Date().toISOString(),
    };
    mockReviews.push(newReview);
    return newReview;
  },

  async getUserReviews(userId: string) {
    return mockReviews.filter((r) => r.user_id === userId);
  },

  // ==================== FAVORITES ====================
  async getUserFavorites(userId: string) {
    return mockFavorites[userId] || [];
  },

  async addFavorite(userId: string, restaurantId: string) {
    if (!mockFavorites[userId]) {
      mockFavorites[userId] = [];
    }
    if (!mockFavorites[userId].includes(restaurantId)) {
      mockFavorites[userId].push(restaurantId);
    }
    return mockFavorites[userId];
  },

  async removeFavorite(userId: string, restaurantId: string) {
    if (mockFavorites[userId]) {
      mockFavorites[userId] = mockFavorites[userId].filter(
        (id) => id !== restaurantId
      );
    }
    return mockFavorites[userId] || [];
  },

  // ==================== COUPONS ====================
  async getActiveCoupons() {
    return mockCoupons.filter((c) => c.active);
  },

  async validateCoupon(code: string, userId: string, orderAmount: number) {
    const coupon = mockCoupons.find((c) => c.code === code && c.active);
    if (!coupon) {
      throw new Error("Invalid coupon code");
    }
    if (orderAmount < coupon.min_order) {
      throw new Error(`Minimum order amount is $${coupon.min_order}`);
    }
    if (coupon.new_users_only) {
      const userOrders = mockOrders.filter((o) => o.user_id === userId);
      if (userOrders.length > 0) {
        throw new Error("This coupon is only valid for new users");
      }
    }
    let discount = 0;
    if (coupon.type === "percentage") {
      discount = (orderAmount * coupon.discount) / 100;
      if (coupon.max_discount && discount > coupon.max_discount) {
        discount = coupon.max_discount;
      }
    } else if (coupon.type === "fixed") {
      discount = coupon.discount;
    }
    return {
      valid: true,
      coupon: coupon,
      discount: discount,
    };
  },

  // ==================== USER PREFERENCES ====================
  async getUserPreferences(userId: string) {
    return (
      mockUserPreferences.find((p) => p.user_id === userId) || {
        user_id: userId,
        cuisine_preferences: [],
        dietary_restrictions: [],
        favorite_restaurants: [],
        notifications_enabled: true,
        email_notifications: true,
        sms_notifications: false,
        push_notifications: true,
        order_updates: true,
        promotional_offers: true,
        theme: "light",
        language: "en",
      }
    );
  },

  async updateUserPreferences(userId: string, data: any) {
    const index = mockUserPreferences.findIndex((p) => p.user_id === userId);
    if (index !== -1) {
      mockUserPreferences[index] = { ...mockUserPreferences[index], ...data };
      return mockUserPreferences[index];
    } else {
      const newPreferences = { user_id: userId, ...data };
      mockUserPreferences.push(newPreferences);
      return newPreferences;
    }
  },

  // ==================== ADMIN - USERS ====================
  async getAdminUsers() {
    return mockUsers.map(({ password, ...user }) => user);
  },

  async getAdminUser(userId: string) {
    const user = mockUsers.find((u) => u.id === userId);
    if (user) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    throw new Error("User not found");
  },

  async updateUserStatus(userId: string, isActive: boolean) {
    const userIndex = mockUsers.findIndex((u) => u.id === userId);
    if (userIndex !== -1) {
      mockUsers[userIndex].is_active = isActive;
      const { password, ...userWithoutPassword } = mockUsers[userIndex];
      return userWithoutPassword;
    }
    throw new Error("User not found");
  },

  // ==================== ADMIN - RESTAURANTS ====================
  async getAdminRestaurants() {
    return await fetchCSV("restaurants.csv");
  },

  async updateRestaurantStatus(restaurantId: string, isActive: boolean) {
    // In real app, this would update the database
    return { id: restaurantId, is_active: isActive };
  },

  // ==================== ADMIN - ORDERS ====================
  async getAllOrders() {
    return mockOrders.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  },

  async getAdminOrderStats() {
    const total = mockOrders.length;
    const pending = mockOrders.filter((o) => o.status === "pending").length;
    const preparing = mockOrders.filter((o) => o.status === "preparing").length;
    const onTheWay = mockOrders.filter((o) => o.status === "on_the_way").length;
    const delivered = mockOrders.filter((o) => o.status === "delivered").length;
    const cancelled = mockOrders.filter((o) => o.status === "cancelled").length;
    const totalRevenue = mockOrders
      .filter((o) => o.status === "delivered")
      .reduce((sum, o) => sum + o.total_amount, 0);

    return {
      total,
      pending,
      preparing,
      on_the_way: onTheWay,
      delivered,
      cancelled,
      total_revenue: totalRevenue,
    };
  },

  // ==================== OWNER - DASHBOARD ====================
  async getOwnerStats(restaurantId: string) {
    // Get orders for this restaurant
    const restaurantOrders = mockOrders.filter(
      (o) => o.restaurant_id === restaurantId
    );

    // Get menu items for this restaurant
    const menuItems = await fetchCSV("menu.csv");
    const restaurantMenuItems = menuItems.filter(
      (item: any) => item.restaurant_id === restaurantId
    );

    // Calculate stats
    const totalOrders = restaurantOrders.length;
    const pendingOrders = restaurantOrders.filter(
      (o) => o.status === "pending" || o.status === "confirmed"
    ).length;
    const totalRevenue = restaurantOrders
      .filter((o) => o.status === "delivered")
      .reduce((sum, o) => sum + o.total_amount, 0);

    return {
      total_orders: totalOrders,
      pending_orders: pendingOrders,
      total_menu_items: restaurantMenuItems.length,
      total_revenue: totalRevenue,
      restaurant_id: restaurantId,
    };
  },

  async getOwnerRestaurant(restaurantId: string) {
    const restaurants = await fetchCSV("restaurants.csv");
    return restaurants.find((r: any) => r.id === restaurantId);
  },

  async getOwnerOrders(restaurantId: string) {
    return mockOrders
      .filter((o) => o.restaurant_id === restaurantId)
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
  },

  async getOwnerAnalytics(restaurantId: string) {
    return (
      mockRestaurantAnalytics[restaurantId] || {
        restaurant_id: restaurantId,
        total_orders: 0,
        total_revenue: 0,
        avg_order_value: 0,
        active_menu_items: 0,
        total_reviews: 0,
        avg_rating: 0,
        orders_today: 0,
        revenue_today: 0,
        orders_this_week: 0,
        revenue_this_week: 0,
        orders_this_month: 0,
        revenue_this_month: 0,
        top_items: [],
        peak_hours: [],
      }
    );
  },

  async updateOwnerRestaurant(restaurantId: string, data: any) {
    // In real app, this would update the database
    return { id: restaurantId, ...data };
  },

  async updateMenuItem(itemId: string, data: any) {
    // In real app, this would update the database
    return { id: itemId, ...data };
  },

  async createMenuItem(data: any) {
    const newItem = {
      id: Date.now().toString(),
      ...data,
      created_at: new Date().toISOString(),
    };
    // In real app, this would save to database
    return newItem;
  },

  async deleteMenuItem(itemId: string) {
    // In real app, this would delete from database
    return { success: true };
  },
};

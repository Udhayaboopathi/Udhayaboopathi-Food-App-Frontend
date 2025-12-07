/**
 * Mock Data System
 * Provides fallback data when backend is unavailable
 */

// Mock Users
const mockUsers = [
  {
    id: "6934fa832cede7fa195e10fe",
    email: "user1@example.com",
    name: "John Doe",
    role: "customer",
  },
  {
    id: "6934fa842cede7fa195e10ff",
    email: "user2@example.com",
    name: "Jane Smith",
    role: "customer",
  },
  {
    id: "6934fa842cede7fa195e1100",
    email: "admin@example.com",
    name: "Admin User",
    role: "admin",
  },
];

// Mock Orders
const mockOrders = [
  {
    id: "order1",
    user_id: "6934fa832cede7fa195e10fe",
    restaurant_id: "1",
    items: [{ id: "1", name: "Margherita Pizza", price: 12.99, quantity: 2 }],
    total_amount: 25.98,
    status: "delivered",
    delivery_address: "123 Main St",
    created_at: new Date().toISOString(),
  },
  {
    id: "order2",
    user_id: "6934fa842cede7fa195e10ff",
    restaurant_id: "2",
    items: [{ id: "5", name: "Classic Burger", price: 9.99, quantity: 1 }],
    total_amount: 9.99,
    status: "pending",
    delivery_address: "456 Oak Ave",
    created_at: new Date().toISOString(),
  },
];

// Parse CSV helper
export const parseCSV = (csv: string): any[] => {
  const lines = csv.trim().split("\n");
  if (lines.length < 2) return [];

  const headers = lines[0].split(",");
  const data = lines.slice(1).map((line) => {
    const values = line.split(",");
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
  // Restaurants
  async getRestaurants() {
    const restaurants = await fetchCSV("restaurants.csv");
    return restaurants;
  },

  // Menu Items
  async getMenuItems(restaurantId: string) {
    const allItems = await fetchCSV("menu.csv");
    return allItems.filter((item: any) => item.restaurant_id === restaurantId);
  },

  async getAllMenuItems() {
    return await fetchCSV("menu.csv");
  },

  // Auth
  async login(email: string, password: string) {
    const user = mockUsers.find((u) => u.email === email);
    if (user) {
      return {
        access_token: "mock_token_" + user.id,
        refresh_token: "mock_refresh_" + user.id,
        user: user,
      };
    }
    throw new Error("Invalid credentials");
  },

  async register(name: string, email: string, password: string) {
    const newUser = {
      id: "user_" + Date.now(),
      name,
      email,
      role: "customer",
    };
    mockUsers.push(newUser);
    return {
      access_token: "mock_token_" + newUser.id,
      refresh_token: "mock_refresh_" + newUser.id,
      user: newUser,
    };
  },

  // Orders
  async createOrder(orderData: any) {
    const newOrder = {
      id: "order_" + Date.now(),
      ...orderData,
      status: "pending",
      created_at: new Date().toISOString(),
    };
    mockOrders.push(newOrder);
    return newOrder;
  },

  async getUserOrders(userId: string) {
    return mockOrders.filter((order) => order.user_id === userId);
  },

  // Admin - Users
  async getAdminUsers() {
    return mockUsers;
  },

  // Admin - Restaurants
  async getAdminRestaurants() {
    return await fetchCSV("restaurants.csv");
  },

  // Admin - Orders (all orders)
  async getAllOrders() {
    return mockOrders;
  },
};

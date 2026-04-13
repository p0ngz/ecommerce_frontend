// ==================== AUTH ====================
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'USER' | 'ADMIN';
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// ==================== PRODUCT ====================
export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  imageUrl: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductPayload {
  name: string;
  description?: string;
  price: number;
  stock: number;
  imageUrl?: string;
  isActive?: boolean;
}

export type UpdateProductPayload = Partial<CreateProductPayload>;

// ==================== CART ====================
export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  product: Pick<Product, 'id' | 'name' | 'price' | 'stock' | 'imageUrl'>;
  createdAt: string;
  updatedAt: string;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  createdAt: string;
  updatedAt: string;
}

// ==================== API ====================
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
  search?: string;
}

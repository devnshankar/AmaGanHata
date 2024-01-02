import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';

interface LoginStore {
  showLogin: boolean;
  setShowLogin: (value: boolean) => void;
  themeMode: string;
  setThemeMode: (value: string) => void;
  user: any;
  setUser: (user: any) => void;
  forceRender: number;
  setForceRender: (value: number) => void;
}
const useLoginStore = create<LoginStore>((set) => {
  // const UserCache = FetchUser();
  return {
    showLogin: false,
    setShowLogin: (value) => set({ showLogin: value }),
    themeMode: 'light',
    setThemeMode: (value) => set({ themeMode: value }),
    user: null,
    setUser: (user) => set({ user }),
    forceRender: 0,
    setForceRender: (value: number) => set({ forceRender: value }),
  };
});

interface FetchedProductStore {
  fetchedProducts: any[];
  setFetchedProducts: (fetchedProducts: any[]) => void;
  addFetchedProducts: (fetchedProduct: any) => void;
}
const useFetchedProductStore = create<FetchedProductStore>((set) => ({
  fetchedProducts: [],
  setFetchedProducts: (fetchedProducts) => set({ fetchedProducts }),
  addFetchedProducts: (fetchedProduct) =>
    set((state: FetchedProductStore) => ({
      fetchedProducts: [...state.fetchedProducts, fetchedProduct],
    })),
}));

interface ProductStore {
  products: any[];
  setProducts: (products: any[]) => void;
  addProduct: (product: any) => void;
}
const useProductStore = create<ProductStore>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  addProduct: (product) =>
    set((state: ProductStore) => ({ products: [...state.products, product] })),
}));

interface OrderStore {
  orders: any[];
  setOrders: (orders: any[]) => void;
  addOrder: (order: any) => void;
}
const useOrderStore = create<OrderStore>((set) => ({
  orders: [],
  setOrders: (orders) => set({ orders }),
  addOrder: (order) => set((state: OrderStore) => ({ orders: [...state.orders, order] })),
}));

interface OrderItemStore {
  orderItems: any[];
  setOrderItems: (orderItems: any[]) => void;
  addOrderItem: (orderItem: any) => void;
}
const useOrderItemStore = create<OrderItemStore>((set) => ({
  orderItems: [],
  setOrderItems: (orderItems) => set({ orderItems }),
  addOrderItem: (orderItem) =>
    set((state: OrderItemStore) => ({ orderItems: [...state.orderItems, orderItem] })),
}));

interface NotificationStore {
  notifications: any[];
  setNotifications: (notifications: any[]) => void;
  addNotification: (orderItem: any) => void;
}
const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  setNotifications: (notifications) => set({ notifications }),
  addNotification: (notification) =>
    set((state: NotificationStore) => ({ notifications: [...state.notifications, notification] })),
}));

export {
  useLoginStore,
  useFetchedProductStore,
  useProductStore,
  useOrderStore,
  useOrderItemStore,
  useNotificationStore,
};

// import { create } from 'zustand';
// import { createJSONStorage, persist } from 'zustand/middleware';
// interface LoginStore {
//   showLogin: boolean;
//   setShowLogin: (value: boolean) => void;
//   themeMode: string;
//   setThemeMode: (value: string) => void;
//   user: any;
//   setUser: (user: any) => void;
//   forceRender: number;
//   setForceRender: (value: number) => void;
// }

// const useLoginStore = create<LoginStore>()(
//   persist(
//     (set) => ({
//       showLogin: true,
//       setShowLogin: (value: any) => set({ showLogin: value }),
//       themeMode: 'light',
//       setThemeMode: (value: any) => set({ themeMode: value }),
//       user: null,
//       setUser: (user: any) => set({ user }),
//       forceRender: 0,
//       setForceRender: (value: number) => set({ forceRender: value }),
//     }),
//     {
//       name: 'login-storage',
//       storage: createJSONStorage(() => sessionStorage),
//     }
//   )
// );

// export { useLoginStore };

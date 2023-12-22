import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

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
interface ProductStore {
  products: any[];
  setProducts: (user: any) => void;
  addProduct: (product: any) => void;
}

// async function FetchUser(){
//   const userData: any = SecureStore.getItemAsync('User');
//   const initialUser = userData ? userData : null;
//   return initialUser
// }

const useLoginStore = create<LoginStore> ( (set) => {
  // const UserCache = FetchUser();
  return {
    showLogin: true,
    setShowLogin: (value) => set({ showLogin: value }),
    themeMode: 'light',
    setThemeMode: (value) => set({ themeMode: value }),
    user: null,
    setUser: (user) => set({ user }),
    forceRender: 0,
    setForceRender: (value: number) => set({ forceRender: value }),
  };
});
const useProductStore = create<ProductStore>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  addProduct: (product) =>
    set((state: ProductStore) => ({ products: [...state.products, product] })),
}));

export { useLoginStore, useProductStore };

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

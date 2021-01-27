import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import { Alert } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
}

interface CartContext {
  products: Product[];
  addToCart(item: Omit<Product, 'quantity'>): void;
  removeFromCart(id: string): void;
  removeAllFromCart(): void;
  increment(id: string): void;
  decrement(id: string): void;
}

const CartContext = createContext<CartContext | null>(null);

const CartProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      // TODO LOAD ITEMS FROM ASYNC STORAGE
      const storagedProducts = await AsyncStorage.getItem(
        '@GoMarketplace:products',
      );

      if (storagedProducts) {
        setProducts(JSON.parse(storagedProducts));
      }
    }

    loadProducts();
  }, []);

  const addToCart = useCallback(
    async product => {
      // TODO ADD A NEW ITEM TO THE CART
      const productExists = products.find(p => p.id === product.id);

      if (productExists) {
        setProducts(
          products.map(p =>
            p.id === product.id ? { ...product, quantity: p.quantity + 1 } : p,
          ),
        );
      } else {
        setProducts([...products, { ...product, quantity: 1 }]);
      }

      await AsyncStorage.setItem(
        '@GoMarketplace:products',
        JSON.stringify(products),
      );
    },
    [products],
  );

  const removeFromCart = useCallback(
    async id => {
      const allProducts = products.filter(product => product.id !== id);

      setProducts(allProducts);

      await AsyncStorage.setItem(
        '@GoMarketplace:products',
        JSON.stringify(allProducts),
      );
    },

    [products],
  );

  const removeAllFromCart = useCallback(async () => {
    setProducts([]);

    await AsyncStorage.removeItem('@GoMarketplace:products');
  }, []);

  const increment = useCallback(
    async id => {
      // TODO INCREMENTS A PRODUCT QUANTITY IN THE CART
      const incrementedProducts = products.map(product =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product,
      );

      setProducts(incrementedProducts);

      await AsyncStorage.setItem(
        '@GoMarketplace:products',
        JSON.stringify(incrementedProducts),
      );
    },
    [products],
  );

  const decrement = useCallback(
    async id => {
      // TODO DECREMENTS A PRODUCT QUANTITY IN THE CART
      const decrementedProducts = products.map(product => {
        if (product.id === id && product.quantity > 1) {
          return { ...product, quantity: product.quantity - 1 };
        }

        if (product.id === id && product.quantity === 1) {
          Alert.alert('Pressione em cima do produto que deseja deletar!');
        }
        return product;
      });

      setProducts(decrementedProducts);

      await AsyncStorage.setItem(
        '@GoMarketplace:products',
        JSON.stringify(decrementedProducts),
      );
    },
    [products],
  );

  const value = React.useMemo(
    () => ({
      addToCart,
      removeFromCart,
      removeAllFromCart,
      increment,
      decrement,
      products,
    }),
    [
      products,
      addToCart,
      removeFromCart,
      removeAllFromCart,
      increment,
      decrement,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

function useCart(): CartContext {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(`useCart must be used within a CartProvider`);
  }

  return context;
}

export { CartProvider, useCart };

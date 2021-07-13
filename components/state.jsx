import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export default function AppWrapper({ children }) {
  const [cart, setCart] = useState([]);
  const values = { cart, setCart };
  return (
    <AppContext.Provider value={values}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
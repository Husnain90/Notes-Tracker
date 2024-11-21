"use client"
import React, { ReactNode, useEffect } from 'react'
import { Provider } from "react-redux";

import { store } from '../lib/store/store';
const AuthProvider = ({ children }: { children: ReactNode}) => {
  return <Provider store={store}>
    {children}
  </Provider>;
};

export default AuthProvider

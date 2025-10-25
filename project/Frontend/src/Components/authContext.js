import { createContext, useEffect, useState } from 'react';

export const authContext = createContext();

export const AuthProvider = ({ children }) => {
  // ساخت یک درست و غلط برای اینکه تشخیص بده کاربر وارد شده یا نه
  const [isLog, setIsLog] = useState(false);

  // ساخت یک درست و غلط برای اینکه تشخیص بده کاربر ادمین یا مشتری
  const [typeUser, setTypeUser] = useState(false);
  useEffect(() => {
    // برای اینکه پاک نشه ریخته میشه توی لوکال مرورگر بعد هر رفرش صفحه
    const token = localStorage.getItem('token');
    const typee = localStorage.getItem('type');
    setIsLog(!!token);
    setTypeUser(typee == 'admin' ? true : false);
  }, []);

  const Log = (token, type) => {
    // گرفتن توکن و نوع کاربر موقع ورود به حساب
    localStorage.setItem('type', type);
    localStorage.setItem('token', token);
    setTypeUser(type === 'admin' ? true : false);
    setIsLog(true);
    window.location.href = '/';
  };

  const Logout = () => {
    // پاک کردن لوکال بعد از خروج
    localStorage.removeItem('type');
    localStorage.removeItem('token');
    setIsLog(false);
    window.location.href = '/';
  };

  return (
    <authContext.Provider value={{ Log, Logout, isLog, typeUser }}>
      {children}
    </authContext.Provider>
  );
};

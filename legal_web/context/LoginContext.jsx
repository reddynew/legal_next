"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [login, setLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const[id,setId]=useState('123')
  const[name,setName]=useState('123')
  // const userid=1234
  // const username='jp'
  useEffect(() => {
    const validateLogin = async () => {
      try {
        const res = await axios.get('https://backend.com.jplawsuvidha.com/', {
          withCredentials: true,
        });
        if (res.status === 200 && res.data?.user) {
    // console.log("Auth Success:", res.data);
    setLogin(true);
    setId(res.data.user.email);
    setName(res.data.user.name);
  } else {
    console.warn("Auth failed - invalid data", res.data);
    setLogin(false);
  }
      } catch (err) {
        console.error("Auth Failed:", err.message);
        setLogin(true);
      } finally {
        setLoading(false);
      }
    };

    validateLogin();
  }, []);
  

  const loginUser = async (email, password) => {
    try {
      setLoading(true);
      const res = await axios.post('http://localhost:3001/api/login', { email, password }, {
        withCredentials: true,
      });

      // console.log("Login Successful:", res.data);
      if (res.data.status === 'success' || res.data.status === 'first_time') {
        setLogin(true);
        localStorage.setItem('atoken',res.data.token)
        // Update user state based on the login response
        setId(res.data.data.email);
        // console.log('user email is',res.data.data.email)
        setName(res.data.data.name);

        // This ensures the validate call will now succeed
        // You can make a second call to validate here if needed, or simply trust the login response.
      }
      return res.data;
    } catch (err) {
      console.error("Login Failed:", err.response?.data?.message || err.message);
      setLogin(false);
      return err.response?.data;
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    try {
      // You'll need a backend logout endpoint that clears the cookie
      await axios.post('http://localhost:3000/api/logout', {}, { withCredentials: true });
      setLogin(false);
      setId('');
      setName('');
    } catch (err) {
      console.error("Logout Failed:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ login, loginUser, logoutUser, loading, id, name, setId, setName }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => 
{
  const context=useContext(AuthContext);
  if(!context)
  {
    // console.log('use context inside the provider')
  }
  return context
}
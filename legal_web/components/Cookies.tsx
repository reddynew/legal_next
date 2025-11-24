"use client"
import { useState, useEffect } from 'react';

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  // Helper to set cookie with expiration days
  const setCookie = (name, value, days) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
  };

  // Helper to get cookie by name
  const getCookie = (name) => {
    return document.cookie.split('; ').reduce((res, c) => {
      const [key, val] = c.split('=');
      return key === name ? decodeURIComponent(val) : res;
    }, '');
  };

  useEffect(() => {
    if (!getCookie('cookieConsent')) {
      setVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    setCookie('cookieConsent', 'accepted', 365);
    setVisible(false);
    // You can add code here to enable cookies or tracking scripts
  };

  const rejectCookies = () => {
    setCookie('cookieConsent', 'rejected', 365);
    setVisible(false);
    // Implement disabling of non-essential cookies here
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner">
      <p>
        This website uses cookies to ensure you get the best experience.{' '}
        <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
          Learn more
        </a>
        .
      </p>
      <div className="cookie-buttons">
        <button className="btn accept-btn" onClick={acceptCookies}>
          Accept
        </button>
        <button className="btn reject-btn" onClick={rejectCookies}>
          Reject
        </button>
      </div>
      <style jsx>{`
        .cookie-banner {
          position: fixed;
          bottom: 0;
          width:100%;
          background: #2c3e50;
          color: white;
          text-align: center;
          padding: 15px;
          font-family: Arial, sans-serif;
          box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.2);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          margin-left:0px
        }
        .cookie-banner p {
          margin: 0 15px 0 0;
          font-size: 14px;
        }
        .cookie-banner a {
          color: #f39c12;
          text-decoration: underline;
        }
        .cookie-buttons {
          display: flex;
          gap: 10px;
        }
        .btn {
          background: #f39c12;
          border: none;
          color: #fff;
          padding: 8px 14px;
          cursor: pointer;
          border-radius: 4px;
          font-weight: bold;
        }
        .btn.reject-btn {
          background: transparent;
          color: #ecf0f1;
          border: 2px solid #ecf0f1;
        }
        .btn.reject-btn:hover {
          background: #ecf0f1;
          color: #2c3e50;
        }
      `}</style>
    </div>
  );
};

export default CookieConsent;

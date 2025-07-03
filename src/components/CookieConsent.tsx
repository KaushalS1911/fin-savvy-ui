import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import AdSense from "../components/AdSense";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = Cookies.get("cookie_consent");
    if (!consent) setVisible(true);
  }, []);

  const acceptAll = () => {
    Cookies.set("cookie_consent", "accepted", { expires: 365 });
    Cookies.set("analytics_enabled", "true", { expires: 365 });
    // Add any other cookies you want to set here
    setVisible(false);
    // Optionally, initialize analytics or other scripts here
  };

  const rejectAll = () => {
    Cookies.set("cookie_consent", "rejected", { expires: 365 });
    Cookies.remove("analytics_enabled");
    // Remove/disable any other cookies or scripts here
    setVisible(false);
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-6 right-6 max-w-xs w-full bg-white border border-gray-200 rounded-xl shadow-lg p-5 z-50 flex flex-col gap-3"
      style={{ minWidth: 300 }}
    >
      <div className="text-gray-800 text-sm">
        We use cookies to enhance your experience. By clicking "Accept All", you agree to our use of cookies.{" "}
        <a href="/privacy-policy" className="underline text-primary">Learn more</a>
      </div>
      <div className="flex gap-2 justify-end">
        <button
          onClick={rejectAll}
          className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
        >
          Reject All
        </button>
        <button
          onClick={acceptAll}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition"
        >
          Accept All
        </button>
      </div>

    </div>
  );
};

export default CookieConsent; 
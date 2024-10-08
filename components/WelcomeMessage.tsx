
"use client"; 

import React, { useEffect, useState } from "react";

const WelcomeMessage = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000); 

    return () => clearTimeout(timer); 
  }, []);

  return (
    visible && (
      <div className="fixed top-0 left-0 right-0 flex justify-center p-4 bg-green-500 text-white">
        Bienvenido a tu dashboard!
      </div>
    )
  );
};

export default WelcomeMessage;

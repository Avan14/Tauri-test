import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/SideBar";
import SalesManagement from "./components/SalesManagement";

const App = () => {
  const [currentFocus, setCurrentFocus] = useState(0);

  useEffect(() => {
    const start = document.getElementById("initialbox");
    if (start) start.focus();
  }, []);
  useEffect(() => {
    const focusableElements = document.querySelectorAll(
      "input, button, textarea"
    );
    if (focusableElements[currentFocus]) {
      focusableElements[currentFocus].focus();
    }
  }, [currentFocus]);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <SalesManagement currentFocus={setCurrentFocus} />
        </main>
      </div>
    </div>
  );
};

export default App;

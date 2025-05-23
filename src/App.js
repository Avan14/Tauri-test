import React, { useState, useEffect } from "react";
import Comp from "./comp";

const App = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [currentFocus, setCurrentFocus] = useState(0);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight" || e.key === "Tab") {
      setCurrentFocus((prev) => (prev + 1) % 20);
    } else if (e.key === "ArrowLeft") {
      setCurrentFocus((prev) => (prev - 1 + 20) % 20);
    } else if (e.key === "Enter") {
      document.activeElement.click();
    }
  };

  useEffect(() => {
    const focusableElements = document.querySelectorAll(
      "input, button, textarea"
    );
    if (focusableElements[currentFocus]) {
      focusableElements[currentFocus].focus();
    }
  }, [currentFocus]);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleShipToClick = () => {
    console.log("Ship To button clicked");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div onKeyDown={handleKeyDown} tabIndex={0}>
      <div className="border-b">
        <button
          className="w-full p-2 bg-emerald-600 text-white"
          onClick={handleToggle}
          tabIndex={0}
        >
          Throw That Mouse
        </button>
        {isExpanded && (
          <form onSubmit={handleSubmit} className="p-4 grid gap-4 bg-white">
            <input placeholder="Customer Name" tabIndex={0} />
            <textarea placeholder="Address" rows={2} tabIndex={0} />
            <input placeholder="GSTIN" tabIndex={0} />
            <input placeholder="Phone Number" tabIndex={0} />
            <button onClick={handleShipToClick} tabIndex={0}>
              Ship To
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white"
              tabIndex={0}
            >
              Submit
            </button>
          </form>
        )}
      </div>
      <Comp />
    </div>
  );
};

export default App;

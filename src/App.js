import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/SideBar";
import SalesManagement from "./components/SalesManagement";

const App = () => {
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


  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <SalesManagement />
        </main>
      </div>
    </div>
  );

  // return (
  //   <div onKeyDown={handleKeyDown} tabIndex={0}>
  //     <div className="border-b">
  //       <button
  //         className="w-full p-2 bg-emerald-600 text-white"
  //         onClick={handleToggle}
  //         tabIndex={0}
  //       >
  //         Throw That Mouse
  //       </button>
  //       {isExpanded && (
  //         <form onSubmit={handleSubmit} className="p-4 grid gap-4 bg-white">
  //           <input placeholder="Customer Name" tabIndex={0} />
  //           <textarea placeholder="Address" rows={2} tabIndex={0} />
  //           <input placeholder="GSTIN" tabIndex={0} />
  //           <input placeholder="Phone Number" tabIndex={0} />
  //           <button onClick={handleShipToClick} tabIndex={0}>
  //             Ship To
  //           </button>
  //           <button
  //             type="submit"
  //             className="bg-blue-600 text-white"
  //             tabIndex={0}
  //           >
  //             Submit
  //           </button>
  //         </form>
  //       )}
  //     </div>
  //     <Comp />
  //   </div>
  // );
};

export default App;

import React, { useState, useRef, useEffect } from "react";
import { Printer, Share2, Trash2 } from "lucide-react";
import Fuse from "fuse.js";
import medicines from "../constants/medicines_random.json";

// Initialize Fuse.js
const fuse = new Fuse(medicines, {
  keys: ["productName"],
  threshold: 0.3,
});

function search(q) {
  return q ? fuse.search(q).map((r) => r.item) : [];
}

const SalesTable = ({ setCurrentFocus }) => {
  const [sales, setSales] = useState([
    {
      id: "1",
      itemName: "",
      pack: "",
      batch: "",
      expiry: "",
      quantityBulk: 0,
      quantityLoose: 0,
      mrp: 0,
      discount: 0,
      sellingRate: 0,
      gst: 0,
      amount: 0,
      payMode: "",
    },
  ]);
  const [suggestions, setSuggestions] = useState({});
  const [focusedSuggestions, setFocusedSuggestions] = useState({});
  const [focusedRowId, setFocusedRowId] = useState(sales[0].id); // Track focused row

  const containerRef = useRef(null);
  const inputRefs = useRef({});
  const globalKeyHandler = useRef(null);

  // Focus first input on mount or when sales change
  useEffect(() => {
    const firstId = sales[0]?.id;
    setFocusedRowId(firstId);
    const firstInput = inputRefs.current[firstId];
    if (firstInput) firstInput.focus();
  }, [sales.length]);

  // Global keyboard shortcuts (Ctrl+Q, Alt+Q, ArrowUp, ArrowDown)
  useEffect(() => {
    globalKeyHandler.current = (e) => {
      const activeElement = document.activeElement;
      const isInputFocused = activeElement.tagName === "INPUT";
      const currentSaleId = focusedRowId;
      const currentSuggestions = suggestions[currentSaleId]?.length || 0;

      if (e.ctrlKey && e.key.toLowerCase() === "q") {
        e.preventDefault();
        addSale();
        console.log("Ctrl+Q pressed: add sale");
      } else if (e.altKey && e.key.toLowerCase() === "q") {
        e.preventDefault();
        console.log("Alt+Q: remove last sale");
        setSales((prev) => {
          if (prev.length > 1) {
            const removedId = prev[prev.length - 1].id;
            setSuggestions((s) => {
              const nxt = { ...s };
              delete nxt[removedId];
              return nxt;
            });
            setFocusedSuggestions((f) => {
              const nxt = { ...f };
              delete nxt[removedId];
              return nxt;
            });
            return prev.slice(0, -1);
          }
          return prev;
        });
      } else if (
        isInputFocused &&
        currentSuggestions === 0 && // Only navigate rows if no suggestions
        (e.key === "ArrowUp" || e.key === "ArrowDown")
      ) {
        e.preventDefault();
        const currentIndex = sales.findIndex(
          (sale) => sale.id === currentSaleId
        );
        let newIndex = currentIndex;

        if (e.key === "ArrowUp" && currentIndex > 0) {
          newIndex = currentIndex - 1;
        } else if (e.key === "ArrowDown" && currentIndex < sales.length - 1) {
          newIndex = currentIndex + 1;
        }

        const newSaleId = sales[newIndex].id;
        setFocusedRowId(newSaleId);
        const newInput = inputRefs.current[newSaleId];
        if (newInput) newInput.focus();
      }
    };
    document.addEventListener("keydown", globalKeyHandler.current);
    return () =>
      document.removeEventListener("keydown", globalKeyHandler.current);
  }, [sales, focusedRowId, suggestions]);

  const handleKeyDown = (e, saleId) => {
    const list = suggestions[saleId] || [];
    let idx = focusedSuggestions[saleId] ?? -1;
    if (!list.length) return;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        idx = idx < list.length - 1 ? idx + 1 : 0;
        break;
      case "ArrowUp":
        e.preventDefault();
        idx = idx > 0 ? idx - 1 : list.length - 1;
        break;
      case "Enter":
        if (idx >= 0) {
          e.preventDefault();
          updateSale(saleId, "itemName", list[idx].productName);
          setSuggestions((s) => ({ ...s, [saleId]: [] }));
          idx = -1;
        }
        break;
      case "Escape":
        setSuggestions((s) => ({ ...s, [saleId]: [] }));
        idx = -1;
        break;
    }
    setFocusedSuggestions((f) => ({ ...f, [saleId]: idx }));
  };

  const addSale = () => {
    const id = Date.now().toString();
    setSales((prev) => [
      ...prev,
      {
        id,
        itemName: "",
        pack: "",
        batch: "",
        expiry: "",
        quantityBulk: 0,
        quantityLoose: 0,
        mrp: 0,
        discount: 0,
        sellingRate: 0,
        gst: 0,
        amount: 0,
        payMode: "",
      },
    ]);
  };

  const updateSale = (id, field, value) => {
    setSales((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
    if (field === "itemName") {
      const matches = search(value).slice(0, 5);
      setSuggestions((s) => ({ ...s, [id]: matches }));
      setFocusedSuggestions((f) => ({ ...f, [id]: matches.length ? 0 : -1 }));
    }
  };

  // Close suggestions on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setSuggestions({});
        setFocusedSuggestions({});
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // Register refs on each item-name input
  const setInputRef = (id, el) => {
    if (el) inputRefs.current[id] = el;
  };

  return (
    <div ref={containerRef} className="flex flex-col h-full">
      <div className="overflow-x-auto min-h-52">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-white border-b">
              {[
                "S.No.",
                "Item Name",
                "Pack",
                "Batch",
                "Expiry",
                "Quantity",
                "MRP",
                "Disc%",
                "S.Rate",
                "GST%",
                "Amount",
                "Pay Mode",
                "",
              ].map((h, i) => (
                <th
                  key={i}
                  className="py-3 px-3 text-left text-sm font-medium text-gray-700"
                >
                  {h}
                  {h === "Quantity" && (
                    <div className="text-xs text-gray-500">Bulk | Loose</div>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sales.map((sale, idx) => (
              <tr key={sale.id} className="border-b relative">
                <td className="py-3 px-1 text-sm">{idx + 1}</td>
                <td className="py-2 px-1 text-sm">
                  <div className="relative">
                    <input
                      value={sale.itemName}
                      onChange={(e) =>
                        updateSale(sale.id, "itemName", e.target.value)
                      }
                      onKeyDown={(e) => handleKeyDown(e, sale.id)}
                      onFocus={() => setFocusedRowId(sale.id)} // Update focused row on input focus
                      ref={(el) => setInputRef(sale.id, el)}
                      className="w-24 text-xs border border-gray-300 rounded p-1"
                      placeholder="Search..."
                    />
                    {suggestions[sale.id]?.length > 0 && (
                      <ul className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded max-h-40 overflow-auto text-xs shadow-md">
                        {suggestions[sale.id].map((med, i) => (
                          <li
                            key={i}
                            onClick={() =>
                              updateSale(sale.id, "itemName", med.productName)
                            }
                            className={`px-2 py-1 cursor-pointer ${
                              focusedSuggestions[sale.id] === i
                                ? "bg-blue-100 text-blue-800"
                                : "hover:bg-gray-100"
                            }`}
                          >
                            {med.productName}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </td>
                {["pack", "batch"].map((f) => (
                  <td key={f} className="py-3 px-2 text-sm">
                    <input
                      type="text"
                      value={sale[f]}
                      onChange={(e) => updateSale(sale.id, f, e.target.value)}
                      onFocus={() => setFocusedRowId(sale.id)} // Update focused row
                      className="w-full text-xs p-1 border border-gray-300 rounded"
                    />
                  </td>
                ))}
                <td className="py-3 px-3 text-sm">
                  <input
                    type="date"
                    value={sale.expiry}
                    onChange={(e) =>
                      updateSale(sale.id, "expiry", e.target.value)
                    }
                    onFocus={() => setFocusedRowId(sale.id)} // Update focused row
                    className="w-full text-xs p-1 border border-gray-300 rounded"
                  />
                </td>
                <td className="py-3 px-2 text-sm flex gap-1">
                  <input
                    type="number"
                    value={sale.quantityBulk}
                    onChange={(e) =>
                      updateSale(
                        sale.id,
                        "quantityBulk",
                        parseInt(e.target.value) || 0
                      )
                    }
                    onFocus={() => setFocusedRowId(sale.id)} // Update focused row
                    className="w-12 text-xs p-1 border border-gray-300 rounded"
                  />
                  <input
                    type="number"
                    value={sale.quantityLoose}
                    onChange={(e) =>
                      updateSale(
                        sale.id,
                        "quantityLoose",
                        parseInt(e.target.value) || 0
                      )
                    }
                    onFocus={() => setFocusedRowId(sale.id)} // Update focused row
                    className="w-12 text-xs p-1 border border-gray-300 rounded"
                  />
                </td>
                {["mrp", "discount", "sellingRate", "gst"].map((field) => (
                  <td key={field} className="py-3 px-2 text-sm">
                    <input
                      type="number"
                      value={sale[field]}
                      onChange={(e) =>
                        updateSale(
                          sale.id,
                          field,
                          parseFloat(e.target.value) || 0
                        )
                      }
                      onFocus={() => setFocusedRowId(sale.id)} // Update focused row
                      className="w-full text-xs p-1 border border-gray-300 rounded"
                    />
                  </td>
                ))}
                <td className="py-3 px-2 text-sm">{sale.amount.toFixed(2)}</td>
                <td className="py-3 px-2 text-sm">
                  <div className="flex gap-2">
                    {["cash", "upi", "card"].map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        className={`text-xs px-2 py-1 rounded border 
                          ${
                            sale.payMode === mode
                              ? "bg-blue-600 text-white"
                              : "bg-white text-gray-800 border-gray-300"
                          }
                        `}
                        onClick={() => updateSale(sale.id, "payMode", mode)}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </td>
                <td className="py-3 px-1 text-sm">
                  <button
                    onClick={() =>
                      setSales((prev) => prev.filter((s) => s.id !== sale.id))
                    }
                    className="text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={addSale}
          className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 text-xs rounded"
        >
          Add Sale
        </button>
        <div className="flex gap-4">
          <Printer className="w-4 h-4 cursor-pointer" />
          <Share2 className="w-4 h-4 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default SalesTable;

import React, { useState, useRef, useEffect } from "react";
import { Printer, Share2, Trash2 } from "lucide-react";
import Fuse from "fuse.js";
import { useHotkeys } from "react-hotkeys-hook";
import medicines from "../constants/medicines_random.json"; // 5000+ entries
import shortcuts from "./shortcuts";

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
  const [focusedSaleId, setFocusedSaleId] = useState(null); // Track focused row
  const containerRef = useRef(null);
  const inputRefs = useRef({});

  // Handle shortcut actions
  const handleFocusLatestInput = () => {
    const latestSaleId = sales[sales.length - 1].id;
    const latestInput = inputRefs.current[latestSaleId];
    if (latestInput) {
      latestInput.focus();
      setFocusedSaleId(latestSaleId);
      setCurrentFocus?.(latestInput); // Update parent focus if provided
    }
  };

  const handleAddSale = () => {
    const newSale = {
      id: Date.now().toString(),
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
    };
    setSales([...sales, newSale]);
    // Focus the new row's input after adding
    setTimeout(() => {
      const newInput = inputRefs.current[newSale.id];
      if (newInput) {
        newInput.focus();
        setFocusedSaleId(newSale.id);
        setCurrentFocus?.(newInput);
      }
    }, 0);
  };

  const handleDeleteSale = () => {
    if (focusedSaleId && sales.length > 1) {
      setSales(sales.filter((s) => s.id !== focusedSaleId));
      setSuggestions((prev) => {
        const nxt = { ...prev };
        delete nxt[focusedSaleId];
        return nxt;
      });
      setFocusedSuggestions((prev) => {
        const nxt = { ...prev };
        delete nxt[focusedSaleId];
        return nxt;
      });
      // Focus the last remaining input
      setTimeout(() => {
        const latestSaleId = sales[sales.length - 2]?.id;
        if (latestSaleId) {
          const latestInput = inputRefs.current[latestSaleId];
          if (latestInput) {
            latestInput.focus();
            setFocusedSaleId(latestSaleId);
            setCurrentFocus?.(latestInput);
          }
        }
      }, 0);
    }
  };

  // Register shortcuts using react-hotkeys-hook
  shortcuts.forEach(({ key, scope }) => {
    useHotkeys(
      key,
      (event) => {
        event.preventDefault();
        if (key === "ctrl+q") handleFocusLatestInput();
        else if (key === "ctrl+s") handleAddSale();
        else if (key === "ctrl+d") handleDeleteSale();
      },
      {
        scopes: [scope],
        enabled: true,
        enableOnTags: ["INPUT", "TEXTAREA"],
      }
    );
  });

  const handleKeyDown = (e, saleId) => {
    const currSugg = suggestions[saleId] || [];
    const currFocIdx = focusedSuggestions[saleId] ?? -1;

    if (currSugg.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = currFocIdx < currSugg.length - 1 ? currFocIdx + 1 : 0;
      setFocusedSuggestions({ ...focusedSuggestions, [saleId]: nextIndex });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevIndex = currFocIdx > 0 ? currFocIdx - 1 : currSugg.length - 1;
      setFocusedSuggestions({ ...focusedSuggestions, [saleId]: prevIndex });
    } else if (e.key === "Enter" && currFocIdx >= 0) {
      e.preventDefault();
      const selectedItem = currSugg[currFocIdx];
      updateSale(saleId, "itemName", selectedItem.productName);
      setSuggestions((prev) => ({ ...prev, [saleId]: [] }));
      setFocusedSuggestions((prev) => ({ ...prev, [saleId]: -1 }));
    } else if (e.key === "Escape") {
      setSuggestions((prev) => ({ ...prev, [saleId]: [] }));
      setFocusedSuggestions((prev) => ({ ...prev, [saleId]: -1 }));
    }
  };

  const updateSale = (id, field, value) => {
    const updated = sales.map((sale) => {
      if (sale.id === id) {
        const updatedSale = { ...sale, [field]: value };
        return updatedSale;
      }
      return sale;
    });
    setSales(updated);

    if (field === "itemName") {
      const searchResults = search(value).slice(0, 5);
      setSuggestions((prev) => ({
        ...prev,
        [id]: searchResults,
      }));

      if (searchResults.length > 0) {
        setFocusedSuggestions((prev) => ({ ...prev, [id]: 0 }));
      } else {
        setFocusedSuggestions((prev) => ({ ...prev, [id]: -1 }));
      }
    }
  };

  // Track focused input for Ctrl+D
  const handleInputFocus = (saleId, el) => {
    setFocusedSaleId(saleId);
    setCurrentFocus?.(el);
  };

  // Save reference to input elements
  const setInputRef = (id, el) => {
    if (el) {
      inputRefs.current[id] = el;
    }
  };

  // Click outside to close suggestions
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

  return (
    <div className="flex flex-col h-full" ref={containerRef}>
      <div className="overflow-x-auto min-h-52">
        <table className="min-w-full bg-white overflow-visible py-10">
          <thead>
            <tr className="bg-white border-b border-gray-200">
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
                    <div className="text-xs font-normal text-gray-500">
                      Bulk | Loose
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sales.map((sale, idx) => (
              <tr key={sale.id} className="border-b border-gray-200 relative">
                <td className="py-3 px-2 text-sm text-gray-700">{idx + 1}</td>
                <td className="py-2 px-1 text-sm text-gray-700">
                  <div className="relative">
                    <input
                      type="text"
                      value={sale.itemName}
                      onChange={(e) =>
                        updateSale(sale.id, "itemName", e.target.value)
                      }
                      onKeyDown={(e) => handleKeyDown(e, sale.id)}
                      onFocus={(e) => handleInputFocus(sale.id, e.target)}
                      ref={(el) => setInputRef(sale.id, el)}
                      className="w-24 text-xs border border-gray-300 rounded"
                      placeholder="Search..."
                    />
                    {suggestions[sale.id] &&
                      suggestions[sale.id].length > 0 && (
                        <ul className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded max-h-40 overflow-auto text-xs shadow-md">
                          {suggestions[sale.id].map((med, i) => (
                            <li
                              key={i}
                              onClick={() => {
                                updateSale(
                                  sale.id,
                                  "itemName",
                                  med.productName
                                );
                                setSuggestions((prev) => ({
                                  ...prev,
                                  [sale.id]: [],
                                }));
                                setFocusedSuggestions((prev) => ({
                                  ...prev,
                                  [sale.id]: -1,
                                }));
                              }}
                              className={`px-2 py-1.5 cursor-pointer transition-colors duration-150 ${
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
                  <td key={f} className="py-3 px-2 text-sm text-gray-700">
                    <input
                      type="text"
                      value={sale[f]}
                      onChange={(e) => updateSale(sale.id, f, e.target.value)}
                      onFocus={(e) => handleInputFocus(sale.id, e.target)}
                      className="w-full text-xs p-1 border border-gray-300 rounded"
                    />
                  </td>
                ))}
                <td className="py-3 px-3 text-sm text-gray-700">
                  <input
                    type="date"
                    value={sale.expiry}
                    onChange={(e) =>
                      updateSale(sale.id, "expiry", e.target.value)
                    }
                    onFocus={(e) => handleInputFocus(sale.id, e.target)}
                    className="w-full text-xs border border-gray-300 rounded"
                  />
                </td>
                <td className="py-3 px-3 text-sm text-gray-700 flex gap-1">
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
                    onFocus={(e) => handleInputFocus(sale.id, e.target)}
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
                    onFocus={(e) => handleInputFocus(sale.id, e.target)}
                    className="w-12 text-xs p-1 border border-gray-300 rounded"
                  />
                </td>
                {["mrp", "discount", "sellingRate", "gst"].map((field) => (
                  <td key={field} className="py-3 px-3 text-sm text-gray-700">
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
                      onFocus={(e) => handleInputFocus(sale.id, e.target)}
                      className="w-full text-xs p-1 border border-gray-300 rounded"
                    />
                  </td>
                ))}
                <td className="py-3 px-3 text-sm text-gray-700">
                  {sale.amount.toFixed(2)}
                </td>
                <td className="py-3 px-3 text-sm text-gray-700">
                  <div className="flex gap-2">
                    {["cash", "upi", "card"].map((mode) => (
                      <button key={mode} className="flex items-center">
                        <input
                          type="radio"
                          id={`${mode}-${sale.id}`}
                          name={`payMode-${sale.id}`}
                          value={mode}
                          checked={sale.payMode === mode}
                          onChange={(e) =>
                            updateSale(sale.id, "payMode", e.target.value)
                          }
                          onFocus={(e) => handleInputFocus(sale.id, e.target)}
                          className="w-3 h-3 text-blue-600"
                        />
                        <label
                          htmlFor={`${mode}-${sale.id}`}
                          className="ml-1 text-xs"
                        >
                          {mode.charAt(0).toUpperCase() + mode.slice(1)}
                        </label>
                      </button>
                    ))}
                  </div>
                </td>
                <td className="py-3 px-1 text-sm text-gray-700">
                  <button
                    onClick={() => removeSale(sale.id)}
                    className="text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={handleAddSale}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-3 text-xs rounded"
        >
          Add Sale
        </button>
        <div className="flex gap-4">
          <Printer className="cursor-pointer w-4 h-4" />
          <Share2 className="cursor-pointer w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default SalesTable;

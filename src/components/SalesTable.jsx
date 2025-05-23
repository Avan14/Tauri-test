import React, { useState, useRef, useEffect } from 'react';
import { Printer, Share2, Trash2 } from 'lucide-react';
import Fuse from 'fuse.js';
import medicines from '../constants/medicines_random.json'; // 5000+ entries

// Initialize Fuse.js
const fuse = new Fuse(medicines, {
  keys: ['productName'],
  threshold: 0.3,
});

function search(q) {
  return q ? fuse.search(q).map(r => r.item) : [];
}

const SalesTable = () => {
  const [sales, setSales] = useState([
    {
      id: '1', itemName: '', pack: '', batch: '', expiry: '',
      quantityBulk: 0, quantityLoose: 0, mrp: 0,
      discount: 0, sellingRate: 0, gst: 0, amount: 0, payMode: '',
    },
  ]);

  // suggestions per row
  const [suggestions, setSuggestions] = useState({});
  const containerRef = useRef(null);

  const addSale = () => {
    const newSale = {
      id: Date.now().toString(), itemName: '', pack: '', batch: '', expiry: '',
      quantityBulk: 0, quantityLoose: 0, mrp: 0,
      discount: 0, sellingRate: 0, gst: 0, amount: 0, payMode: '',
    };
    setSales([...sales, newSale]);
  };

  const removeSale = id => {
    if (sales.length > 1) {
      setSales(sales.filter(s => s.id !== id));
      // clear suggestions
      setSuggestions(prev => { const nxt = { ...prev }; delete nxt[id]; return nxt; });
    }
  };

  const updateSale = (id, field, value) => {
    const updated = sales.map(sale => {
      if (sale.id === id) {
        const updatedSale = { ...sale, [field]: value };
        // recalc amount
        if (['quantityBulk', 'quantityLoose', 'sellingRate', 'discount', 'gst'].includes(field)) {
          let amount = (updatedSale.quantityBulk + updatedSale.quantityLoose) * updatedSale.sellingRate;
          amount -= amount * (updatedSale.discount / 100);
          amount += amount * (updatedSale.gst / 100);
          updatedSale.amount = parseFloat(amount.toFixed(2));
        }
        return updatedSale;
      }
      return sale;
    });
    setSales(updated);

    // update suggestions if editing itemName
    if (field === 'itemName') {
      setSuggestions(prev => ({
        ...prev,
        [id]: search(value).slice(0, 5)
      }));
    }
  };

  // click outside to close suggestions
  useEffect(() => {
    const handleClick = e => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setSuggestions({});
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="flex flex-col h-full" ref={containerRef}>
      <div className="overflow-x-auto min-h-52 ">
        <table className="min-w-full bg-white overflow-visible py-10">
          <thead>
            <tr className="bg-white border-b border-gray-200">
              {['S.No.', 'Item Name', 'Pack', 'Batch', 'Expiry', 'Quantity',
                'MRP', 'Disc%', 'S.Rate', 'GST%', 'Amount', 'Pay Mode', '']
              .map((h, i) => (
                <th key={i} className="py-3 px-3 text-left text-sm font-medium text-gray-700">
                  {h}{h === 'Quantity' && <div className="text-xs font-normal text-gray-500">Bulk | Loose</div>}
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
                      onChange={e => updateSale(sale.id, 'itemName', e.target.value)}
                      className="w-24 text-xs  border border-gray-300 rounded"
                      placeholder="Search..."
                    />
                    {suggestions[sale.id] && suggestions[sale.id].length > 0 && (
                      <ul className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded max-h-40 overflow-auto text-xs">
                        {suggestions[sale.id].map((med, i) => (
                          <li
                            key={i}
                            onClick={() => {
                              updateSale(sale.id, 'itemName', med.productName);
                              setSuggestions(prev => ({ ...prev, [sale.id]: [] }));
                            }}
                            className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                          >
                            {med.productName}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </td>
                {['pack', 'batch'].map(f => (
                  <td key={f} className="py-3 px-2 text-sm text-gray-700">
                    <input
                      type="text"
                      value={sale[f]}
                      onChange={e => updateSale(sale.id, f, e.target.value)}
                      className="w-full text-xs p-1 border border-gray-300 rounded"
                    />
                  </td>
                ))}
                <td className="py-3 px-3 text-sm text-gray-700">
                  <input
                    type="date"
                    value={sale.expiry}
                    onChange={e => updateSale(sale.id, 'expiry', e.target.value)}
                    className="w-full text-xs  border border-gray-300 rounded"
                  />
                </td>
                <td className="py-3 px-3 text-sm text-gray-700 flex gap-1">
                  <input
                    type="number"
                    value={sale.quantityBulk}
                    onChange={e => updateSale(sale.id, 'quantityBulk', parseInt(e.target.value) || 0)}
                    className="w-12 text-xs p-1 border border-gray-300 rounded"
                  />
                  <input
                    type="number"
                    value={sale.quantityLoose}
                    onChange={e => updateSale(sale.id, 'quantityLoose', parseInt(e.target.value) || 0)}
                    className="w-12 text-xs p-1 border border-gray-300 rounded"
                  />
                </td>
                {['mrp', 'discount', 'sellingRate', 'gst'].map(field => (
                  <td key={field} className="py-3 px-4 text-sm text-gray-700">
                    <input
                      type="number"
                      value={sale[field]}
                      onChange={e => updateSale(sale.id, field, parseFloat(e.target.value) || 0)}
                      className="w-full text-xs p-1 border border-gray-300 rounded"
                    />
                  </td>
                ))}
                <td className="py-3 px-4 text-sm text-gray-700">{sale.amount.toFixed(2)}</td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  <div className="flex gap-2">
                    {['cash', 'upi', 'card'].map(mode => (
                      <div key={mode} className="flex items-center">
                        <input
                          type="radio"
                          id={`${mode}-${sale.id}`}
                          name={`payMode-${sale.id}`}
                          value={mode}
                          checked={sale.payMode === mode}
                          onChange={e => updateSale(sale.id, 'payMode', e.target.value)}
                          className="w-3 h-3 text-blue-600"
                        />
                        <label htmlFor={`${mode}-${sale.id}`} className="ml-1 text-xs">
                          {mode.charAt(0).toUpperCase() + mode.slice(1)}
                        </label>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  <button onClick={() => removeSale(sale.id)} className="text-red-500">
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
          onClick={addSale}
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

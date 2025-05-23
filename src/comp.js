import React, { useState } from 'react';

const Comp = ({ onTotalChange }) => {
  const [items, setItems] = useState([
    {
      id: '1',
      name: '',
      pack: '',
      batch: '',
      expiry: '',
      mrp: 0,
      qty: 0,
      free: 0,
      rate: 0,
      disc1: 0,
      disc2: 0,
      tax: 0,
      amount: 0,
    },
  ]);

  const addItem = () => {
    const newItem = {
      id: Date.now().toString(),
      name: '',
      pack: '',
      batch: '',
      expiry: '',
      mrp: 0,
      qty: 0,
      free: 0,
      rate: 0,
      disc1: 0,
      disc2: 0,
      tax: 0,
      amount: 0,
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id, field, value) => {
    const updatedItems = items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };

        if (['qty', 'rate', 'disc1', 'disc2', 'tax'].includes(field)) {
          const rate = updatedItem.rate || 0;
          const qty = updatedItem.qty || 0;
          let amount = rate * qty;

          amount = amount * (1 - (updatedItem.disc1 / 100));
          amount = amount * (1 - (updatedItem.disc2 / 100));
          amount = amount * (1 + (updatedItem.tax / 100));

          updatedItem.amount = parseFloat(amount.toFixed(2));
        }

        return updatedItem;
      }
      return item;
    });

    setItems(updatedItems);

    const total = updatedItems.reduce((sum, item) => sum + item.amount, 0);
    if (onTotalChange) {
      onTotalChange(total);
    }
  };

  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div>
      <div className="overflow-x-auto text-xs">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th>S.No.</th>
              <th>Items/Services</th>
              <th>Pack</th>
              <th>Batch</th>
              <th>Expiry</th>
              <th>MRP</th>
              <th>Qty</th>
              <th>Free</th>
              <th>Rate</th>
              <th>Disc1</th>
              <th>Disc2</th>
              <th>Tax</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td ><input value={item.name} onChange={(e) => updateItem(item.id, 'name', e.target.value)} /></td>
                <td><input value={item.pack} onChange={(e) => updateItem(item.id, 'pack', e.target.value)} /></td>
                <td><input value={item.batch} onChange={(e) => updateItem(item.id, 'batch', e.target.value)} /></td>
                <td><input type="date" value={item.expiry} onChange={(e) => updateItem(item.id, 'expiry', e.target.value)} /></td>
                <td><input value={item.mrp} onChange={(e) => updateItem(item.id, 'mrp', parseFloat(e.target.value) || 0)} /></td>
                <td><input value={item.qty} onChange={(e) => updateItem(item.id, 'qty', parseInt(e.target.value) || 0)} /></td>
                <td><input value={item.free} onChange={(e) => updateItem(item.id, 'free', parseInt(e.target.value) || 0)} /></td>
                <td><input value={item.rate} onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)} /></td>
                <td><input value={item.disc1} onChange={(e) => updateItem(item.id, 'disc1', parseFloat(e.target.value) || 0)} /></td>
                <td><input value={item.disc2} onChange={(e) => updateItem(item.id, 'disc2', parseFloat(e.target.value) || 0)} /></td>
                <td><input value={item.tax} onChange={(e) => updateItem(item.id, 'tax', parseFloat(e.target.value) || 0)} /></td>
                <td>{item.amount.toFixed(2)}</td>
                <td><button onClick={() => removeItem(item.id)}>Remove</button></td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={12}>Sub total</td>
              <td>{subtotal.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
        <button onClick={addItem}>Add Item</button>
      </div>
    </div>
  );
};

export default Comp;

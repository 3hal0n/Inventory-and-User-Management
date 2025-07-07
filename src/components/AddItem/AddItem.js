import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

function AddItem() {
  const navigate = useNavigate();
  const [item, setItem] = useState({
    itemId: '',
    itemName: '',
    itemCategory: '',
    itemQty: '',
    itemDetails: '',
    itemImage: null
  });
  const [previewURL, setPreviewURL] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    if (e.target.name === 'itemImage') {
      setItem({...item, itemImage: e.target.files[0] });
      // Create preview URL for image
      if (e.target.files[0]) {
        setPreviewURL(URL.createObjectURL(e.target.files[0]));
      }
    } else {
      setItem({ ...item, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (!item.itemImage) {
      setError('Please select an image');
      return;
    }

    const formData = new FormData();
    formData.append('file', item.itemImage);
    let imageName = "";

    try {
      // Upload image
      const imageResponse = await api.post('/inventory/itemImg', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      imageName = imageResponse.data;
      
      // Add item with image name
      const updatedItem = {
        ...item,
        itemImage: imageName
      };
      
      await api.post('/inventory', updatedItem);
      alert("Item added successfully");
      navigate('/');
    } catch(error) {
      console.error('Error:', error);
      setError(error.response?.data?.message || 'Error adding item. Please try again.');
      alert(error.response?.data?.message || 'Error adding item. Please try again.');
    }
  };

  return (
    <div>
      <div>
        <p className="auth_topic">Add Item</p>
        <div className="from_container">
          <div className="from_sub_coon">
            <form id="itemForm" onSubmit={handleSubmit}>
              <label htmlFor="itemId">Item ID:</label><br />
              <input
                type="text"
                id="itemId"
                name="itemId"
                value={item.itemId}
                onChange={handleChange}
                required
              /><br />

              <label htmlFor="itemName">Item Name:</label><br />
              <input
                type="text"
                id="itemName"
                name="itemName"
                value={item.itemName}
                onChange={handleChange}
                required
              /><br />

              <label htmlFor="itemCategory">Item Category:</label><br />
              <select
                id="itemCategory"
                name="itemCategory"
                value={item.itemCategory}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select Item Category</option>
                <option value="Apparel & Fashion">Apparel & Fashion</option>
                <option value="Electronics & Gadgets">Electronics & Gadgets</option>
                <option value="Health & Beauty">Health & Beauty</option>
                <option value="Food & Dining">Food & Dining</option>
                <option value="Home & Furniture">Home & Furniture</option>
              </select>
              <br />
              
              <label htmlFor="itemQty">Item Quantity:</label><br />
              <input
                type="number"
                id="itemQty"
                name="itemQty"
                value={item.itemQty}
                onChange={handleChange}
                required
              /><br />

              <label htmlFor="itemDetails">Item Details:</label><br />
              <textarea
                id="itemDetails"
                name="itemDetails"
                value={item.itemDetails}
                onChange={handleChange}
                required
                rows={4}
                cols={50}
              /><br />
              
              <label htmlFor="imageFile">Item Image:</label><br />
              <input
                type="file"
                id="imageFile"
                name="itemImage"
                accept="image/*"
                onChange={handleChange}
                required
              /><br />

              {previewURL && (
                <img
                  src={previewURL}
                  alt="preview"
                  style={{ width: 120, marginTop: 8 }}
                />
              )}<br />
              <br />
              <button type="submit">Add Item</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddItem;
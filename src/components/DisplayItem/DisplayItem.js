import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';


function DisplayItem() {

    const [inventory, setInventory]=useState([]);
    const {id}=useParams();

    useEffect(() => {   
        loadInventory();
    }, []);
    const loadInventory = async () => {
        const result = await axios.get(`http://localhost:8080/inventory`);
        setInventory(result.data);
    }
  return (
    <div>
      <h1>Inventory Item</h1>

      <table>
        <thead>
            <tr>
                <td>Item Id</td>
                <td>Item</td>
                <td>Item Name</td>
                <td>Category</td>
                <td>Quantity</td>
                <td>Details</td>
                <td>Actions</td>
            </tr>
        </thead>
        <tbody>
            {inventory.map((item, index) => (
                <tr key={index}>
                    <td>{item.itemId}</td>
                    <td><img src={`http://localhost:8080/inventory/uploads/${item.itemImage}`} alt="Item" width="100" height="100"/></td>
                    <td>{item.itemName}</td>
                    <td>{item.itemCategory}</td>
                    <td>{item.itemQty}</td>
                    <td>{item.itemDetails}</td>
                    <td>
                        <button onClick={() => (window.location.href = `/updateitem/${item.itemId}`)}>Update</button>
                        <button onClick={() => (window.location.href = `/deleteitem/${item.itemId}`)}>Delete</button>
                    </td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default DisplayItem

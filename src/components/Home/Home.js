import React from 'react'

function Home() { 
  return (
    <div>
      <button onClick={()=>(window.location.href='/additem')}>Add Item</button>
      <button onClick={()=>(window.location.href='/allItems')}>Display all Items</button>
      
    </div>
  )
}

export default Home






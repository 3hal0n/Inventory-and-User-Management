import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import AddItem from './components/AddItem/AddItem';
import DisplayItem from './components/DisplayItem/DisplayItem';
function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/additem" element={<AddItem />} />
          <Route path="/allItems" element={<DisplayItem />} />
          {/* <Route path="/updateitem/:id" element={<UpdateItem />} />
          <Route path="/deleteitem/:id" element={<DeleteItem />} /> */}
        </Routes>
        </React.Fragment>
    </div>
  );
}

export default App;

import React from 'react';
import Home from "./pages/home/home";
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import Pokemon from "./pages/pokemon/pokemon";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pokemon/:id" element={<Pokemon />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;

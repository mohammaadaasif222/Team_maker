import React from "react";
import Home from "./Home";
import Members from "./Member";
import Profile from "./Profile";
import Form from './Form'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Update from "./Update";

function App() {

  return (
    <div className="App">
     <Router>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="/members" element={<Members />} />
          <Route path="/profile/:_id" element={<Profile />} />
          <Route path="/create" element={<Form />} />
          <Route path="/update/:_id" element={<Update />} />
        </Route>
      </Routes>
    </Router>
    </div>
  );
}

export default App;

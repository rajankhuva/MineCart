import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { LoginedIn } from "./utils";
import Dashboard from "./Component/Customer/Dashboard";
import Register from "./Component/Auth/register";
import Login from "./Component/Auth/login";
import Cart from "./Component/Customer/Cart";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home/Home";
import Products from "./pages/Products";
import SignIn from "./pages/SignIn";
import ResetPassword from "./pages/ResetPassword";
import Cart from "./pages/Cart";
import Whishlist from "./pages/Whishlist";
import Checkout from "./pages/Checkout Page/Checkout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* الصفحات اللي فيها Navbar */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/whishlist" element={<Whishlist />} />
        </Route>

        {/* صفحة بدون Navbar */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

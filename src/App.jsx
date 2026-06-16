import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./Layouts/MainLayout";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ResetPassword from "./pages/ResetPassword";
import Cart from "./pages/Cart";
import Whishlist from "./pages/Whishlist";
import Checkout from "./pages/Checkout Page/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./dashboard/layout/DasboardLayout";
import DashboardHome from "./dashboard/pages/DashboardHome";
import Product from "./dashboard/pages/Product";
import Orders from "./dashboard/pages/Orders";
import Users from "./dashboard/pages/Users";
import Analytics from "./dashboard/pages/Analytics";
import SettingsLayout from "./dashboard/layout/SettingsLayout";
import GeneralSettings from "./dashboard/Settings/GeneralSettings";
import Appearance from "./dashboard/Settings/Appearance";
import Billing from "./dashboard/Settings/Billing";
import Security from "./dashboard/Settings/Security";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public pages with Navbar + Footer */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/whishlist" element={<Whishlist />} />
          </Route>

          {/* Public pages without Navbar */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />

          {/* Protected pages (require login) */}
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/account" element={<Account />} />
            </Route>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="products" element={<Product />} />
              <Route path="orders" element={<Orders />} />
              <Route path="users" element={<Users />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="/dashboard/settings" element={<SettingsLayout />}>
                <Route path="general" element={<GeneralSettings />} />
                <Route path="appearance" element={<Appearance />} />
                <Route path="billing" element={<Billing />} />
                <Route path="security" element={<Security />} />
              </Route>
            </Route>
          </Route>

          {/* 404 Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

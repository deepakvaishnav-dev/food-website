import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import FoodList from "./components/FoodList";
import { ThemeProvider } from "./components/theme-provider";
import Login from "@/components/Login";
import SignUp from "@/components/SignUp";
import Home from "@/components/Home";
import About from "@/components/About";
import Contact from "@/components/Contact";
import CheckoutPage from "@/components/CheckoutPage";
import OrderSuccessPage from "@/components/OrderSuccessPage";
import { Toaster } from "sonner";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";

function App() {
  const handleSignUpClose = () => {};

  function AppContent() {
    const { isLoggedIn } = useAuth();

    return (
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={isLoggedIn ? <FoodList /> : <Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/signup"
            element={<SignUp onClose={handleSignUpClose} />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
        </Routes>
        <Toaster />
      </>
    );
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

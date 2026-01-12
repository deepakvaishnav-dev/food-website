import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import FoodList from "./components/FoodList";
import { ThemeProvider } from "./components/theme-provider";
import Login from "@/Page/Login";
import SignUp from "@/Page/SignUp";
import Home from "@/Page/Home";
import About from "@/Page/About";
import Contact from "@/Page/Contact";
import CheckoutPage from "@/Page/CheckoutPage";
import OrderSuccessPage from "@/Page/OrderSuccessPage";
import { Toaster } from "sonner";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import Footer from "./Page/Footer";

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
        <Footer />
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

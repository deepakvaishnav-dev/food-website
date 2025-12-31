import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import FoodList from "./components/FoodList";
import { ThemeProvider } from "./components/theme-provider";
import Login from "@/components/Login";
import SignUp from "@/components/SignUp";
import Home from "@/components/Home";
import { Toaster } from "sonner";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

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
        </Routes>
        <Toaster />
      </>
    );
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

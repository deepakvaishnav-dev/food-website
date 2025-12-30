import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import FoodList from "./components/FoodList";
import { ThemeProvider } from "./components/theme-provider";
import Login from "@/components/Login";
import SignUp from "@/components/SignUp";

function App() {
  const handleSignUpClose = () => {
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navbar />
      <Routes>
        <Route path="/" element={<FoodList />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/signup"
          element={<SignUp onClose={handleSignUpClose} />}
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;

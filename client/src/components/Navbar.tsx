import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "./ui/navigation-menu";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Badge } from "../components/ui/badge";
import CartDialog from "./CartDialog";
import { useState } from "react";
import logo from "../assets/Haldiram's_Logo_SVG.svg.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout, user } = useAuth();
  const { cart } = useCart();
  const [cartDialogOpen, setCartDialogOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleClick = (section: string) => {
    if (section === "login") navigate("/login");
    else if (section === "signup") navigate("/signup");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="border-b bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-lg font-bold"
          >
            <img
              src={logo}
              alt="Haldiram Logo"
              className="h-10 w-10 sm:h-12 sm:w-12 object-contain rounded-2xl"
            />
            <span className="hidden sm:inline text-foreground">HaldiramFood</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList className="flex flex-row space-x-2">
                {["Home", "About", "Contact"].map((section) => (
                  <NavigationMenuItem key={section}>
                    <NavigationMenuLink asChild>
                      <Link
                        to={`/${section.toLowerCase()}`}
                        className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
                      >
                        {section}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-2">
            {/* Cart */}
            {isLoggedIn && (
              <div className="relative">
                <ShoppingCart
                  className="h-6 w-6 cursor-pointer"
                  onClick={() => setCartDialogOpen(true)}
                />
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {cart.length}
                  </Badge>
                )}
              </div>
            )}

            {/* Profile */}
            {isLoggedIn && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-8 w-8 rounded-full"
                  >
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Button variant="outline" onClick={() => handleClick("login")}>Login</Button>
                <Button onClick={() => handleClick("signup")}>Sign Up</Button>
              </div>
            )}

            {/* Theme toggle */}
            <ModeToggle />

            {/* Mobile Hamburger */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-1 bg-background border-t">
          {["Home", "About", "Contact"].map((section) => (
            <Link
              key={section}
              to={`/${section.toLowerCase()}`}
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              {section}
            </Link>
          ))}

          {!isLoggedIn && (
            <div className="flex flex-col gap-2 mt-2">
              <Button variant="outline" onClick={() => handleClick("login")}>Login</Button>
              <Button onClick={() => handleClick("signup")}>Sign Up</Button>
            </div>
          )}
        </div>
      )}

      <CartDialog open={cartDialogOpen} onOpenChange={setCartDialogOpen} />
    </nav>
  );
};

export default Navbar;

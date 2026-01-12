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
import { ShoppingCart } from "lucide-react";
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
            className="flex items-center justify-center gap-2 text-lg font-bold"
          >
            <img
              src={logo}
              alt=""
              className="h-20 w-15 object-contain rounded-2xl"
            />{" "}
            HaldiramFood
          </Link>
          {/* Menu */}
          <div className="flex items-center space-x-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/"
                      className="px-3 py-2 rounded-md text-sm font-medium 
                      text-foreground hover:bg-accent hover:text-accent-foreground"
                    >
                      Home
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/about"
                      className="px-3 py-2 rounded-md text-sm font-medium
                      text-foreground hover:bg-accent hover:text-accent-foreground"
                    >
                      About
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/contact"
                      className="px-3 py-2 rounded-md text-sm font-medium
                    text-foreground hover:bg-accent hover:text-accent-foreground"
                    >
                      Contact
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Cart Icon */}
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

            {/* Auth Buttons */}
            <div className="flex items-center gap-2">
              {isLoggedIn && user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full cursor-pointer"
                    >
                      <Avatar>
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="@shadcn"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user.name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={() => handleClick("login")}
                    className="cursor-pointer"
                  >
                    Login
                  </Button>
                  <Button onClick={() => handleClick("signup")} className="cursor-pointer">Sign Up</Button>
                </>
              )}
            </div>

            {/* Theme Toggle */}
            <ModeToggle />
          </div>
        </div>
      </div>
      <CartDialog open={cartDialogOpen} onOpenChange={setCartDialogOpen} />
    </nav>
  );
};

export default Navbar;

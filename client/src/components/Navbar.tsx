import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "./ui/navigation-menu";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/Haldiram's_Logo_SVG.svg.png";

const Navbar = () => {
  const navigate = useNavigate();

  const handleClick = (section: string) => {
    if (section === "login") navigate("/login");
    else if (section === "signup") navigate("/signup");
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
                  <NavigationMenuLink
                    className="px-3 py-2 rounded-md text-sm font-medium 
                    text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer"
                  >
                    About
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    className="px-3 py-2 rounded-md text-sm font-medium 
                    text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer"
                  >
                    Contact
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Auth Buttons */}
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => handleClick("login")}>
                Login
              </Button>
              <Button onClick={() => handleClick("signup")}>Sign Up</Button>
            </div>

            {/* Theme Toggle */}
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

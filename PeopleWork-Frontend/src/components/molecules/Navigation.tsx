import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Menu, LogIn, UserPlus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigation = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500",
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">
            <span className="text-primary">Skill</span>Finder
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {["how-it-works", "services", "workers", "cta"].map((sectionId) => (
              <button
                key={sectionId}
                onClick={() => scrollToSection(sectionId)}
                className={cn(
                  "text-muted-foreground relative overflow-hidden group",
                  "after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:-bottom-1 after:left-0",
                  "after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300",
                  "hover:text-primary hover:after:scale-x-100 hover:after:origin-bottom-left"
                )}
              >
                {sectionId
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </button>
            ))}

            {/* Login/Register Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="border-primary/30 hover:border-primary hover:bg-primary/5"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Account
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 animate-in fade-in-50 zoom-in-95"
              >
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => navigation("/login")}
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  <span>Login</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => navigation("/register")}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  <span>Register</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              onClick={() => scrollToSection("cta")}
              className="bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105"
            >
              Find Workers
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="mr-2">
                  <LogIn className="h-4 w-4" />
                  <span className="sr-only">Account</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <LogIn className="h-4 w-4 mr-2" />
                  <span>Login as Customer</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogIn className="h-4 w-4 mr-2" />
                  <span>Login as Service Provider</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <UserPlus className="h-4 w-4 mr-2" />
                  <span>Register as Customer</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <UserPlus className="h-4 w-4 mr-2" />
                  <span>Register as Service Provider</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-background/95 backdrop-blur-md rounded-lg shadow-lg animate-fade-in">
            <div className="flex flex-col space-y-4 items-center">
              {["how-it-works", "services", "workers", "cta"].map(
                (sectionId) => (
                  <button
                    key={sectionId}
                    onClick={() => scrollToSection(sectionId)}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {sectionId
                      .split("-")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </button>
                )
              )}
              <Button
                onClick={() => scrollToSection("cta")}
                className="w-full max-w-xs mt-2"
              >
                Find Workers
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

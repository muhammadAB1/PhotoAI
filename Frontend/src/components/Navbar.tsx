import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Sparkles, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { useTheme } from "@/components/ThemeProvider";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  const location = useLocation();
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDashboardClick = () => {
    if (isSignedIn) {
      navigate("/dashboard");
    } else {
      navigate("/sign-in");
    }
  };
  const handlePriceClick = () => {
    if (isSignedIn) {
      navigate("/pricing");
    } else {
      navigate("/sign-in");
    }
  };

  return (
    <header className={cn(
      "fixed top-10 w-[65%] z-50 transition-all duration-300 justify-center flex rounded-xl px-2",
      scrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : (theme === "dark" ? "bg-black" : "bg-white")
    )}>
      <div className="container flex items-center justify-between h-16 md:h-20 cursor-default">
        <div className="flex items-center gap-2 text-xl font-bold" onClick={() => navigate("/")}>
          <Sparkles className="h-6 w-6 text-primary" />
          <span>PhotoAI</span>
        </div>

        <nav className="hidden md:flex items-center space-x-6 ml-[11%]">
          <SignedOut>
            <a href="#features" className={cn("text-sm font-medium hover:text-primary transition-colors", location.hash === "#features" && "text-primary font-bold bg-gray-300 bg-opacity-50 backdrop-blur-md rounded-md p-1")}>Features</a>
            <a href="#samples" className={cn("text-sm font-medium hover:text-primary transition-colors", location.hash === "#samples" && "text-primary font-bold bg-gray-300 bg-opacity-50 backdrop-blur-md rounded-md p-1")}>Packs</a>
            <a href="#testimonials" className={cn("text-sm font-medium hover:text-primary transition-colors", location.hash === "#testimonials" && "text-primary font-bold bg-gray-300 bg-opacity-50 backdrop-blur-md rounded-md p-1")}>Testimonials</a>
            <a href="#pricing" className={cn("text-sm font-medium hover:text-primary transition-colors", location.hash === "#pricing" && "text-primary font-bold bg-gray-300 bg-opacity-50 backdrop-blur-md rounded-md p-1")}>Pricing</a>
          </SignedOut>
          <Button variant={`${location.pathname !== '/pricing' ? 'outline' : 'link'}`} onClick={handleDashboardClick} className={cn("text-sm font-medium hover:text-primary transition-colors cursor-pointer", location.pathname.length === 0 && "text-transparent font-bold bg-gray-300 bg-opacity-50 backdrop-blur-md rounded-md p-1")}>Dashboard</Button>
          <SignedIn>
            <Button variant={`${location.pathname === "/pricing" ? 'outline' : 'link'}`} onClick={handlePriceClick} className={cn("text-sm font-medium hover:text-primary transition-colors cursor-pointer", location.pathname.length === 0 && "text-transparent font-bold bg-gray-300 bg-opacity-50 backdrop-blur-md rounded-md p-1")}>Price</Button>
          </SignedIn>
        </nav>

        <div className="flex items-center space-x-2">
          <SignedIn>
            <div className="hidden md:flex items-center mr-2 px-3 py-1.5 rounded-full bg-primary/10 text-xs font-medium">
              <Sparkles className="h-3.5 w-3.5 mr-1.5 text-primary" />
              <span>35 Credits</span>
            </div>

            <UserButton
              appearance={{
                elements: {
                  userButtonBox: "h-10 w-10",
                  userButtonTrigger: "h-10 w-10 bg-card/50 border",
                  userButtonAvatarBox: "h-10 w-10"
                },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>

          <SignedOut>
            <Button className="cursor-pointer" variant="ghost" size="icon" onClick={() => navigate("/sign-in")}>
              <User className="h-5 w-5" />
              <span className="sr-only">Sign In</span>
            </Button>
          </SignedOut>

          <ThemeToggle />

          <SignedOut>
            <Button size="sm" className="hidden md:inline-flex cursor-pointer" onClick={() => navigate("/sign-up")}>
              Get Started
            </Button>
          </SignedOut>

          <SignedIn>
            {location.pathname.length <= 0 && (
              <Button size="sm" className="hidden md:inline-flex cursor-pointer" onClick={() => navigate("/dashboard")}>
                Generate
              </Button>
            )}
          </SignedIn>
        </div>
      </div>
    </header>
  );
}

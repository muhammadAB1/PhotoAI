// import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import SignInPage from "./pages/Singin";
import SignUpPage from "./pages/Singup";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/dashboard/Dashboard";
import Pricing from "./pages/Pricing";

// const queryClient = new QueryClient();

const App = () => (
  // <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark">
      <TooltipProvider>
        {/* <Toaster /> */}
        <Sonner />
        {/* <BrowserRouter> */}
        <div className="w-full justify-center items-center flex">
          <Navbar />
        </div>
          <Routes>
            <Route path="/" element={<><SignedOut><Index /></SignedOut><SignedIn><Dashboard page="" /></SignedIn></>} />
            <Route path="/sign-in/*" element={<SignInPage />} />
            <Route path="/sign-up/*" element={<SignUpPage />} />
            <Route 
              path="/dashboard" 
              element={
                <>
                  <SignedIn>
                    <Dashboard page="" />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              } 
            />
            <Route 
              path="/pricing" 
              element={
                <>
                  <SignedIn>
                    <Pricing />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              } 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
            <Route path="/dashboard/images" element={<Dashboard page={'images'}/>} />
            <Route path="/dashboard/train" element={<Dashboard page={'train'}/>} />
            <Route path="/dashboard/packs" element={<Dashboard page={'packs'}/>} />
            <Route path="/dashboard/generate" element={<Dashboard page={'generate'}/>} />
          </Routes>
        {/* </BrowserRouter> */}
      </TooltipProvider>
    </ThemeProvider>
  // {/* </QueryClientProvider> */}
);

export default App;

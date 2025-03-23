import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex items-center justify-center p-4 mt-16">
        <div className="w-full max-w-md">
          <SignIn 
            appearance={{
              elements: {
                rootBox: "mx-auto w-full",
                card: "bg-card/50 backdrop-blur-sm border shadow-xl",
                headerTitle: "text-foreground",
                headerSubtitle: "text-muted-foreground",
                formButtonPrimary: "bg-primary hover:bg-primary/90 text-primary-foreground",
                formButtonReset: "text-muted-foreground hover:text-foreground",
                footerAction: "text-muted-foreground",
                footerActionLink: "text-primary hover:text-primary/90",
              }
            }}
            routing="path"
            path="/sign-in"
          />
        </div>
      </main>
    </div>
  );
};

export default SignInPage;
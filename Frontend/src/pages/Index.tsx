import { Button } from "@/components/ui/button";
import { TestimonialCard } from "@/components/TestimonialCards";
import { PriceCard } from "@/components/PriceCards";
import { ArrowRight, CloudFog, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { packs } from "@/types";
import Pricing from "./Pricing";

const testimonials = [
  {
    content: "PhotoAI has completely transformed how I create visuals for my blog. The quality is incredible and it saves me so much time!",
    author: "Emma Chen",
    role: "Content Creator",
    avatarFallback: "EC",
  },
  {
    content: "I've tried many AI image generators, but nothing comes close to the quality and control PhotoAI offers. Worth every penny.",
    author: "Marcus Johnson",
    role: "Graphic Designer",
    avatarFallback: "MJ",
  },
  {
    content: "As a small business owner, PhotoAI helps me create professional marketing materials without breaking the bank on stock photos.",
    author: "Sophia Rodriguez",
    role: "Entrepreneur",
    avatarFallback: "SR",
  },
];



const sampleImages = [
  "https://r2-us-west.photoai.com/1725049333-dfe08305dc5e7c58aa07beafe50c5295-1.png",
  "https://r2-us-west.photoai.com/1726226890-bb7e3a47118ed5be3ec9d05ee4edbfb4-1.png",
  "https://r2-us-west.photoai.com/1726208563-8fa7591e07931c5d2c95a751f8a50cc9-2.png",
  "https://r2-us-west.photoai.com/1726195027-f02232c79fb299d718f8325b1da6ad97-1.png",
  "https://r2-us-west.photoai.com/1726196394-88f013266ca6088449fc7841ff4189ac-1.png",
  "https://r2-us-west.photoai.com/1726207932-4189dc268227de2395d906a690f768aa-4.png",
  "https://r2-us-west.photoai.com/1726207428-3fb03764175160651857a98b12a9a004-4.png",
  "https://r2-us-west.photoai.com/1738431398-44721676ec2238a6b187e7e45039ea01-4.png"
];


const features = [
  {
    title: "Just upload your image to train a model",
    description: "Fine-tune every aspect of your images with our AI model",
    icon: "✨"
  },
  {
    title: "Write a prompt and get your desired image according to your requirements.",
    description: "Our advanced AI transforms your photo into stunning portraits",
    icon: "🔄"
  },
  {
    title: "Share or Download your image",
    description: "Get your enhanced portraits in multiple styles instantly",
    icon: "🔮"
  }
];

const Index = () => {
  const [viewDetailsIndex, setViewDetailsIndex] = useState<number | null>(null);
  const [packs, setPacks] = useState<packs[]>([])

  const navigate = useNavigate();

  const handleViewDetails = (index: number) => {
    setViewDetailsIndex(index);
  };

  const handleCloseDetails = () => {
    setViewDetailsIndex(null);
  };

  useEffect(() => {
    const response = axios.get(`${BACKEND_URL}/pack/bulk`).then((response) => {
      setPacks(response.data.packs)
    })
  }, []);

  return (
    <main className="pb-24 justify-center flex flex-col items-center w-full">
      {/* Hero Section */}
      <section className="pt-32 pb-20 hero-gradient w-full flex justify-center">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 pb-8">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary mb-4">
              <Sparkles className="mr-1 h-3.5 w-3.5" />
              AI-Powered Image Generation
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter md:leading-tight max-w-3xl animate-fade-in">
              Transform Your Ideas Into Stunning Visuals
            </h1>
            <p className="text-muted-foreground max-w-[42rem] leading-normal md:text-xl animate-fade-in" style={{ animationDelay: "100ms" }}>
              Create beautiful, unique images in seconds with our advanced AI. Perfect for designers,
              marketers, and creators of all kinds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8 animate-fade-in" style={{ animationDelay: "200ms" }}>
              <SignedIn>
                <Button size="lg" className="rounded-full" onClick={() => navigate("/dashboard")}>
                  Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </SignedIn>
              <SignedOut>
                <Button size="lg" className="rounded-full" onClick={() => navigate("/sign-up")}>
                  Start Creating <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </SignedOut>
              {/* <Button size="lg" variant="outline" className="rounded-full" onClick={() => navigate("/#samples")}>
                View Samples
              </Button> */}
            </div>
          </div>

          <div className="relative w-full max-w-5xl mx-auto mt-8 animate-scale-in" style={{ animationDelay: "300ms" }}>
            <div className="overflow-hidden rounded-lg shadow-2xl grid grid-cols-4 grid-rows-2">
              {sampleImages.map((e) => {
                return (
                  <img
                    src={e}
                    alt="AI generated image"
                    className="w-full h-full object-cover"
                  />
                )
              })}
            </div>
            {/* <div className="absolute -bottom-5 -right-5 text-xs bg-card rounded-full px-4 py-2 font-medium border shadow-lg">
              Generated with PhotoAI
            </div> */}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              How it Works
            </h2>
            <p className="mt-4 text-muted-foreground md:text-xl max-w-3xl mx-auto">
              Just upload some of your pictures and AI will take care of the rest
            </p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center p-6 rounded-lg bg-card/50 border">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="samples" className="py-20 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Pick from different predesigned packs
            </h2>
            <p className="mt-4 text-muted-foreground md:text-xl max-w-3xl mx-auto">
              Browse through a collection of packs to find the perfect one for your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packs.map((image, index) => (
              <div key={index} className="relative group overflow-hidden rounded-lg shadow-lg p-4 bg-black">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <img
                    src={image.imageUrl1}
                    alt={`AI generated sample ${index + 1}`}
                    className="w-full h-64 object-cover"
                  />
                  <img
                    src={image.imageUrl2}
                    alt={`AI generated sample ${index + 1}`}
                    className="w-full h-64 object-cover"
                  />
                </div>
                <p className="mt-4 text-white">{image.description}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Button variant="outline" size="lg" onClick={() => navigate("/dashboard/packs")}>
              View Full Gallery
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section id="testimonials" className="py-20">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              What Our Users Say
            </h2>
            <p className="mt-4 text-muted-foreground md:text-xl max-w-3xl mx-auto">
              Join thousands of satisfied creators who use PhotoAI every day
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                content={testimonial.content}
                author={testimonial.author}
                role={testimonial.role}
                avatarFallback={testimonial.avatarFallback}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <Pricing />

      {/* CTA Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="relative overflow-hidden rounded-3xl bg-primary/10 border">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
            <div className="relative py-12 px-6 md:py-16 md:px-12 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
                Ready to Transform Your Creative Process?
              </h2>
              <p className="text-muted-foreground md:text-xl max-w-3xl mx-auto mb-8">
                Join thousands of creators and start generating stunning images with PhotoAI today
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <SignedIn>
                  <Button size="lg" variant={"outline"} className="rounded-full" onClick={() => navigate("/dashboard")}>
                    Go to Dashboard
                  </Button>
                </SignedIn>
                <SignedOut>
                  <Button size="lg" variant="outline" className="rounded-full" onClick={() => navigate("/sign-up")}>
                    Get Started For Free
                  </Button>
                </SignedOut>
                <Button size="lg" variant="outline" className="rounded-full">
                  Schedule a Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 text-lg font-semibold mb-6 md:mb-0">
              <Sparkles className="h-5 w-5 text-primary" />
              <span>PhotoAI</span>
            </div>

            <div className="flex gap-8">
              <div>
                <h3 className="text-sm font-medium mb-3">Product</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#features" className="hover:text-primary">Features</a></li>
                  <li><a href="#pricing" className="hover:text-primary">Pricing</a></li>
                  <li><a href="#" className="hover:text-primary">Tutorials</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3">Company</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-primary">About</a></li>
                  <li><a href="#" className="hover:text-primary">Blog</a></li>
                  <li><a href="#" className="hover:text-primary">Careers</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3">Resources</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-primary">Community</a></li>
                  <li><a href="#" className="hover:text-primary">Help Center</a></li>
                  <li><a href="#" className="hover:text-primary">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              © 2023 PhotoAI. All rights reserved.
            </p>

            <div className="flex space-x-6">
              <a href="#" className="text-muted-foreground hover:text-primary">
                Terms
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                Privacy
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default Index;

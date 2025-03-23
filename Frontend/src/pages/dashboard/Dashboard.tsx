import { useUser } from "@clerk/clerk-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, ImagePlus, Brain, Package } from "lucide-react";
import ImagesTab from "../dashboard/ImagesTab";
import GenerateTab from "../dashboard/GenerateTabs";
import TrainTab from "../dashboard/Training";
import PacksTab from "../dashboard/PacksTab";


const Dashboard = ({ page }: { page: string }) => {
  const { user } = useUser();

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto py-8 px-4 mt-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome, {user?.firstName || 'Creator'}</h1>
          <p className="text-muted-foreground">Create stunning images with AI</p>
        </div>

        <Tabs defaultValue={page.length > 0 ? page : "images"} className="w-full flex justify-center">
          <div className="justify-center flex">
            <TabsList className="grid grid-cols-4 gap-4 mb-8">
              <TabsTrigger value="images" className="flex items-center gap-2">
                <Camera className="h-4 w-4" />
                <span className="hidden sm:inline">My Images</span>
              </TabsTrigger>
              <TabsTrigger value="generate" className="flex items-center gap-2">
                <ImagePlus className="h-4 w-4" />
                <span className="hidden sm:inline">Generate</span>
              </TabsTrigger>
              <TabsTrigger value="train" className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                <span className="hidden sm:inline">Train Model</span>
              </TabsTrigger>
              <TabsTrigger value="packs" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                <span className="hidden sm:inline">Packs</span>
              </TabsTrigger>
            </TabsList>
          </div>


          <TabsContent value='images' className="mt-6">
            <ImagesTab />
          </TabsContent>

          <TabsContent value="train" className="mt-6">
            <TrainTab />
          </TabsContent>

          <TabsContent value="packs" className="mt-6">
            <PacksTab />
          </TabsContent>

          <TabsContent value="generate" className="mt-6">
            <GenerateTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;

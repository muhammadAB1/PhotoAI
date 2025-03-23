import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, ImagePlus, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTheme } from "@/components/ThemeProvider";
import { model } from "@/types";
import { useAuth } from "@clerk/clerk-react";
import { BACKEND_URL } from "@/config";
import axios from "axios";


const GenerateTab = () => {
  const { theme } = useTheme();
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [imageCount, setImageCount] = useState(1);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [models, setModels] = useState<model[]>([]);
  // const [modelsLoading, setModelsLoading] = useState(false);
  const { getToken } = useAuth();


  const handleGenerate = async () => {
  if (!prompt || !selectedModel) return;
  const token = await getToken();
  setGenerating(true);
  const response = await axios.post(`${BACKEND_URL}/ai/generate`, {
    prompt: prompt,
    modelId: selectedModel,
    num: 1},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  setGeneratedImages(response.data);
  console.log(response.data)
  setPrompt('')
  setGenerating(false)
  };
  
  
  
  const fetchModels = async () => {
    try {
      const token = await getToken();
      const response = await axios.get(`${BACKEND_URL}/models`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(response.data)
      setModels(response.data.models);
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    fetchModels();
  }, [])
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Column - Controls */}
      <div className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Select a Model</h2>
          <div className="relative">
            <Select onValueChange={(value) => setSelectedModel(value)} value={selectedModel || undefined}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a model style" />
              </SelectTrigger>
              <SelectContent>
                {models.map((model) => (
                  <SelectItem key={model.id} value={model.id} className={`flex items-center ${theme === "dark" ? "bg-black" : "bg-white"}`}>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-sm overflow-hidden">
                        <img src={model.thumbnail} alt={model.name} className="w-full h-full object-cover" />
                      </div>
                      <span>{model.name}</span>
                    </div>
                  </SelectItem>
                ))}
                {/* {modelsLoading && (
                  <div className="px-2 py-6 flex justify-center">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                  </div>
                )} */}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-medium">Write Your Prompt</h2>
          <Textarea
            placeholder="Describe the image you want to generate..."
            className="min-h-32 text-base resize-none"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
        <Button
          size="lg"
          className="w-full gap-2"
          onClick={handleGenerate}
          disabled={!prompt || !selectedModel || generating}
        >
          {generating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Generate Images
            </>
          )}
        </Button>
      </div>

      {/* Right Column - Results */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Results</h2>

        {generating ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array(imageCount).fill(null).map((_, index) => (
              <Card key={`loading-${index}`} className="overflow-hidden">
                <div className="aspect-square bg-muted/20 flex items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
                <CardContent className="p-3 text-center">
                  <p className="text-sm text-muted-foreground">Generating image {index + 1}...</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : generatedImages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {generatedImages.map((image, index) => (
              <Card key={`image-${index}`} className="overflow-hidden">
                <div className="aspect-square bg-muted/20">
                  <img src={image} alt={`Generated ${index + 1}`} className="w-full h-full object-cover" />
                </div>
                <CardContent className="p-3 flex justify-between items-center">
                  <p className="text-sm">Image {index + 1}</p>
                  <Button variant="ghost" size="sm">
                    <ImagePlus className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed rounded-lg">
            <ImagePlus className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              Your generated images will appear here.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Select a model and write a prompt to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateTab;

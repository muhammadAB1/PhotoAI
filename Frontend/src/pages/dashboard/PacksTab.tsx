import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Plus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { model, packs } from "@/types";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";



const PacksTab = () => {
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const [packs, setPacks] = useState<packs[]>([])
  const [loading, setLoading] = useState(false);
  const [models, setModels] = useState<model[]>([]);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const fetchPacks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.BACKEND_URL}/pack/bulk`, {
      });
      console.log(response.data.packs)
      setPacks(response.data.packs);
    } catch (error) {
      console.error("Failed to fetch images", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  const fetchModels = async () => {
    try {
      const token = await getToken();
      const response = await axios.get(`${process.env.BACKEND_URL}/models`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setModels(response.data.models);
    } catch (error) {
      console.log(error)
    }
  }

  const generatePack = async (pack: string) => {
    try {
      const token = await getToken();
      const response = await axios.post(`${process.env.BACKEND_URL}/pack/generate`, {
        modelId: selectedModel,
        packId: pack
      },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      console.log(response.data)
    }
    catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    fetchPacks();
    fetchModels();
  }, [])

  return (

    <div className="space-y-8">
      {/* Models Section */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium">Available Models</h2>
          <Button size="sm" variant="outline" className="gap-2" onClick={() => navigate('/dashboard/train')}>
            <Plus className="h-4 w-4" />
            Add Model
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {models.map(model => (
            <Card key={model.id} className={`overflow-hidde`}
              onClick={() => { setSelectedModel(model.id) }}>
              <div className={`aspect-square relative`}>
                <img
                  src={model.thumbnail}
                  alt={model.name}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex flex-col space-y-1">
                  <h3 className="font-medium">{model.name}</h3>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button variant="secondary" size="sm" className="w-full">
                  Select
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Packs Section */}
      <div className="space-y-6 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            // Skeleton loading state
            Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardHeader className="pb-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </CardHeader>
                <CardFooter>
                  <Skeleton className="h-9 w-full" />
                </CardFooter>
              </Card>
            ))
          ) : (
            // Actual packs
            packs.map(pack => (
              <Card key={pack.id} className="overflow-hidden grid grid-cols-1 grid-rows-1">
                <div className="relative w-full grid grid-cols-2 gap-2 grid-rows-1">
                  <div className="flex w-full h-full gap-2 p-2">
                    <img
                      src={pack.imageUrl1}
                      alt={pack.name}
                      className="w-full h-full object-cover"
                    />
                    <img
                      src={pack.imageUrl2}
                      alt={pack.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    {pack.name}
                  </CardTitle>
                  <CardDescription>{pack.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="secondary" className="w-full cursor-pointer" onClick={() => generatePack(pack.id)}>Use Pack</Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
export default PacksTab;

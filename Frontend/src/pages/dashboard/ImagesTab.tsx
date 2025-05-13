import { useEffect, useState } from "react";
import { ArrowDown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { image } from '@/types'

const ImagesTab = () => {
    const [images, setImages] = useState<image[]>([]);
    const [loading, setLoading] = useState(false);
    const [visibleCount, setVisibleCount] = useState(10);
    const { getToken } = useAuth();

    const fetchImages = async () => {
        try {
            const token = await getToken();
            setLoading(true);
            const response = await axios.get(`${process.env.BACKEND_URL}/image/bulk`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setImages(response.data.images);
        } catch (error) {
            console.error("Failed to fetch images", error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchImages();
    }, []);

    const handleLoadMore = () => {
        setVisibleCount(prevCount => prevCount + 10);
    }

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {loading ? (
                    // Skeleton loading states
                    Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="rounded-lg border bg-card/50 shadow-md">
                            <Skeleton className="w-full h-64 rounded-t-lg" />
                            <div className="p-4 space-y-2">
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        </div>
                    ))
                ) : (
                    // Actual images
                    images.slice(0, visibleCount).map((image) => (
                        <div key={image.id} className="relative group overflow-hidden rounded-lg border bg-card/50 shadow-md h-70 w-58">
                            <img
                                src={image.imageUrl}
                                alt={image.prompt}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                                <div className="p-4 w-full">
                                    <p className="text-white text-sm mb-2 line-clamp-2">{image.prompt}</p>
                                    <Button variant="secondary" size="sm" className="w-full gap-2 text-white">
                                        <Download size={16} />
                                        Download
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {images.length > visibleCount && (
                <div className="flex justify-center">
                    <Button variant="outline" size="lg" className="gap-2" onClick={handleLoadMore}>
                        Load More
                        <ArrowDown size={16} />
                    </Button>
                </div>
            )}

            {!loading && images.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-lg text-muted-foreground">You haven't generated any images yet.</p>
                    <p className="text-muted-foreground mb-6">Go to the Generate tab to create your first image!</p>
                </div>
            )}
        </div>
    );
};

export default ImagesTab;

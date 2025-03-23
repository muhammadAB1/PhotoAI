import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  content: string;
  author: string;
  role: string;
  avatarSrc?: string;
  avatarFallback: string;
}

export function TestimonialCard({
  content,
  author,
  role,
  avatarSrc,
  avatarFallback,
}: TestimonialCardProps) {
  return (
    <Card className="overflow-hidden border bg-card/50 dark:bg-card/20 backdrop-blur-sm">
      <CardContent className="p-6">
        <Quote className="h-5 w-5 text-primary mb-3 opacity-70" />
        <p className="mb-4 italic">{content}</p>
        <div className="flex items-center">
          <Avatar className="h-9 w-9 mr-3 border-2 border-primary/20">
            <AvatarImage src={avatarSrc} alt={author} />
            <AvatarFallback className="bg-primary/10 text-primary">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{author}</p>
            <p className="text-xs text-muted-foreground">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

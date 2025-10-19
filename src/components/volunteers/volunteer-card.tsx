import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Volunteer } from "@/lib/data";

interface VolunteerCardProps {
  volunteer: Volunteer;
}

export function VolunteerCard({ volunteer }: VolunteerCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage
            src={volunteer.avatar.imageUrl}
            alt={volunteer.name}
            data-ai-hint={volunteer.avatar.imageHint}
          />
          <AvatarFallback>
            {volunteer.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-bold font-headline">{volunteer.name}</h3>
          <p className="text-sm text-primary">{volunteer.role}</p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{volunteer.bio}</p>
      </CardContent>
    </Card>
  );
}

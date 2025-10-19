import { VolunteerCard } from "@/components/volunteers/volunteer-card";
import { volunteers } from "@/lib/data";

export default function VolunteersPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Our Volunteers
        </h1>
        <p className="text-muted-foreground">
          Meet the dedicated team behind our community support initiatives (for
          demo purposes).
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {volunteers.map((volunteer) => (
          <VolunteerCard key={volunteer.id} volunteer={volunteer} />
        ))}
      </div>
    </div>
  );
}

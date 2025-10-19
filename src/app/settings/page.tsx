import { ThemeToggle } from "@/components/theme-toggle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your application preferences.
        </p>
      </div>

      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">Theme</p>
              <p className="text-sm text-muted-foreground">
                Select a light or dark theme for the application.
              </p>
            </div>
            <ThemeToggle />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

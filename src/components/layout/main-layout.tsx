import { SidebarProvider, Sidebar, SidebarInset } from "@/components/ui/sidebar";
import { SidebarNav } from "./sidebar-nav";
import { Header } from "./header";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarNav />
      </Sidebar>
      <SidebarInset className="bg-background">
        <Header />
        <main className="p-4 md:p-6 lg:p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}

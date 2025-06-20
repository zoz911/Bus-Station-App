import { ScheduleViewer } from "@/components/schedule-viewer";
import { ScheduleFilter } from "@/components/schedule-filter";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";

export default function MyBusSchedulePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <BreadcrumbNav
        items={[
          { label: "Home", href: "/" },
          { label: "My Bus", href: "/my-bus" },
          { label: "Schedule", href: "/my-bus/schedule", active: true },
        ]}
      />

      <h1 className="text-3xl font-bold mb-6">My Bus Schedule</h1>

      <div className="grid gap-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <ScheduleFilter />
        </div>
        <div className="md:col-span-3">
          <ScheduleViewer />
        </div>
      </div>
    </div>
  );
} 
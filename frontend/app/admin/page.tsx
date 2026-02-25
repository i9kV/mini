import { StatsCard } from "@/components/admin/StatsCard";

export default function AdminDashboard() {
    return (
        <div className="grid gap-6 md:grid-cols-3">
            <StatsCard title="Total Cars" value="24" />
            <StatsCard title="Total Bookings" value="56" />
            <StatsCard title="Revenue" value="฿125,000" />
        </div>
    );
}
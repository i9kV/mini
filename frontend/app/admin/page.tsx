import { StatsCard } from "@/components/admin/StatsCard";

async function getDashboardStats() {
    const token = process.env.ADMIN_TOKEN;
    // หรือใช้ cookies ถ้าเก็บ JWT ใน cookie

    const [carsRes, bookingsRes] = await Promise.all([
        fetch("http://localhost:3000/cars/stats", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        }),
        fetch("http://localhost:3000/bookings/stats", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        }),
    ]);

    const cars = await carsRes.json();
    const bookings = await bookingsRes.json();

    return {
        totalCars: cars.totalCars,
        availableCars: cars.availableCars,
        totalBookings: bookings.totalBookings,
    };
}
export default async function AdminDashboard() {
    const stats = await getDashboardStats();

    return (
        <div className="grid gap-6 md:grid-cols-3">
            <StatsCard
                title="รถทั้งหมด"
                value={stats.totalCars}
            />
            <StatsCard
                title="รถที่พร้อมใช้งาน"
                value={stats.availableCars}
            />
            <StatsCard
                title="ยอดการจอง"
                value={stats.totalBookings}
            />
        </div>
    );
}
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { DashboardCharts } from "@/components/admin/DashboardCharts";
import { cookies } from "next/headers";

async function getDashboardStats() {

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    console.log("COOKIE TOKEN:", token);

    const [carsRes, bookingsRes, revenueRes] = await Promise.all([
        fetch("http://localhost:3000/cars/stats", {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            cache: "no-store",
        }),
        fetch("http://localhost:3000/bookings/stats", {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            cache: "no-store",
        }),
        fetch("http://localhost:3000/bookings/revenue", {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            cache: "no-store",
        }),
    ]);

    const cars = carsRes.ok ? await carsRes.json() : {};
    const bookings = bookingsRes.ok ? await bookingsRes.json() : {};
    const revenueRaw = revenueRes.ok ? await revenueRes.json() : [];

    const revenue = Array.isArray(revenueRaw) ? revenueRaw : [];

    return {
        totalCars: cars.totalCars ?? 0,
        availableCars: cars.availableCars ?? 0,
        totalBookings: bookings.totalBookings ?? 0,
        revenueData: revenue,
    };
}

export default async function AdminDashboard() {
    const stats = await getDashboardStats();

    const overviewData = [
        { name: "รถทั้งหมด", value: stats.totalCars },
        { name: "รถพร้อมใช้งาน", value: stats.availableCars },
        { name: "ยอดจอง", value: stats.totalBookings },
    ];
    console.log(stats.revenueData);
    return (
        <div className="space-y-6">

            {/* ✅ Overview Cards */}
            <div className="grid gap-6 md:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>รถทั้งหมด</CardTitle>
                    </CardHeader>
                    <CardContent className="text-3xl font-bold">
                        {stats.totalCars}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>รถที่พร้อมใช้งาน</CardTitle>
                    </CardHeader>
                    <CardContent className="text-3xl font-bold">
                        {stats.availableCars}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>ยอดการจอง</CardTitle>
                    </CardHeader>
                    <CardContent className="text-3xl font-bold">
                        {stats.totalBookings}
                    </CardContent>
                </Card>
            </div>
            <DashboardCharts
                overviewData={overviewData}
                revenueData={stats.revenueData}
            />

        </div>
    );
}
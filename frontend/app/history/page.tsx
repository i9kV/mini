"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";



export default function MyBookingsPage() {
    const router = useRouter();
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBookings() {
            const token = localStorage.getItem("token");

            const res = await fetch("http://localhost:3000/bookings/my", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                router.push("/auth/login");
                return;
            }

            const data = await res.json();
            setBookings(data);
            setLoading(false);
        }

        fetchBookings();
    }, [router]);

    if (loading) return <p className="p-6">Loading...</p>;

    return (
        <div className="p-10 space-y-6">
            <Navbar />
            <h1 className="text-3xl font-bold text-center">
                ประวัติการจองของฉัน
            </h1>

            {bookings.length === 0 && (
                <p className="text-center text-muted-foreground">
                    ยังไม่มีประวัติการจอง
                </p>
            )}

            <div className="grid md:grid-cols-2 gap-6">
                {bookings.map((b) => (
                    <Card key={b._id} className="rounded-2xl shadow">
                        <CardHeader>
                            <CardTitle>
                                {b.car?.name ?? b.carName ?? "ไม่พบข้อมูลรถ"}
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-3">
                            <p>
                                📅 {new Date(b.startDate).toLocaleDateString()} -{" "}
                                {new Date(b.endDate).toLocaleDateString()}
                            </p>

                            <p>📞 {b.phone}</p>

                            <Badge
                                variant={
                                    b.status === "approved"
                                        ? "default"
                                        : b.status === "pending"
                                            ? "secondary"
                                            : "destructive"
                                }
                            >
                                {b.status}
                            </Badge>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="flex justify-center">
                <Button onClick={() => router.push("/")}>
                    กลับหน้าหลัก
                </Button>
            </div>
        </div>
    );
}
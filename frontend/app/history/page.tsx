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

    async function handleCancel(id: string) {
        if (!confirm("คุณแน่ใจหรือไม่ว่าจะยกเลิกการจองนี้?")) return;

        const token = localStorage.getItem("token");

        const res = await fetch(
            `http://localhost:3000/bookings/${id}/cancel`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!res.ok) {
            alert("ยกเลิกไม่สำเร็จ");
            return;
        }

        setBookings((prev) =>
            prev.map((b) =>
                b._id === id ? { ...b, status: "cancelled" } : b
            )
        );
    }
    // if (!confirm("คุณแน่ใจหรือไม่ว่าจะยกเลิกการจองนี้?")) return;
    if (loading) return <p className="p-6">Loading...</p>;

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <div className="max-w-5xl mx-auto px-6 py-12 space-y-10">
                <div className="space-y-2">
                    <h1 className="text-3xl font-semibold tracking-tight">
                        ประวัติการจอง
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        ดูรายการจองและจัดการการจองของคุณ
                    </p>
                </div>

                {bookings.length === 0 && (
                    <div className="text-center py-20 border rounded-xl">
                        <p className="text-muted-foreground">
                            ยังไม่มีประวัติการจอง
                        </p>
                    </div>
                )}

                <div className="space-y-4">
                    {bookings

                        .sort(
                            (a, b) =>
                                new Date(b.createdAt).getTime() -
                                new Date(a.createdAt).getTime()
                        )
                        .map((b) => (
                            <Card
                                key={b._id}
                                className="border rounded-xl shadow-none hover:bg-muted/40 transition"
                            >
                                <CardContent className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                                    {/* LEFT */}
                                    <div className="space-y-2">
                                        <p className="font-medium text-lg">
                                            {b.car?.name ?? "ไม่พบข้อมูลรถ"}
                                        </p>

                                        <p className="text-sm text-muted-foreground">
                                            {new Date(b.startDate).toLocaleDateString()} —{" "}
                                            {new Date(b.endDate).toLocaleDateString()}
                                        </p>

                                        <p className="text-sm text-muted-foreground">
                                            โทร: {b.phone}
                                        </p>
                                    </div>

                                    {/* RIGHT */}
                                    <div className="flex items-center gap-4 text-white">
                                        <Badge
                                            variant={
                                                b.status === "completed"
                                                    ? "default"
                                                    : b.status === "pending"
                                                        ? "secondary"
                                                        : "destructive"
                                            }
                                            className="capitalize"
                                        >
                                            {b.status}
                                        </Badge>

                                        {b.status === "pending" && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-destructive hover:text-destructive"
                                                onClick={() => handleCancel(b._id)}
                                            >
                                                ยกเลิก
                                            </Button>
                                        )}
                                    </div>

                                </CardContent>
                            </Card>
                        ))}
                </div>
            </div>
        </div>
    );
}
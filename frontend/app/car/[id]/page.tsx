"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function CarDetailPage() {
    const { id } = useParams();

    const [car, setCar] = useState<any>(null);
    const [customerName, setCustomerName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [loading, setLoading] = useState(true);
    const [bookingLoading, setBookingLoading] = useState(false);
    const router = useRouter();
    // ✅ โหลดข้อมูลรถ
    useEffect(() => {
        async function fetchCar() {
            const res = await fetch(`http://localhost:3000/cars/${id}`);
            const data = await res.json();
            setCar(data);
            setLoading(false);
        }

        fetchCar();
    }, [id]);

    // ✅ จองรถ
    async function handleBooking() {

        if (!customerName || !startDate || !endDate) {
            alert("กรอกข้อมูลให้ครบ");
            return;
        }

        setBookingLoading(true);

        const res = await fetch("http://localhost:3000/bookings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                car: id,
                customerName,
                startDate,
                endDate,
            }),
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.message || "จองไม่สำเร็จ");
            setBookingLoading(false);
            return;
        }

        alert("จองสำเร็จ 🎉");
        setBookingLoading(false);
        router.push("/");
    }

    if (loading) return <p className="p-6">Loading...</p>;

    return (
        <div className="flex justify-center p-6 bg-muted/40 min-h-screen">
            <Card className="w-full max-w-xl rounded-2xl shadow-lg">
                <CardHeader>
                    <CardTitle>{car.name}</CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">

                    <p>💰 ราคา/วัน: ฿{car.pricePerDay}</p>
                    <p>
                        🚗 สถานะ:{" "}
                        {car.available ? "พร้อมให้เช่า" : "ไม่พร้อม"}
                    </p>

                    <div className="border-t pt-6 space-y-4">
                        <h3 className="font-semibold text-lg">
                            ฟอร์มจองรถ
                        </h3>

                        <div className="space-y-2">
                            <Label>ชื่อผู้จอง</Label>
                            <Input
                                value={customerName}
                                onChange={(e) =>
                                    setCustomerName(e.target.value)
                                }
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>วันรับรถ</Label>
                            <Input
                                type="date"
                                onChange={(e) =>
                                    setStartDate(e.target.value)
                                }
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>วันคืนรถ</Label>
                            <Input
                                type="date"
                                onChange={(e) =>
                                    setEndDate(e.target.value)
                                }
                            />
                        </div>

                        <Button
                            onClick={handleBooking}
                            disabled={bookingLoading}
                            className="w-full"
                        >
                            {bookingLoading
                                ? "กำลังจอง..."
                                : "จองรถคันนี้"}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
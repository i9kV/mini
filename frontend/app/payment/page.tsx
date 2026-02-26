"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function PaymentPage() {
    const params = useSearchParams();
    const router = useRouter();

    const carId = params.get("car");
    const phone = params.get("phone");
    const startDate = params.get("start");
    const endDate = params.get("end");

    const [car, setCar] = useState<any>(null);
    const [days, setDays] = useState(0);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);

    // โหลดข้อมูลรถ
    useEffect(() => {
        async function fetchCar() {
            if (!carId) return;

            const res = await fetch(`http://localhost:3000/cars/${carId}`);
            const data = await res.json();

            setCar(data);

            // คำนวณจำนวนวัน
            if (startDate && endDate) {
                const start = new Date(startDate);
                const end = new Date(endDate);

                const diffTime = end.getTime() - start.getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                setDays(diffDays);
                setTotal(diffDays * data.pricePerDay);
            }

            setLoading(false);
        }

        fetchCar();
    }, [carId, startDate, endDate]);

    const [paying, setPaying] = useState(false);

    async function handlePayment() {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("กรุณาเข้าสู่ระบบก่อน");
            router.push("/login");
            return;
        }

        try {
            setPaying(true);

            const res = await fetch("http://localhost:3000/bookings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    car: carId,
                    brand: car?.brand,
                    phone,
                    startDate,
                    endDate,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "จองไม่สำเร็จ");
            }

            alert("ชำระเงินสำเร็จ 🎉");
            router.push("/car");

        } catch (err: any) {
            alert(err.message);
        } finally {
            setPaying(false);
        }
    }

    if (loading) return <p className="p-10">Loading...</p>;

    return (
        <div className="flex justify-center items-center min-h-screen bg-muted/40 p-6">
            <Card className="w-full max-w-lg rounded-2xl shadow-xl">
                <CardHeader>
                    <CardTitle className="text-center text-2xl">
                        สรุปการชำระเงิน
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <p><strong>รถ:</strong> {car?.name}</p>
                        <p><strong>ราคา/วัน:</strong> ฿{car?.pricePerDay}</p>
                        <p><strong>จำนวนวัน:</strong> {days} วัน</p>
                    </div>

                    <Separator />

                    <div className="flex justify-between text-lg font-semibold">
                        <span>ยอดรวมทั้งหมด</span>
                        <span className="text-green-600">
                            ฿{total.toLocaleString()}
                        </span>
                    </div>

                    <Button
                        onClick={handlePayment}
                        disabled={paying}
                        className="w-full text-lg"
                    >
                        {paying ? "กำลังดำเนินการ..." : "ชำระเงิน"}
                    </Button>

                    <Button
                        variant="outline"
                        onClick={() => router.back()}
                        className="w-full"
                    >
                        ย้อนกลับ
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
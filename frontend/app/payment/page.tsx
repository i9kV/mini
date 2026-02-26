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
import { Badge } from "@/components/ui/badge";
import { Loader2, CalendarDays, Car } from "lucide-react";

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
    const [paying, setPaying] = useState(false);

    // โหลดข้อมูลรถ
    useEffect(() => {
        async function fetchCar() {
            try {
                if (!carId) return;

                const res = await fetch(`http://localhost:3000/cars/${carId}`);
                const data = await res.json();

                setCar(data);

                if (startDate && endDate) {
                    const start = new Date(startDate);
                    const end = new Date(endDate);

                    const diffTime = end.getTime() - start.getTime();
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                    if (diffDays <= 0) {
                        setDays(0);
                        setTotal(0);
                    } else {
                        setDays(diffDays);
                        setTotal(diffDays * data.pricePerDay);
                    }
                }
            } catch (err) {
                console.error("โหลดรถไม่สำเร็จ", err);
            } finally {
                setLoading(false);
            }
        }

        fetchCar();
    }, [carId, startDate, endDate]);

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

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-muted/40 p-6">
            <Card className="w-full max-w-xl rounded-2xl shadow-2xl border">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold">
                        สรุปการชำระเงิน
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">

                    {/* Car Info */}
                    <div className="p-4 bg-muted rounded-xl space-y-2">
                        <div className="flex items-center gap-2 font-semibold">
                            <Car className="w-4 h-4" />
                            {car?.name}
                        </div>

                        <div className="flex justify-between text-sm">
                            <span>ราคา / วัน</span>
                            <Badge variant="secondary">
                                ฿{car?.pricePerDay?.toLocaleString()}
                            </Badge>
                        </div>
                    </div>

                    {/* Date Info */}
                    <div className="p-4 bg-muted rounded-xl space-y-2 text-sm">
                        <div className="flex items-center gap-2 font-semibold">
                            <CalendarDays className="w-4 h-4" />
                            วันที่เช่า
                        </div>

                        <div className="flex justify-between">
                            <span>เริ่มต้น</span>
                            <span>{startDate}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>สิ้นสุด</span>
                            <span>{endDate}</span>
                        </div>

                        <div className="flex justify-between font-medium">
                            <span>จำนวนวัน</span>
                            <span>{days} วัน</span>
                        </div>
                    </div>

                    <Separator />

                    {/* Total */}
                    <div className="flex justify-between text-xl font-bold">
                        <span>ยอดรวมทั้งหมด</span>
                        <span className="text-green-600">
                            ฿{total.toLocaleString()}
                        </span>
                    </div>

                    {/* Buttons */}
                    <div className="space-y-3">
                        <Button
                            onClick={handlePayment}
                            disabled={paying || days <= 0}
                            className="w-full text-lg"
                        >
                            {paying ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                    กำลังดำเนินการ...
                                </>
                            ) : (
                                "ชำระเงิน"
                            )}
                        </Button>

                        <Button
                            variant="outline"
                            onClick={() => router.back()}
                            className="w-full"
                        >
                            ย้อนกลับ
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
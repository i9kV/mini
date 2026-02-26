"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function CarDetailPage() {
    const { id } = useParams();
    const router = useRouter();

    const [car, setCar] = useState<any>(null);
    const [userEmail, setUserEmail] = useState<string | null>(null);

    const [phone, setPhone] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [loading, setLoading] = useState(true);
    const [bookingLoading, setBookingLoading] = useState(false);


    useEffect(() => {
        async function init() {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    router.push("../auth/login");
                    return;
                }

                // ดึง profile user
                const meRes = await fetch("http://localhost:3000/auth/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                // console.log("STATUS:", meRes.status);


                if (!meRes.ok) {
                    router.push("../auth/login");
                    return;
                }

                const me = await meRes.json();
                setUserEmail(me.email);

                //โหลดรถ
                const carRes = await fetch(
                    `http://localhost:3000/cars/${id}`
                );
                const carData = await carRes.json();
                setCar(carData);

                setLoading(false);
            } catch (error) {
                router.push("../auth/login");
            }
        }

        init();
    }, [id, router]);

    // ✅ จองรถ
    async function handleBooking() {
        if (!phone || !startDate || !endDate) {
            alert("กรอกข้อมูลให้ครบ");
            return;
        }

        if (new Date(startDate) > new Date(endDate)) {
            alert("วันคืนต้องมากกว่าวันรับ");
            return;
        }
        const phoneRegex = /^[0-9]+$/;

        if (!phoneRegex.test(phone)) {
            alert("เบอร์โทรต้องเป็นตัวเลขเท่านั้น");
            return;
        }

        if (phone.length !== 10) {
            alert("เบอร์โทรต้องมี 10 หลัก");
            return;
        }

        setBookingLoading(true);

        router.push(
            `/payment?car=${id}&phone=${phone}&start=${startDate}&end=${endDate}`
        );
    }

    if (loading) return <p className="p-6">Loading...</p>;

    return (
        <div className="flex justify-center p-6 bg-muted/40 min-h-screen">
            <Card className="w-full max-w-xl rounded-2xl shadow-lg">
                <CardHeader>
                    <CardTitle>{car?.brand}</CardTitle>
                    <CardTitle>{car?.name}</CardTitle>

                </CardHeader>

                <CardContent className="space-y-6">
                    <p>ราคา/วัน: ฿{car?.pricePerDay}</p>
                    <p>
                        สถานะ:{" "}
                        {car?.available
                            ? "พร้อมให้เช่า"
                            : "ไม่พร้อม"}
                    </p>

                    <div className="border-t pt-6 space-y-4">
                        <h3 className="font-semibold text-lg">
                            ฟอร์มจองรถ
                        </h3>

                        {/* ✅ แสดง email (readonly) */}
                        <div className="space-y-2">
                            <Label>บัญชีผู้จอง</Label>
                            <Input value={userEmail || ""} disabled />
                        </div>

                        {/* ✅ เบอร์โทร */}
                        <div className="space-y-2">
                            <Label>เบอร์โทรศัพท์</Label>
                            <Input
                                value={phone}
                                type="tel"
                                onChange={(e) =>
                                    setPhone(e.target.value)
                                }
                                placeholder="0812345678"
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

                        <Button
                            variant="outline"
                            type="button"
                            onClick={() => router.push("/car")}
                            className="w-full"
                        >
                            ยกเลิก
                        </Button>


                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
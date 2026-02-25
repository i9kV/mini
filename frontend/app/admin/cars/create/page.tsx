"use client";

import { Navbar } from "@/components/navbar";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function CreateCar() {
    const router = useRouter();

    const [form, setForm] = useState({
        name: "",
        brand: "",
        type: "",
        transmission: "",
        seats: "",
        pricePerDay: "",
        available: true,

    });

    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (name: string, value: any) => {
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();

            // 🔥 แปลงเป็น number และกัน NaN
            const payload = {
                ...form,
                seats: Number(form.seats) || 0,
                pricePerDay: Number(form.pricePerDay) || 0,
            };

            // 🔥 ตรวจว่ากรอกครบ
            if (!payload.seats || !payload.pricePerDay) {
                alert("กรุณากรอกจำนวนที่นั่งและราคาให้ถูกต้อง");
                setLoading(false);
                return;
            }

            Object.entries(payload).forEach(([key, value]) => {
                formData.append(key, value.toString());
            });

            if (file) {
                formData.append("image", file);
            }

            const token = localStorage.getItem("token");

            const res = await fetch("http://localhost:3000/cars", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(errorText);
            }
            if (!form.type || !form.transmission) {
                alert("กรุณาเลือกประเภทรถและระบบเกียร์");
                setLoading(false);
                return;
            }

            router.push("/admin/cars"); // 🔥 แนะนำเปลี่ยน path ให้ถูก
        } catch (err) {
            console.error(err);
            alert("บันทึกไม่สำเร็จ");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>

            <div className="mt-5 min-h-screen bg-muted/40 flex items-center justify-center p-6">
                <Card className="w-full max-w-2xl rounded-2xl shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl">เพิ่มรถใหม่</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">

                            <div className="space-y-2">
                                <Label>ชื่อรุ่นรถ</Label>
                                <Input
                                    value={form.name}
                                    onChange={(e) => handleChange("name", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>ยี่ห้อ</Label>
                                <Input
                                    value={form.brand}
                                    onChange={(e) => handleChange("brand", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="space-y-2">
                                    <Label>ประเภทรถ</Label>
                                    <Select
                                        value={form.type}
                                        onValueChange={(v) => handleChange("type", v)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="เลือกประเภท" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="SUV">SUV</SelectItem>
                                            <SelectItem value="Sedan">Sedan</SelectItem>
                                            <SelectItem value="Van">Van</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="space-y-2">
                                    <Label>ระบบเกียร์</Label>
                                    <Select
                                        value={form.transmission}
                                        onValueChange={(v) => handleChange("transmission", v)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="เลือกเกียร์" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="AUTO">AUTO</SelectItem>
                                            <SelectItem value="MANUAL">MANUAL</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>จำนวนที่นั่ง</Label>
                                <Input
                                    type="number"
                                    value={form.seats}
                                    onChange={(e) => handleChange("seats", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>ราคา / วัน</Label>
                                <Input
                                    type="number"
                                    value={form.pricePerDay}
                                    onChange={(e) => handleChange("pricePerDay", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    checked={form.available}
                                    onCheckedChange={(checked) =>
                                        handleChange("available", checked === true)
                                    }
                                />
                                <Label>พร้อมให้เช่า</Label>
                            </div>

                            <div className="space-y-2">
                                <Label>อัปโหลดรูป</Label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setFile(e.target.files?.[0] || null)
                                    }
                                    required
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <Button asChild variant="outline">
                                    <Link href="/admin/cars">ยกเลิก</Link>
                                </Button>

                                <Button type="submit" disabled={loading}>
                                    {loading ? "กำลังบันทึก..." : "บันทึก"}
                                </Button>
                            </div>

                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
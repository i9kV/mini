'use client';

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function EditCarPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const router = useRouter();

    const [name, setName] = useState("");
    const [pricePerDay, setPricePerDay] = useState("");
    const [available, setAvailable] = useState(true);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // ✅ ดึงข้อมูลรถจาก NestJS
    useEffect(() => {
        const fetchCar = async () => {
            try {
                const res = await fetch(`http://localhost:3000/cars/${id}`, {
                    cache: "no-store",
                });

                if (!res.ok) throw new Error();

                const data = await res.json();

                setName(data.name);
                setPricePerDay(String(data.pricePerDay));
                setAvailable(data.available);
            } catch {
                alert("ไม่พบข้อมูลรถ");
                router.push("/admin/cars");
            } finally {
                setLoading(false);
            }
        };

        fetchCar();
    }, [id, router]);

    // ✅ อัปเดตข้อมูลไป NestJS
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const res = await fetch(`http://localhost:3000/cars/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    pricePerDay: Number(pricePerDay),
                    available,
                }),
            });

            if (!res.ok) throw new Error();

            router.push("/admin/cars");
        } catch {
            alert("แก้ไขไม่สำเร็จ");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                กำลังโหลด...
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-muted/40 p-6">
            <Card className="w-full max-w-xl rounded-2xl shadow-lg">
                <CardHeader>
                    <CardTitle>แก้ไขรถ</CardTitle>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleUpdate} className="space-y-6">

                        <div className="space-y-2">
                            <Label>ชื่อรถ</Label>
                            <Input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>ราคาต่อวัน</Label>
                            <Input
                                type="number"
                                value={pricePerDay}
                                onChange={(e) => setPricePerDay(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between border rounded-lg p-4">
                            <Label>สถานะพร้อมให้เช่า</Label>
                            <Switch
                                checked={available}
                                onCheckedChange={setAvailable}
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.push("/admin/cars")}
                            >
                                ยกเลิก
                            </Button>

                            <Button type="submit" disabled={saving}>
                                {saving ? "กำลังบันทึก..." : "บันทึก"}
                            </Button>
                        </div>

                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

async function getCars() {
    const res = await fetch("http://localhost:3000/cars", {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch cars");
    }

    return res.json();
}

export default async function HomePage() {
    const cars = await getCars();

    return (
        <div className="p-10 space-y-8">
            <h1 className="text-3xl font-bold text-center">
                🚗 รถให้เช่าทั้งหมด
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cars.map((car: any) => (
                    <Card
                        key={car._id}
                        className="rounded-2xl shadow-md hover:shadow-xl transition"
                    >
                        <CardHeader>
                            <CardTitle>{car.name}</CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            {car.imageUrl && (
                                <img
                                    src={`http://localhost:3000${car.imageUrl}`}
                                    className="w-full h-40 object-cover rounded-lg"
                                />
                            )}

                            <p>💰 ฿{car.pricePerDay} / วัน</p>

                            <p>
                                🚦 สถานะ:{" "}
                                <span
                                    className={
                                        car.available
                                            ? "text-green-600 font-semibold"
                                            : "text-red-600 font-semibold"
                                    }
                                >
                                    {car.available ? "พร้อมให้เช่า" : "ไม่พร้อม"}
                                </span>
                            </p>

                            <Button
                                asChild
                                className="w-full"
                                disabled={!car.available}
                            >
                                <Link href={`/car/${car._id}`}>
                                    {car.available ? "จองรถคันนี้" : "ไม่สามารถจองได้"}
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
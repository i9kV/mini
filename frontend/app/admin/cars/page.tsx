import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function getCars() {
    const res = await fetch("http://localhost:3000/cars", {
        cache: "no-store", // 🔥 สำคัญมาก ไม่ cache
    });

    if (!res.ok) {
        throw new Error("Failed to fetch cars");
    }

    return res.json();
}


export default async function AdminCarsPage() {
    const cars = await getCars();

    return (
        console.log(cars),
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Cars</h2>

                <Button asChild>
                    <Link href="/admin/cars/create">เพิ่มรถใหม่</Link>
                </Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>รูป</TableHead>
                        <TableHead>รุ่น</TableHead>
                        <TableHead>ราคาต่อวัน</TableHead>
                        <TableHead>สถาน</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {cars.map((car: any) => (

                        <TableRow key={car._id}>
                            <TableCell>
                                {car.imageUrl && (
                                    <img
                                        src={`http://localhost:3000${car.imageUrl}`}
                                        className="w-16 h-12 object-cover rounded"
                                    />
                                )}
                            </TableCell>

                            <TableCell>{car.name}</TableCell>

                            <TableCell>฿{car.pricePerDay}</TableCell>
                            <TableCell>
                                {car.available ? "พร้อมให้เช่า" : "ไม่พร้อม"}
                            </TableCell>

                            <TableCell className="text-right">
                                <Button variant="outline" size="sm">
                                    <Link href={`/admin/cars/${car._id}`}>
                                        แก้ไข
                                    </Link>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
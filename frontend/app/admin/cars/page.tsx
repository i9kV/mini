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
import { revalidatePath } from "next/cache";
import DeleteCarButton from "@/components/admin/DeleteCarButton";


async function deleteCar(id: string) {
    "use server";

    await fetch(`http://localhost:3000/cars/${id}`, {
        method: "DELETE",
    });

    revalidatePath("/admin/cars");
}
async function getCars() {
    const res = await fetch("http://localhost:3000/cars", {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch cars");
    }

    return res.json();
}




export default async function AdminCarsPage() {
    // const cars = await getCars();
    // const cars = result.data;

    const result = await getCars();
    const cars = result.data;
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
                        <TableHead>สถานะ</TableHead>
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
                                <div className="flex justify-end gap-2">
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={`/admin/cars/${car._id}`}>
                                            แก้ไข
                                        </Link>
                                    </Button>

                                    {/* <form action={deleteCar.bind(null, car._id)}>
                                        <Button
                                            type="submit"
                                            variant="destructive"
                                            size="sm"
                                        >
                                            ลบ
                                        </Button>
                                    </form> */}


                                    <DeleteCarButton id={car._id} />
                                </div>
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
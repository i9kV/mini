import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

async function getBookings() {
    const res = await fetch("http://localhost:3000/bookings", {
        cache: "no-store",
    });

    return res.json();
}

export default async function AdminBookingsPage() {
    const bookings = await getBookings();

    return (
        <div className="p-6 space-y-6">
            <h2 className="text-xl font-bold">
                รายการจองทั้งหมด
            </h2>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>รถ</TableHead>
                        <TableHead>ลูกค้า</TableHead>
                        <TableHead>เริ่ม</TableHead>
                        <TableHead>สิ้นสุด</TableHead>
                        <TableHead>สถานะ</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {bookings.map((b: any) => (
                        <TableRow key={b._id}>
                            <TableCell>{b.car?.name}</TableCell>
                            <TableCell>{b.customerName}</TableCell>
                            <TableCell>
                                {new Date(b.startDate).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                                {new Date(b.endDate).toLocaleDateString()}
                            </TableCell>
                            <TableCell>{b.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
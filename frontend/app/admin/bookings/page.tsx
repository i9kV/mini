// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "@/components/ui/table";

// async function getBookings() {
//     const res = await fetch("http://localhost:3000/bookings", {
//         cache: "no-store",
//     });

//     return res.json();
// }

// export default async function AdminBookingsPage() {
//     const bookings = await getBookings();

//     return (
//         <div className="p-4 md:p-6 space-y-6">
//             <h2 className="text-xl font-bold">
//                 รายการจองทั้งหมด
//             </h2>

//             {/* ================= DESKTOP TABLE ================= */}
//             <div className="hidden md:block">
//                 <Table>
//                     <TableHeader>
//                         <TableRow>

//                             <TableHead>ยี่ห้อ</TableHead>
//                             <TableHead>รุ่น</TableHead>
//                             <TableHead>อีเมลลูกค้า</TableHead>
//                             <TableHead>เบอร์โทร</TableHead>
//                             <TableHead>เริ่ม</TableHead>
//                             <TableHead>สิ้นสุด</TableHead>
//                             <TableHead>สถานะ</TableHead>
//                         </TableRow>
//                     </TableHeader>

//                     <TableBody>
//                         {bookings.map((b: any) => (
//                             <TableRow key={b._id}>
//                                 <TableCell>{b.car?.brand}</TableCell>
//                                 <TableCell>{b.car?.name}</TableCell>

//                                 <TableCell>{b.customerName}</TableCell>
//                                 <TableCell>{b.phone}</TableCell>
//                                 <TableCell>
//                                     {new Date(b.startDate).toLocaleDateString()}
//                                 </TableCell>
//                                 <TableCell>
//                                     {new Date(b.endDate).toLocaleDateString()}
//                                 </TableCell>
//                                 <TableCell>{b.status}</TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </div>

//             {/* ================= MOBILE CARD ================= */}
//             <div className="md:hidden space-y-4">
//                 {bookings.map((b: any) => (
//                     <div
//                         key={b._id}
//                         className="border rounded-lg p-4 space-y-2 bg-background shadow-sm"
//                     >
//                         <div className="font-semibold">
//                             {b.car?.name}
//                         </div>

//                         <div className="font-semibold">
//                             {b.car?.brand}
//                         </div>

//                         <div className="text-sm text-muted-foreground">
//                             ลูกค้า: {b.customerName}
//                         </div>
//                         <div className="text-sm text-muted-foreground">
//                             เบอร์โทร: {b.phone}
//                         </div>

//                         <div className="text-sm">
//                             เริ่ม: {new Date(b.startDate).toLocaleDateString()}
//                         </div>

//                         <div className="text-sm">
//                             สิ้นสุด: {new Date(b.endDate).toLocaleDateString()}
//                         </div>

//                         <div className="text-sm font-medium">
//                             สถานะ: {b.status}
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

'use client';

import { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function AdminBookingsPage() {
    const [bookings, setBookings] = useState<any[]>([]);

    const fetchBookings = async () => {
        const res = await fetch("http://localhost:3000/bookings", {
            cache: "no-store",
        });
        const data = await res.json();
        setBookings(data);
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const changeStatus = async (id: string, status: string) => {
        await fetch(`http://localhost:3000/bookings/${id}/status`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status }),
        });

        fetchBookings(); // refresh
    };

    return (
        <div className="p-6 space-y-6">
            <h2 className="text-xl font-bold">รายการจองทั้งหมด</h2>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ยี่ห้อ</TableHead>
                        <TableHead>รุ่น</TableHead>
                        <TableHead>ลูกค้า</TableHead>
                        <TableHead>เริ่ม</TableHead>
                        <TableHead>สิ้นสุด</TableHead>
                        <TableHead>สถานะ</TableHead>
                        <TableHead>จัดการ</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {bookings.map((b) => (
                        <TableRow key={b._id}>
                            <TableCell>{b.car?.brand}</TableCell>
                            <TableCell>{b.car?.name}</TableCell>
                            <TableCell>{b.customerName}</TableCell>
                            <TableCell>
                                {new Date(b.startDate).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                                {new Date(b.endDate).toLocaleDateString()}
                            </TableCell>
                            <TableCell>{b.status}</TableCell>

                            <TableCell className="space-x-2">
                                <button
                                    onClick={() => changeStatus(b._id, "completed")}
                                    className="px-3 py-1 bg-green-500 text-white rounded"
                                >
                                    เสร็จสิ้น
                                </button>

                                <button
                                    onClick={() => changeStatus(b._id, "cancelled")}
                                    className="px-3 py-1 bg-red-500 text-white rounded"
                                >
                                    ยกเลิก
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
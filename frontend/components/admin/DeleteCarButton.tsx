"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function DeleteCarButton({ id }: { id: string }) {
    const [loading, setLoading] = useState(false);

    async function handleDelete() {
        setLoading(true);

        await fetch(`http://localhost:3000/cars/${id}`, {
            method: "DELETE",
        });

        window.location.reload(); // รีโหลดหน้า
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                    ลบ
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        ยืนยันการลบรถคันนี้?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        การลบจะไม่สามารถกู้คืนได้
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        disabled={loading}
                    >
                        {loading ? "กำลังลบ..." : "ยืนยันลบ"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
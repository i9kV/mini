"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-muted/40">
            <AdminSidebar open={open} onOpenChange={setOpen} />

            <div className="flex-1 flex flex-col">
                <AdminHeader onMenuClick={() => setOpen(true)} />
                <main className="flex-1 p-6">{children}</main>
            </div>
        </div>
    );
}
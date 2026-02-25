"use client";

import Link from "next/link";
import { LayoutDashboard, Car, CalendarDays, House } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function AdminSidebar({ open, onOpenChange }: Props) {
    const SidebarContent = () => (
        <>
            <div className="p-6 text-xl font-bold border-b">
                Admin Panel
            </div>

            <nav className="space-y-2 px-4 py-4">
                <Link href="/admin" className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted">
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                </Link>

                <Link href="/admin/cars" className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted">
                    <Car className="w-4 h-4" />
                    รถให้เช่าทั้งหมด
                </Link>

                <Link href="/admin/bookings" className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted">
                    <CalendarDays className="w-4 h-4" />
                    การจองทั้งหมด
                </Link>

                <Link href="/" className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted">
                    <House className="w-4 h-4" />
                    กลับหน้าหลัก
                </Link>
            </nav>
        </>
    );

    return (
        <>
            {/* Desktop */}
            <aside className="hidden md:block w-64 bg-background border-r">
                <SidebarContent />
            </aside>

            {/* Mobile Drawer */}
            <Sheet open={open} onOpenChange={onOpenChange}>
                <SheetContent side="left" className="w-64 p-0">
                    <SidebarContent />
                </SheetContent>
            </Sheet>
        </>
    );
}
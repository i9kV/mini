"use client";

import Link from "next/link";
import { LayoutDashboard, Car, CalendarDays } from "lucide-react";

export function AdminSidebar() {
    return (
        <aside className="w-64 bg-background border-r hidden md:block">
            <div className="p-6 text-xl font-bold">Admin Panel</div>

            <nav className="space-y-2 px-4">
                <Link
                    href="/admin"
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted"
                >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                </Link>

                <Link
                    href="/admin/cars"
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted"
                >
                    <Car className="w-4 h-4" />
                    Cars
                </Link>

                <Link
                    href="/admin/bookings"
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted"
                >
                    <CalendarDays className="w-4 h-4" />
                    Bookings
                </Link>
            </nav>
        </aside>
    );
}
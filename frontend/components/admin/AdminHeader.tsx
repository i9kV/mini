"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface Props {
    onMenuClick: () => void;
}

export function AdminHeader({ onMenuClick }: Props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedRole = localStorage.getItem("role");

        setIsLoggedIn(!!token);
        setRole(storedRole);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");

        setIsLoggedIn(false);
        setRole(null);

        window.location.href = "/";
    };

    return (
        <header className="border-b bg-background px-4 h-14 flex items-center justify-between">

            {/* ปุ่ม hamburger แสดงเฉพาะ mobile */}
            <div className="flex items-center gap-2">
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    onClick={onMenuClick}
                >
                    <Menu className="w-5 h-5" />
                </Button>

                <h1 className="text-lg font-semibold">จัดการข้อมูล</h1>
            </div>

            {isLoggedIn && (
                <Button variant="outline" onClick={handleLogout}>
                    ออกจากระบบ
                </Button>
            )}
        </header>
    );
}
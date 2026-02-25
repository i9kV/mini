"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function AdminHeader() {
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

        window.location.href = "/"; // รีโหลดจริง
    };

    return (
        <header className="border-b bg-background px-6 py-4 flex justify-between">
            <h1 className="text-lg font-semibold">Admin Dashboard</h1>

            {isLoggedIn && (
                <Button variant="outline" onClick={handleLogout}>
                    ออกจากระบบ
                </Button>
            )}
        </header>
    );
}
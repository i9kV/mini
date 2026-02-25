'use client'

import { Button } from "@/components/ui/button";
import {
  Sheet, SheetContent, SheetTrigger,
  SheetHeader, SheetTitle, SheetDescription
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggle from "../theme-toggle";
import { NavMenu } from "./nav-menu";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

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

    // router.refresh();
    // router.replace("/");
    window.location.href = "/"
  };

  return (
    <nav className="sticky z-10 top-6 inset-x-4 h-14 bg-background/50 backdrop-blur-sm border w-full max-w-5xl mx-auto rounded-full  ">
      <div className="h-full flex items-center justify-between px-4">

        <Link href="/">ระบบเช่ารถ</Link>

        {/* Desktop Menu */}
        <NavMenu className="hidden md:block" />

        <div className="flex items-center gap-3">
          <ThemeToggle />

          {/* 🔥 แสดงปุ่ม Admin ถ้าเป็น admin */}
          {isLoggedIn && role === "admin" && (
            <Button asChild variant="secondary" className="hidden md:block">
              Admin
            </Button>
          )}

          {/* Desktop Login/Logout */}
          <div className="hidden md:block">
            {isLoggedIn ? (
              <Button variant="destructive" onClick={handleLogout}>
                ออกจากระบบ
              </Button>
            ) : (
              <Button asChild variant="outline">
                <Link href="/auth/login">เข้าสู่ระบบ</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Menu />
                </Button>
              </SheetTrigger>

              <SheetContent>
                <SheetHeader>
                  <SheetTitle>เมนูนำทาง</SheetTitle>
                  <SheetDescription>

                  </SheetDescription>
                </SheetHeader>

                <NavMenu orientation="vertical" className="mt-6" />

                {/* 🔥 Mobile Admin */}
                {isLoggedIn && role === "admin" && (
                  <Button asChild className="w-full mt-4">
                    Admin
                  </Button>
                )}

                <div className="mt-8 space-y-4">
                  {isLoggedIn ? (
                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={handleLogout}
                    >
                      ออกจากระบบ
                    </Button>
                  ) : (
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/auth/login">เข้าสู่ระบบ</Link>
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
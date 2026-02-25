'use client'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { useEffect, useState } from "react";

export const NavMenu = (props: NavigationMenuProps) => {

  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className="gap-6 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/car">ค้นหารถ</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/#features">ข้อมูล</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>



        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="./history">ประวัติการจอง</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>


        {role === "admin" && (
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/admin">จัดการข้อมูล</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        )}

      </NavigationMenuList>
    </NavigationMenu>
  );
};
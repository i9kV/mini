import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div
      className="
      relative
      min-h-[calc(100vh-6rem)]
      flex items-center justify-center
      px-6
      bg-no-repeat
      bg-center
      bg-[length:130%]
      sm:bg-cover
      "
      style={{
        backgroundImage: "url('https://www.wsupercars.com/wallpapers-regular/Audi/2027-Audi-RS5-007-1600.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

      {/* Content */}
      <div className="relative  text-center max-w-2xl text-white">
        <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight">
          เดินทางสะดวก เที่ยวได้ทุกที่ ราคาสุดคุ้ม
        </h1>

        <p className="mt-6 text-base sm:text-lg text-gray-200">
          สัมผัสประสบการณ์การเดินทางที่ไร้ขีดจำกัดในเชียงใหม่
          กับบริการเช่ารถที่ง่าย ปลอดภัย และสะดวกสบาย
          ไม่ว่าจะเที่ยวดอย เที่ยวคาเฟ่ หรือขับรถชมเมือง
          ก็สามารถเลือกประเภทของรถให้เหมาะกับการใช้งาน
        </p>

        <div className="mt-10 flex justify-center">
          <Link href="/car">
            <Button
              size="lg"
              className="rounded-full px-8 text-base bg-white text-black hover:bg-gray-200"
            >
              ค้นหารถกันเลย!!
              <ArrowUpRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
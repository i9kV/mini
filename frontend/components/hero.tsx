import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CirclePlay } from "lucide-react";
import React from "react";
import LogoCloud from "./logo-cloud";
import Link from "next/link";
const Hero = () => {
  return (
    <div className="min-h-[calc(100vh-6rem)] flex flex-col items-center py-20 px-6">
      <div className="md:mt-6 flex items-center justify-center">
        <div className="text-center max-w-2xl">

          <h1 className="mt-6 max-w-[20ch] text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold !leading-[1.2] tracking-tight">
            เดินทางสะดวก เที่ยวได้ทุกที่ ราคาสุดคุ้ม
          </h1>
          <p className="mt-6 max-w-[60ch] xs:text-lg">
            สัมผัสประสบการณ์การเดินทางที่ไร้ขีดจำกัดในเชียงใหม่ กับบริการ เช่ารถเชียงใหม่ ที่ง่าย ปลอดภัย และสะดวกสบาย ไม่ว่าจะเที่ยวดอย เที่ยวคาเฟ่ หรือขับรถชมเมือง ก็สามารถเลือกประเภทของรถให้เหมาะกับการใช้งาน
          </p>
          <div className="mt-12 flex flex-col xs:flex-row items-center sm:justify-center gap-4">
            <Link href="../car">
              <Button

                size="lg"
                className="w-full sm:w-auto rounded-full text-base"
              >
                ค้นหารถกันเลย!!<ArrowUpRight className="!h-5 !w-5" />

              </Button>
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Hero;

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function FilterBar() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState(searchParams.get("search") || "");
    const [type, setType] = useState(searchParams.get("type") || "all");
    const [available, setAvailable] = useState(
        searchParams.get("available") || "all"
    );

    const handleSearch = () => {
        const params = new URLSearchParams();

        if (search) params.set("search", search);
        if (type !== "all") params.set("type", type);
        if (available !== "all") params.set("available", available);

        router.push(`/car?${params.toString()}`);
    };

    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4 bg-card p-6 rounded-2xl shadow">

            {/* Search */}
            <Input
                className="w-full"
                placeholder="ค้นหาชื่อรถ..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {/* Type */}
            <Select value={type} onValueChange={setType}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="เลือกประเภท" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">ทุกประเภท</SelectItem>
                    <SelectItem value="SUV">SUV</SelectItem>
                    <SelectItem value="Sedan">Sedan</SelectItem>
                    <SelectItem value="Van">Van</SelectItem>
                </SelectContent>
            </Select>

            {/* Available */}
            <Select value={available} onValueChange={setAvailable}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="สถานะ" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">ทุกสถานะ</SelectItem>
                    <SelectItem value="true">พร้อมให้เช่า</SelectItem>
                    <SelectItem value="false">ไม่พร้อม</SelectItem>
                </SelectContent>
            </Select>

            {/* Button */}
            <Button
                className="w-full"
                onClick={handleSearch}
            >
                ค้นหา
            </Button>
        </div>
    );
}
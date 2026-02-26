import Link from "next/link";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import FilterBar from "./FilterBar";

interface SearchParams {
    search?: string;
    type?: string;
    available?: string;
}

async function getCars(searchParams: SearchParams) {
    const query = new URLSearchParams();

    if (searchParams.search)
        query.append("search", searchParams.search);

    if (searchParams.type && searchParams.type !== "all")
        query.append("type", searchParams.type);

    if (searchParams.available && searchParams.available !== "all")
        query.append("available", searchParams.available);

    const res = await fetch(
        `http://localhost:3000/cars?${query.toString()}`,
        { cache: "no-store" }
    );

    if (!res.ok) throw new Error("Failed to fetch cars");

    return res.json();
}

export default async function HomePage(props: {
    searchParams: Promise<SearchParams>;
}) {
    const searchParams = await props.searchParams;

    const result = await getCars(searchParams);
    const cars = result.data;
    return (
        <div className="p-10 space-y-8">
            <Navbar />
            <h1 className="text-3xl font-bold text-center">
                รถให้เช่าทั้งหมด
            </h1>

            {/* 🔎 FILTER BAR */}
            <FilterBar />

            {/* 🚘 CAR GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cars.map((car: any) => (
                    <Card
                        key={car._id}
                        className="
                    group 
                    rounded-3xl 
                    border 
                    bg-card 
                    text-card-foreground
                    shadow-sm 
                    hover:shadow-2xl 
                    hover:-translate-y-2 
                    transition-all 
                    duration-500 
                    overflow-hidden
                  "
                    >
                        {/* Image */}
                        <div className="relative overflow-hidden">
                            {car.imageUrl && (
                                <img
                                    src={`http://localhost:3000${car.imageUrl}`}
                                    alt={car.name}
                                    className="w-full h-52 object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            )}

                            {/* Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent dark:from-black/80" />

                            {/* Type Badge */}
                            <Badge className="absolute top-4 left-4 bg-background/80 backdrop-blur-md text-foreground border">
                                {car.type}
                            </Badge>

                            {/* Availability */}
                            <Badge
                                className={`absolute top-4 right-4 ${car.available
                                    ? "bg-green-500 hover:bg-green-600 text-white"
                                    : "bg-red-500 hover:bg-red-600 text-white"
                                    }`}
                            >
                                {car.available ? "พร้อมให้เช่า" : "ไม่พร้อม"}
                            </Badge>
                        </div>

                        {/* Content */}
                        <CardContent className="p-6 space-y-4">
                            <div className="flex justify-between items-start">
                                <h3 className="text-xl font-semibold tracking-tight">
                                    {car.name}
                                </h3>

                                <p className="text-lg font-bold text-primary">
                                    ฿{car.pricePerDay}
                                    <span className="text-sm font-normal text-muted-foreground">
                                        /วัน
                                    </span>
                                </p>
                            </div>

                            {car.available ? (
                                <Button
                                    asChild
                                    className="w-full rounded-xl shadow-md hover:shadow-lg transition"
                                >
                                    <Link href={`/car/${car._id}`}>
                                        จองรถคันนี้
                                    </Link>
                                </Button>
                            ) : (
                                <Button
                                    disabled
                                    className="w-full rounded-xl opacity-50 cursor-not-allowed"
                                >
                                    ไม่สามารถจองได้
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
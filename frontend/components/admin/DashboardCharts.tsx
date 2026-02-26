"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

interface Props {
    overviewData: any[];
    revenueData: any[];
}

export function DashboardCharts({ overviewData, revenueData }: Props) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Overview Chart */}
            <div className="w-full h-[250px] sm:h-[300px] lg:h-[350px] bg-white rounded-xl p-4 shadow">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={overviewData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="name"
                            tick={{ fontSize: 12 }}
                        />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Bar dataKey="value" radius={[6, 6, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Revenue Chart */}
            <div className="w-full h-[250px] sm:h-[300px] lg:h-[350px] bg-white rounded-xl p-4 shadow">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="month"
                            tick={{ fontSize: 12 }}
                        />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Bar dataKey="total" radius={[6, 6, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
}
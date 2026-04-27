import { Head, usePage } from '@inertiajs/react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { dashboard } from '@/routes';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
);

interface Stats {
    total_today_reservations: number;
    total_confirmed: number;
    total_guests_expected: number;
    total_capacity: number;
    total_tables: number;
    total_reserved_tables: number;
}

interface PageProps {
    [key: string]: unknown;
    stats: Stats;
    weeklyChart: number[];
    weekLabels: string[];
    statusChart: {
        labels: string[];
        data: number[];
    };
    locationChart: {
        labels: string[];
        tables: number[];
        capacity: number[];
    };
    recentReservations: Array<{
        id: number;
        date: string;
        time: string;
        guest_count: number;
        customer: { name: string };
        status: { name: string; slug: string };
    }>;
}

const statusColors: Record<string, string> = {
    pending: '#f59e0b',
    confirmed: '#22c55e',
    cancelled: '#ef4444',
    completed: '#3b82f6',
};

export default function Dashboard() {
    const {
        stats,
        weeklyChart,
        weekLabels,
        statusChart,
        locationChart,
        recentReservations,
    } = usePage<PageProps>().props;

    const weeklyChartData = {
        labels: weekLabels.map((date) => {
            const d = new Date(date);

            return d.toLocaleDateString('en-US', { weekday: 'short' });
        }),
        datasets: [
            {
                label: 'Reservations',
                data: weeklyChart,
                backgroundColor: 'rgba(212, 165, 116, 0.8)',
                borderColor: 'rgba(212, 165, 116, 1)',
                borderWidth: 1,
                borderRadius: 8,
            },
        ],
    };

    const statusChartData = {
        labels:
            statusChart.labels.length > 0 ? statusChart.labels : ['No Data'],
        datasets: [
            {
                data: statusChart.data.length > 0 ? statusChart.data : [1],
                backgroundColor: statusChart.labels.map(
                    (label) => statusColors[label.toLowerCase()] || '#6b7280',
                ),
                borderWidth: 0,
            },
        ],
    };


    const locationChartData = {
        labels: locationChart.labels.map((loc) =>
            loc.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
        ),
        datasets: [
            {
                label: 'Tables',
                data: locationChart.tables,
                backgroundColor: 'rgba(212, 165, 116, 0.8)',
                borderRadius: 4,
            },
            {
                label: 'Capacity',
                data: locationChart.capacity,
                backgroundColor: 'rgba(212, 165, 116, 0.4)',
                borderRadius: 4,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
        },
    };

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3 lg:grid-cols-6">
                    <div className="rounded-xl border border-sidebar-border/70 bg-white p-6 shadow-sm dark:border-sidebar-border">
                        <p className="text-sm text-muted-foreground">
                            Today's Reservations
                        </p>
                        <p className="mt-2 text-3xl font-bold text-[#d4a574]">
                            {stats.total_today_reservations}
                        </p>
                    </div>
                    <div className="rounded-xl border border-sidebar-border/70 bg-white p-6 shadow-sm dark:border-sidebar-border">
                        <p className="text-sm text-muted-foreground">
                            Confirmed
                        </p>
                        <p className="mt-2 text-3xl font-bold text-green-600">
                            {stats.total_confirmed}
                        </p>
                    </div>
                    <div className="rounded-xl border border-sidebar-border/70 bg-white p-6 shadow-sm dark:border-sidebar-border">
                        <p className="text-sm text-muted-foreground">
                            Guests Expected
                        </p>
                        <p className="mt-2 text-3xl font-bold text-[#d4a574]">
                            {stats.total_guests_expected}
                        </p>
                    </div>
                    <div className="rounded-xl border border-sidebar-border/70 bg-white p-6 shadow-sm dark:border-sidebar-border">
                        <p className="text-sm text-muted-foreground">
                            Total Capacity
                        </p>
                        <p className="mt-2 text-3xl font-bold text-[#d4a574]">
                            {stats.total_capacity}
                        </p>
                    </div>
                    <div className="rounded-xl border border-sidebar-border/70 bg-white p-6 shadow-sm dark:border-sidebar-border">
                        <p className="text-sm text-muted-foreground">
                            Total Tables
                        </p>
                        <p className="mt-2 text-3xl font-bold text-[#d4a574]">
                            {stats.total_tables}
                        </p>
                    </div>
                    <div className="rounded-xl border border-sidebar-border/70 bg-white p-6 shadow-sm dark:border-sidebar-border">
                        <p className="text-sm text-muted-foreground">
                            Reserved Tables
                        </p>
                        <p className="mt-2 text-3xl font-bold text-[#d4a574]">
                            {stats.total_reserved_tables}
                        </p>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-xl border border-sidebar-border/70 bg-white p-6 shadow-sm dark:border-sidebar-border">
                        <h3 className="mb-4 text-lg font-semibold">
                            Weekly Reservations
                        </h3>
                        <div className="h-64">
                            <Bar
                                data={weeklyChartData}
                                options={chartOptions}
                            />
                        </div>
                    </div>
                    <div className="rounded-xl border border-sidebar-border/70 bg-white p-6 shadow-sm dark:border-sidebar-border">
                        <h3 className="mb-4 text-lg font-semibold">
                            Today's Status
                        </h3>
                        <div className="h-64">
                            <Doughnut
                                data={statusChartData}
                                options={chartOptions}
                            />
                        </div>
                    </div>
                    <div className="rounded-xl border border-sidebar-border/70 bg-white p-6 shadow-sm dark:border-sidebar-border">
                        <h3 className="mb-4 text-lg font-semibold">
                            Tables by Location
                        </h3>
                        <div className="h-64">
                            <Bar
                                data={locationChartData}
                                options={chartOptions}
                            />
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-sidebar-border/70 bg-white p-6 shadow-sm dark:border-sidebar-border">
                    <h3 className="mb-4 text-lg font-semibold">
                        Recent Reservations
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b text-left text-sm text-muted-foreground">
                                    <th className="pr-4 pb-3">Customer</th>
                                    <th className="pr-4 pb-3">Date</th>
                                    <th className="pr-4 pb-3">Time</th>
                                    <th className="pr-4 pb-3">Guests</th>
                                    <th className="pb-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentReservations.map((reservation) => (
                                    <tr
                                        key={reservation.id}
                                        className="border-b last:border-0"
                                    >
                                        <td className="py-3 pr-4 font-medium">
                                            {reservation.customer.name}
                                        </td>
                                        <td className="py-3 pr-4">
                                            {new Date(
                                                reservation.date,
                                            ).toLocaleDateString()}
                                        </td>
                                        <td className="py-3 pr-4">
                                            {reservation.time}
                                        </td>
                                        <td className="py-3 pr-4">
                                            {reservation.guest_count}
                                        </td>
                                        <td className="py-3">
                                            <span
                                                className="inline-flex rounded-full px-2 py-1 text-xs font-medium"
                                                style={{
                                                    backgroundColor: `${statusColors[reservation.status.slug]}20`,
                                                    color: statusColors[
                                                        reservation.status.slug
                                                    ],
                                                }}
                                            >
                                                {reservation.status.name}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};

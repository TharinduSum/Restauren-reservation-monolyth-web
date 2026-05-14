import { Head, usePage, router } from '@inertiajs/react';
import { Calendar, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { reservations as reservationsRoute } from '@/routes';

interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string | null;
}

interface ReservationStatus {
    id: number;
    name: string;
    slug: string;
}

interface Reservation {
    id: number;
    customer_id: number;
    reservation_status_id: number;
    date: string;
    time: string;
    guest_count: number;
    special_requests: string | null;
    created_at: string;
    customer: Customer;
    status: ReservationStatus;
}

interface PageProps {
    [key: string]: unknown;
    reservations: Reservation[];
    total: number;
    currentPage: number;
    lastPage: number;
    search: string;
    statusFilter: string;
    statuses: ReservationStatus[];
}

const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    completed: 'bg-gray-100 text-gray-800',
};

export default function Reservations() {
    const {
        reservations,
        total,
        currentPage,
        lastPage,
        search,
        statusFilter,
        statuses,
    } = usePage<PageProps>().props;

    const [searchQuery, setSearchQuery] = useState(search);
    const [selectedStatus, setSelectedStatus] = useState(statusFilter);
    const [updatingId, setUpdatingId] = useState<number | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery !== search || selectedStatus !== statusFilter) {
                router.get(
                    reservationsRoute(),
                    { search: searchQuery, status: selectedStatus },
                    { preserveState: true },
                );
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery, selectedStatus, search, statusFilter]);

    const handleStatusChange = (reservationId: number, statusId: number) => {
        setUpdatingId(reservationId);
        router.put(
            `/reservations/${reservationId}/status`,
            { reservation_status_id: statusId },
            {
                onFinish: () => setUpdatingId(null),
            },
        );
    };

    const goToPage = (page: number) => {
        router.get(
            reservationsRoute(),
            { page, search: searchQuery, status: selectedStatus },
            { preserveState: true },
        );
    };

    const formatTime = (time: string) => {
        const [hours, minutes] = time.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${ampm}`;
    };

    return (
        <>
            <Head title="Reservations" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div>
                    <h1 className="text-2xl font-bold">Reservations</h1>
                    <p className="text-sm text-muted-foreground">
                        Manage your restaurant reservations
                    </p>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="relative flex-1">
                        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search by customer name, email, or phone..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                    >
                        <option value="">All Statuses</option>
                        {statuses.map((status) => (
                            <option key={status.id} value={status.id}>
                                {status.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="rounded-xl border bg-white shadow-sm dark:border-sidebar-border dark:bg-sidebar">
                    {reservations.length > 0 ? (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b bg-muted/50">
                                            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                                                Customer
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                                                Date & Time
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                                                Guests
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                                                Status
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                                                Special Requests
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reservations.map((reservation) => (
                                            <tr
                                                key={reservation.id}
                                                className="border-b last:border-0 hover:bg-muted/50"
                                            >
                                                <td className="px-4 py-3">
                                                    <div className="font-medium">
                                                        {
                                                            reservation.customer
                                                                .name
                                                        }
                                                    </div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {
                                                            reservation.customer
                                                                .email
                                                        }
                                                    </div>
                                                    {reservation.customer
                                                        .phone && (
                                                        <div className="text-sm text-muted-foreground">
                                                            {
                                                                reservation
                                                                    .customer
                                                                    .phone
                                                            }
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="size-4 text-muted-foreground" />
                                                        <span>
                                                            {new Date(
                                                                reservation.date,
                                                            ).toLocaleDateString(
                                                                'en-US',
                                                                {
                                                                    weekday:
                                                                        'short',
                                                                    month: 'short',
                                                                    day: 'numeric',
                                                                    year: 'numeric',
                                                                },
                                                            )}
                                                        </span>
                                                    </div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {formatTime(
                                                            reservation.time,
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    {reservation.guest_count}{' '}
                                                    {reservation.guest_count ===
                                                    1
                                                        ? 'Guest'
                                                        : 'Guests'}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <select
                                                        value={
                                                            reservation.reservation_status_id
                                                        }
                                                        onChange={(e) =>
                                                            handleStatusChange(
                                                                reservation.id,
                                                                parseInt(
                                                                    e.target
                                                                        .value,
                                                                ),
                                                            )
                                                        }
                                                        disabled={
                                                            updatingId ===
                                                            reservation.id
                                                        }
                                                        className={`rounded-full px-3 py-1 text-sm font-medium ${statusColors[reservation.status.slug] || 'bg-gray-100 text-gray-800'} cursor-pointer border-0`}
                                                    >
                                                        {statuses.map(
                                                            (status) => (
                                                                <option
                                                                    key={
                                                                        status.id
                                                                    }
                                                                    value={
                                                                        status.id
                                                                    }
                                                                >
                                                                    {
                                                                        status.name
                                                                    }
                                                                </option>
                                                            ),
                                                        )}
                                                    </select>
                                                </td>
                                                <td className="px-4 py-3 text-muted-foreground">
                                                    <span className="block max-w-[200px] truncate">
                                                        {reservation.special_requests ||
                                                            '-'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {lastPage > 1 && (
                                <div className="flex items-center justify-between border-t px-4 py-3">
                                    <p className="text-sm text-muted-foreground">
                                        Showing {(currentPage - 1) * 10 + 1} to{' '}
                                        {Math.min(currentPage * 10, total)} of{' '}
                                        {total} results
                                    </p>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                goToPage(currentPage - 1)
                                            }
                                            disabled={currentPage === 1}
                                        >
                                            Previous
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                goToPage(currentPage + 1)
                                            }
                                            disabled={currentPage === lastPage}
                                        >
                                            Next
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12">
                            <Calendar className="size-12 text-muted-foreground/50" />
                            <p className="mt-4 text-lg font-medium">
                                No reservations found
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {search || statusFilter
                                    ? 'Try adjusting your search or filter'
                                    : 'Reservations will appear here'}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

Reservations.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Reservations',
            href: reservationsRoute(),
        },
    ],
};

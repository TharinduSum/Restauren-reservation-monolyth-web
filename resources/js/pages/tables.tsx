import { Head, router, usePage } from '@inertiajs/react';
import { Armchair, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { tables as tablesRoute } from '@/routes';
import { destroy, store, update } from '@/routes/tables';

type TableLocation = 'indoor' | 'outdoor' | 'window' | 'private_room' | 'bar';

interface Table {
    id: number;
    name: string;
    capacity: number;
    location: TableLocation;
    description: string | null;
    is_active: boolean;
}

interface PageProps {
    [key: string]: unknown;
    tables: Table[];
    total: number;
    currentPage: number;
    lastPage: number;
    search: string;
}

const locationOptions: { label: string; value: TableLocation }[] = [
    { label: 'Indoor', value: 'indoor' },
    { label: 'Outdoor', value: 'outdoor' },
    { label: 'Window', value: 'window' },
    { label: 'Private room', value: 'private_room' },
    { label: 'Bar', value: 'bar' },
];

export default function Tables() {
    const { tables, total, currentPage, lastPage, search } =
        usePage<PageProps>().props;

    const [searchQuery, setSearchQuery] = useState(search);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingTable, setEditingTable] = useState<Table | null>(null);
    const [deletingTable, setDeletingTable] = useState<Table | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [formData, setFormData] = useState({
        name: '',
        capacity: '2',
        location: 'indoor' as TableLocation,
        description: '',
        auto_approve: true,
        is_active: true,
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery !== search) {
                router.get(
                    tablesRoute(),
                    { search: searchQuery },
                    { preserveState: true },
                );
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery, search]);

    const openAddModal = () => {
        setEditingTable(null);
        setFormData({
            name: '',
            capacity: '2',
            location: 'indoor',
            description: '',
            auto_approve: true,
            is_active: true,
        });
        setErrors({});
        setIsModalOpen(true);
    };

    const openEditModal = (table: Table) => {
        setEditingTable(table);
        setFormData({
            name: table.name,
            capacity: String(table.capacity),
            location: table.location,
            description: table.description ?? '',
            auto_approve: table.is_active,
            is_active: table.is_active,
        });
        setErrors({});
        setIsModalOpen(true);
    };

    const openDeleteModal = (table: Table) => {
        setDeletingTable(table);
        setIsDeleteModalOpen(true);
    };

    const handleSubmit = () => {
        setIsSubmitting(true);
        setErrors({});

        const payload = {
            name: formData.name,
            capacity: Number(formData.capacity),
            location: formData.location,
            description: formData.description || null,
            ...(editingTable
                ? { is_active: formData.is_active }
                : { auto_approve: formData.auto_approve }),
        };

        if (editingTable) {
            router.put(update(editingTable.id).url, payload, {
                onSuccess: () => {
                    setIsModalOpen(false);
                    setIsSubmitting(false);
                },
                onError: (err) => {
                    setErrors(err as Record<string, string>);
                    setIsSubmitting(false);
                },
            });

            return;
        }

        router.post(store().url, payload, {
            onSuccess: () => {
                setIsModalOpen(false);
                setIsSubmitting(false);
            },
            onError: (err) => {
                setErrors(err as Record<string, string>);
                setIsSubmitting(false);
            },
        });
    };

    const handleDelete = () => {
        if (!deletingTable) {
            return;
        }

        setIsSubmitting(true);
        router.delete(destroy(deletingTable.id).url, {
            onSuccess: () => {
                setIsDeleteModalOpen(false);
                setDeletingTable(null);
                setIsSubmitting(false);
            },
            onError: () => {
                setIsSubmitting(false);
            },
        });
    };

    const goToPage = (page: number) => {
        router.get(
            tablesRoute(),
            { page, search: searchQuery },
            { preserveState: true },
        );
    };

    return (
        <>
            <Head title="Tables" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Tables</h1>
                        <p className="text-sm text-muted-foreground">
                            Manage restaurant seating tables
                        </p>
                    </div>
                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                        <DialogTrigger asChild>
                            <Button
                                onClick={openAddModal}
                                className="bg-[#d4a574] hover:bg-[#c9956c]"
                            >
                                <Plus className="mr-2 size-4" />
                                Add Table
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    {editingTable ? 'Edit Table' : 'Add Table'}
                                </DialogTitle>
                                <DialogDescription>
                                    {editingTable
                                        ? 'Update table details'
                                        : 'Create a new table with optional auto-approval'}
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Table name</Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(event) =>
                                            setFormData({
                                                ...formData,
                                                name: event.target.value,
                                            })
                                        }
                                        placeholder="Ex: T1 or Garden 4"
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-red-500">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="capacity">Capacity</Label>
                                    <Input
                                        id="capacity"
                                        type="number"
                                        min={1}
                                        value={formData.capacity}
                                        onChange={(event) =>
                                            setFormData({
                                                ...formData,
                                                capacity: event.target.value,
                                            })
                                        }
                                    />
                                    {errors.capacity && (
                                        <p className="text-sm text-red-500">
                                            {errors.capacity}
                                        </p>
                                    )}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="location">Location</Label>
                                    <select
                                        id="location"
                                        value={formData.location}
                                        onChange={(event) =>
                                            setFormData({
                                                ...formData,
                                                location: event.target
                                                    .value as TableLocation,
                                            })
                                        }
                                        className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    >
                                        {locationOptions.map((option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.location && (
                                        <p className="text-sm text-red-500">
                                            {errors.location}
                                        </p>
                                    )}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="description">
                                        Description
                                    </Label>
                                    <textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={(event) =>
                                            setFormData({
                                                ...formData,
                                                description:
                                                    event.target.value,
                                            })
                                        }
                                        placeholder="Optional table details"
                                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                                    />
                                </div>

                                {editingTable ? (
                                    <div className="flex items-center gap-3">
                                        <Checkbox
                                            id="is_active"
                                            checked={formData.is_active}
                                            onCheckedChange={(checked) =>
                                                setFormData({
                                                    ...formData,
                                                    is_active: checked === true,
                                                })
                                            }
                                        />
                                        <Label htmlFor="is_active">
                                            Active table
                                        </Label>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-3">
                                        <Checkbox
                                            id="auto_approve"
                                            checked={formData.auto_approve}
                                            onCheckedChange={(checked) =>
                                                setFormData({
                                                    ...formData,
                                                    auto_approve:
                                                        checked === true,
                                                })
                                            }
                                        />
                                        <Label htmlFor="auto_approve">
                                            Auto-approve this table on creation
                                        </Label>
                                    </div>
                                )}
                            </div>
                            <DialogFooter>
                                <Button
                                    variant="outline"
                                    onClick={() => setIsModalOpen(false)}
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="bg-[#d4a574] hover:bg-[#c9956c]"
                                >
                                    {isSubmitting
                                        ? 'Saving...'
                                        : editingTable
                                          ? 'Update'
                                          : 'Create'}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="relative">
                    <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search tables by name, location, or description..."
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        className="pl-10"
                    />
                </div>

                <div className="rounded-xl border bg-white shadow-sm dark:border-sidebar-border dark:bg-sidebar">
                    {tables.length > 0 ? (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b bg-muted/50">
                                            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                                                Name
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                                                Capacity
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                                                Location
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                                                Status
                                            </th>
                                            <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tables.map((table) => (
                                            <tr
                                                key={table.id}
                                                className="border-b last:border-0 hover:bg-muted/50"
                                            >
                                                <td className="px-4 py-3">
                                                    <div className="font-medium">
                                                        {table.name}
                                                    </div>
                                                    {table.description && (
                                                        <div className="max-w-[220px] truncate text-xs text-muted-foreground">
                                                            {table.description}
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3 text-muted-foreground">
                                                    {table.capacity}
                                                </td>
                                                <td className="px-4 py-3 text-muted-foreground">
                                                    {table.location.replaceAll(
                                                        '_',
                                                        ' ',
                                                    )}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span
                                                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                                                            table.is_active
                                                                ? 'bg-green-100 text-green-700'
                                                                : 'bg-gray-100 text-gray-600'
                                                        }`}
                                                    >
                                                        {table.is_active
                                                            ? 'Active'
                                                            : 'Inactive'}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() =>
                                                                openEditModal(
                                                                    table,
                                                                )
                                                            }
                                                        >
                                                            <Pencil className="size-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() =>
                                                                openDeleteModal(
                                                                    table,
                                                                )
                                                            }
                                                            className="text-red-500 hover:text-red-600"
                                                        >
                                                            <Trash2 className="size-4" />
                                                        </Button>
                                                    </div>
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
                            <Armchair className="size-12 text-muted-foreground/50" />
                            <p className="mt-4 text-lg font-medium">
                                No tables found
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {search
                                    ? 'Try adjusting your search query'
                                    : 'Add your first table to get started'}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <Dialog
                open={isDeleteModalOpen}
                onOpenChange={setIsDeleteModalOpen}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Table</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete {deletingTable?.name}
                            ? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsDeleteModalOpen(false)}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Deleting...' : 'Delete'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

Tables.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Tables',
            href: tablesRoute(),
        },
    ],
};

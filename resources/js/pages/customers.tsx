import { Head, usePage, router } from '@inertiajs/react';
import { Users, Plus, Search, Pencil, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
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
import { customers as customersRoute } from '@/routes';

interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    notes: string | null;
    created_at: string;
}

interface PageProps {
    [key: string]: unknown;
    customers: Customer[];
    total: number;
    currentPage: number;
    lastPage: number;
    search: string;
}

export default function Customers() {
    const { customers, total, currentPage, lastPage, search } =
        usePage<PageProps>().props;

    const [searchQuery, setSearchQuery] = useState(search);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState<Customer | null>(
        null,
    );
    const [deletingCustomer, setDeletingCustomer] = useState<Customer | null>(
        null,
    );
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        notes: '',
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery !== search) {
                router.get(
                    customersRoute(),
                    { search: searchQuery },
                    { preserveState: true },
                );
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery, search]);

    const openAddModal = () => {
        setEditingCustomer(null);
        setFormData({ name: '', email: '', phone: '', notes: '' });
        setErrors({});
        setIsModalOpen(true);
    };

    const openEditModal = (customer: Customer) => {
        setEditingCustomer(customer);
        setFormData({
            name: customer.name,
            email: customer.email,
            phone: customer.phone || '',
            notes: customer.notes || '',
        });
        setErrors({});
        setIsModalOpen(true);
    };

    const openDeleteModal = (customer: Customer) => {
        setDeletingCustomer(customer);
        setIsDeleteModalOpen(true);
    };

    const handleSubmit = () => {
        setIsSubmitting(true);
        setErrors({});

        const url = editingCustomer
            ? `/customers/${editingCustomer.id}`
            : '/customers';
        const method = editingCustomer ? 'put' : 'post';

        router[method](url, formData, {
            onSuccess: () => {
                setIsModalOpen(false);
                setIsSubmitting(false);
            },
            onError: (err) => {
                setErrors(err);
                setIsSubmitting(false);
            },
        });
    };

    const handleDelete = () => {
        if (!deletingCustomer) {
            return;
        }

        setIsSubmitting(true);
        router.delete(`/customers/${deletingCustomer.id}`, {
            onSuccess: () => {
                setIsDeleteModalOpen(false);
                setDeletingCustomer(null);
                setIsSubmitting(false);
            },
            onError: () => {
                setIsSubmitting(false);
            },
        });
    };

    const goToPage = (page: number) => {
        router.get(
            customersRoute(),
            { page, search: searchQuery },
            { preserveState: true },
        );
    };

    return (
        <>
            <Head title="Customers" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Customers</h1>
                        <p className="text-sm text-muted-foreground">
                            Manage your restaurant customers
                        </p>
                    </div>
                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                        <DialogTrigger asChild>
                            <Button
                                onClick={openAddModal}
                                className="bg-[#d4a574] hover:bg-[#c9956c]"
                            >
                                <Plus className="mr-2 size-4" />
                                Add Customer
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    {editingCustomer
                                        ? 'Edit Customer'
                                        : 'Add New Customer'}
                                </DialogTitle>
                                <DialogDescription>
                                    {editingCustomer
                                        ? 'Update customer information'
                                        : 'Enter customer details to add a new customer'}
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <label className="text-sm font-medium">
                                        Name
                                    </label>
                                    <Input
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                name: e.target.value,
                                            })
                                        }
                                        placeholder="Enter customer name"
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-red-500">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>
                                <div className="grid gap-2">
                                    <label className="text-sm font-medium">
                                        Email
                                    </label>
                                    <Input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                email: e.target.value,
                                            })
                                        }
                                        placeholder="Enter email address"
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-red-500">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>
                                <div className="grid gap-2">
                                    <label className="text-sm font-medium">
                                        Phone
                                    </label>
                                    <Input
                                        value={formData.phone}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                phone: e.target.value,
                                            })
                                        }
                                        placeholder="Enter phone number"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <label className="text-sm font-medium">
                                        Notes
                                    </label>
                                    <textarea
                                        value={formData.notes}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                notes: e.target.value,
                                            })
                                        }
                                        placeholder="Add any notes about this customer"
                                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                                    />
                                </div>
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
                                        : editingCustomer
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
                        placeholder="Search customers by name, email, or phone..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>

                <div className="rounded-xl border bg-white shadow-sm dark:border-sidebar-border dark:bg-sidebar">
                    {customers.length > 0 ? (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b bg-muted/50">
                                            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                                                Customer
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                                                Email
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                                                Phone
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                                                Notes
                                            </th>
                                            <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {customers.map((customer) => (
                                            <tr
                                                key={customer.id}
                                                className="border-b last:border-0 hover:bg-muted/50"
                                            >
                                                <td className="px-4 py-3">
                                                    <span className="font-medium">
                                                        {customer.name}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-muted-foreground">
                                                    {customer.email}
                                                </td>
                                                <td className="px-4 py-3 text-muted-foreground">
                                                    {customer.phone || '-'}
                                                </td>
                                                <td className="px-4 py-3 text-muted-foreground">
                                                    <span className="block max-w-[200px] truncate">
                                                        {customer.notes || '-'}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() =>
                                                                openEditModal(
                                                                    customer,
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
                                                                    customer,
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
                            <Users className="size-12 text-muted-foreground/50" />
                            <p className="mt-4 text-lg font-medium">
                                No customers found
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {search
                                    ? 'Try adjusting your search query'
                                    : 'Add your first customer to get started'}
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
                        <DialogTitle>Delete Customer</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete{' '}
                            {deletingCustomer?.name}? This action cannot be
                            undone.
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

Customers.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Customers',
            href: customersRoute(),
        },
    ],
};

import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'University Missions', href: '/umissions' },
];

export default function UMissions({ umissions }: any) {

    const auth = usePage().props.auth.user;

    const { data, setData, post, processing, reset, errors } = useForm({
        user_id: auth.id,
        umission_no: "",
        umission_name: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("umissions.store"), {
            onSuccess: () => {
                reset("umission_no", "umission_name");
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Missions" />
            <div className="p-6">
                <h1 className="text-xl font-bold mb-6">University Missions</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* -------------------- Form Section -------------------- */}
                    <div className="block rounded-2xl border bg-card p-6 shadow-sm hover:shadow-md transition">
                        <h1 className="text-xl font-bold mb-6">Upload New Mission</h1>

                        <form onSubmit={handleSubmit} className="space-y-4">

                            <input type="hidden" value={auth.id} />

                            {/* Mission No */}
                            <div>
                                <label className="block font-medium">Mission Number</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    className="w-full border rounded-lg p-2"
                                    value={data.umission_no}
                                    onChange={(e) => setData("umission_no", e.target.value)}
                                />
                                {errors.umission_no && (
                                    <p className="text-red-500 text-sm">{errors.umission_no}</p>
                                )}
                            </div>

                            {/* Mission Name */}
                            <div>
                                <label className="block font-medium">Mission Description</label>
                                <textarea
                                    className="w-full border rounded-lg p-2"
                                    rows={4}
                                    value={data.umission_name}
                                    onChange={(e) => setData("umission_name", e.target.value)}
                                />
                                {errors.umission_name && (
                                    <p className="text-red-500 text-sm">{errors.umission_name}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60"
                            >
                                {processing ? "Saving..." : "Submit Mission"}
                            </button>
                        </form>
                    </div>

                    {/* -------------------- List Section -------------------- */}
                    <div className="block rounded-2xl border bg-card p-6 shadow-sm hover:shadow-md transition flex flex-col">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-xl font-bold">Uploaded Missions</h1>
                        </div>

                        {umissions.length === 0 ? (
                            <p className="text-gray-500">No missions found.</p>
                        ) : (
                            <div className="space-y-4 overflow-y-auto max-h-[450px] pr-2">
                                {umissions.map((log: any, index: number) => (
                                    <div key={index}>
                                        <h2 className="font-semibold text-lg text-blue-600 mb-2">
                                            Mission #{log.umission_no}
                                        </h2>

                                        <div className="border-b pb-2 mb-2">
                                            <p className="font-medium">{log.umission_name}</p>

                                            <p className="text-sm text-gray-500">
                                                Uploaded on: {log.created_at}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

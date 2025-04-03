interface RequestSummaryProps {
    id: string;
    type: string;
    status: string;
    destination: string;
    price: string;
    date: string;
}

export default function RequestSummary({
    id,
    type,
    status,
    destination,
    price,
    date
}: RequestSummaryProps) {
    const statusColors = {
        Pending: "bg-yellow-500",
        Accepted: "bg-green-500",
        Rejected: "bg-red-500"
    };

    return (
        <div className="bg-gray-900 rounded-lg p-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div>
                        <h3 className="font-semibold">{id}</h3>
                        <p className="text-sm text-gray-400">{type}</p>
                    </div>
                    <span className={`${statusColors[status as keyof typeof statusColors]} px-2 py-1 rounded-full text-xs`}>
                        {status}
                    </span>
                </div>
                <div className="text-right">
                    <p className="font-semibold">{price}</p>
                    <p className="text-sm text-gray-400">{date}</p>
                </div>
            </div>
            <div className="mt-4">
                <p className="text-sm text-gray-400">Destination</p>
                <p>{destination}</p>
            </div>
        </div>
    );
} 
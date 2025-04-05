import NewRequestForm from "@/components/NewRequestForm";

export default function NewRequestPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Create New Request</h1>
      <div className="bg-gray-900 rounded-lg overflow-hidden shadow-xl">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-xl font-semibold text-gray-100">Request Network Invoice</h2>
          <p className="text-sm text-gray-400 mt-1">Create an invoice for your shipment request</p>
        </div>
        <iframe
          src="https://invoicing-template-fwjmya1ct-albertos-projects-434a5907.vercel.app/create-invoice"
          width="100%"
          height="800px"
          className="bg-white"
          style={{
            border: 'none',
            borderRadius: '0 0 0.5rem 0.5rem'
          }}
        />
      </div>
      <div className="bg-gray-900 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Shipment Details</h2>
        <NewRequestForm />
      </div>
    </div>
  );
}

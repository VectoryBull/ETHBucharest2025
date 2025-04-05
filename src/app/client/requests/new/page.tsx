import NewRequestForm from "@/components/NewRequestForm";

export default function NewRequestPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Request</h1>
      <NewRequestForm />
      <iframe
        src="https://invoicing-template-fwjmya1ct-albertos-projects-434a5907.vercel.app/create-invoice"
        width="100%"
        height="100vh"
      ></iframe>
    </div>
  );
}

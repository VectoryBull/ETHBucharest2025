"use client";

import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Provider, useAppContext } from "@/utils/context";
import Spinner from "@/components/ui/Spinner";
import { currencies } from "@/utils/currencies";
// import { config } from "@/utils/config";
import { rainbowKitConfig as wagmiConfig } from "@/utils/wagmiConfig";
import React from "react";
import { Context, WagmiProvider } from "wagmi";
import { ConnectButton, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { rainbowKitConfig } from "@/utils/wagmiConfig";
import "@rainbow-me/rainbowkit/styles.css";

/*
interface CustomFormData extends Omit<Invoice, "meta" | "creationDate"> {
  creatorId: string;
  note: string;
  miscellaneous: {
    // This is a placeholder for any additional data that the user wants to include in the invoice
    labels: string[];
    builderId: string;
    createdWith: string;
  };
  invoiceNumber: string;
  payerAddress: string;
  payeeAddress: string;
  dueDate: string;
  issuedOn: string;
  invoiceItems: InvoiceItem[];
  buyerInfo?: ActorInfo;
  sellerInfo?: ActorInfo;
  isEncrypted?: boolean;
}
*/

const CreateInvoiceForm = dynamic(
  () => import("@requestnetwork/create-invoice-form/react"),
  { ssr: false, loading: () => <Spinner /> }
);
export default function NewRequest() {
  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={rainbowKitConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Provider>
            <NewRequestt />
          </Provider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

function NewRequestt() {
  function createRequest(event: React.FormEvent) {
    event.preventDefault();
    // Handle form submission logic here
    setShowModal(true);
  }
  const { requestNetwork } = useAppContext();
  const [showModal, setShowModal] = React.useState(true);

  console.log(requestNetwork);

  const baseConfig: IConfig = {
    builderId: "request-network", // Replace with your builder ID, arbitrarily chosen, used to identify your app
    dashboardLink: "/",
    logo: "/file.svg",
    colors: {
      main: "#0BB489",
      secondary: "#58E1A5",
    },
    defaultChain: "ethereum",
    defaultCurrency: "ETH",
    defaultNetwork: "mainnet",
    defaultPaymentNetwork: "erc20",
    defaultPaymentAddress: "0x7A8E79dE63c29c3ee2375Cd3D2e90FEaA5aAf321",
    defaultPaymentAmount: "0.01",
    defaultPaymentCurrency: "ETH",
  };
  const [config, setConfig] = React.useState(baseConfig);

  return (
    <DashboardLayout type="client">
      <div>
        <div>
          <div className="flex justify-end">
            <ConnectButton />
          </div>
          <br />

          <CreateInvoiceForm
            config={config}
            currencies={currencies}
            wagmiConfig={wagmiConfig}
            requestNetwork={requestNetwork}
            singleInvoicePath="/"
          />
        </div>
      </div>

      {/*}

      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link
              href="/client/requests"
              className="text-gray-400 hover:text-white"
            >
              ← Back to Requests
            </Link>
            <h1 className="text-2xl font-semibold">New Request</h1>
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-6">
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-gray-400">Type</label>
                <select className="w-full bg-gray-800 rounded-lg p-2 border border-gray-700">
                  <option value="Vehicle">Vehicle</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Food">Food</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-gray-400">Weight (kg)</label>
                <input
                  type="text"
                  className="w-full bg-gray-800 rounded-lg p-2 border border-gray-700"
                  placeholder="Enter weight"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-gray-400">Temperature Range</label>
                <input
                  type="text"
                  className="w-full bg-gray-800 rounded-lg p-2 border border-gray-700"
                  placeholder="e.g. 15-25°C"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-gray-400">Deadline</label>
                <input
                  type="date"
                  className="w-full bg-gray-800 rounded-lg p-2 border border-gray-700"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-gray-400">Pickup Location</label>
                <input
                  type="text"
                  className="w-full bg-gray-800 rounded-lg p-2 border border-gray-700"
                  placeholder="Enter pickup location"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-gray-400">Delivery Location</label>
                <input
                  type="text"
                  className="w-full bg-gray-800 rounded-lg p-2 border border-gray-700"
                  placeholder="Enter delivery location"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Link
                href="/client/requests"
                className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-colors"
                onClick={createRequest}
              >
                Create Request
              </button>
            </div>
          </form>
        </div>
      </div>
      */}
    </DashboardLayout>
  );
}

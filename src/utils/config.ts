import { IConfig } from "./types";

export const config: IConfig = {
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
};

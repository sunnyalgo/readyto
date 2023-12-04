import { useState } from 'react'
import ReactModal from "react-modal"
import ReactDOM from 'react-dom/client';
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { hardhat, sepolia, goerli, linea, lineaTestnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

import '@rainbow-me/rainbowkit/styles.css';

import { Products, Ingredients, Organizations, Suppliers } from './routes';
import { Layout } from 'components'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [hardhat, linea, sepolia, goerli, lineaTestnet],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Smart contract",
  projectId: "SC_MANAGE",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

ReactModal.setAppElement("#__next")

export default function Home() {
  const [ selected, setSelected ] = useState<number>(1);
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        coolMode
        theme={darkTheme({
          accentColor: "#516b7c",
          accentColorForeground: "#ffe4c9",
          borderRadius: "large",
          fontStack: "system",
          overlayBlur: "small",
        })}
        chains={chains}
      >
        <Layout selected={selected} onSelectChange={setSelected}>
          {selected==1 && <Products />}
          {selected==2 && <Ingredients />}
          {selected==3 && <Organizations />}
          {selected==4 && <Suppliers />}
        </Layout>
      </RainbowKitProvider>  
    </WagmiConfig>
  )
}

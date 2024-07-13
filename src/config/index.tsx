
// config/index.tsx

import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import { cookieStorage, createStorage } from 'wagmi'
import { filecoinCalibration } from 'wagmi/chains'

// Your WalletConnect Cloud project ID
export const projectId = 'efec1bb233616970ec0c5366648b3bf0'

// Create a metadata object
const metadata = {
  name: 'test',
  description: 'AppKit Example',
  url: 'https://web3modal.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// Create wagmiConfig
const chains = [filecoinCalibration] as const
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  }),
  //...wagmiOptions // Optional - Override createConfig parameters
})

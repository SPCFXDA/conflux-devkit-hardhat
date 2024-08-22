import type { HardhatUserConfig } from "hardhat/config";
import { vars } from "hardhat/config";
import "@nomicfoundation/hardhat-ignition-viem";
import "@nomicfoundation/hardhat-toolbox-viem"

const deployer_mnemonic = vars.get("DEPLOYER_MNEMONIC")

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  defaultNetwork: "hardhat",
  etherscan: {
    apiKey: {
      confluxESpaceTestnet: "<api-key>",
      confluxESpace: "<api-key>",
    },
    customChains: [
      {
        network: "confluxESpace",
        chainId: 1030,
        urls: {
          apiURL: "https://evmapi.confluxscan.net",
          browserURL: "https://evm.confluxscan.io/",
        },
      },
      {
        network: "confluxESpaceTestnet",
        chainId: 71,
        urls: {
          apiURL: "https://evmapi-testnet.confluxscan.io/api/",
          browserURL: "https://evmtestnet.confluxscan.io/",
        },
      },
    ],
  },
  networks: {
    // View the networks that are pre-configured.
    // If the network you are looking for is not here you can add new network settings
    confluxCoreLocal: {
      url: "http://localhost:12537",
      accounts: {
        mnemonic: deployer_mnemonic,
        path: "m/44'/503'/0'/0",
        initialIndex: 0,
        count: 10,
        passphrase: "",
      },
    },
    confluxCoreTestnet: {
      url: "https://test.confluxrpc.com",
      accounts: {
        mnemonic: deployer_mnemonic,
        path: "m/44'/503'/0'/0",
        initialIndex: 0,
        count: 10,
        passphrase: "",
      },
    },
    confluxCore: {
      url: "https://main.confluxrpc.com",
      accounts: {
        mnemonic: deployer_mnemonic,
        path: "m/44'/503'/0'/0",
        initialIndex: 0,
        count: 10,
        passphrase: "",
      },
    },
    confluxESpaceLocal: {
      url: "http://localhost:8545",
      accounts: {
        mnemonic: deployer_mnemonic,
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 10,
        passphrase: "",
      },
    },
    confluxESpaceTestnet: {
      url: "https://evmtestnet.confluxrpc.com",
      accounts: {
        mnemonic: deployer_mnemonic,
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 10,
        passphrase: "",
      },
    },
    confluxESpace: {
      url: "https://evm.confluxrpc.com",
      accounts: {
        mnemonic: deployer_mnemonic,
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 10,
        passphrase: "",
      },
    },
  },
};


export default config;

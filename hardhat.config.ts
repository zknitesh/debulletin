import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-solhint";
import dotenv from "dotenv";
import "hardhat-deploy";
import "@nomiclabs/hardhat-solhint";
import "hardhat-gas-reporter";
import "@nomicfoundation/hardhat-ethers";


function dotEnvUtil(): void {
  dotenv.config();
  const envFile: string = `.env.${process.env.ENV}`;
  console.log("env file", envFile);
  dotenv.config({ path: envFile, override: true }); // Load environment variables from env file
}
dotEnvUtil();


const config: HardhatUserConfig = {
  // solidity: "0.8.20",
  solidity: {
      compilers: [{ version: "0.8.24" }],
  },
  defaultNetwork: "hardhat",
  networks: {
      hardhat: {
          chainId: 31337,
      },
      localhost: {
          url: "http://127.0.0.1:8545/",
          chainId: 31337,
          // accounts: already provided by hardhat
      },
      sepolia: {
          url: process.env.SEPOLIA_RPC_URL,
          chainId: 11155111,
          accounts: [process.env.SEPOLIA_PRIVATE_KEY ?? ""],
      },
      morph: {
        url: process.env.MORPH_RPC_URL,
        chainId: 2710,
        accounts: [process.env.MORPH_PRIVATE_KEY ?? ""],
      }
  },
  etherscan: {
      apiKey: process.env.ETHERSCAN_API_KEY,
  },
  gasReporter: {
      enabled: true,
      currency: "USD",
      // outputFile: "gas-report.txt",
      // noColors: true,
      // coinmarketcap: process.env.COINMARKETCAP_API_KEY,
  },
  namedAccounts: {
      deployer: {
          default: 0, // here this will by default take the first account as deployer
          1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
      },
  },
};

export default config;

import hre from "hardhat";
import { Conflux, Drip } from "js-conflux-sdk";

const conflux = new Conflux({
  url: hre.network.config.url,
  networkId: hre.network.config.chainId,
  // logger: console,
});

const account = conflux.wallet.addPrivateKey(process.env.DEPLOYER_PRIVATE_KEY);

async function main() {
  const balance = await conflux.cfx.getBalance(account.address);
  console.log(`Balance of ${account.address} is ${new Drip(balance).toCFX()} CFX`);

  const { abi, bytecode } = await hre.artifacts.readArtifact("YourContract");

  const contract = conflux.Contract({
    abi: abi,
    bytecode: bytecode,
    // address: ,
  });
  console.log(account);
  const receipt = await contract.constructor(account.address).sendTransaction({ from: account }).executed();

  console.log(receipt);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

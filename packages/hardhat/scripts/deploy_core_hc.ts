import hre from "hardhat";
const {
  ConfluxSDK, // The js-conflux-sdk SDK
  conflux, // The Conflux instance
} = hre;

async function main() {
  const accounts = await conflux.getSigners();

  const epochNumber = await conflux.cfx.epochNumber();
  console.log("Current epochNumber: ", epochNumber);

  const balance = await conflux.cfx.getBalance(accounts[0].address);
  console.log(`Balance of ${accounts[0].address} :`, new ConfluxSDK.Drip(balance).toCFX());
  const contract = await conflux.getContractFactory("YourContract");

  const deployReceipt = await contract
    .constructor(accounts[0].address)
    .sendTransaction({
      from: accounts[0].address,
    })
    .executed();

  console.log("Greeter deployed to:", deployReceipt.contractCreated);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

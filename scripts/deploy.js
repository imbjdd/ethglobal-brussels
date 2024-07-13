// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

  const deployer = await ethers.provider.getSigner(0);

  console.log("Deploying contracts with the account:", await deployer.getAddress());

  const Dataset = await ethers.deployContract("DatasetContract")
  const dataset = await Dataset.waitForDeployment();

  console.log("dataset contract deployed at: ", dataset.target)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

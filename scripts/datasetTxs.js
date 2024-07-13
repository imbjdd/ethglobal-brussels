// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat")
const { ethers } = hre

async function main() {

  const Dataset = await ethers.getContractFactory("DatasetContract");
  const dataset = await Dataset.attach(process.env.DATASET_CONTRACT);

  const deployer = await ethers.provider.getSigner();
  console.log("deployer account: ", deployer.address)
  const account1 = await ethers.provider.getSigner(1);
  console.log("account1: ", account1.address)


  const priceinReadableAmount = "0.5"

  const uploadDataset = await dataset.upload("https://testdatasetlink.com", "AIData", "This dataset provides you with the latest financial information of Filecoin", ethers.parseUnits(priceinReadableAmount, 18));
  const receipt = await uploadDataset.wait();

  if(receipt.status == 1){
    console.log("Dataset uploaded successfully: ", uploadDataset);
  } else {
    console.log("Dataset upload failed")
  }
  
  const getDataset1 = await dataset.getDatasets();

  console.log("Datasets are: ", getDataset1);

  const priceInWei = ethers.parseUnits("0.5", "ether"); // Assuming 1 Filecoin = 1 Ether for the conversion

  const buyDataset = await dataset.connect(account1).buyDataset(0, {
    value: priceInWei
  });
  const receipt1 = await buyDataset.wait();

  if(receipt1.status == 1){
    console.log("Dataset purchase was successfull")
  } else {
    console.log("Dataset purchase failed")
  }

  const getDatasetLink = await dataset.connect(account1).getLink();
  console.log("Account1 dataset link is: ", getDatasetLink);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

const lighthouse = require("@lighthouse-web3/sdk");
require("dotenv/config");

async function fileUpload(filePath, privateKey){
//   const filePath =
//     "/Users/parv/Desktop/Lighthouse/Lighthouse-sdk-usage/image3.png";

  const network = "calibration";
  const token = "native";
//   const privateKey = process.env.PRIVATE_KEY;

  // Fetching Price
  const price = await lighthouse.getPrice(filePath, network, token);
  console.log(price);

  // Making Payment
  const tx = await lighthouse.fund(price, network, token, privateKey);
  console.log(tx);

  // Generating Auth Token
  const authToken = await lighthouse.oneTimeAuth(privateKey);
  console.log(authToken);

  // Uploading File
  const response = await lighthouse.upload(filePath, authToken);
  console.log(response);
  console.log(`View file -> https://gateway.lighthouse.storage/ipfs/${response.data.Hash}`);

};
async function getfilePrice(numBytes){

  const network = "calibration";
  const token = "native";
  // Fetching Price
  const price = lighthouse.getPrice(numBytes, network, token);
  console.log(price);
}

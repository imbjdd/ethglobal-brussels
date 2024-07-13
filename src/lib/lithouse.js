'use client'
const lighthouse = require("@lighthouse-web3/sdk");
//require("dotenv/config");
import { ethers } from 'ethers'
import axios from 'axios'

async function getfilePrice(numBytes){

  const network = "calibration";
  const token = "native";
  // Fetching Price
  const price = lighthouse.getPrice(numBytes, network, token);
  console.log(price);
  return price
}

async function fileUploadTest(filePath,buffer/*, privateKey*/){
//   const filePath =
//     "/Users/parv/Desktop/Lighthouse/Lighthouse-sdk-usage/image3.png";

  const network = "calibration";
  const token = "native";
//   const privateKey = process.env.PRIVATE_KEY;
  const privateKey = ''

  // Fetching Price
  const price = await lighthouse.getPrice(filePath, network, token);
  console.log(price);

  // Making Payment
  const tx = await lighthouse.fund(price, network, token, privateKey);
  console.log(tx);

  console.log('TRANSACTION')

  // Generating Auth Token
  const authToken = await lighthouse.oneTimeAuth(privateKey);
  console.log(authToken);

  console.log('AUTH TOKEN')

  // Uploading File
  const response = await lighthouse.uploadBuffer(buffer);
  console.log(response);
  console.log(`View file -> https://gateway.lighthouse.storage/ipfs/${response.data.Hash}`);

};

const signAuthMessage = async(privateKey, verificationMessage) =>{
  const signer = new ethers.Wallet(privateKey)
  const signedMessage = await signer.signMessage(verificationMessage)
  return(signedMessage)
}

const getApiKey = async(publicKey, signMessageAsync) =>{
  const wallet = {
    publicKey: publicKey,
  }
  const verificationMessage = (
    await axios.get(
        `https://api.lighthouse.storage/api/auth/get_message?publicKey=${wallet.publicKey}`
    )
  ).data

  const signedMessage = await signMessageAsync({message: verificationMessage})

  const response = await lighthouse.getApiKey(wallet.publicKey, signedMessage)

  return response.data.apiKey
}

const progressCallback = (progressData) => {
  let percentageDone =
    100 - (progressData?.total / progressData?.uploaded)?.toFixed(2)
  console.log(percentageDone)
}

const uploadFile = async(file, publicKey, signMessageAsync) =>{
  const apiKey = await getApiKey(publicKey, signMessageAsync)
  // Push file to lighthouse node
  // Both file and folder are supported by upload function
  // Third parameter is for multiple files, if multiple files are to be uploaded at once make it true
  // Fourth parameter is the deal parameters, default null
  const output = await lighthouse.upload(file, apiKey, false, null, progressCallback)
  console.log('File Status:', output)
  /*
    output:
      data: {
        Name: "filename.txt",
        Size: 88000,
        Hash: "QmWNmn2gr4ZihNPqaC5oTeePsHvFtkWNpjY3cD6Fd5am1w"
      }
    Note: Hash in response is CID.
  */

    console.log('Visit at https://gateway.lighthouse.storage/ipfs/' + output.data.Hash)
}


export {getfilePrice, fileUploadTest, getApiKey, uploadFile}

/*

async function fileUpload(filePath,file){
//   const filePath =
//     "/Users/parv/Desktop/Lighthouse/Lighthouse-sdk-usage/image3.png";

  const network = "calibration";
  const token = "native";
//   const privateKey = process.env.PRIVATE_KEY;
  const privateKey = ''

  // Fetching Price
  const price = await lighthouse.getPrice(filePath, network, token);
  console.log(price);

  // Making Payment
  const tx = await lighthouse.fund(price, network, token, privateKey);
  console.log(tx);

  console.log('TRANSACTION')

  // Generating Auth Token
  const authToken = await lighthouse.oneTimeAuth(privateKey);
  console.log(authToken);

  console.log('AUTH TOKEN')

  // Uploading File
  const response = await lighthouse.upload(file, authToken);
  console.log(response);
  console.log(`View file -> https://gateway.lighthouse.storage/ipfs/${response.data.Hash}`);

};*/
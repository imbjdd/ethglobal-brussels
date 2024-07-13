'use client'

import Image from "next/image";
import Navbar from '@/components/Navbar';
import {helloWorld} from "@/lib/dataset"

import axios from 'axios'

import {getfilePrice, getApiKey, fileInfo} from "@/lib/lithouse"

 import { useState, useEffect } from 'react';
 import {getOneDocument} from "@/lib/database"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Label } from "@/components/ui/label"

import { useAccount, useConnect, useSignMessage } from 'wagmi';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table" 

export default function Dataset({ params }) {
  const [file, setFile] = useState(null);
  const [fileContent, setFileContent] = useState('');
  const [hashID, setHashID] = useState('');
  const [dataset, setDataset] = useState('');
  const [dataMeta, setDatasetMeta] = useState('');
  const [summary, setSummary] = useState({});
  const [keys, setKeys] = useState([])
  const [correlation, setCorrelation] = useState('')
  const [pca, setPca] = useState([])

  const { address, isConnected } = useAccount();
  console.log('oui')
  console.log('keykey ', address)

  async function getData() {
    const data = (await fileInfo(params.hash)).data
    console.log('ok')
    console.log(data)
    setDataset(data)
    const foo = await getOneDocument(params.hash)
    setDatasetMeta(foo)
    console.log(foo)
  }

  const pca_fun = async() => {
    console.log('start')
    const cid = params.hash; 
    const url = `/api/api/pca?cid=${encodeURIComponent(cid)}`;
    // const url = `http://127.0.0.1:5000/api/basic_data`;
    // const url = `http://127.0.0.1:5000/api/`
    const response = await fetch(url);
    console.log(response)
    if (!response.ok) {
      throw new Error('Network response was not ok');}
    const items = await response.json();
    console.log('terra')
    console.log(items);
    setPca(items["Explained Variance Ratio"])
  }

  const basicSummary = async () => {
    const cid = params.hash; 
    const url = `/api/api/basic_data?cid=${encodeURIComponent(cid)}`;
    // const url = `http://127.0.0.1:5000/api/basic_data`;
    // const url = `http://127.0.0.1:5000/api/`
    const response = await fetch(url);
    console.log(response)
    if (!response.ok) {
      throw new Error('Network response was not ok');}
    const items = await response.json();
    console.log(items);
    console.log('ok')
    setSummary(items.summary)
    console.log('non')
    console.log(summary)
    setKeys(Object.keys(items.summary))
  }

const basic_data_corr = async () => {
    const cid = params.hash; 
    const url = `/api/api/basic_data_corr?cid=${encodeURIComponent(cid)}`;
    // const url = `http://127.0.0.1:5000/api/basic_data`;
    // const url = `http://127.0.0.1:5000/api/`
    const response = await fetch(url);
    console.log(response)
    if (!response.ok) {
      throw new Error('Network response was not ok');}
    const items = await response.json();
    console.log(items);
    setCorrelation(items.image)

  }

  useEffect(() => {
    getData()
    basicSummary()
    //basic_data_corr()
    pca_fun()
  }, [])

  const { data, error, signMessageAsync } = useSignMessage({});


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Read file content
    const reader = new FileReader();
    reader.onload = (event) => {
      setFileContent(event.target.result);
    };
    reader.readAsText(selectedFile);
  };

  // useless function
  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      console.log('File name:', file.name);
      console.log('File type:', file.type);
      console.log('File size:', file.size);
      console.log('File content:', fileContent);
    } else {
      console.log('No file selected');
    }
  };

// IGNORE 2dkMEANS STILL IN PROGRESS, HARDER TO SETUP
  const twodkmeans = async () => {
    const cid = params.hash; 
    const url = `http://127.0.0.1:5000/api/2dkmeans?cid=${encodeURIComponent(cid)}`;
    // const url = `http://127.0.0.1:5000/api/basic_data`;
    // const url = `http://127.0.0.1:5000/api/`
    const response = await fetch(url);
    console.log(response)
    if (!response.ok) {
      throw new Error('Network response was not ok');}
    const items = await response.json();
    console.log(items);

  }

  const handleDownload = async () => {
    const url = 'https://gateway.lighthouse.storage/ipfs/'+params.hash; 

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const blob = await response.blob();
      const urlObject = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = urlObject;
      link.download = dataset.fileName
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(urlObject);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  function copy() {
    navigator.clipboard.writeText(params.hash)
  }

  return (
    <main className="bg-neutral-100 min-h-screen w-full">
      <div className="bg-pink-300 flex flex-col px-24 py-6 min-h-80">
        <Navbar className="grow-0" />
        <div className="h-full grow flex flex-col justify-center">
          <h1 className="text-6xl font-bold">Dataset: {dataMeta.name}</h1>
          <p className="text-sm"><button onClick={copy}>Copy hash</button></p>
        </div>
      </div>
      <div className="flex flex-col gap-12 flex-wrap px-24 py-12 gap-4">
        <button onClick={handleDownload} className="px-6 py-2 bg-blue-400 hover:bg-blue-300 rounded-lg text-black">Download Dataset</button>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>File name</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>cid</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
              <TableRow>
                <TableCell>{dataset.fileName}</TableCell>
                <TableCell>{dataset.fileSizeInBytes}</TableCell>
                <TableCell>{dataset.cid}</TableCell>
              </TableRow>
          </TableBody>
        </Table>
        <p className="italic">{dataMeta.description}</p>
        {/* <button onClick={twodkmeans} className="px-6 py-2 bg-blue-400 hover:bg-blue-300 rounded-lg text-black">Show K-Means Clustering</button> */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              {keys.map((key,index) => (
                  <TableHead key={index}>{key}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {['25%', '50%', '75%'].map((element, ind) => (
              <TableRow key={ind}>
                <TableCell><p className="font-bold">{element}</p></TableCell>
                {keys.map((key,index) => (
                  <TableCell key={ind+'_'+index}>{summary[key][element]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-center">
        <Image width={500}
      height={500}
      alt="nerd data" className="h-auto" src={`/api/api/basic_data_corr?cid=${encodeURIComponent(params.hash)}`} /> {/*{'data:image/png;base64, '+correlation} />*/}
      </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>PC1</TableHead>
              <TableHead>PC2</TableHead>
              <TableHead>PC3</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
              <TableRow>
                <TableCell>{pca[0]}</TableCell>
                <TableCell>{pca[1]}</TableCell>
                <TableCell>{pca[2]}</TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </div>
    </main>
  );
}


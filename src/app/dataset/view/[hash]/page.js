'use client'

import Image from "next/image";
import Navbar from '@/components/Navbar';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import {helloWorld} from "@/lib/dataset"

import axios from 'axios'

import {getfilePrice, getApiKey, fileInfo} from "@/lib/lithouse"

 import { useState, useEffect } from 'react';
 
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

  const { address, isConnected } = useAccount();
  console.log('oui')
  console.log('keykey ', address)

  async function getData() {
    const data = (await fileInfo(params.hash)).data
    console.log('ok')
    console.log(data)
    setDataset(data)
  }

  useEffect(() => {
    getData()
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



  return (
    <main className="bg-neutral-100 min-h-screen w-full">
      <div className="bg-pink-300 flex flex-col px-24 py-6 min-h-80">
        <Navbar className="grow-0" />
        <div className="h-full grow flex flex-col justify-center">
          <h1 className="text-6xl font-bold">View dataset</h1>
          <p className="text-lg">{ params.hash }</p>
        </div>
      </div>
      <div className="flex flex-wrap px-24 py-12 gap-4">
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
        <button onClick={handleDownload} className="px-6 py-2 bg-blue-400 hover:bg-blue-300 rounded-lg text-black">Download Dataset</button>
      </div>
    </main>
  );
}


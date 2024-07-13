'use client'

import Image from "next/image";
import Navbar from '@/components/Navbar';
import {helloWorld} from "@/lib/dataset"
import {getfilePrice, getApiKey, uploadFile} from "@/lib/lithouse"

 import { useState, useEffect } from 'react';
 
import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Label } from "@/components/ui/label"

import { useAccount, useConnect, useSignMessage } from 'wagmi';
 
export default function Dataset() {
  const [file, setFile] = useState(null);
  const [fileContent, setFileContent] = useState('');
  const [hashID, setHashID] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const { address, isConnected } = useAccount();

  const { data, error, signMessageAsync } = useSignMessage({});

  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  }

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

  const manageSubmit = async (e) => {
    const hash = await uploadFile(e.target.files, address, signMessageAsync)
    setHashID(hash)
    //signMessage({message: 'hello world'})
    toast({
      title: "Your file was uploaded",
      description: (
        <div className="mt-2 rounded-md w-full">
          <p>Hash ID : <a href={"https://gateway.lighthouse.storage/ipfs/"+hash}>{hash}</a></p>
        </div>
      ),
    })
  }
 
  async function onSubmit() {
    // hash, name, description
  }
 
  return (
    <main className="bg-neutral-100 min-h-screen w-full">
      <div className="bg-pink-300 flex flex-col px-24 py-6 min-h-80">
        <Navbar className="grow-0" />
        <div className="h-full grow flex flex-col justify-center">
          <h1 className="text-6xl font-bold">Add a dataset</h1>
        </div>
      </div>
      <div className="flex flex-wrap px-24 py-12 gap-4">
        <div className="grid w-full max-w-sm items-center gap-4">
          <Label htmlFor="name">Name of the dataset</Label>
          <Input onChange={handleNameChange} type="text" id="name" placeholder="Name" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-4">
          <Label htmlFor="name">Description of the dataset</Label>
          <Input onChange={handleDescriptionChange} type="text" id="description" placeholder="Description" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-4">
          <Label htmlFor="picture">Dataset {hashID}</Label>
          <Input /*onChange={handleFileChange}*/ onChange={e=>manageSubmit(e)} id="picture" type="file" />
        </div>
        <Button onClick={onSubmit} type="submit">Submit</Button>
      </div>
    </main>
  );
}


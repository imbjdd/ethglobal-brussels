"use client"

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

import {getAllDocuments} from "@/lib/database"
import { useState, useEffect } from 'react';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
 
export default function Home() {
  const [datasets, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [dataa, setDataa] = useState({});

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  }

  async function getData() {
    const foo = await getAllDocuments()
    console.log(foo)
    setData(foo)
  }
  const the_graph = async() => {
    const url = '/api/api/graph'
    const response = await fetch(url);
    console.log(response)
    if (!response.ok) {
      throw new Error('Network response was not ok');}
    const items = await response.json();
    console.log(items);


  }
  useEffect(() => {
    getData()
  }, [])

  async function submitChange() {
    alert(search)
    const url = '/api/api/graph?query='+search
    const response = await fetch(url);
    console.log(response)
    if (!response.ok) {
      throw new Error('Network response was not ok');}
    const items = await response.json();
    console.log(items);
    setDataa(items)
  }
  
  //const datasets = [{name:"Airport passengers - 2024", description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, co", price: "180"}, {name:"Airport passengers - 2024", description: "This dataset comes from Europa", price: "180"},
  //  {name:"Airport passengers - 2024", description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, co", price: "180"}, {name:"Airport passengers - 2024", description: "This dataset comes from Europa", price: "180"}]
  return (
    <main className="bg-white min-h-screen w-full">
      <div className="bg-white flex flex-col px-24 pt-6">
        <Navbar className="grow-0" />
        <div className="h-full grow w-3/5 py-20 gap-4 flex flex-col justify-center">
          <h1 className="text-7xl font-bold">Query The Graph</h1>
          <p className="w-2/3">Query the graph about amountUSD, recipient, sender and timestamp</p>
        </div>
      </div>
      <div>
        {/*<button onClick={the_graph}>the graph</button>*/}
      </div>
      <div className="flex flex-wrap px-24 gap-4">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input onChange={handleSearchChange} type="text" placeholder="Text" />
          <Button onClick={submitChange}>Search</Button>
        </div>
        {JSON.stringify(dataa) != '{}' && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
                {[0,1,2,3,4,5,6,7,8,9].map((el,index) => (
              <TableHead key={index}>{el}</TableHead>
                ))}
            </TableRow>
          </TableHeader>
          <TableBody>
              <TableRow>
                <TableCell><p className="font-bold">amountUSD</p></TableCell>
                {[0,1,2,3,4,5,6,7,8,9].map((el,index) => (
                  <TableCell key={index}>{dataa['amountUSD'][el]}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell><p className="font-bold">recipient</p></TableCell>
                {[0,1,2,3,4,5,6,7,8,9].map((el,index) => (
                  <TableCell key={index}>{dataa['recipient'][el]}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell><p className="font-bold">sender</p></TableCell>
                {[0,1,2,3,4,5,6,7,8,9].map((el,index) => (
                  <TableCell key={index}>{dataa['sender'][el]}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell><p className="font-bold">timestamp</p></TableCell>
                {[0,1,2,3,4,5,6,7,8,9].map((el,index) => (
                  <TableCell key={index}>{dataa['timestamp'][el]}</TableCell>
                ))}
              </TableRow>
          </TableBody>
        </Table>
        )}
      </div>
    </main>
  );
}

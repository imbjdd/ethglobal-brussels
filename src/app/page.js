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

import ExampleComponent from "../components/ui/graph";
import {getAllDocuments} from "@/lib/database"
 import { useState, useEffect } from 'react';

export default function Home() {
  const [datasets, setData] = useState([]);

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
  
  //const datasets = [{name:"Airport passengers - 2024", description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, co", price: "180"}, {name:"Airport passengers - 2024", description: "This dataset comes from Europa", price: "180"},
  //  {name:"Airport passengers - 2024", description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, co", price: "180"}, {name:"Airport passengers - 2024", description: "This dataset comes from Europa", price: "180"}]
  return (
    <main className="bg-white min-h-screen w-full">
      <div className="bg-white flex flex-col px-24 pt-6">
        <Navbar className="grow-0" />
        <div className="h-full grow w-3/5 py-20 gap-4 flex flex-col justify-center">
          <h1 className="text-7xl font-bold">Unlock the profitability of your data</h1>
          <p className="w-2/3">This platform allows you to create and to buy datasets. AI analysis of datasets is integrated into the application.</p>
        </div>
      </div>
      <div>
        {/*<button onClick={the_graph}>the graph</button>*/}
      </div>
      <div className="flex flex-wrap px-24 gap-4">
      {datasets.map((dataset, index) => (
        <div key={index} className="w-1/3 grow rounded-lg flex flex-col gap-4 bg-orange-300 even:bg-blue-300 p-4">
          <p className="font-bold text-2xl">{dataset.name}</p>
          <p className="grow">{dataset.description.substring(0, 200)}...</p>
          <a href={"/dataset/view/"+dataset.cid} className="rounded-lg font-bold">See more</a>
        </div>
      ))}
      </div>
    </main>
  );
}

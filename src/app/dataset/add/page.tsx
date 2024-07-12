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

export default function Home() {
  return (
    <main className="">
      <Navbar />
      <p>add a dataset</p>
      <button onClick={helloWorld}>test</button>
    </main>
  );
}

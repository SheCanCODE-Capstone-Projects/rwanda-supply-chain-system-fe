"use client";


import Link from "next/link";
import {Button} from "@/components/ui";


export function Navbar(){


return (

<nav className="
h-20
border-b
bg-white
flex
items-center
justify-between
px-6
">


<Link
href="/"
className="font-bold text-xl text-[#0B6B2E]"
>

RSCN

</Link>



<div className="
hidden
md:flex
gap-8
">


<Link href="/">
Home
</Link>


<Link href="/pricing">
Pricing
</Link>


<Link href="/industries">
Industries
</Link>


</div>



<div className="flex gap-3">


<Button variant="secondary">

Login

</Button>


<Button>

Register

</Button>


</div>


</nav>

);

}
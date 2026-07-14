"use client";


import {
dashboardNavigation
}
from "@/config/dashboard-navigation";


import {SidebarItem} from "./SidebarItems";


export function Sidebar({
role
}:{
role:string
}){


const items =
dashboardNavigation[
role as keyof typeof dashboardNavigation
];



return (

<aside

className="
w-64
min-h-screen
border-r
bg-white
p-4
"

>


<h2

className="
font-bold
text-xl
text-[#0B6B2E]
mb-6
"

>

RSCN

</h2>



<nav className="space-y-2">


{
items?.map(
(item)=>(

<SidebarItem
key={item.href}
item={item}
/>

)

)
}


</nav>


</aside>


);

}
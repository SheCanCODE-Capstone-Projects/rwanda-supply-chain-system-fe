import {DashboardLayoutProps} from "./DashboardLayout.types";


export function DashboardLayout({

children

}:DashboardLayoutProps){


return (

<div className="min-h-screen bg-gray-50">


<div className="flex">


{/* Sidebar */}

<aside

className="
hidden
lg:block
w-64
border-r
bg-white
"

>

Sidebar

</aside>



<div className="flex-1">


{/* Topbar */}

<header

className="
h-16
border-b
bg-white
flex
items-center
px-6
"

>

Topbar

</header>



<main className="p-6">

{children}

</main>



</div>


</div>


</div>

);

}
import { PublicLayoutProps } from "./PublicLayout.types";


export function PublicLayout({
    children
}: PublicLayoutProps){


return (

<div className="min-h-screen bg-white">


{/* Navbar */}
<header>

{/* Navigation component will be added */}

</header>



<main>

{children}

</main>



{/* Footer */}

<footer className="border-t mt-20 py-8">

<div className="container mx-auto text-center text-sm text-gray-500">

&copy {new Date().getFullYear()} Rwanda Supply Chain Network

</div>

</footer>


</div>

);

}

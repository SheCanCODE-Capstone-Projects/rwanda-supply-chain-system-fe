import {AuthLayoutProps} from "./AuthLayout.types";


export function AuthLayout({
children
}:AuthLayoutProps){


return (

<div

className="
min-h-screen
flex
items-center
justify-center
bg-gray-50
p-4
"

>


<div

className="
w-full
max-w-md
rounded-2xl
bg-white
border
shadow-sm
p-8
"

>

{children}


</div>


</div>


);


}
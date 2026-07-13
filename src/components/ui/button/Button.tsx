"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { ButtonProps } from "./Button.types";
import { buttonVariants } from "./Button.styles";


export const Button = forwardRef<
HTMLButtonElement,
ButtonProps
>(
(
{
children,
variant,
size,
loading,
className,
...props
},
ref
)=>{


return (

<button

ref={ref}

className={
cn(
buttonVariants({
variant,
size
}),
className
)
}

disabled={
loading || props.disabled
}

{...props}

>

{
loading 
? "Loading..."
: children
}

</button>

);


});


Button.displayName="Button";
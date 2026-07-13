import {CardProps} from "./Card.types";


export function Card({
children,
className
}:CardProps){


return (

<div

className={`
rounded-2xl
border
bg-white
shadow-sm
p-6

${className}

`}

>

{children}

</div>

);


}
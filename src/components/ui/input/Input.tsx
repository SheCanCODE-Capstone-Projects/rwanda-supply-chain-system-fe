import {InputProps} from "./Input.types";


export function Input({
label,
error,
className,
...props
}:InputProps){


return (

<div className="space-y-2">


{
label &&
<label className="text-sm font-medium">
{label}
</label>
}


<input

className={`
w-full
h-11
rounded-xl
border
px-4
outline-none
focus:ring-2
focus:ring-[#0B6B2E]

${className}

`}

{...props}

/>


{
error &&
<p className="text-sm text-red-600">
{error}
</p>
}


</div>


);


}
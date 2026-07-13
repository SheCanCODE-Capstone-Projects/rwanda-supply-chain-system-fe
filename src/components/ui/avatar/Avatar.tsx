interface AvatarProps{

name:string;

}


export function Avatar({
name
}:AvatarProps){


return (

<div

className="
flex
h-10
w-10
items-center
justify-center
rounded-full
bg-[#0B6B2E]
text-white
font-semibold
"

>

{
name.charAt(0).toUpperCase()
}

</div>


);


}
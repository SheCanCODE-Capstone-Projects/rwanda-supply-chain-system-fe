import {RoleLayoutProps} from "./RoleLayout.types";
import {DashboardLayout} from "../dashboard-layout";


export function RoleLayout({

children,
role

}:RoleLayoutProps){


return (

<DashboardLayout>


<div>


<p className="text-sm text-gray-500">

Role: {role}

</p>


{children}


</div>


</DashboardLayout>


);

}
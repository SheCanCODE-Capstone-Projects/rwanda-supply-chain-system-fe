import {
    Home,
    Package,
    Warehouse,
    Truck,
    ShoppingCart,
    Users,
    BarChart3,
    Settings,
} from "lucide-react";


export const dashboardNavigation = {

ADMIN: [

{
label:"Dashboard",
href:"/admin",
icon:Home
},

{
label:"Users",
href:"/admin/users",
icon:Users
},

{
label:"Analytics",
href:"/admin/analytics",
icon:BarChart3
},

{
label:"Settings",
href:"/admin/settings",
icon:Settings
}

],



FARMER:[

{
label:"Dashboard",
href:"/farmer",
icon:Home
},

{
label:"Products",
href:"/farmer/products",
icon:Package
},

{
label:"Orders",
href:"/farmer/orders",
icon:ShoppingCart
}


],



WAREHOUSE:[

{
label:"Dashboard",
href:"/warehouse",
icon:Home
},

{
label:"Storage",
href:"/warehouse/storage",
icon:Warehouse
}


],



DRIVER:[

{
label:"Dashboard",
href:"/driver",
icon:Home
},

{
label:"Trips",
href:"/driver/trips",
icon:Truck
}

]

};
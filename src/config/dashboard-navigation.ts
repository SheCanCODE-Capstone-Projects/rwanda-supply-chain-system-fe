import {
    Home,
    Package,
    Warehouse,
    Truck,
    ShoppingCart,
    Users,
    BarChart3,
    Settings,
    MapPin,
    ClipboardList,
    Landmark,
    Factory,
    UsersRound,
    CreditCard,
    FileText,
} from "lucide-react";

export const dashboardNavigation = {

  ADMIN: [
    { label: "Dashboard", href: "/admin", icon: Home },
    { label: "Users", href: "/admin/users", icon: Users },
    { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { label: "Settings", href: "/admin/settings", icon: Settings },
  ],

  FARMER: [
    { label: "Dashboard", href: "/farmer", icon: Home },
    { label: "Products", href: "/farmer/products", icon: Package },
    { label: "Orders", href: "/farmer/orders", icon: ShoppingCart },
  ],

  WAREHOUSE: [
    { label: "Dashboard", href: "/warehouse", icon: Home },
    { label: "Storage", href: "/warehouse/storage", icon: Warehouse },
    { label: "Inventory", href: "/warehouse/inventory", icon: ClipboardList },
  ],

  TRANSPORT: [
    { label: "Dashboard", href: "/transport", icon: Home },
    { label: "Active trips", href: "/transport/trips", icon: Truck },
    { label: "Routes", href: "/transport/routes", icon: MapPin },
  ],

  RETAILER: [
    { label: "Dashboard", href: "/retailer", icon: Home },
    { label: "Orders", href: "/retailer/orders", icon: ShoppingCart },
    { label: "Inventory", href: "/retailer/inventory", icon: Package },
  ],

  DRIVER: [
    { label: "Dashboard", href: "/driver", icon: Home },
    { label: "Trips", href: "/driver/trips", icon: Truck },
  ],

  BUYER: [
    { label: "Dashboard", href: "/buyer", icon: Home },
    { label: "Orders", href: "/buyer/orders", icon: ShoppingCart },
    { label: "Payments", href: "/buyer/payments", icon: CreditCard },
  ],

  SUPPLIER: [
    { label: "Dashboard", href: "/supplier", icon: Home },
    { label: "Catalogue", href: "/supplier/catalogue", icon: Package },
    { label: "Orders", href: "/supplier/orders", icon: ClipboardList },
  ],

  COOPERATIVE: [
    { label: "Dashboard", href: "/cooperative", icon: Home },
    { label: "Members", href: "/cooperative/members", icon: UsersRound },
    { label: "Inventory", href: "/cooperative/inventory", icon: Package },
  ],

  MANUFACTURER: [
    { label: "Dashboard", href: "/manufacturer", icon: Home },
    { label: "Production", href: "/manufacturer/production", icon: Factory },
    { label: "Orders", href: "/manufacturer/orders", icon: ClipboardList },
  ],

  GOVERNMENT: [
    { label: "Dashboard", href: "/government", icon: Home },
    { label: "Reports", href: "/government/reports", icon: BarChart3 },
    { label: "Compliance", href: "/government/compliance", icon: FileText },
  ],

  BANK: [
    { label: "Dashboard", href: "/bank", icon: Home },
    { label: "Transactions", href: "/bank/transactions", icon: CreditCard },
    { label: "Reports", href: "/bank/reports", icon: Landmark },
  ],

};


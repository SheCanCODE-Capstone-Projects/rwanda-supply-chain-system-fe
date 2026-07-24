"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Bell, BriefcaseBusiness, CreditCard, PackageCheck, SearchCheck, ShoppingCart, Truck, UserCircle2, Wallet, MessageSquareText } from "lucide-react";
import { PageBody, PageHeader } from "@/components/app/PageChrome";
import { StatCard } from "./StatCard";
import { SearchBar } from "./SearchBar";
import { ProductCard } from "./ProductCard";
import { StatusBadge } from "./StatusBadge";
import { products, orders, notifications, payments } from "./data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function BuyerPortal() {
  const [query, setQuery] = useState("");
  const [wishlist, setWishlist] = useState<number[]>([1]);
  const [selectedTab, setSelectedTab] = useState<"All" | "Pending" | "Processing" | "Shipping" | "Completed" | "Cancelled">("All");

  const filteredProducts = useMemo(() => {
    const term = query.toLowerCase();
    return products.filter((product) => {
      return !term || [product.name, product.category, product.supplier, product.location].some((value) => value.toLowerCase().includes(term));
    });
  }, [query]);

  const visibleOrders = useMemo(() => {
    if (selectedTab === "All") return orders;
    if (selectedTab === "Completed") return orders.filter((order) => order.status === "Delivered");
    if (selectedTab === "Pending") return orders.filter((order) => order.status === "Pending");
    if (selectedTab === "Processing") return orders.filter((order) => order.status === "Processing");
    if (selectedTab === "Shipping") return orders.filter((order) => order.status === "Shipping");
    return orders.filter((order) => order.status === "Cancelled");
  }, [selectedTab]);

  const toggleWishlist = (id: number) => {
    setWishlist((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  return (
    <>
      <PageHeader
        title="Smart Buyer Portal"
        description="Manage sourcing, orders, tracking, payments and communications in one workspace."
        actions={
          <div className="flex items-center gap-2">
            <div className="rounded-full border border-border bg-surface px-3 py-1 text-sm text-muted-foreground">Welcome, Jean Uwimana</div>
            <button className="rounded-full border border-border bg-background p-2">
              <Bell className="h-4 w-4" />
            </button>
            <button className="rounded-full border border-border bg-background p-2">
              <UserCircle2 className="h-4 w-4" />
            </button>
          </div>
        }
      />
      <PageBody>
        <div className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
          <div className="space-y-6">
            <section className="rounded-2xl border border-border bg-background p-5 shadow-sm">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-medium text-primary">Rwanda Supply Chain Network</p>
                  <h2 className="mt-1 text-2xl font-semibold text-foreground">Your procurement command center</h2>
                  <p className="mt-2 max-w-2xl text-sm text-muted-foreground">Discover suppliers, manage purchase orders, track deliveries and keep payments on schedule.</p>
                </div>
                <div className="w-full max-w-md">
                  <SearchBar value={query} onChange={setQuery} placeholder="Search products, suppliers or locations" />
                </div>
              </div>
            </section>

            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <StatCard label="Total Orders" value="24" detail="Across 6 suppliers" icon={ShoppingCart} trend="12% vs last month" />
              <StatCard label="Pending Orders" value="7" detail="Awaiting confirmation" icon={PackageCheck} trend="3 urgent" />
              <StatCard label="Delivered Orders" value="14" detail="Last 30 days" icon={Truck} trend="98% on time" />
              <StatCard label="Total Spending" value="RWF 12.8M" detail="Annualized spend" icon={Wallet} trend="+8.4%" />
            </section>

            <section className="grid gap-4 lg:grid-cols-4">
              <Link href="/buyer/marketplace" className="rounded-2xl border border-border bg-background p-4 shadow-sm transition hover:border-primary/40 hover:bg-surface">
                <div className="flex items-center gap-3"><SearchCheck className="h-5 w-5 text-primary" /> <span className="font-medium">Browse Marketplace</span></div>
              </Link>
              <Link href="/buyer/orders" className="rounded-2xl border border-border bg-background p-4 shadow-sm transition hover:border-primary/40 hover:bg-surface">
                <div className="flex items-center gap-3"><BriefcaseBusiness className="h-5 w-5 text-primary" /> <span className="font-medium">Create Order</span></div>
              </Link>
              <Link href="/buyer/tracking" className="rounded-2xl border border-border bg-background p-4 shadow-sm transition hover:border-primary/40 hover:bg-surface">
                <div className="flex items-center gap-3"><Truck className="h-5 w-5 text-primary" /> <span className="font-medium">Track Shipment</span></div>
              </Link>
              <Link href="/buyer/payments" className="rounded-2xl border border-border bg-background p-4 shadow-sm transition hover:border-primary/40 hover:bg-surface">
                <div className="flex items-center gap-3"><CreditCard className="h-5 w-5 text-primary" /> <span className="font-medium">Make Payment</span></div>
              </Link>
            </section>

            <section className="rounded-2xl border border-border bg-background p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Recent orders</h3>
                  <p className="text-sm text-muted-foreground">Monitor active purchase activity and fulfillment progress.</p>
                </div>
                <Link href="/buyer/orders" className="text-sm font-medium text-primary">View all</Link>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-3 py-2">Order ID</th>
                      <th className="px-3 py-2">Product</th>
                      <th className="px-3 py-2">Supplier</th>
                      <th className="px-3 py-2">Qty</th>
                      <th className="px-3 py-2">Amount</th>
                      <th className="px-3 py-2">Status</th>
                      <th className="px-3 py-2">Date</th>
                      <th className="px-3 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-t border-border/70">
                        <td className="px-3 py-3 font-medium">{order.id}</td>
                        <td className="px-3 py-3">{order.product}</td>
                        <td className="px-3 py-3">{order.supplier}</td>
                        <td className="px-3 py-3">{order.quantity}</td>
                        <td className="px-3 py-3">{order.amount}</td>
                        <td className="px-3 py-3"><StatusBadge status={order.status} /></td>
                        <td className="px-3 py-3">{order.date}</td>
                        <td className="px-3 py-3">
                          <div className="flex gap-2">
                            <button className="rounded-lg border border-border px-2 py-1 text-xs hover:bg-surface">View</button>
                            <button className="rounded-lg border border-border px-2 py-1 text-xs hover:bg-surface">Track</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <Card className="border-border/80 bg-background shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Order status overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {(["Pending", "Processing", "Shipping", "Delivered", "Cancelled"] as const).map((status) => (
                  <div key={status} className="flex items-center justify-between rounded-lg border border-border bg-surface px-3 py-2 text-sm">
                    <span>{status}</span>
                    <span className="font-semibold text-foreground">{orders.filter((order) => order.status === status || (status === "Delivered" && order.status === "Delivered") || (status === "Cancelled" && order.status === "Cancelled") ? true : false).length}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border/80 bg-background shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Recommended products</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {filteredProducts.slice(0, 2).map((product) => (
                  <div key={product.id} className="rounded-xl border border-border p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-foreground">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.category} · {product.supplier}</p>
                      </div>
                      <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">{product.price}</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
                      <span>Avail. {product.stock}</span>
                      <span className="text-amber-500">★ {product.rating}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border/80 bg-background shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Notifications preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {notifications.map((item) => (
                  <div key={item.id} className="rounded-lg border border-border bg-surface px-3 py-2 text-sm">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium text-foreground">{item.title}</span>
                      {!item.read ? <span className="h-2.5 w-2.5 rounded-full bg-primary" /> : null}
                    </div>
                    <p className="mt-1 text-muted-foreground">{item.detail}</p>
                  </div>
                ))}
                <Link href="/buyer/notifications" className="inline-flex text-sm font-medium text-primary">View all notifications</Link>
              </CardContent>
            </Card>

            <Card className="border-border/80 bg-background shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Recent payments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {payments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between rounded-lg border border-border bg-surface px-3 py-2 text-sm">
                    <div>
                      <p className="font-medium text-foreground">{payment.invoice}</p>
                      <p className="text-muted-foreground">{payment.amount}</p>
                    </div>
                    <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:text-amber-400">{payment.status}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        <section className="mt-6 rounded-2xl border border-border bg-background p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Marketplace</h3>
              <p className="text-sm text-muted-foreground">Browse verified products, request quotes and add favorites.</p>
            </div>
            <Link href="/buyer/marketplace" className="text-sm font-medium text-primary">Open marketplace</Link>
          </div>
          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onWishlist={toggleWishlist} wishlist={wishlist} />
            ))}
          </div>
        </section>
      </PageBody>
    </>
  );
}

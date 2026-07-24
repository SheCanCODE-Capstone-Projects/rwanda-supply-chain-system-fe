export type TrackingEvent = {
  time: string;
  label: string;
  detail: string;
  done: boolean;
};

export type TrackingShipment = {
  orderId: string;
  product: string;
  supplier: string;
  destination: string;
  driver: string;
  vehicle: string;
  trackingRef: string;
  currentLocation: string;
  status: "In Transit" | "Delivered" | "Pending Pickup" | "Delayed";
  estimatedArrival: string;
  distance: string;
  progress: number; // 0–100
  events: TrackingEvent[];
};

export const shipments: TrackingShipment[] = [
  {
    orderId: "ORD-1183",
    product: "Premium Arabica Coffee (250 kg)",
    supplier: "Musanze Cooperative",
    destination: "Kigali Warehouse WH-01",
    driver: "Jean Uwimana",
    vehicle: "KGL-282 · Toyota Hiace",
    trackingRef: "TRK-7821",
    currentLocation: "Nyabugogo Bus Park, Kigali",
    status: "In Transit",
    estimatedArrival: "Today, 14:30",
    distance: "12 km remaining",
    progress: 80,
    events: [
      { time: "07:00", label: "Order picked up", detail: "Loaded at Musanze Cooperative warehouse.", done: true },
      { time: "09:15", label: "Departed Musanze", detail: "Vehicle KGL-282 left Musanze depot.", done: true },
      { time: "11:40", label: "Checkpoint: Rulindo", detail: "Passed roadside quality check.", done: true },
      { time: "13:10", label: "Approaching Kigali", detail: "Currently at Nyabugogo, 12 km from destination.", done: true },
      { time: "14:30", label: "Delivered to WH-01", detail: "Awaiting arrival confirmation.", done: false },
    ],
  },
  {
    orderId: "ORD-1182",
    product: "Long Grain White Rice (500 kg)",
    supplier: "Kigali Grain Hub",
    destination: "Buyer Depot, Remera",
    driver: "Alice Ingabire",
    vehicle: "KGL-307 · Isuzu NPR",
    trackingRef: "TRK-7822",
    currentLocation: "Kigali Grain Hub, CBD",
    status: "Pending Pickup",
    estimatedArrival: "Tomorrow, 09:00",
    distance: "Ready for dispatch",
    progress: 15,
    events: [
      { time: "Today", label: "Order confirmed", detail: "Kigali Grain Hub confirmed your order.", done: true },
      { time: "Tomorrow 07:00", label: "Loading", detail: "Rice will be loaded onto vehicle KGL-307.", done: false },
      { time: "Tomorrow 09:00", label: "Delivery", detail: "Expected at Remera depot.", done: false },
    ],
  },
  {
    orderId: "ORD-1181",
    product: "Fresh Tomatoes (300 kg)",
    supplier: "Gasabo Produce",
    destination: "Buyer Cold Store, Kicukiro",
    driver: "Paul Nkurunziza",
    vehicle: "KGL-415 · Refrigerated Van",
    trackingRef: "TRK-7815",
    currentLocation: "Kicukiro Cold Store",
    status: "Delivered",
    estimatedArrival: "Delivered on 2026-07-18",
    distance: "0 km",
    progress: 100,
    events: [
      { time: "07:00 Jul 18", label: "Picked up", detail: "Loaded at Gasabo farm.", done: true },
      { time: "09:30 Jul 18", label: "In transit", detail: "Refrigerated van en route.", done: true },
      { time: "11:45 Jul 18", label: "Delivered", detail: "Signed off by Kevin Rwema at Kicukiro Cold Store.", done: true },
    ],
  },
];

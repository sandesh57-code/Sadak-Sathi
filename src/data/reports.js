export const reports = [
  {
    id: "REP-101",
    district: "Kathmandu",
    lat: 27.7172,
    lng: 85.3240,
    severity: "Critical",
    status: "Pending",
    clusterId: "CL-01",
    image: "/images/reports/kathmandu.png",
    createdAt: "2026-05-01",
    department: "Road Division Kathmandu",
    description: "Large pothole near Kalanki junction causing traffic congestion."
  },
  {
    id: "REP-102",
    district: "Lalitpur",
    lat: 27.6744,
    lng: 85.3240,
    severity: "High",
    status: "In Progress",
    clusterId: "CL-01",
    image: "/images/reports/lalitpur.png",
    createdAt: "2026-05-02",
    department: "Lalitpur Metropolitan City",
    description: "Deep pothole at Patan Dhoka."
  },
  {
    id: "REP-103",
    district: "Bhaktapur",
    lat: 27.6710,
    lng: 85.4298,
    severity: "Medium",
    status: "Resolved",
    clusterId: "CL-02",
    image: "/images/reports/lalitpur.png",
    createdAt: "2026-05-03",
    department: "Bhaktapur Municipality",
    description: "Minor road surface damage near Kamal Pokhari."
  },
  {
    id: "REP-104",
    district: "Pokhara",
    lat: 28.2096,
    lng: 83.9856,
    severity: "Low",
    status: "Pending",
    clusterId: "CL-03",
    image: "/images/reports/pokhara.png",
    createdAt: "2026-05-04",
    department: "Pokhara Road Division",
    description: "Small crack appearing on Lakeside road."
  },
  {
    id: "REP-105",
    district: "Chitwan",
    lat: 27.6833,
    lng: 84.4333,
    severity: "Critical",
    status: "Pending",
    clusterId: "CL-04",
    image: "/images/reports/chitwan.png",
    createdAt: "2026-05-05",
    department: "Bharatpur Municipality",
    description: "Dangerous pothole on East-West Highway segment."
  },
  {
    id: "REP-106",
    district: "Kathmandu",
    lat: 27.7000,
    lng: 85.3000,
    severity: "High",
    status: "Pending",
    clusterId: "CL-01",
    image: "/images/reports/kathmandu.png",
    createdAt: "2026-05-05",
    department: "Road Division Kathmandu",
    description: "Sunken road surface near New Road."
  },
  {
    id: "REP-107",
    district: "Butwal",
    lat: 27.7006,
    lng: 83.4484,
    severity: "Medium",
    status: "In Progress",
    clusterId: "CL-05",
    image: "/images/reports/pokhara.png",
    createdAt: "2026-05-04",
    department: "Butwal Sub-Metropolitan City",
    description: "Multiple small potholes on main market road."
  },
  {
    id: "REP-108",
    district: "Biratnagar",
    lat: 26.4525,
    lng: 87.2717,
    severity: "Low",
    status: "Resolved",
    clusterId: "CL-06",
    image: "/images/reports/chitwan.png",
    createdAt: "2026-04-28",
    department: "Biratnagar Road Division",
    description: "Repaired pothole near bus park."
  }
];

export const stats = {
  total: 842,
  resolved: 512,
  activeClusters: 18,
  criticalAlerts: 12
};

export const analyticsData = {
  resolutionTime: [
    { name: "Kathmandu", time: 4.2 },
    { name: "Lalitpur", time: 3.8 },
    { name: "Bhaktapur", time: 2.5 },
    { name: "Pokhara", time: 5.1 },
    { name: "Chitwan", time: 4.5 }
  ],
  severityDist: [
    { name: "Critical", value: 15, fill: "#ef4444" },
    { name: "High", value: 25, fill: "#f97316" },
    { name: "Medium", value: 35, fill: "#eab308" },
    { name: "Low", value: 25, fill: "#22c55e" }
  ],
  districtReports: [
    { name: "Kathmandu", reports: 245 },
    { name: "Lalitpur", reports: 120 },
    { name: "Bhaktapur", reports: 85 },
    { name: "Pokhara", reports: 95 },
    { name: "Chitwan", reports: 60 },
    { name: "Butwal", reports: 45 }
  ],
  monthlyTrend: [
    { month: "Jan", reports: 45 },
    { month: "Feb", reports: 52 },
    { month: "Mar", reports: 68 },
    { month: "Apr", reports: 94 },
    { month: "May", reports: 120 }
  ]
};

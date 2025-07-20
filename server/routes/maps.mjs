import express from "express";
const router = express.Router();

const charRegions = [
  {
    id: 1,
    name: "Koronjapara",
    coordinates: { lat: 24.955, lng: 89.568 },
    families: 85,
    displaced: 85,
    status: "high-impact",
    description:
      "Village severely impacted since 2018. The entire area had to displace in 2025 to survive the floods and merged with two nearby villages.",
  },
  {
    id: 2,
    name: "Char Montaz",
    coordinates: { lat: 24.7821, lng: 89.4156 },
    families: 92,
    displaced: 84,
    status: "high-impact",
    description: "Central char region with significant displacement",
  },
  {
    id: 3,
    name: "Char Bhavani",
    coordinates: { lat: 24.6543, lng: 89.3892 },
    families: 67,
    displaced: 62,
    status: "medium-impact",
    description: "Eastern char area with moderate impact",
  },
  {
    id: 4,
    name: "Char Janajat",
    coordinates: { lat: 24.5987, lng: 89.4523 },
    families: 78,
    displaced: 71,
    status: "high-impact",
    description: "Southern region with high displacement rates",
  },
  {
    id: 5,
    name: "Char Ziauddin",
    coordinates: { lat: 24.7234, lng: 89.3156 },
    families: 54,
    displaced: 49,
    status: "medium-impact",
    description: "Western char with gradual recovery",
  },
];

router.get("/", (req, res) => {
  res.json(charRegions);
});

export default router;

import express from "express";
const router = express.Router();

const displacementRes = [
    { year: "2018", region: "kukri", displaced: 450, returned: 120, relocated: 180 },
    { year: "2019", region: "montaz", displaced: 280, returned: 340, relocated: 90 },
    { year: "2020", region: "bhavani", displaced: 150, returned: 380, relocated: 45 },
    { year: "2021", region: "janajat", displaced: 90, returned: 420, relocated: 25 },
  ];

  const violenceRes = [
    { month: "Jan 2018", incidents: 23 },
    { month: "Mar 2018", incidents: 45 },
    { month: "Jun 2018", incidents: 67 },
    { month: "Sep 2018", incidents: 34 },
    { month: "Dec 2018", incidents: 28 },
    { month: "Mar 2019", incidents: 19 },
    { month: "Jun 2019", incidents: 15 },
    { month: "Sep 2019", incidents: 12 },
    { month: "Dec 2019", incidents: 8 },
  ];

  const recoveryRes = [
    { category: "Full Recovery", value: 35, color: "#10b981" },
    { category: "Partial Recovery", value: 45, color: "#f59e0b" },
    { category: "Limited Recovery", value: 20, color: "#ef4444" },
  ];

  const regionRes = [
    { region: "Char Mukri", families: 85, displacement: 78 },
    { region: "Char Montaz", families: 92, displacement: 84 },
    { region: "Char Bhavani", families: 67, displacement: 62 },
    { region: "Char Janaj", families: 78, displacement: 71 },
    { region: "Char Ziauddin", families: 54, displacement: 49 },
  ];

router.get("/", (req, res) => {
    res.json({
        displacementRes,
        violenceRes,
        recoveryRes,
        regionRes
    });
});

export default router;
import express from "express";
const router = express.Router();

const stories = [
  {
    id: 1,
    name: "Shirin",
    age: 42,
    location: "Koronjapara",
    category: "Displacement",
    quote:
      "Wives are a must for getting loan. That's why violence has reduced significantly.",
    story:
      "Shirin displaced multiple times due to river bank erosion and floods. She thinks female children now have more value as they spend lesser time with the family. Less time with family means less expenses for them. She also mentioned that females now have more importance to their husband because banks and other organizations do not provide loans unless they have a wife. This means the males remain extra careful so that their wives do not leave them.",
    impact: "High",
    year: "2018-2025",
  },
  {
    id: 2,
    name: "Minu Begum",
    age: 38,
    location: "Koronjapara",
    category: "Violence Prevention",
    quote:
      "There are very few eve teasers and sexual culprits in these areas now.",
    story:
      "Minu is the female member of Koronjapara village. She helped establish women's safety committees and now leads conflict resolution for women. She thinks there are less conflict and clashes with females than before due to having more income compared to 5 years ago. Despite being the female member of the village, Minu thinks that females do not have as much authority in the family as their husbands and it is okay if they get assaulted due to disagreements.",
    impact: "Medium",
    year: "2019-2021",
  },
  {
    id: 3,
    name: "Morium Begum",
    age: 55,
    location: "Char Bhavani",
    category: "Community Leadership",
    quote:
      "The floods took our houses, but they couldn't take our spirit. We came together as a community and rebuilt stronger than before.",
    story:
      "As a community elder, Morium coordinated relief efforts and helped establish new community guidelines for disaster preparedness. Her leadership was crucial in maintaining social cohesion during the crisis.",
    impact: "High",
    year: "2018-2020",
  },
  {
    id: 4,
    name: "Salma Akter",
    age: 34,
    location: "Char Janajat",
    category: "Economic Recovery",
    quote:
      "I never thought I could learn to read at my age, but the literacy program gave me hope. Now I keep the accounts for our savings group.",
    story:
      "Salma learned to read and write through post-flood rehabilitation programs. She now manages a community savings group that provides microloans to women starting small businesses.",
    impact: "Medium",
    year: "2019-2021",
  },
  {
    id: 5,
    name: "Nasir Ahmed",
    age: 38,
    location: "Char Ziauddin",
    category: "Family Recovery",
    quote:
      "My family was scattered across three districts after the flood. It took us eight months to reunite. The pain of separation taught us the value of being together.",
    story:
      "Nasir's family was separated during evacuation. He worked with local NGOs to trace missing family members and now volunteers with family reunification programs for other displaced families.",
    impact: "High",
    year: "2018-2019",
  },
  {
    id: 6,
    name: "Rahima Begum",
    age: 31,
    location: "Char Kukri Mukri",
    category: "Education",
    quote:
      "My daughter couldn't go to school for two years because of the floods. Now she's back in class and dreams of becoming a teacher to help other children.",
    story:
      "Rahima fought to ensure her daughter's education continued despite displacement. She helped establish a temporary school in their shelter community and advocates for children's educational rights.",
    impact: "Medium",
    year: "2018-2021",
  },
];

router.get("/", (req, res) => {
  res.json(stories);
});

export default router;

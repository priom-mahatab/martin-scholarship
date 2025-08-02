import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  Scatter,
  ScatterChart,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import axios from "axios";

const Dashboard = () => {
  const [displacementData, setDisplacementData] = useState([]);
  const [violenceData, setViolenceData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [influenceData, setInfluenceData] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/dashboard`
        );
        const { displacementRes, violenceRes, incomeRes, influenceRes } =
          res.data;
        setDisplacementData(displacementRes);
        setViolenceData(violenceRes);
        setIncomeData(incomeRes);
        setInfluenceData(influenceRes);
        // console.log(displacementRes);
        // console.log(incomeRes);
        console.log(influenceRes);
        // console.log(violenceRes);

        // console.log(displacementData);
      } catch (err) {
        console.error("Could not fetch data", err);
      }
    };
    fetchAll();
  }, []);

  // transforming data for diagrams

  const radarData = [...new Set(violenceData.map((d) => d.type))].map(
    (type) => {
      const val2019 =
        violenceData.find((d) => d.type === type && d.year === 2019)?.value ||
        0;
      const val2025 =
        violenceData.find((d) => d.type === type && d.year === 2025)?.value ||
        0;
      return { type, y2019: parseFloat(val2019), y2025: parseFloat(val2025) };
    }
  );

  console.log(radarData);

  const influenceRadarData = [
    ...new Set(influenceData.map((d) => d.category)),
  ].map((category) => {
    const val2019 =
      influenceData.find((d) => d.category === category && d.year === 2019)
        ?.value || 0;
    const val2025 =
      influenceData.find((d) => d.category === category && d.year === 2025)
        ?.value || 0;
    return { category, y2019: parseFloat(val2019), y2025: parseFloat(val2025) };
  });

  const groupedDisplacementData = [];
  displacementData.forEach((entry) => {
    let existing = groupedDisplacementData.find(
      (data) => data.year === entry.year
    );
    if (!existing) {
      existing = { year: entry.year };
      groupedDisplacementData.push(existing);
    }
    existing[entry.category] = entry.value;
  });

  // const groupedInfluenceData = [];
  // influenceData.forEach((entry) => {
  //   let existing = groupedInfluenceData.find(
  //     (data) => data.year === entry.year
  //   );
  //   if (!existing) {
  //     existing = { year: entry.year };
  //     groupedInfluenceData.push(existing);
  //   }
  //   existing[entry.category] = entry.value;
  // });
  // console.log(groupedInfluenceData);

  const groupedIncomeData = [];
  incomeData.forEach((entry) => {
    let existing = groupedIncomeData.find((data) => data.year === entry.year);
    if (!existing) {
      existing = { year: entry.year };
      groupedIncomeData.push(existing);
    }
    existing[entry.category] = entry.value;
  });

  return (
    <div className="min-h-screen bg-stone-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">
          Findings Dashboard
        </h1>
        <p className="text-lg text-stone-600 mb-6">
          Interactive analysis of displacement patterns, violence incidents, and
          recovery outcomes of women across Jamuna char communities.
        </p>

        {/* Key Metrics */}
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded shadow">
            <div className="text-2xl font-bold text-emerald-600">90</div>
            <div className="text-sm text-stone-600">Households Surveyed</div>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <div className="text-2xl font-bold text-blue-600">49.6%</div>
            <div className="text-sm text-stone-600">
              Increase in Decision Making
            </div>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <div className="text-2xl font-bold text-amber-600">28</div>
            <div className="text-sm text-stone-600">
              Focus Group Discussions
            </div>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <div className="text-2xl font-bold text-rose-600">25%</div>
            <div className="text-sm text-stone-600">Labor Growth</div>
          </div>
        </div> */}

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">
              Violence Patterns Over Time
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="type" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar
                  name="2019"
                  dataKey="y2019"
                  stroke="#059669"
                  fill="#059669"
                  fillOpacity={0.6}
                />
                <Radar
                  name="2025"
                  dataKey="y2025"
                  stroke="#2563EB"
                  fill="#2563EB"
                  fillOpacity={0.6}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">
              Displaced Frequency in the Last Decade
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={groupedDisplacementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="Flood displacement"
                  stroke="#2563EB"
                  fill="#2563EB"
                  opacity={0.6}
                  name="Flood"
                />
                <Bar
                  dataKey="Erosion displacement"
                  stroke="#059669"
                  fill="#059669"
                  opacity={0.6}
                  name="River Erosion"
                />
                <Legend />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded shadow mt-8 mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-stone-800 mb-3">
                Violence Pattern
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                The research data reveals a promising trend in the reduction of
                reported violence from 2019 to 2025, signaling a significant
                improvement in safety and autonomy for char dwellers. In 2019,
                the most prevalent forms of violence, including male decision
                control, verbal abuse, and pushing/shoving, were reported at
                100.0%. By 2025, these figures had plummeted to 3.3%, 83.3%, and
                37.8% respectively. Similarly, incidents of restricting contact,
                ignoring, and beating also decreased. However, the increase in
                sexual assault from 21.7% in 2019 to 37.8% in 2025 is a
                concerning trend that may require targeted intervention and
                support.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-stone-800 mb-3">
                Displacement Pattern
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Recovery patterns show significant improvement over the 6-year
                study period. However, the number of times the char dwellers
                have had to be displaced has gone up overall. In 2019, the
                respondents reported that they had to displace more frequently
                due to river erosion (3.72 times every 5 years) than floods
                (1.56 times every 5 years). In 2025, research shows an enormous
                bump in the frequency of displacement due to flood (3.77 times
                every 5 years). Due to the most recent flood, the entirety of
                Karanjapara village had to relocate and merge with Nayapara. The
                values of 2025 show the frequencies after the baseline survey.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Income</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={groupedIncomeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="Yes"
                  stroke="#2563EB"
                  fill="#2563EB"
                  opacity={0.6}
                  name="Engaged in Income"
                />
                <Bar
                  dataKey="No"
                  stroke="ef4444"
                  fill="#059669"
                  opacity={0.6}
                  name="No Income"
                />
                <Legend />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">
              Influence in Decision-Making
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              {/* <LineChart data={groupedInfluenceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Most influence"
                  stroke="#2563EB"
                  strokeWidth={3}
                  opacity={0.6}
                />
                <Line
                  type="monotone"
                  dataKey="No influence"
                  stroke="#ef4444"
                  strokeWidth={3}
                  opacity={0.6}
                />
                <Line
                  type="monotone"
                  dataKey="Some influence"
                  stroke="#d97706"
                  strokeWidth={3}
                  opacity={0.6}
                />
                <Line
                  type="monotone"
                  dataKey="Equal influence"
                  stroke="#059669"
                  strokeWidth={3}
                  opacity={0.6}
                />
              </LineChart> */}
              <RadarChart data={influenceRadarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="category" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar
                  name="2019"
                  dataKey="y2019"
                  stroke="#059669"
                  fill="#059669"
                  fillOpacity={0.6}
                />
                <Radar
                  name="2025"
                  dataKey="y2025"
                  stroke="#2563EB"
                  fill="#2563EB"
                  fillOpacity={0.6}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Analysis */}
        <div className="bg-white p-6 rounded shadow mt-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-stone-800 mb-3">Income</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                The change in income engagement over time is a significant
                indicator of economic progress among char dwellers. In 2019,
                only about 38% of respondents were engaged in income activities,
                while around 62% reported having no income. By 2025, this had
                dramatically shifted, with approximately 73% reporting
                income-generating participation, marking a positive change in
                their economic status.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-stone-800 mb-3">
                Influence in Decision-Making
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                The research found a clear shift in agency within households. In
                2019, almost 50% of respondents said they did not influence
                decision-making, while only about 15% reported having equal
                influence. By 2025, the number of respondents with no influence
                had dropped to 0%, and those with equal influence had
                significantly increased to roughly 44%, a positive sign of
                empowerment.
              </p>
            </div>
          </div>
        </div>

        <Card className="bg-white rounded shadow mt-8">
          <CardHeader>
            <CardTitle>
              <h2 className="text-2xl font-semibold text-stone-800">
                Results Interpretation
              </h2>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div>
                <h3 className="font-semibold text-stone-800 mb-3">
                  Do they Match with Reality?
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  The numbers suggest progress, but do they truly reflect
                  reality? While the data indicates a significant drop in
                  domestic violence, it must be interpreted with caution. Many
                  respondents may have underreported their experiences due to
                  recency bias. At the time of the survey, most families were
                  not actively relocating, and household tensions were
                  relatively low. This temporary calm may have influenced their
                  responses. Notably, reports of sexual violence have increased
                  by nearly 16%, contradicting the narrative of overall
                  improvement. Similarly, while data shows a rise in women&#39;s
                  influence in household decision-making compared to 2019,
                  qualitative interviews paint a different picture. Male
                  respondents consistently affirmed that they still hold final
                  authority, and although women now feel more comfortable
                  sharing opinions, they rarely challenge the head of the
                  family. The female head representative noted that women tend
                  to nod along with each other during discussions. This suggests
                  a lack of confidence rather than genuine agency. These
                  contradictions raise a complex but essential question: are
                  women truly breaking free from the cycle of abuse, or are we
                  mistaking silence for safety? To address this, there is a need
                  for gender-sensitive policies and interventions that can
                  empower women and promote gender equality.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-stone-800 mb-3">
                  Cycle of Poverty & Illiteracy
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  More females are now engaged in income, primarily through
                  farming. However, they are still paid below minimum wage.
                  Since their husbands easily influence them, most of that
                  income ends up in the males&#39; pockets. More income also
                  does not correlate with financial stability. Most of the funds
                  are spent during relocation periods. Continuous displacement
                  and transportation easily drain out their income. To make
                  things worse, 51% of the respondents never attended school,
                  and 54.7% of them cannot read or write. The impact of
                  continuous displacements on education is alarming, with
                  schools being destroyed during floods and classes being paused
                  for months. Yet, residents prefer staying here because of the
                  low cost of housing and easier access to agriculture. This has
                  kept them within a vicious cycle of poverty.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-stone-800 mb-3">Thoughts</h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Women are highly vulnerable to increased levels of IPV
                  (Intimate Partner Violence) post-displacement despite reported
                  data showing otherwise. There have been interventions to
                  address extreme cases of poverty in these lands, but the need
                  for more effective solutions is pressing. However, significant
                  progress is yet to be seen. All of the emergency funds and
                  progressive projects from organizations like USAID, DFID, and
                  BRAC are turned to ash when there is erosion or flooding.
                  That&#39;s why poverty is being passed on from generation to
                  generation. When communities like these are excluded from the
                  digital world, their needs remain invisible, their voices
                  unheard, and their futures limited. Equal access to technology
                  isn&#39;t just about having devices or Wi-Fi; it&#39;s about
                  ensuring that even the most displaced lives are counted in the
                  systems that shape policy, funding, and innovation.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

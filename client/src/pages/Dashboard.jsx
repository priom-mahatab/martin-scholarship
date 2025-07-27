import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
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
        </div>

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
                  stroke="ef4444"
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
                The data shows significant decreases in almost all types of
                reported violence from 2019 to 2025, which indicates progress in
                safety and autonomy for char dwellers. In 2019, the most
                reported forms of violence included male decision control,
                verbal abuse, and pushing/shoving at 100.0%. By 2025, these
                numbers fell sharply to 3.3%, 83.3%, and 37.8% respectively.
                Similarly, the incidents of restricting contact, ignoring, and
                beating dropped. However, sexual assault increased from 21.7% in
                2019 to 37.8% in 2025, which is a concerning trend that may need
                targeted intervention and support.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-stone-800 mb-3">
                Displacement Pattern
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Recovery patterns show significant improvement over the 6-year
                study period. However, the amount of times the char dwellers
                have had to displace has gone up overall. In 2019, the
                respondents reported that they had to displace more frequently
                due to river erosions (3.72) than floods (1.56). In 2025, we
                found out an enormous bump in the frequency of displacement due
                to flood (3.77). Due to the most recent flood, the entirety of
                Karanjapara village had to relocate and merge with Nayapara.
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
                Income engagement over time reveals a significant change from
                economic dependency to income-generating participation. In 2019,
                only about 38% of respondents participated in income activities,
                while around 62% reported having no income. By 2025, this
                changed dramatically: approximately 73% were now engaged in
                income.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-stone-800 mb-3">
                Influence in Decision-Making
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                We found a clear shift in agency within households. In 2019,
                almost 50% of respondents said they had no influence in
                decision-making, while only about 15% reported having equal
                influence. By 2025, the number of respondents with no influence
                dropped to 0%, and those with equal influence increased
                significantly to roughly 44%.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

{
  /* violence incidents over time
  income trend of females over time
  decision making trend of females over time
  pie chart to show contribution of females on family income
  violence trends

  one village has been fully eroded. Migrated from Karanjapara to Nayapara 
   */
}

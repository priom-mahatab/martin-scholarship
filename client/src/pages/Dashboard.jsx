import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import axios from "axios";

const Dashboard = () => {

  const [displacementData, setDisplacementData] = useState([]);
  const [recoveryData, setRecoveryData] = useState([]);
  const [violenceData, setViolenceData] = useState([]);
  const [regionData, setRegionData] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/dashboard`)
        const {displacementRes, violenceRes, recoveryRes, regionRes} = res.data;
        setDisplacementData(displacementRes);
        setViolenceData(violenceRes);
        setRecoveryData(recoveryRes);
        setRegionData(regionRes);
      } catch(err) {
        console.error("Could not fetch data", err);
      }
    };
    fetchAll();
  }, []);

  return (
    <div className="min-h-screen bg-stone-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">
          Findings Dashboard
        </h1>
        <p className="text-lg text-stone-600 mb-6">
          Interactive analysis of displacement patterns, violence incidents, and recovery outcomes across Jamuna char communities.
        </p>

        {/* <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-stone-700">Year:</label>
            <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="border rounded px-2 py-1">
              <option value="all">All Years</option>
              <option value="2018">2018</option>
              <option value="2019">2019</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-stone-700">Region:</label>
            <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)} className="border rounded px-2 py-1">
              <option value="all">All Regions</option>
              <option value="kukri">Char Kukri Mukri</option>
              <option value="montaz">Char Montaz</option>
              <option value="bhavani">Char Bhavani</option>
              <option value="janajat">Char Janajat</option>
            </select>
          </div>
        </div> */}

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded shadow">
            <div className="text-2xl font-bold text-emerald-600">250+</div>
            <div className="text-sm text-stone-600">Families Surveyed</div>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <div className="text-2xl font-bold text-blue-600">85%</div>
            <div className="text-sm text-stone-600">Peak Displacement</div>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <div className="text-2xl font-bold text-amber-600">35%</div>
            <div className="text-sm text-stone-600">Full Recovery</div>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <div className="text-2xl font-bold text-rose-600">-72%</div>
            <div className="text-sm text-stone-600">Violence Reduction</div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Displacement Patterns Over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={displacementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="displaced" fill="#ef4444" name="Displaced" />
                <Bar dataKey="returned" fill="#10b981" name="Returned" />
                <Bar dataKey="relocated" fill="#f59e0b" name="Relocated" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Violence Incidents Timeline</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={violenceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey='month' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="incidents" stroke="#dc2626" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Community Recovery Status</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={recoveryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ category, value }) => `${category}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                >
                {recoveryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Displacement by Region</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={regionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="region" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="families" fill="#10b981" name="Families" />
                  <Bar dataKey="displacement" fill="#ef4444" name="Displaced" />
                </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Analysis */}
        <div className="bg-white p-6 rounded shadow mt-8">
          <h2 className="text-2xl font-semibold text-stone-800 mb-6">Key Trends and Analysis</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-stone-800 mb-3">Displacement Recovery</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Recovery patterns show significant improvement over the 3-year study period. 
                  Initial displacement peaked at 85% in 2018, with steady return rates increasing 
                  from 2019 onwards. Permanent relocation remained relatively low, indicating 
                  strong community ties to ancestral lands.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-stone-800 mb-3">Violence Reduction</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                  Gender-based violence incidents showed a marked 72% decrease from peak 
                  flood period to 2019. This correlates with increased community organizing, 
                  NGO interventions, and establishment of women's safety committees in 
                  affected char areas.
              </p>
            </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Dashboard;


{/* violence incidents over time
  income trend of females over time
  decision making trend of females over time
  pie chart to show contribution of females on family income
  violence trends

  one village has been fully eroded. Migrated from Karanjapara to Nayapara 
   */}
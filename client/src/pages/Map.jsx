import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Users, Home, AlertTriangle } from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { MapContainer, Popup, TileLayer, Marker } from "react-leaflet";
import { Badge } from "@/components/ui/badge";
import axios from "axios";

const MapView = () => {
  const [selectedCategory, setSelectedCategory] = useState("displacement");
  const [displacementData, setDisplacementData] = useState([]);
  const [ownershipData, setOwnershipData] = useState([]);
  const [religionData, setReligionData] = useState([]);
  const [roofData, setRoofData] = useState([]);
  const [floorData, setFloorData] = useState([]);
  const [wallData, setWallData] = useState([]);

  const jamunaCenter = [24.955, 89.568];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/map`);
        const {
          displacementRes,
          ownershipRes,
          religionRes,
          roofRes,
          floorRes,
          wallRes,
        } = res.data;
        setDisplacementData(displacementRes);
        setOwnershipData(ownershipRes);
        setReligionData(religionRes);
        setRoofData(roofRes);
        setFloorData(floorRes);
        setWallData(wallRes);
        console.log(res.data);
      } catch (err) {
        console.error("Failed to fetch regions:", err);
      }
    };

    fetchData();
  }, []);

  const categoryMap = {
    displacement: displacementData,
    ownership: ownershipData,
    religion: religionData,
    roof: roofData,
    floor: floorData,
    wall: wallData,
  };

  const labelMap = {
    displacement: "category",
    ownership: "category",
    religion: "religion",
    roof: "material",
    floor: "material",
    wall: "material",
  };

  const selectedData = categoryMap[selectedCategory] || [];

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">
            Geographical Impact Map
          </h1>
          <p className="text-lg text-stone-600 mb-6">
            Spatial visualization of flood impacts across Jamuna riverine char
            communities, showing displacement patterns and recovery status by
            region.
          </p>
        </div>

        {/* Map Section */}
        <Card className="h-[600px] rounded">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              Char Regions Along Jamuna River
            </CardTitle>
          </CardHeader>
          <CardContent className="h-full">
            <MapContainer
              center={jamunaCenter}
              zoom={8}
              scrollWheelZoom={true}
              className="w-full h-full z-10 relative"
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={jamunaCenter}>
                <Popup>Approx. center of the research region.</Popup>
              </Marker>
            </MapContainer>
          </CardContent>
        </Card>

        <Card className="bg-white p-6 rounded shadow mt-8">
          <CardHeader>
            <CardTitle>
              <h2 className="text-2xl font-semibold text-stone-800">
                Region Overview
              </h2>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-emerald-600">3</div>
                <div className="text-sm text-stone-600">Char Regions</div>
              </div>

              <div>
                <div className="text-2xl font-bold text-blue-600">250+</div>
                <div className="text-sm text-stone-600">Total Families</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Selection */}
        <Card className="bg-white p-6 rounded shadow mt-8">
          <CardHeader>
            <CardTitle>
              <h3 className="font-semibold text-stone-800 mb-3">
                Select a Data Category
              </h3>
            </CardTitle>
            <p className="text-stone-600 text-sm leading-relaxed">
              Data from these options have been divided into multiple
              categories, calibrated in percentage. All of them will add up to a
              total of 100%. The goal is to provide information about what type
              of people populated the research areas after the most recent flood
              or river erosion.
              <br></br>
              <br></br>
              Displacement provides insights into where displaced individuals
              previously lived. Ownership details the type of housing tenure
              among residents. Religion indicates the religious affiliations of
              the surveyed population. Lastly, Roof, Floor, and Wall categories
              describe the materials used in housing construction, showing the
              percentage of people using specific materials for each part of
              their home.
            </p>
          </CardHeader>
          <CardContent className="flex flex-auto gap-3">
            {Object.keys(categoryMap).map((key) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-4 py-2 rounded font-medium transition hover:cursor-pointer ${
                  selectedCategory === key
                    ? "bg-blue-600 text-white"
                    : "bg-stone-200 text-stone-800"
                }`}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Display Selected Category */}
        <Card className="bg-white p-6 rounded shadow mt-8">
          <CardHeader>
            <CardTitle>
              {selectedCategory.charAt(0).toUpperCase() +
                selectedCategory.slice(1)}{" "}
              Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedData.length === 0 ? (
              <p className="text-stone-500">No data available.</p>
            ) : (
              // <ul className="space-y-4">
              //   {selectedData.map((item) => (
              //     <li
              //       key={item.id}
              //       className="flex justify-between items-center border p-3 rounded bg-stone-50 shadow-sm"
              //     >
              //       <span className="text-stone-700 font-medium">
              //         {item[labelMap[selectedCategory]]}
              //       </span>
              //       <span className="text-stone-800 font-bold">
              //         {item.amount}%
              //       </span>
              //     </li>
              //   ))}
              // </ul>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart 
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  data={selectedData.map((item) => ({
                    label: item[labelMap[selectedCategory]],
                    value: parseFloat(item.amount)
                  }))}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="label" />
                  <PolarRadiusAxis angle={60} domain={[0, 60]} />
                  <Radar
                    name={selectedCategory}
                    dataKey="value"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Description Section */}
        <Card className="bg-white p-6 rounded shadow mt-8">
          <CardHeader>
            <CardTitle>
              <h2 className="text-2xl font-semibold text-stone-800">
                Geographic Analysis Summary
              </h2>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-stone-800 mb-3">
                  Spatial Distribution
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  The char regions are distributed in Shariakandi area along the
                  Jamuna River, with higher impact areas concentrated in the
                  northern and central sections. These areas experienced more
                  severe flooding due to their proximity to major river bends
                  and lower elevation. We have seen multiple villages merging
                  with one another from 2018 to 2025. Some people have shifted
                  more towards north and east due to closer access to mainland.
                  <br />
                  <br />A notable trend found through the research is that most
                  people roam within the same piece of land or come from
                  somewhere within the same district. 100% of the research
                  subjects are followers of Islam. So, there is little to no
                  cultural or religious diversity in these areas. However, this
                  also helps everyone feel included and makes regional decisions
                  easier.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-stone-800 mb-3">
                  Recovery Patterns
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Recovery rates vary significantly by geographic location, with
                  chars closer to mainland infrastructure showing faster
                  recovery. The current island where Koronjapara villagers
                  merged in is very vulnerable to displacement as it has already
                  started breaking off. NGOs like Char Livelihood Program (CLP)
                  and BRAC have made efforts to give these people a source of
                  income through livestock.
                  <br />
                  <br />
                  The government has also supplied electricity and dish antenna
                  to this char through rural electricity. However, only 4.4% of
                  the housing were provided by the government. Four-fifths of the
                  people have built their own houses using straws and tin. Education 
                  and transportation remain the biggest challenges for the char-residents. 
                  Every time they have to relocate, primary education is halted for months.

                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MapView;

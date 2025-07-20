import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Users, Home, AlertTriangle } from "lucide-react";
import { MapContainer, Popup, TileLayer, Marker } from "react-leaflet";
import { Badge } from "@/components/ui/badge";
import axios from "axios";

const MapView = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [charRegions, setCharRegions] = useState([]);
  const jamunaCenter = [24.955, 89.568];

  const getStatusColor = (status) => {
    switch (status) {
      case "high-impact":
        return "bg-red-500";
      case "medium-impact":
        return "bg-yellow-500";
      case "low-impact":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/map`);
        setCharRegions(res.data);
      } catch (err) {
        console.error("Failed to fetch regions:", err);
      }
    };

    fetchRegions();
  }, []);

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
                <div className="text-2xl font-bold text-emerald-600">
                  {charRegions.length}
                </div>
                <div className="text-sm text-stone-600">Char Regions</div>
              </div>

              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {charRegions.reduce((total, r) => total + r.families, 0)}
                </div>
                <div className="text-sm text-stone-600">Total Families</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/*if a region is selected*/}
        {selectedRegion ? (
          <Card className="bg-white p-6 rounded shadow mt-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{selectedRegion.name}</span>
                <Badge className={getStatusColor(selectedRegion.status)}>
                  {selectedRegion.status.replace("-", " ")}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-stone-600 mb-4">
                {selectedRegion.description}
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">Total Families</span>
                  </div>
                  <span className="font-semibold">
                    {selectedRegion.families}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <span className="text-sm">Displaced</span>
                  </div>
                  <span className="font-semibold">
                    {selectedRegion.displaced}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Home className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Remaining</span>
                  </div>
                  <span className="font-semibold">
                    {selectedRegion.families - selectedRegion.displaced}
                  </span>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <div className="text-sm text-stone-600">
                    Displacement Rate
                  </div>
                  <div className="w-full bg-stone-200 rounded-full h-2 mt-1">
                    <div
                      className={`${getStatusColor(
                        selectedRegion.status
                      )} h-2 rounded-full`}
                      style={{
                        width: `${
                          (selectedRegion.displaced / selectedRegion.families) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <div className="text-xs text-stone-500 mt-1">
                    {Math.round(
                      (selectedRegion.displaced / selectedRegion.families) * 100
                    )}
                    %
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-white p-6 rounded shadow mt-8">
            <CardContent className="p-6 text-center">
              <MapPin className="w-12 h-12 text-stone-300 mx-auto mb-4" />
              <p className="text-stone-500">
                Click on a char to view detailed information
              </p>
            </CardContent>
          </Card>
        )}

        <Card className="bg-white p-6 rounded shadow mt-8">
          <CardHeader>
            <CardTitle>Regional Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {charRegions.map((region) => (
                <div
                  key={region.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedRegion?.id === region.id
                      ? "bg-blue-50 border border-blue-200"
                      : "bg-stone-50 hover:bg-stone-100"
                  }`}
                  onClick={() => setSelectedRegion(region)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium text-sm">{region.name}</div>
                      <div className="text-xs text-stone-500">
                        {region.displaced}/{region.families} displaced
                      </div>
                    </div>
                    <div
                      className={`w-3 h-3 rounded-full ${getStatusColor(
                        region.status
                      )}`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
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
                  Even though there have been structural improvements in these
                  areas, their future still remains in the hands of nature.
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
                  income through livestock. The government has also supplied
                  electricity and dish antenna to this char through rural
                  electricity.
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

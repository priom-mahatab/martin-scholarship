import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import seuLogo from "@/assets/seu-logo.png";
import uniPort from "@/assets/uni-o-p.png";
import gbfLogo from "@/assets/gbf-logo.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Credits = () => {
  return (
    <div className="min-h-screen bg-stone-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">
            Acknowledgements & Credits
          </h1>
          <p className="text-lg text-stone-600 mb-6">
            This research was made possible through the generous support and
            cooperation of several institutions and organizations committed to
            advancing knowledge about riverine communities and climate
            resilience.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-20 mb-8">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center">
                  <img
                    src={seuLogo}
                    alt="St. Edward's University Logo"
                    className="w-12 h-12 object-contain rounded"
                  />
                </div>
                <CardTitle className="text-xl text-stone-800">
                  St. Edward's University
                  <span className="inline-block bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full mt-2">
                    Scholarship Provider
                  </span>
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-stone-600 leading-relaxed">
                I extend my deepest gratitude to{" "}
                <strong>St. Edward's University</strong> for providing the
                Martin Scholarship, which made this comprehensive field research
                possible. The scholarship's support enabled extensive fieldwork
                in Bangladesh's char communities and facilitated the collection
                of vital data on displacement and recovery patterns following
                the floods.
              </p>
              <div className="mt-4 flex justify-center">
                <Button asChild className="bg-emerald-600">
                  <a
                    href="https://www.stedwards.edu"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Website
                  </a> 
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center">
                  <img
                    src={gbfLogo}
                    alt="Grameen Bikash Foundation Logo"
                    className="w-12 h-12 object-contain rounded"
                  />
                </div>
                <CardTitle className="text-xl text-stone-800">
                  Grameen Bikash Foundation
                  <span className="inline-block bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full mt-2">
                    Local Partner
                  </span>
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-stone-600 leading-relaxed">
                Special thanks to the <strong>Grameen Bikash Foundation</strong>{" "}
                for their invaluable cooperation and local expertise. Their deep
                understanding of char communities and established relationships
                with local residents were instrumental in facilitating
                meaningful interviews and ensuring culturally sensitive research
                practices throughout our study.
              </p>
              <div className="mt-4 flex justify-center">
                <Button asChild className="bg-emerald-600">
                  <a
                    href="https://www.gbf-bangladesh.org"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Website
                  </a> 
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center">
                  <img
                    src={uniPort}
                    alt="University of Portsmouth Logo"
                    className="w-12 h-12 object-contain rounded"
                  />
                </div>
                <CardTitle className="text-xl text-stone-800">
                  University of Portsmouth
                  <span className="inline-block bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full mt-2">
                    Research Contributor
                  </span>
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-stone-600 leading-relaxed">
                I acknowledge the <strong>University of Portsmouth</strong> for
                conducting the 2019 baseline survey. Their research provided a
                critical framework for designing the 2025 follow-up study and
                offered essential data points for longitudinal comparison and
                analysis. Their contribution continues to support a deeper
                understanding of displacement and its gendered impacts.
              </p>
              <div className="mt-4 flex justify-center">
                <Button asChild className="bg-emerald-600"> 
                  <a
                    href="https://www.port.ac.uk"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Website
                  </a> 
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <footer className="py-24">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-stone-600 text-sm">
            © 2025 Jamuna Riverine Research Project. Conducted in partnership with Grameen Bikash Foundation.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Credits;

import Navigation from '../components/Navigation';
import bgImg from '../assets/jamuna-img3.png';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MapPin, BarChart } from 'lucide-react';


const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-emerald-50">
      <Navigation />

      <section className="relative h-[90vh] flex items-center justify-center">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${bgImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Resilience Along the <span className="text-blue-200">Jamuna River</span>
          </h1>
          <p className="text-lg md:text-2xl text-blue-100 mb-6">
            Understanding displacement, violence, and recovery after the 2018 floods
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/dashboard" className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded hover:bg-emerald-700">
              Explore Findings
            </a>
            <a href="/stories" className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded hover:bg-emerald-700">
              Read Stories
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-6">Research Overview</h2>
          <p className="text-lg text-stone-600 max-w-4xl mx-auto leading-relaxed">
            The Jamuna River's char lands are home to some of Bangladesh's most vulnerable communities. 
            Our comprehensive field study examines how the 2018 floods affected these riverine communities, 
            with particular focus on displacement patterns, gender-based violence, and long-term recovery outcomes.
            This project is a result of the Martin Scholarship offered by St. Edward's University.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-stone-800 mb-3">Data-Driven Insights</h3>
              <p className="text-stone-600">
                Interactive visualizations revealing patterns of displacement, recovery, and community resilience over time.
              </p>
              <Button asChild variant="ghost" className="mt-4 text-emerald-600">
                <Link to="/dashboard">View Dashboard</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-stone-800 mb-3">Geographic Analysis</h3>
              <p className="text-stone-600">
                Spatial mapping of affected areas, showing the geographic distribution of impacts across char regions.
              </p>
              <Button asChild variant="ghost" className="mt-4 text-blue-600">
                <Link to="/map">Explore Map</Link>
              </Button>

            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">"</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-stone-800 mb-3">Community Voices</h3>
              <p className="text-stone-600">
                Personal testimonials from women and community members sharing their experiences and recovery journeys.
              </p>
              <Button asChild variant="ghost" className="mt-4 text-amber-600">
                <Link to="/stories">Read Stories</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-stone-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Impact at a Glance</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-emerald-400 mb-2">250+</div>
              <div className="text-stone-300">Families Interviewed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">12</div>
              <div className="text-stone-300">Char Communities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-amber-600 mb-2">85%</div>
              <div className="text-stone-300">Displacement Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-rose-600 mb-2">7</div>
              <div className="text-stone-300">Months of Research</div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-stone-600 text-sm">
            © 2025 Jamuna Riverine Research Project. Conducted in partnership with Grameen Bikash Foundation.
          </p>
        </div>
      </footer>

    </div>
    
  );
};

export default Home;

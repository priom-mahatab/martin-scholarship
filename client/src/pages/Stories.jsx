import Navigation from "@/components/Navigation";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Hand, Quote } from "lucide-react";
import { Lightbulb, Handshake, Speech } from 'lucide-react';
import axios from "axios";

const Stories = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/stories`);
        console.log("API URL:", import.meta.env.VITE_API_URL);
        setStories(res.data);
      } catch (err) {
        console.error("Could not fetch stories", err); 
      }
    };
    fetchStories();
  }, []);

  return (
    <div className="min-h-screen bg-stone-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Heading + Intro */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">
            Personal Stories
          </h1>
          <p className="text-lg text-stone-600 mb-6">
            Voices from the Jamuna char communities – stories of resilience,
            recovery, and hope from those who experienced the 2018 floods and
            their aftermath firsthand.
          </p>
        </div>

        {/* Story Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {stories.map((story) => (
            <Card
              key={story.id}
              className="border-0 shadow-lg hover:shadow-xl transition-shadow"
            >
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-stone-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <Quote className="w-6 h-6 text-stone-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-stone-800 mb-1">
                      {story.name}, {story.age}
                    </h3>
                    <p className="text-stone-600 text-sm mb-3">
                      {story.location}
                    </p>
                  </div>
                </div>

                <blockquote className="text-stone-700 italic text-lg leading-relaxed mb-6 pl-4 border-l-4 border-emerald-200">
                  "{story.quote}"
                </blockquote>

                <p className="text-stone-600 leading-relaxed">{story.story}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Themes Section */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-stone-800 mb-6 text-center">
              Community Voices: Key Themes
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-2xl font-bold text-emerald-600">
                    <Handshake className="w-8 h-8 text-emerald-600"/>
                  </div>
                </div>
                <h3 className="font-semibold text-stone-800 mb-2">
                  Community Solidarity
                </h3>
                <p className="text-stone-600 text-sm">
                  Stories consistently highlight how communities came together
                  during crisis, supporting each other through the most
                  difficult times.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-2xl font-bold text-blue-600">
                    <Speech className="w-8 h-8 text-blue-600"/>
                  </div>
                </div>
                <h3 className="font-semibold text-stone-800 mb-2">
                  Women's Leadership
                </h3>
                <p className="text-stone-600 text-sm">
                  Women emerged as key leaders in recovery efforts, organizing
                  safety committees, cooperatives, and educational initiatives.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-2xl font-bold text-amber-600">
                    <Lightbulb className="w-8 h-8 text-amber-600"/>
                  </div>
                </div>
                <h3 className="font-semibold text-stone-800 mb-2">
                  Hope for Future
                </h3>
                <p className="text-stone-600 text-sm">
                  Despite tremendous challenges, nearly all respondents
                  expressed optimism about their community's future and
                  resilience.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Methodology */}
        <Card className="bg-blue-50 border border-blue-200">
          <CardContent className="p-6">
            <h3 className="font-semibold text-stone-800 mb-3">
              About These Stories
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              These stories were collected through in-depth interviews and
              focus-group discussions conducted in July 2025 with community
              members across char regions. All participants provided informed
              consent while preserving the authentic voices and experiences of
              the Jamuna riverine communities. The stories represent diverse
              experiences of displacement, recovery, and resilience following
              the 2018 floods.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Stories;

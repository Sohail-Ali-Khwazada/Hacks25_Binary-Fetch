import React from "react";

export const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16">
      <div className="max-w-4xl mx-auto p-8">
        {/* Hero Section */}
        <div className="relative mb-16 rounded-2xl overflow-hidden bg-white shadow-xl">
          <div className="absolute inset-0"></div>
          <div className="relative z-10 p-8">
            <h1 className="text-5xl font-bold mb-6 text-purple-500">
              About Us
            </h1>
            <p className="text-xl text-gray-600 italic">
              Empowering your social presence, one post at a time
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                We're dedicated to revolutionizing how you manage your social media presence. 
                Our platform brings together intuitive design and powerful features to make 
                content management seamless and effective.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                We envision a world where creating and managing social media content is 
                effortless, allowing you to focus on what truly matters—building meaningful 
                connections with your audience.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://img.freepik.com/free-photo/successful-happy-business-team_53876-74892.jpg"
                alt="Team collaboration"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent">
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <p className="text-lg font-semibold">Powering thousands of social media strategies</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-6">
          {['Schedule 🕑', 'Analyze 💭', 'Engage 🏃🏾‍➡️'].map((feature) => (
            <div key={feature} className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-gray-800">#{feature}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
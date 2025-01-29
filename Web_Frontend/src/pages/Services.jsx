import React from "react";
import { FaInstagram , FaFacebook, FaLinkedin, FaTiktok, FaCalendarAlt, FaUsers, FaTwitter, FaYoutube } from "react-icons/fa";
import { LuMessageCircleMore } from "react-icons/lu"
import { IoBarChart } from "react-icons/io5";

export const ServiceCard = ({ title, description, icon: Icon, platforms }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      <Icon className="text-blue-600 w-6 h-6" />
    </div>
    <p className="text-gray-600 mb-4">{description}</p>
    {platforms && (
      <div className="flex flex-wrap gap-2">
        {platforms.map((Platform, index) => (
          <Platform 
            key={index} 
            className="w-5 h-5 text-gray-400 hover:text-blue-600 transition-colors duration-300"
          />
        ))}
      </div>
    )}
  </div>
);

export const Services = () => {
  const features = [
    {
      title: "Unified Dashboard",
      description: "Manage all your social media accounts from a single, intuitive dashboard. Save time and streamline your workflow.",
      icon: IoBarChart,
      platforms: [FaInstagram, FaTwitter, FaFacebook, FaLinkedin, FaYoutube, FaTiktok]
    },
    {
      title: "Smart Scheduling",
      description: "Schedule posts across multiple platforms with our AI-powered timing optimization for maximum engagement.",
      icon: FaCalendarAlt,
      platforms: [FaInstagram, FaTwitter, FaFacebook, FaLinkedin, FaYoutube, FaTiktok]
    },
    {
      title: "Analytics & Insights",
      description: "Get detailed analytics and actionable insights to understand your audience and improve your social media strategy.",
      icon: FaUsers,
      platforms: [FaInstagram, FaTwitter, FaFacebook, FaLinkedin]
    },
    {
      title: "Engagement Management",
      description: "Monitor and respond to comments and messages across all platforms from one central inbox.",
      icon: LuMessageCircleMore,
      platforms: [FaInstagram, FaTwitter, FaFacebook, FaLinkedin]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect and manage all your social media platforms in one place. 
            Simplify your social media management with our powerful suite of tools.
          </p>
        </div>

        {/* Platform Icons */}
        <div className="flex justify-center gap-8 mb-16">
          {[FaInstagram, FaTwitter, FaFacebook, FaLinkedin, FaYoutube, FaTiktok].map((Platform, index) => (
            <div key={index} className="p-4 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-300">
              <Platform className="w-8 h-8 text-gray-600" />
            </div>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <ServiceCard key={index} {...feature} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Ready to Streamline Your Social Media Management?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of social media managers who are already saving time 
            and improving their social media presence with our platform.
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300">
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  );
};
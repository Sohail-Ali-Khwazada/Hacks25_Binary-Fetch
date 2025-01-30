import React from 'react';
import { 
  FaTwitter, 
  FaFacebook, 
  FaInstagram, 
  FaLinkedin, 
  FaYoutube, 
  FaGithub
} from 'react-icons/fa';
import { FaDiscord } from 'react-icons/fa6';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <FaTwitter className="w-5 h-5" />, href: "#", label: "Twitter" },
    { icon: <FaFacebook className="w-5 h-5" />, href: "#", label: "Facebook" },
    { icon: <FaInstagram className="w-5 h-5" />, href: "#", label: "Instagram" },
    { icon: <FaLinkedin className="w-5 h-5" />, href: "#", label: "LinkedIn" },
    { icon: <FaYoutube className="w-5 h-5" />, href: "#", label: "YouTube" },
    { icon: <FaGithub className="w-5 h-5" />, href: "#", label: "GitHub" },
  ];

  const footerLinks = [
    { text: "Brand", href: "#" },
    { text: "Privacy", href: "#" },
    { text: "Terms of use", href: "#" },
    { text: "Email us", href: "#" },
  ];

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        {/* Community Section */}
        <div className="text-center mb-6">
          <h3 className="text-lg mb-4">Join our community</h3>
          <div className="flex justify-center gap-4 mb-6">
            <a href="#" className="flex items-center gap-2 hover:text-gray-300">
              <FaDiscord className="w-5 h-5" />
              Discord
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-gray-300">
              <FaFacebook className="w-5 h-5" />
              Facebook Group
            </a>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mb-6">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              className="hover:text-gray-300 transition-colors"
              aria-label={social.label}
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <div className="mb-4 md:mb-0 flex items-center">
            <span>© {currentYear} Mixpost</span>
            <span className="mx-2">•</span>
            <span className="flex items-center">
              Crafted by
              <a href="#" className="ml-1 hover:text-white">
                novector
              </a>
            </span>
          </div>
          
          <div className="flex gap-6">
            {footerLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="hover:text-white transition-colors"
              >
                {link.text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
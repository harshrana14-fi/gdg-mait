import { FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6 md:px-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">

        {/* Left: Logo + Name */}
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-bold text-blue-400 mb-1">GDG MAIT</h3>
          <p className="text-sm text-gray-400">
            A Developer Community at Maharaja Agrasen Institute of Technology
          </p>
        </div>

        {/* Center: Navigation */}
        <div className="flex gap-6 text-sm text-gray-300">
          <a href="#about" className="hover:text-white transition">About</a>
          <a href="#events" className="hover:text-white transition">Events</a>
          <a href="#certificate" className="hover:text-white transition">Certificate</a>
          <a href="#team" className="hover:text-white transition">Team</a>
          <a href="#contact" className="hover:text-white transition">Contact</a>
        </div>

        {/* Right: Social Icons */}
        <div className="flex gap-4 text-xl text-gray-300">
          <a
            href="https://linkedin.com/in/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/your-org"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            <FaGithub />
          </a>
          <a
            href="https://gdg.community.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            <FaGlobe />
          </a>
        </div>
      </div>

      {/* Bottom line */}
      <div className="mt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} GDG MAIT. All rights reserved.
      </div>
    </footer>
  );
}

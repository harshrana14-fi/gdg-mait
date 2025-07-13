import Image from "next/image";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="w-full bg-white py-20 px-6 md:px-24 text-gray-800"
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-blue-600 mb-4">About Us</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Google Developer Group (GDG) MAIT is a student-led community under the
          global GDG program, fostering innovation and technical learning within
          Maharaja Agrasen Institute of Technology.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-12 items-center justify-between">
        {/* Left Side: Image */}
        <div className="relative w-full md:w-1/2 h-64 md:h-96">
          <Image
            src="/images/mait-campus.jpg"
            alt="MAIT Campus"
            fill
            className="object-cover rounded-xl shadow-lg"
          />
        </div>

        {/* Right Side: Description */}
        <div className="md:w-1/2 space-y-6">
          <h3 className="text-2xl font-semibold text-gray-900">
            What We Do
          </h3>
          <p className="text-gray-600">
            At GDG MAIT, we organize tech events, coding competitions, study
            jams, speaker sessions, and workshops to bring hands-on experience
            to students in Web, Android, ML, Cloud and more.
          </p>

          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>Workshops & Bootcamps (e.g., Firebase, React, Git)</li>
            <li>Speaker Sessions with industry experts</li>
            <li>Google Cloud Study Jams</li>
            <li>Hackathons & Ideathons</li>
            <li>Career Guidance & Internship support</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

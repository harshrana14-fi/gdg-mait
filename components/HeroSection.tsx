import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="w-full min-h-[90vh] bg-gradient-to-br from-[#F9FAFB] to-[#e9f1ff] flex flex-col md:flex-row items-center justify-between px-8 md:px-24 py-20"
    >
      <div className="max-w-xl">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
          Welcome to <span className="text-blue-600">GDG MAIT</span>
        </h1>
        <p className="mt-4 text-gray-600 text-lg">
          Empowering students through workshops, tech events, study jams and real-world learning.
        </p>
        <a
          href="#events"
          className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition"
        >
          View Events
        </a>
      </div>

      <div className="mt-10 md:mt-0 relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
        <Image
          src="/images/gdg2024.jpg"
          alt="GDG Hero"
          fill
          className="object-contain rounded-xl shadow-xl"
        />
      </div>
    </section>
  );
}

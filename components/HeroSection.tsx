export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-32 px-6 text-center">
      <h1 className="text-5xl font-bold mb-4">Welcome to GDG Platform</h1>
      <p className="text-xl max-w-2xl mx-auto">
        A platform where all MAIT societies manage events and students participate easily.
      </p>
      <div className="mt-8 flex justify-center gap-6">
        <a href="/auth/choose-role" className="bg-white text-blue-700 px-6 py-3 rounded font-semibold hover:bg-gray-100 transition">
          Get Started
        </a>
        <a href="#features" className="border border-white px-6 py-3 rounded font-semibold hover:bg-white hover:text-blue-700 transition">
          Explore Features
        </a>
      </div>
    </section>
  );
}

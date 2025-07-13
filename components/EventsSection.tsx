type Event = {
  title: string;
  date: string;
  description: string;
  image: string;
};

const events: Event[] = [
  {
    title: "Firebase Bootcamp",
    date: "August 15, 2025",
    description: "Hands-on Firebase fundamentals workshop with real project deployment.",
    image: "/images/events/firebase.jpg",
  },
  {
    title: "AI/ML Study Jam",
    date: "September 2, 2025",
    description: "Learn Machine Learning from scratch with Google-hosted resources.",
    image: "/images/events/ml.jpg",
  },
  {
    title: "Web Dev Workshop",
    date: "July 10, 2025",
    description: "Intro to HTML, CSS, and React.js. Build your first website!",
    image: "/images/events/webdev.jpg",
  },
];

export default function EventsSection() {
  return (
    <section
      id="events"
      className="w-full bg-gray-50 py-20 px-6 md:px-24 text-gray-800"
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-blue-600 mb-4">Our Events</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Explore our past and upcoming events – designed to educate, inspire,
          and connect the developer community at MAIT.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {events.map((event, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
          >
            <div className="h-48 w-full relative">
              <img
                src={event.image}
                alt={event.title}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900">
                {event.title}
              </h3>
              <p className="text-sm text-gray-500 mb-2">{event.date}</p>
              <p className="text-gray-700 text-sm">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

import Image from "next/image";

type TeamMember = {
  name: string;
  role: string;
  image: string;
};

const team: TeamMember[] = [
  {
    name: "Name 1",
    role: "Lead Organizer",
    image: "/images/team/riya.jpg",
  },
  {
    name: "Name 2",
    role: "Technical Head",
    image: "/images/team/ankit.jpg",
  },
  {
    name: "Name 3",
    role: "Event Coordinator",
    image: "/images/team/priya.jpg",
  },
  {
    name: "Name 4",
    role: "Design Lead",
    image: "/images/team/yash.jpg",
  },
];

export default function TeamSection() {
  return (
    <section
      id="team"
      className="w-full bg-gray-50 py-20 px-6 md:px-24 text-gray-800 text-center"
    >
      <h2 className="text-4xl font-bold text-blue-600 mb-4">Meet the Team</h2>
      <p className="text-gray-600 text-lg max-w-xl mx-auto mb-12">
        The passionate minds behind GDG MAIT who plan, build, and lead our
        community initiatives.
      </p>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-center">
        {team.map((member, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition"
          >
            <div className="w-28 h-28 mx-auto relative mb-4">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              {member.name}
            </h3>
            <p className="text-sm text-blue-600">{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

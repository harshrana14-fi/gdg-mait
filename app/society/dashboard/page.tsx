
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Calendar,
  Users,
  Trophy,
  Settings,
  Plus,
  Edit,
  Eye,
  BarChart3,
  MessageSquare,
  Bell,
  Search,
  Download,
  Star,
  Clock,
  Moon,
  Sun,
  Activity,
  TrendingUp,
  Globe,
  Video,
  File,
  CheckCircle,
  AlertCircle,
  Menu,
  X,
} from 'lucide-react';

type SocietyUser = {
  name: string;
  email: string;
};

type Event = {
  _id: string;
  title: string;
  description: string;
  date: string;
  venue: string;
  imageUrl: string;
};

export default function SocietyDashboardPage() {
  const router = useRouter();
  const [society, setSociety] = useState<SocietyUser | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDesc, setNewEventDesc] = useState('');
  const [newEventDate, setNewEventDate] = useState<string>('');
  const [newEventVenue, setNewEventVenue] = useState<string>('');
  const [newEventImage, setNewEventImage] = useState<string>('');

  const stats = {
    totalEvents: events.length,
    activeMembers: 340,
    totalRegistrations: 1250,
    upcomingEvents: 8,
  };

  const notifications = [
    {
      id: 1,
      message: 'Tech Summit 2025 has 150 new registrations',
      time: '2 hours ago',
      type: 'success',
    },
    {
      id: 2,
      message: 'Coding Bootcamp feedback deadline tomorrow',
      time: '1 day ago',
      type: 'warning',
    },
    {
      id: 3,
      message: 'Monthly report is ready for download',
      time: '3 days ago',
      type: 'info',
    },
  ];

  useEffect(() => {
    // Mock localStorage for demo purposes
    const mockUser = {
      name: "Tech Society",
      email: "tech@university.edu"
    };
    setSociety(mockUser);
    fetchEvents(mockUser.email);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const fetchEvents = async (_email: string) => {
    // Mock API call - replace with actual API
    const mockEvents: Event[] = [
      {
        _id: '1',
        title: 'Tech Summit 2025',
        description: 'Annual technology conference',
        date: '2025-08-15T10:00:00',
        venue: 'Main Auditorium',
        imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&h=300&fit=crop'
      },
      {
        _id: '2',
        title: 'Coding Bootcamp',
        description: 'Learn programming fundamentals',
        date: '2025-08-20T14:00:00',
        venue: 'Computer Lab',
        imageUrl: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=500&h=300&fit=crop'
      }
    ];
    setEvents(mockEvents);
  };

  const handleCreateEvent = async () => {
    if (!newEventTitle.trim() || !society?.email) return;

    const newEvent: Event = {
      _id: Date.now().toString(),
      title: newEventTitle,
      description: newEventDesc,
      date: newEventDate,
      venue: newEventVenue,
      imageUrl: newEventImage,
    };

    setEvents(prev => [...prev, newEvent]);
    setNewEventTitle('');
    setNewEventDesc('');
    setNewEventDate('');
    setNewEventVenue('');
    setNewEventImage('');
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setNewEventTitle(event.title);
    setNewEventDesc(event.description);
    setNewEventDate(event.date);
    setNewEventVenue(event.venue);
    setNewEventImage(event.imageUrl);
  };

  const handleDelete = (eventId: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      setEvents(prev => prev.filter(event => event._id !== eventId));
    }
  };

  const handleUpdateEvent = async () => {
    if (!editingEvent || !society?.email) return;

    const updatedEvent: Event = {
      ...editingEvent,
      title: newEventTitle,
      description: newEventDesc,
      date: newEventDate,
      venue: newEventVenue,
      imageUrl: newEventImage,
    };

    setEvents(prev => prev.map(event => 
      event._id === editingEvent._id ? updatedEvent : event
    ));

    setEditingEvent(null);
    setNewEventTitle('');
    setNewEventDesc('');
    setNewEventDate('');
    setNewEventVenue('');
    setNewEventImage('');
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const handleLogout = () => {
    router.push('/society/login');
  };

  const themeClasses = {
    bg: darkMode ? 'bg-gray-900' : 'bg-gray-50',
    cardBg: darkMode ? 'bg-gray-800' : 'bg-white',
    text: darkMode ? 'text-white' : 'text-gray-900',
    textSecondary: darkMode ? 'text-gray-300' : 'text-gray-600',
    border: darkMode ? 'border-gray-700' : 'border-gray-200',
    sidebarBg: darkMode ? 'bg-gray-800' : 'bg-white',
    hoverBg: darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50',
  };

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'workspace', label: 'Workspace', icon: Globe },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  if (!society) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ${themeClasses.bg}`}>
      {/* Header */}
      <header className={`${themeClasses.cardBg} shadow-lg border-b ${themeClasses.border} sticky top-0 z-50`}>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`p-2 rounded-lg ${themeClasses.hoverBg} lg:hidden`}
              >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h1 className={`text-2xl font-bold ${themeClasses.text} ml-4 lg:ml-0`}>
                {society.name}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <button className={`p-2 rounded-lg ${themeClasses.hoverBg} relative`}>
                <Bell size={20} className={themeClasses.text} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button>

              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg ${themeClasses.hoverBg} transition-all duration-300`}
              >
                {darkMode ? (
                  <Sun size={20} className="text-yellow-400" />
                ) : (
                  <Moon size={20} className={themeClasses.text} />
                )}
              </button>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold">
                  {society.name.charAt(0)}
                </div>
                <div className="hidden md:block">
                  <p className={`text-sm font-medium ${themeClasses.text}`}>
                    {society.name}
                  </p>
                  <p className={`text-xs ${themeClasses.textSecondary}`}>
                    {society.email}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <div
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 fixed lg:relative z-40 w-64 transition-transform duration-300 ease-in-out`}
        >
          <div className={`${themeClasses.sidebarBg} h-full shadow-lg border-r ${themeClasses.border}`}>
            <nav className="mt-8 px-4">
              <div className="space-y-2">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                      activeTab === item.id
                        ? "bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-lg"
                        : `${themeClasses.text} ${themeClasses.hoverBg}`
                    }`}
                  >
                    <item.icon size={20} className="mr-3" />
                    {item.label}
                  </button>
                ))}
              </div>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className={`text-3xl font-bold ${themeClasses.text}`}>
                    Dashboard Overview
                  </h2>
                  <p className={`${themeClasses.textSecondary}`}>
                    Welcome back, {society.name}!
                  </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      title: "Total Events",
                      value: stats.totalEvents,
                      icon: Calendar,
                      color: "from-blue-500 to-cyan-600",
                      change: "+12%",
                    },
                    {
                      title: "Active Members",
                      value: stats.activeMembers,
                      icon: Users,
                      color: "from-green-500 to-emerald-600",
                      change: "+8%",
                    },
                    {
                      title: "Total Registrations",
                      value: stats.totalRegistrations,
                      icon: Trophy,
                      color: "from-purple-500 to-indigo-600",
                      change: "+23%",
                    },
                    {
                      title: "Upcoming Events",
                      value: stats.upcomingEvents,
                      icon: Clock,
                      color: "from-orange-500 to-red-600",
                      change: "+5%",
                    },
                  ].map((stat, index) => (
                    <div
                      key={index}
                      className={`${themeClasses.cardBg} rounded-2xl p-6 shadow-lg border ${themeClasses.border} hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}
                        >
                          <stat.icon className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-green-500 text-sm font-medium">
                          {stat.change}
                        </span>
                      </div>
                      <h3 className={`text-2xl font-bold ${themeClasses.text} mb-1`}>
                        {stat.value}
                      </h3>
                      <p className={`text-sm ${themeClasses.textSecondary}`}>
                        {stat.title}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Recent Activity */}
                <div className={`${themeClasses.cardBg} rounded-2xl p-6 shadow-lg border ${themeClasses.border}`}>
                  <h3 className={`text-xl font-bold ${themeClasses.text} mb-4`}>
                    Recent Activity
                  </h3>
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 rounded-lg border ${themeClasses.border} ${themeClasses.hoverBg}`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                notification.type === "success"
                                  ? "bg-green-100 text-green-600"
                                  : notification.type === "warning"
                                  ? "bg-yellow-100 text-yellow-600"
                                  : "bg-blue-100 text-blue-600"
                              }`}
                            >
                              {notification.type === "success" ? (
                                <CheckCircle size={16} />
                              ) : notification.type === "warning" ? (
                                <AlertCircle size={16} />
                              ) : (
                                <Bell size={16} />
                              )}
                            </div>
                            <div>
                              <p className={`${themeClasses.text} font-medium`}>
                                {notification.message}
                              </p>
                              <p className={`text-sm ${themeClasses.textSecondary}`}>
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Events Tab */}
            {activeTab === "events" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className={`text-3xl font-bold ${themeClasses.text}`}>
                    Event Management
                  </h2>
                </div>

                {/* Create/Edit Event Form */}
                <div className={`${themeClasses.cardBg} p-6 rounded-xl shadow-lg border ${themeClasses.border} space-y-4`}>
                  <h3 className={`text-xl font-semibold ${themeClasses.text}`}>
                    {editingEvent ? 'Edit Event' : 'Create New Event'}
                  </h3>

                  <input
                    type="text"
                    placeholder="Event Title"
                    value={newEventTitle}
                    onChange={(e) => setNewEventTitle(e.target.value)}
                    className={`w-full border ${themeClasses.border} p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${themeClasses.cardBg} ${themeClasses.text}`}
                  />

                  <textarea
                    placeholder="Event Description"
                    value={newEventDesc}
                    onChange={(e) => setNewEventDesc(e.target.value)}
                    className={`w-full border ${themeClasses.border} p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${themeClasses.cardBg} ${themeClasses.text}`}
                    rows={3}
                  />

                  <input
                    type="datetime-local"
                    value={newEventDate}
                    onChange={(e) => setNewEventDate(e.target.value)}
                    className={`w-full border ${themeClasses.border} p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${themeClasses.cardBg} ${themeClasses.text}`}
                  />

                  <input
                    type="text"
                    placeholder="Venue"
                    value={newEventVenue}
                    onChange={(e) => setNewEventVenue(e.target.value)}
                    className={`w-full border ${themeClasses.border} p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${themeClasses.cardBg} ${themeClasses.text}`}
                  />

                  <input
                    type="text"
                    placeholder="Image URL"
                    value={newEventImage}
                    onChange={(e) => setNewEventImage(e.target.value)}
                    className={`w-full border ${themeClasses.border} p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${themeClasses.cardBg} ${themeClasses.text}`}
                  />

                  {newEventImage && (
                    <img
                      src={newEventImage}
                      alt="Event preview"
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={editingEvent ? handleUpdateEvent : handleCreateEvent}
                      className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300"
                    >
                      {editingEvent ? 'Update Event' : 'Create Event'}
                    </button>
                    {editingEvent && (
                      <button
                        onClick={() => {
                          setEditingEvent(null);
                          setNewEventTitle('');
                          setNewEventDesc('');
                          setNewEventDate('');
                          setNewEventVenue('');
                          setNewEventImage('');
                        }}
                        className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>

                {/* Events Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {events.map((event) => (
                    <div
                      key={event._id}
                      className={`${themeClasses.cardBg} border ${themeClasses.border} rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300`}
                    >
                      {event.imageUrl && (
                        <img
                          src={event.imageUrl}
                          alt={event.title}
                          className="w-full h-48 object-cover"
                        />
                      )}
                      <div className="p-4">
                        <h3 className={`text-lg font-semibold ${themeClasses.text} mb-2`}>
                          {event.title}
                        </h3>
                        <p className={`text-sm ${themeClasses.textSecondary} mb-3`}>
                          {event.description}
                        </p>
                        <div className={`text-sm ${themeClasses.textSecondary} mb-4`}>
                          <p className="mb-1">📍 {event.venue}</p>
                          <p>📅 {new Date(event.date).toLocaleString()}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(event)}
                            className="flex-1 px-3 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(event._id)}
                            className="flex-1 px-3 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Members Tab */}
            {activeTab === "members" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className={`text-3xl font-bold ${themeClasses.text}`}>
                    Member Management
                  </h2>
                  <button className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center space-x-2">
                    <Plus size={20} />
                    <span>Add Member</span>
                  </button>
                </div>

                <div className={`${themeClasses.cardBg} rounded-2xl p-6 shadow-lg border ${themeClasses.border}`}>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className={`text-xl font-bold ${themeClasses.text}`}>
                      Active Members
                    </h3>
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Search
                          size={20}
                          className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${themeClasses.textSecondary}`}
                        />
                        <input
                          type="text"
                          placeholder="Search members..."
                          className={`pl-10 pr-4 py-2 border ${themeClasses.border} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${themeClasses.cardBg} ${themeClasses.text}`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        name: "Rahul Sharma",
                        email: "rahul@student.com",
                        role: "President",
                        status: "Active",
                        avatar: "RS",
                      },
                      {
                        name: "Priya Patel",
                        email: "priya@student.com",
                        role: "Vice President",
                        status: "Active",
                        avatar: "PP",
                      },
                      {
                        name: "Arjun Singh",
                        email: "arjun@student.com",
                        role: "Secretary",
                        status: "Active",
                        avatar: "AS",
                      },
                      {
                        name: "Sneha Gupta",
                        email: "sneha@student.com",
                        role: "Treasurer",
                        status: "Active",
                        avatar: "SG",
                      },
                    ].map((member, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border ${themeClasses.border} ${themeClasses.hoverBg} transition-all duration-200`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold">
                              {member.avatar}
                            </div>
                            <div>
                              <h4 className={`font-semibold ${themeClasses.text}`}>
                                {member.name}
                              </h4>
                              <p className={`text-sm ${themeClasses.textSecondary}`}>
                                {member.email}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800`}>
                              {member.role}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800`}>
                              {member.status}
                            </span>
                            <button className={`p-2 rounded-lg ${themeClasses.hoverBg} ${themeClasses.text}`}>
                              <Edit size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Workspace Tab */}
            {activeTab === "workspace" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className={`text-3xl font-bold ${themeClasses.text}`}>
                    Workspace
                  </h2>
                  <button className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center space-x-2">
                    <Plus size={20} />
                    <span>New Project</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Event Planning",
                      type: "Project",
                      files: 12,
                      members: 8,
                      progress: 75,
                      color: "from-blue-500 to-cyan-600",
                    },
                    {
                      title: "Marketing Materials",
                      type: "Folder",
                      files: 24,
                      members: 5,
                      progress: 60,
                      color: "from-green-500 to-emerald-600",
                    },
                    {
                      title: "Budget Reports",
                      type: "Document",
                      files: 6,
                      members: 3,
                      progress: 90,
                      color: "from-purple-500 to-indigo-600",
                    },
                    {
                      title: "Member Database",
                      type: "Database",
                      files: 340,
                      members: 12,
                      progress: 100,
                      color: "from-orange-500 to-red-600",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`${themeClasses.cardBg} rounded-2xl p-6 shadow-lg border ${themeClasses.border} hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center`}
                        >
                          <File className="w-6 h-6 text-white" />
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800`}
                        >
                          {item.type}
                        </span>
                      </div>

                      <h3
                        className={`text-lg font-bold ${themeClasses.text} mb-2`}
                      >
                        {item.title}
                      </h3>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className={themeClasses.textSecondary}>
                            Progress
                          </span>
                          <span className={`font-medium ${themeClasses.text}`}>
                            {item.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`bg-gradient-to-r ${item.color} h-2 rounded-full transition-all duration-300`}
                            style={{ width: `${item.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <File
                              size={14}
                              className={themeClasses.textSecondary}
                            />
                            <span className={themeClasses.textSecondary}>
                              {item.files} files
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users
                              size={14}
                              className={themeClasses.textSecondary}
                            />
                            <span className={themeClasses.textSecondary}>
                              {item.members} members
                            </span>
                          </div>
                        </div>
                        <button
                          className={`p-2 rounded-lg ${themeClasses.hoverBg} ${themeClasses.text}`}
                        >
                          <Eye size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === "analytics" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className={`text-3xl font-bold ${themeClasses.text}`}>
                    Analytics & Reports
                  </h2>
                  <button className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center space-x-2">
                    <Download size={20} />
                    <span>Export Report</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      title: "Event Attendance",
                      value: "87%",
                      change: "+5%",
                      icon: Users,
                      color: "from-blue-500 to-cyan-600",
                    },
                    {
                      title: "Member Engagement",
                      value: "73%",
                      change: "+12%",
                      icon: Activity,
                      color: "from-green-500 to-emerald-600",
                    },
                    {
                      title: "Revenue Growth",
                      value: "₹45,000",
                      change: "+18%",
                      icon: TrendingUp,
                      color: "from-purple-500 to-indigo-600",
                    },
                    {
                      title: "Satisfaction Score",
                      value: "4.8/5",
                      change: "+0.3",
                      icon: Star,
                      color: "from-orange-500 to-red-600",
                    },
                  ].map((metric, index) => (
                    <div
                      key={index}
                      className={`${themeClasses.cardBg} rounded-2xl p-6 shadow-lg border ${themeClasses.border} hover:shadow-xl transition-all duration-300`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`w-12 h-12 bg-gradient-to-br ${metric.color} rounded-xl flex items-center justify-center`}
                        >
                          <metric.icon className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-green-500 text-sm font-medium">
                          {metric.change}
                        </span>
                      </div>
                      <h3
                        className={`text-2xl font-bold ${themeClasses.text} mb-1`}
                      >
                        {metric.value}
                      </h3>
                      <p className={`text-sm ${themeClasses.textSecondary}`}>
                        {metric.title}
                      </p>
                    </div>
                  ))}
                </div>

                <div
                  className={`${themeClasses.cardBg} rounded-2xl p-6 shadow-lg border ${themeClasses.border}`}
                >
                  <h3 className={`text-xl font-bold ${themeClasses.text} mb-4`}>
                    Performance Insights
                  </h3>
                  <div className="space-y-6">
                    {[
                      {
                        title: "Most Popular Event Category",
                        value: "Technology",
                        percentage: 45,
                      },
                      {
                        title: "Peak Registration Time",
                        value: "2:00 PM - 4:00 PM",
                        percentage: 65,
                      },
                      {
                        title: "Member Retention Rate",
                        value: "92%",
                        percentage: 92,
                      },
                      {
                        title: "Event Success Rate",
                        value: "88%",
                        percentage: 88,
                      },
                    ].map((insight, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className={`font-medium ${themeClasses.text}`}>
                            {insight.title}
                          </span>
                          <span
                            className={`text-sm ${themeClasses.textSecondary}`}
                          >
                            {insight.value}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-teal-500 to-cyan-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${insight.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className={`text-3xl font-bold ${themeClasses.text}`}>
                    Settings
                  </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Society Profile */}
                  <div
                    className={`${themeClasses.cardBg} rounded-2xl p-6 shadow-lg border ${themeClasses.border}`}
                  >
                    <h3
                      className={`text-xl font-bold ${themeClasses.text} mb-4`}
                    >
                      Society Profile
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label
                          className={`block text-sm font-medium ${themeClasses.text} mb-2`}
                        >
                          Society Name
                        </label>
                        <input
                          type="text"
                          value={society.name}
                          className={`w-full p-3 border ${themeClasses.border} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${themeClasses.cardBg} ${themeClasses.text}`}
                          readOnly
                        />
                      </div>
                      <div>
                        <label
                          className={`block text-sm font-medium ${themeClasses.text} mb-2`}
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={society.email}
                          className={`w-full p-3 border ${themeClasses.border} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${themeClasses.cardBg} ${themeClasses.text}`}
                          readOnly
                        />
                      </div>
                      <div>
                        <label
                          className={`block text-sm font-medium ${themeClasses.text} mb-2`}
                        >
                          Description
                        </label>
                        <textarea
                          rows={3}
                          className={`w-full p-3 border ${themeClasses.border} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${themeClasses.cardBg} ${themeClasses.text}`}
                          placeholder="Tell us about your society..."
                        />
                      </div>
                      <div>
                        <label
                          className={`block text-sm font-medium ${themeClasses.text} mb-2`}
                        >
                          Website
                        </label>
                        <input
                          type="url"
                          className={`w-full p-3 border ${themeClasses.border} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${themeClasses.cardBg} ${themeClasses.text}`}
                          placeholder="https://yoursociety.com"
                        />
                      </div>
                      <button className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-3 rounded-lg hover:shadow-lg transition-all duration-300">
                        Update Profile
                      </button>
                    </div>
                  </div>

                  {/* Notification Settings */}
                  <div
                    className={`${themeClasses.cardBg} rounded-2xl p-6 shadow-lg border ${themeClasses.border}`}
                  >
                    <h3
                      className={`text-xl font-bold ${themeClasses.text} mb-4`}
                    >
                      Notification Settings
                    </h3>
                    <div className="space-y-4">
                      {[
                        {
                          title: "Event Registration",
                          description:
                            "Get notified when someone registers for your events",
                        },
                        {
                          title: "Member Updates",
                          description:
                            "Updates about new members and member activity",
                        },
                        {
                          title: "System Alerts",
                          description:
                            "Important system notifications and updates",
                        },
                        {
                          title: "Weekly Reports",
                          description:
                            "Receive weekly analytics and performance reports",
                        },
                      ].map((setting, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 rounded-lg border border-gray-200"
                        >
                          <div>
                            <h4 className={`font-medium ${themeClasses.text}`}>
                              {setting.title}
                            </h4>
                            <p
                              className={`text-sm ${themeClasses.textSecondary}`}
                            >
                              {setting.description}
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              defaultChecked
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Security Settings */}
                  <div
                    className={`${themeClasses.cardBg} rounded-2xl p-6 shadow-lg border ${themeClasses.border}`}
                  >
                    <h3
                      className={`text-xl font-bold ${themeClasses.text} mb-4`}
                    >
                      Security Settings
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label
                          className={`block text-sm font-medium ${themeClasses.text} mb-2`}
                        >
                          Current Password
                        </label>
                        <input
                          type="password"
                          className={`w-full p-3 border ${themeClasses.border} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${themeClasses.cardBg} ${themeClasses.text}`}
                          placeholder="Enter current password"
                        />
                      </div>
                      <div>
                        <label
                          className={`block text-sm font-medium ${themeClasses.text} mb-2`}
                        >
                          New Password
                        </label>
                        <input
                          type="password"
                          className={`w-full p-3 border ${themeClasses.border} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${themeClasses.cardBg} ${themeClasses.text}`}
                          placeholder="Enter new password"
                        />
                      </div>
                      <div>
                        <label
                          className={`block text-sm font-medium ${themeClasses.text} mb-2`}
                        >
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          className={`w-full p-3 border ${themeClasses.border} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${themeClasses.cardBg} ${themeClasses.text}`}
                          placeholder="Confirm new password"
                        />
                      </div>
                      <button className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-3 rounded-lg hover:shadow-lg transition-all duration-300">
                        Update Password
                      </button>
                    </div>
                  </div>

                  {/* Integration Settings */}
                  <div
                    className={`${themeClasses.cardBg} rounded-2xl p-6 shadow-lg border ${themeClasses.border}`}
                  >
                    <h3
                      className={`text-xl font-bold ${themeClasses.text} mb-4`}
                    >
                      Integrations
                    </h3>
                    <div className="space-y-4">
                      {[
                        {
                          name: "Google Calendar",
                          icon: Calendar,
                          connected: true,
                          color: "from-blue-500 to-blue-600",
                        },
                        {
                          name: "Slack",
                          icon: MessageSquare,
                          connected: false,
                          color: "from-purple-500 to-purple-600",
                        },
                        {
                          name: "Discord",
                          icon: Users,
                          connected: true,
                          color: "from-indigo-500 to-indigo-600",
                        },
                        {
                          name: "Zoom",
                          icon: Video,
                          connected: false,
                          color: "from-green-500 to-green-600",
                        },
                      ].map((integration, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 rounded-lg border border-gray-200"
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-10 h-10 bg-gradient-to-br ${integration.color} rounded-lg flex items-center justify-center`}
                            >
                              <integration.icon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h4
                                className={`font-medium ${themeClasses.text}`}
                              >
                                {integration.name}
                              </h4>
                              <p
                                className={`text-sm ${themeClasses.textSecondary}`}
                              >
                                {integration.connected
                                  ? "Connected"
                                  : "Not connected"}
                              </p>
                            </div>
                          </div>
                          <button
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                              integration.connected
                                ? "bg-red-100 text-red-600 hover:bg-red-200"
                                : "bg-teal-100 text-teal-600 hover:bg-teal-200"
                            }`}
                          >
                            {integration.connected ? "Disconnect" : "Connect"}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

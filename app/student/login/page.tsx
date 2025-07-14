"use client";
import { useState, useEffect } from "react";
import {
  Users,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Moon,
  Sun,
  UserPlus,
  LogIn,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

type Props = {
  type: "login" | "register";
  role: "student" | "society";
};

function AuthForm({ type, role }: Props) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const endpoint = `/api/${role}/${type}`;
    const res = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (!res.ok) {
      setMsg(data.error);
      setIsLoading(false);
      return;
    }

    setMsg("Success!");
    localStorage.setItem("user", JSON.stringify(data.user)); // ✅ save user
    window.location.href = `/${role}/dashboard`; // ✅ redirect
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-4">
            {type === "login" ? (
              <LogIn className="w-8 h-8 text-white" />
            ) : (
              <UserPlus className="w-8 h-8 text-white" />
            )}
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            {type === "login" ? "Welcome Back!" : "Join Our Community"}
          </h2>
          <p className="text-white/80">
            {type === "login"
              ? "Sign in to your account"
              : "Create your student account"}
          </p>
        </div>

        <div className="space-y-4">
          {type === "register" && (
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
              <input
                name="name"
                placeholder="Full Name"
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-4 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={handleChange}
              className="w-full pl-12 pr-12 py-4 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {msg && (
          <div
            className={`mt-4 p-3 rounded-xl flex items-center gap-2 ${
              msg === "Success!"
                ? "bg-green-500/20 text-green-400"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {msg === "Success!" ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span className="text-sm">{msg}</span>
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full mt-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 rounded-2xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl"
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <span>{type === "register" ? "Create Account" : "Sign In"}</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>

        {type === "login" && (
          <div className="mt-4 text-center">
            <button className="text-white/80 hover:text-white text-sm transition-colors">
              Forgot your password?
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function StudentLoginPage() {
  const [type, setType] = useState<"login" | "register">("login");
  const [isVisible, setIsVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic Background */}
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          darkMode
            ? "bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"
            : "bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600"
        }`}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-30"></div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full animate-pulse opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}

        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white opacity-5 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white opacity-5 rounded-full animate-pulse delay-1000"></div>
      </div>

      {/* Theme Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={toggleDarkMode}
          className={`p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 ${
            darkMode ? "bg-yellow-400 text-gray-900" : "bg-white text-gray-900"
          }`}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div
          className={`w-full max-w-md mx-auto transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Toggle Buttons */}
          <div className="flex bg-white/10 backdrop-blur-lg rounded-2xl p-2 mb-8 border border-white/20">
            <button
              onClick={() => setType("login")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                type === "login"
                  ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setType("register")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                type === "register"
                  ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Register
            </button>
          </div>

          {/* Auth Form */}
          <AuthForm type={type} role="student" />
        </div>
      </div>

      {/* Back to Home Link */}
      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={() => (window.location.href = "/")}
          className="bg-white/10 backdrop-blur-lg text-white px-6 py-3 rounded-2xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20 flex items-center gap-2"
        >
          <ArrowRight className="w-5 h-5 rotate-180" />
          Back to Home
        </button>
      </div>
    </div>
  );
}
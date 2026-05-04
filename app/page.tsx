"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
// Temporary simple components (replace later with proper UI library)
const Button = ({ children, className = "", ...props }: any) => (
  <button className={`px-4 py-2 rounded ${className}`} {...props}>
    {children}
  </button>
);

const Input = ({ className = "", ...props }: any) => (
  <input className={`px-4 py-2 rounded ${className}`} {...props} />
);

export default function RevenueSystem() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // This function sends email to your backend which should be connected to Mailchimp
  // IMPORTANT: You must implement Mailchimp API inside /api/subscribe
  const handleLead = async () => {
    if (!email || !email.includes("@")) {
      setMessage("Please enter a valid email");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("You're in 🚀 Check your email or download below");
        setEmail("");
      } else {
        setMessage(data.error || "Something went wrong");
      }
    } catch (err) {
      setMessage("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen text-white"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.85)), url('https://images.unsplash.com/photo-1535223289827-42f1e9919769')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Background Branding Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-[120px] md:text-[180px] font-bold text-white/5 tracking-widest">
          AI • TRAVEL
        </h1>
      </div>

      {/* Content */}
      <div className="relative z-10">

        {/* HERO */}
        <section className="h-screen flex flex-col justify-center items-center text-center px-6">
          <motion.h1
            className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Akshay Nara
          </motion.h1>

          <p className="mt-4 text-lg text-gray-300">
            Building AI That Scales • Creating Content That Connects
          </p>

          {/* AI + Travel Highlight Text */}
          <p className="mt-2 text-sm tracking-widest text-blue-300">
            AI • TRAVEL
          </p>

          {/* Social Links */}
          <div className="flex gap-4 mt-6">
            <a href="https://www.linkedin.com/in/akshaynara/" target="_blank" rel="noopener noreferrer">
              <Button className="border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black transition">
                LinkedIn
              </Button>
            </a>
            <a href="https://www.instagram.com/traveller_akshaynara/" target="_blank" rel="noopener noreferrer">
              <Button className="border border-pink-400 text-pink-400 hover:bg-pink-400 hover:text-black transition">
                Instagram
              </Button>
            </a>
          </div>
          {message && (
            <div className="mt-4 flex flex-col items-center gap-2">
              <p className="text-sm text-gray-300">{message}</p>
              <a href="/AI_Growth_Kit_Elite_Akshay_Nara.pdf" target="_blank" rel="noopener noreferrer">
                <Button className="bg-gradient-to-r from-green-400 to-blue-500 text-black">
                  Download AI Growth Kit
                </Button>
              </a>
            </div>
          )}
        </section>

        {/* LEAD FUNNEL */}
        <section className="text-center py-20 bg-black/60 backdrop-blur-sm">
          <h2 className="text-3xl mb-4">Free AI Growth Kit</h2>
          <p className="text-gray-400 mb-6">
            Enter email to get exclusive resources
          </p>
          <div className="flex justify-center gap-2">
            <Input
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="bg-black border-gray-700"
            />
            <Button
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90"
              onClick={handleLead}
              disabled={loading}
            >
              {loading ? "Saving..." : "Get Access"}
            </Button>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-20">
          <h2 className="text-3xl mb-4">Automate Your Business with AI</h2>
          <a href="https://calendly.com/your-link" target="_blank" rel="noopener noreferrer">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90">
              Book Strategy Call
            </Button>
          </a>
        </section>

        {/* FOOTER */}
        <footer className="text-center py-6 text-gray-400">
          © {new Date().getFullYear()} Akshay Nara
        </footer>
      </div>
    </div>
  );
}

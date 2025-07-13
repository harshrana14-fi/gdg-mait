"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function CertificateSection() {
  const [name, setName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDownload = async () => {
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    setIsLoading(true);

    try {
      const downloadUrl = `/api/getCertificate?name=${encodeURIComponent(name)}`;
      window.open(downloadUrl, "_blank");
      toast.success("Certificate is downloading...");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="certificate"
      className="w-full bg-white py-20 px-6 md:px-24 text-gray-800 text-center"
    >
      <h2 className="text-4xl font-bold text-blue-600 mb-4">Get Your Certificate</h2>
      <p className="text-gray-600 text-lg max-w-xl mx-auto">
        Enter your name below to download the certificate for your GDG MAIT event participation.
      </p>

      <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center items-center">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your full name"
          className="px-4 py-3 rounded-md border border-gray-300 w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleDownload}
          disabled={isLoading}
          className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition disabled:opacity-60"
        >
          {isLoading ? "Generating..." : "Download Certificate"}
        </button>
      </div>
    </section>
  );
}

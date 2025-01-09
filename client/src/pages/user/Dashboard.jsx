import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import axios from "axios";

const DashboardPage = () => {
  const location = useLocation();
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const sessionId = queryParams.get("session_id");
    const domain = queryParams.get("domain");

    if (sessionId && domain) {
      axios
        .post(`http://localhost:5000/api/domain/success`, {
          session_id: sessionId,
          domain,
        })
        .then((response) => {
          console.log("Domain registration completed:", response.data);
          // Handle success (e.g., show a success message)
        })
        .catch((error) => {
          console.error("Error completing domain registration:", error);
          setError("There was an error completing your domain registration.");
        });
    }
  }, [location]);

  const dashboardData = [
    {
      id: 1,
      value: 0,
      label: "Mes domaines",
      link: "/my-domains",
    },
    {
      id: 2,
      value: 0,
      label: "Mes comptes d'hébergement",
      link: "#",
    },
    {
      id: 3,
      value: 1,
      label: "Factures impayées",
      link: "#",
    },
  ];

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="p-8 grid ml-4 auto-rows-min gap-4 md:grid-cols-3"
      >
        {/* Error message if something goes wrong */}
        {error && (
          <div className="col-span-3 flex justify-center items-center h-full">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {/* Dashboard Items */}
        {dashboardData.map((item) => (
          <Link key={item.id} to={item.link}>
            <div className="aspect-video rounded-xl bg-muted p-4 flex flex-col justify-center items-center hover:drop-shadow-2xl transition-all duration-700">
              <h1 className="text-6xl font-normal">{item.value}</h1>
              <p className="text-lg font-semibold text-gray-600">
                {item.label}
              </p>
            </div>
          </Link>
        ))}

        {/* No Active Services Card */}
        <div className="aspect-video rounded-xl bg-muted p-4 flex flex-col justify-center items-center hover:drop-shadow-2xl transition-all duration-700">
          <div className="flex items-center justify-center w-20 h-20 rounded-full border-2 border-dashed border-black mb-4">
            <div className="w-10 h-10 bg-black rounded-full"></div>
          </div>
          <h2 className="text-lg font-semibold text-gray-600">
            No Active Services Found
          </h2>
          <p className="text-gray-500">Order New Services</p>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default DashboardPage;

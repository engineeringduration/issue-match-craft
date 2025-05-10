
// src/pages/ProfilePage.jsx
import React, { useEffect, useState } from "react";
import GitHubProfile from "../components/GitHubProfile";
import { USER_ENDPOINTS, apiRequest } from "@/config/api";

const ProfilePage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // INTEGRATION POINT: Backend API call to fetch user profile
        // In a real implementation:
        // const data = await apiRequest(USER_ENDPOINTS.PROFILE);
        
        // For frontend development, we'll simulate with a direct fetch
        const res = await fetch(USER_ENDPOINTS.PROFILE, {
          credentials: "include"
        });
        
        if (!res.ok) throw new Error("Failed to fetch");
        const json = await res.json();
        setData(json);
      } catch (e) {
        setErr(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (err) return <div className="p-4 text-red-600 text-center">Error: {err}</div>;

  return <GitHubProfile data={data} />;
};

export default ProfilePage;

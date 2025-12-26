"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  FilePlus2,
  FileEdit,
} from "lucide-react";

export default function RecentActivities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetch("/api/surat/activity")
      .then((res) => res.json())
      .then(setActivities)
      .catch(console.error);
  }, []);

  return (
    <div className="bg-[#C7D0BD] rounded-xl shadow-md mt-7">
      {/* Header */}
      <div className="bg-[#496A71] text-[#F7F2E0] font-semibold px-4 py-3 rounded-t-xl flex items-center gap-2">
        <Activity className="w-4 h-4" />
        <h2>Recent Updates</h2>
      </div>

      {/* Content */}
      <div className="px-4 py-3 space-y-3">
        {activities.length > 0 ? (
          activities.map((a) => (
            <div
              key={a.id}
              className="flex items-start gap-3 text-sm border-b last:border-0 pb-2 text-[#007C98]"
            >
              {a.type === "created" ? (
                <FilePlus2 className="w-4 h-4 mt-0.5 text-[#2F4858]" />
              ) : (
                <FileEdit className="w-4 h-4 mt-0.5 text-[#2F4858]" />
              )}

              <p>
                {a.type === "created"
                  ? "New letter added:"
                  : "Letter updated:"}{" "}
                <span className="font-medium">{a.title}</span>
              </p>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 italic">
            No recent updates
          </p>
        )}
      </div>
    </div>
  );
}

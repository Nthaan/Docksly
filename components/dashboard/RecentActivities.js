<<<<<<< HEAD
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
=======
import { ActivityIcon } from "lucide-react";
import React from "react";

const activities = [
  { activity: "User 3 updated [letter]", avatar : "/images/ui-avataricon-yelan.png" },
  { activity: "User 2 added new [letter]", avatar : "/images/diluc.png" },
  { activity: "User 1 viewed detail", avatar : "/images/Tartaglia.png" },
];

export default function RecentActivities() {
  return (
    <div className="grid grid-cols-1 bg-[#C7D0BD] rounded-xl shadow-md mt-7">
      <div className="bg-[#496A71] text-[#F7F2E0] font-semibold text-md px-4 py-3 rounded-t-xl flex items-center gap-4">
        <ActivityIcon className="w-4 h-4" />
        <h2>Recent Activities</h2>
      </div>

      <div className="px-4 pt-3">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-center gap-3 py-2 text-sm border-b border-[#e7e4d8] last:border-b-0"
          >
            <img
              src={activity.avatar}
              alt="user avatar"
              className="w-6 h-6 rounded-full object-cover border border-[#a5a5a5]"
            />
            <p className="text-[#007C98]">{activity.activity}</p>
          </div>
        ))}
        
        <div className="text-right mt-6">
        </div>
>>>>>>> ac4dc7b032a8defcd42a1ef64d5bc83fd45740e0
      </div>
    </div>
  );
}

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
      </div>
    </div>
  );
}

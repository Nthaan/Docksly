"use client";
import React from "react";
import RecentLetters from "../../../components/dashboard/RecentLetters";
import QuickActions1 from "../../../components/dashboard/QuickActions1";
import RecentActivities from "../../../components/dashboard/RecentActivities";

export default function Page() {
  return (
    <div className="grid grid-cols-12 gap-4 px-[120px] pt-4">
      <div className="col-span-12">
        <RecentLetters />
      </div>
      <div className="col-span-6">
        <QuickActions1 />
      </div>
      <div className="col-span-6">
        <RecentActivities />
      </div>
    </div>
  );
}

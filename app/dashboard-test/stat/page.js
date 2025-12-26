"use client";
import ChartPie from "../../../components/chart/ChartPie";
import StatTotal from "../../../components/dashboard/StatTotal";
import React from "react";

export default function Page() {
  return (
    <div className="p-4 space-y-6">
      <StatTotal />
      <div className="grid grid-cols-5">
        <div className="col-span-5 flex justify-center">
          <ChartPie />
        </div>
      </div>
    </div>
  );
}

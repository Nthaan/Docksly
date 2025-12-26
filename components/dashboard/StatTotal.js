"use client";
import { useEffect, useState } from "react";

export default function StatTotal() {
  const [stat, setStat] = useState(null);

  useEffect(() => {
    fetch("/api/surat/stats/summary")
      .then((res) => res.json())
      .then(setStat)
      .catch(console.error);
  }, []);

  if (!stat) return null;

  return (
    <div className="flex flex-wrap justify-center gap-4 mx-[120px] mb-6">
      <Card title="Total Letters" value={stat.total} dark />
      <Card title="Letters This Month" value={stat.thisMonth} />
      <Card title="Formal Letters" value={stat.formal} />
      <Card title="Non-formal Letters" value={stat.nonFormal} />
    </div>
  );
}

function Card({ title, value, dark }) {
  return (
    <div
      className={`rounded-md p-4 shadow-md w-52 ${
        dark ? "bg-[#2C495D] text-white" : "bg-[#A7B6A6] text-[#2C495D]"
      }`}
    >
      <p className="text-sm font-medium">{title}</p>
      <p className="text-2xl font-bold text-right mt-2">{value}</p>
    </div>
  );
}

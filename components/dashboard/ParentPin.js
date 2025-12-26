"use client";
import React, { useState } from "react";
import Tabel from "./Tabel";
import PinnedTable from "./PinnedTable";

export default function ParentPin() {
  const [pinnedRows, setPinnedRows] = useState({});

  const togglePin = (index) => {
    setPinnedRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="space-y-8">
      <Tabel pinnedRows={pinnedRows} togglePin={togglePin} />
      <PinnedTable pinnedRows={pinnedRows} togglePin={togglePin} />
    </div>
  );
}

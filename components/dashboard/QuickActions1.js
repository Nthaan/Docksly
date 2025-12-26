"use client";
import React, { useState, useEffect } from "react";
import Form from "../dashboard/Form"; // pastikan path sesuai

export default function QuickActions1() {
  const [showForm, setShowForm] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Cegah render modal di SSR
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Kunci scroll body saat modal terbuka
  useEffect(() => {
    if (showForm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showForm]);

  return (
    <div className="col-span-12 mt-6">
      <h2 className="text-[#6D8C88] text-2xl font-semibold mb-2">
        Quick Actions
      </h2>
      <hr className="border-[#aaa] mb-6" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <button
          className="bg-[#97AEA1] text-[#496A71] p-6 rounded-2xl shadow hover:shadow-lg transition flex flex-col justify-between text-left"
          onClick={() => setShowForm(true)}
        >
          <div>
            <h3 className="text-lg font-bold mb-1">Add new letter</h3>
            <p className="text-sm text-[#496A71]">
              Automatically generate number for new letter data entry
            </p>
          </div>
          <div className="mt-4 self-end">
            <img src="/images/upload.png" alt="Add Icon" className="w-6 h-6" />
          </div>
        </button>

        <button
          className="bg-[#97AEA1] text-[#496A71] p-6 rounded-2xl shadow hover:shadow-lg transition flex flex-col justify-between text-left"
          onClick={() => {
            window.location.href = "/api/surat/export"; // ✅ trigger download Excel
          }}
        >
          <div>
            <h3 className="text-lg font-bold mb-1">Export recent data</h3>
            <p className="text-sm text-[#496A71]">
              Export newly added letters in a downloadable file format.
            </p>
          </div>
          <div className="mt-4 self-end">
            <img
              src="/images/download.png"
              alt="Export Icon"
              className="w-7 h-7"
            />
          </div>
        </button>
      </div>

      {/* Modal hanya dirender setelah mounted di client */}
      {isMounted && showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="relative rounded-lg shadow-lg w-[90%] sm:w-auto max-h-[90vh] overflow-hidden bg-[#A8B5A2]">
            <div className="overflow-y-auto max-h-[85vh]">
              <Form onCancel={() => setShowForm(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

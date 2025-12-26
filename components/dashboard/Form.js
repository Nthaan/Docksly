"use client";
import { useSurat } from "../../hooks/use-surat";
import { useState } from "react";
import * as Yup from "yup";

// Schema validasi Yup
const letterSchema = Yup.object().shape({
  judul: Yup.string().required("Title wajib diisi"),
  pengirim: Yup.string().required("Sender wajib diisi"),
  jenis: Yup.mixed()
    .oneOf(["Formal", "NonFormal"])
    .required("Type wajib dipilih"),
  tujuan: Yup.string().required("Purpose wajib diisi"),
  refNumber: Yup.string().required("Ref Number wajib diisi"),
  departemen: Yup.string().required("Dept Code wajib diisi"),
  isi: Yup.string()
    .min(10, "Summary minimal 10 karakter")
    .required("Summary wajib diisi"),
});

export default function Form({ onCancel, initialData = {}, mode = "create" }) {
  const { loading } = useSurat();

  const [formData, setFormData] = useState({
    judul: initialData.judul || "",
    pengirim: initialData.pengirim || "",
    jenis: initialData.jenis || "Formal",
    tujuan: initialData.tujuan || "",
    refNumber: initialData.refNumber || "",
    departemen: initialData.departemen || "",
    isi: initialData.isi || "",
  });

  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [loadingRef, setLoadingRef] = useState(false);

  // handler generate nomor otomatis
  const handleGenerateNomor = async () => {
    const departemen = formData.departemen.trim().toUpperCase();
    if (!departemen) return;

    setLoadingRef(true);
    try {
      const res = await fetch(`/api/surat/generate?departemen=${departemen}`);
      const data = await res.json();
      if (data.refNumber) {
        setFormData((prev) => ({ ...prev, refNumber: data.refNumber }));
      }
    } catch (err) {
      console.error("Gagal ambil nomor:", err);
    } finally {
      setLoadingRef(false);
    }
  };

  // Handler input teks
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler file
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      judul: "",
      pengirim: "",
      jenis: "Formal",
      tujuan: "",
      refNumber: "",
      departemen: "",
      isi: "",
    });
    setFile(null);
    setErrors({});
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await letterSchema.validate(formData, { abortEarly: false });

      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });
      if (file) {
        formDataToSend.append("file", file);
      }

      if (mode === "edit" && initialData?.id) {
        await fetch(`/api/surat/${initialData.id}`, {
          method: "PUT",
          body: formDataToSend,
        });
      } else {
        await fetch("/api/surat", {
          method: "POST",
          body: formDataToSend,
        });
      }

      resetForm();
      onCancel();
    } catch (err) {
      if (err.inner) {
        const formErrors = {};
        err.inner.forEach((e) => {
          formErrors[e.path] = e.message;
        });
        setErrors(formErrors);
      }
    }
  };

  return (
    <div className="bg-[#C0CBB9] rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-[#2F4858] text-[#FFFCF2] px-6 py-4 font-medium text-lg">
        {mode === "edit" ? "Edit Letter Entry" : "Add New Letter Entry"}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="judul"
            value={formData.judul}
            onChange={handleChange}
            placeholder="The main subject of the letter."
            className="w-full rounded-md border border-[#FFFCF2] px-3 py-2 text-sm bg-[#FFFCF2]"
          />
          {errors.judul && <p className="text-red-600 text-xs">{errors.judul}</p>}
        </div>

        {/* Sender */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Sender
          </label>
          <input
            type="text"
            name="pengirim"
            value={formData.pengirim}
            onChange={handleChange}
            placeholder="Sender can be an individual, company, or organization"
            className="w-full rounded-md border border-[#FFFCF2] px-3 py-2 text-sm bg-[#FFFCF2]"
          />
          {errors.pengirim && (
            <p className="text-red-600 text-xs">{errors.pengirim}</p>
          )}
        </div>

        {/* Type */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Type
          </label>
          <select
            name="jenis"
            value={formData.jenis}
            onChange={handleChange}
            className="w-40 rounded-md border border-[#97AEA1] px-3 py-2 text-sm bg-[#97AEA1] text-[#2F4858]"
          >
            <option value="Formal">Formal</option>
            <option value="NonFormal">Non Formal</option>
          </select>
          {errors.jenis && <p className="text-red-600 text-xs">{errors.jenis}</p>}
        </div>

        {/* Purpose & Ref Number */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Purpose
            </label>
            <input
              type="text"
              name="tujuan"
              value={formData.tujuan}
              onChange={handleChange}
              placeholder="e.g., Announcement, Report, Invitation"
              className="w-full rounded-md border border-[#FFFCF2] px-3 py-2 text-sm bg-[#FFFCF2]"
            />
            {errors.tujuan && <p className="text-red-600 text-xs">{errors.tujuan}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Ref. Number
            </label>
            <input
              type="text"
              name="refNumber"
              value={loadingRef ? "Generating..." : formData.refNumber || ""}
              readOnly
              placeholder="Will be generated automatically"
              className={`w-full rounded-md border border-[#FFFCF2] px-3 py-2 text-sm 
                ${
                  formData.refNumber
                    ? "bg-[#FFFCF2] text-gray-900"
                    : "bg-gray-100 text-gray-500 italic"
                }`}
            />
          </div>
        </div>

        {/* Dept Code */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Dept. Code
          </label>
          <input
            type="text"
            name="departemen"
            value={formData.departemen}
            onChange={handleChange}
            onBlur={handleGenerateNomor}
            placeholder="Code representing the related department"
            className="w-full rounded-md border border-[#FFFCF2] px-3 py-2 text-sm bg-[#FFFCF2]"
          />
          {errors.departemen && (
            <p className="text-red-600 text-xs">{errors.departemen}</p>
          )}
        </div>

        {/* Summary */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Summary
          </label>
          <textarea
            name="isi"
            value={formData.isi}
            onChange={handleChange}
            placeholder="Short summary of the letter"
            rows={6}
            className="w-full rounded-md border border-[#FFFCF2] px-3 py-2 text-sm resize-none bg-[#FFFCF2]"
          />
          {errors.isi && <p className="text-red-600 text-xs">{errors.isi}</p>}
        </div>

        {/* 📎 Attachment */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Attachment
          </label>
          <input
            type="file"
            name="file"
            accept=".pdf,.doc,.docx,.jpg,.png"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-700
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-[#2F4858] file:text-white
              hover:file:bg-[#121e26] cursor-pointer"
          />
          {file && (
            <p className="mt-2 text-sm text-green-700">{file.name} </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#2F4858] text-white px-6 py-2 rounded-md text-sm hover:bg-[#121e26] font-medium disabled:opacity-50"
          >
            {loading ? "Saving..." : "Submit"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="border-2 border-[#5A7A7C] text-[#2F4858] px-6 py-2 rounded-md text-sm hover:bg-[#97AEA1] font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

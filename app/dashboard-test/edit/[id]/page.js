"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Form from "../../../../components/dashboard/Form";

export default function EditSuratPage() {
  const { id } = useParams();
  const router = useRouter();
  const [surat, setSurat] = useState(null);

  useEffect(() => {
    const fetchSurat = async () => {
      const res = await fetch(`/api/surat/${id}`);
      const data = await res.json();
      setSurat(data);
    };
    fetchSurat();
  }, [id]);

  if (!surat) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10">
      {/* <h1 className="text-2xl font-bold mb-4">Edit Surat</h1> */}
      <Form
        initialData={surat}
        onCancel={() => router.push("/dashboard-test/tabel")}
        mode="edit"
      />
    </div>
  );
}

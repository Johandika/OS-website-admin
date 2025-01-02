// Masalah Hydration:
// Dalam Next.js (dan React Server Components), komponen awalnya di-render di sisi server. Namun, komponen seperti modal biasanya hanya ingin ditampilkan di sisi klien. Jika langsung di-render di server, bisa menyebabkan ketidakcocokan antara render server dan render klien.
// Mengapa isMounted digunakan:

// Awalnya, komponen di-set isMounted ke false
// Setelah komponen di-mount di sisi klien, useEffect akan mengubah isMounted menjadi true
// Selama proses server-side rendering, komponen akan return null
// Setelah di sisi klien, komponen baru akan me-render modal sebenarnya

"use client";

import { StoreModal } from "@/components/modals/store-modal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // jika adanya di server komponen maka null
  }

  return (
    <>
      <StoreModal /> {/* jika ada di client komponen */}
    </>
  );
};

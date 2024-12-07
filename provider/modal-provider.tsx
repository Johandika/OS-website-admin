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

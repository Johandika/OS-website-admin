"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Modal from "../ui/modal";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(1),
});

export const StoreModal = () => {
  const [loading, setLoading] = useState(false);

  const storeModal = useStoreModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // TODO:Buat toko
    try {
      setLoading(true);

      const res = await axios.post("/api/stores", values);
      // window.location.assign(`/${res.data.id}`);
      console.log(res.data);
      toast.success("Berhasil membuat toko.");
      window.location.assign(`/${res.data.id}`);
    } catch (error) {
      toast.error("Gagal membuat toko!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Buat Store"
      description="Tambahkan store untuk membuat produk dan kategori"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4 ">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nama Toko"
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                  variant="outline"
                  onClick={storeModal.onClose}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                >
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

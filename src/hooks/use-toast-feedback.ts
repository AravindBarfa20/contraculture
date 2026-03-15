"use client";

import { toast } from "sonner";

export function useToastFeedback() {
  return {
    success: (message: string) => {
      toast.success(message, {
        duration: 3000,
        style: {
          background: "hsl(var(--card))",
          border: "1px solid hsl(var(--border))",
        },
      });
    },
    error: (message: string) => {
      toast.error(message, {
        duration: 5000,
        style: {
          background: "hsl(var(--card))",
          border: "1px solid hsl(var(--destructive))",
        },
      });
    },
    loading: (message: string) => {
      return toast.loading(message, {
        style: {
          background: "hsl(var(--card))",
          border: "1px solid hsl(var(--border))",
        },
      });
    },
    dismiss: (id: string | number) => {
      toast.dismiss(id);
    },
  };
}

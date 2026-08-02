"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  createUrlSchema,
  CreateUrlFormData,
} from "@/lib/validators/url";

import { createShortUrl } from "@/services/url.service";

interface CreateUrlCardProps {
  onUrlCreated: () => void;
}

export default function CreateUrlCard({
  onUrlCreated,
}: CreateUrlCardProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateUrlFormData>({
    resolver: zodResolver(createUrlSchema),
    defaultValues: {
      originalUrl: "",
      customAlias: "",
    },
  });

  const onSubmit = async (
    data: CreateUrlFormData
  ) => {
    try {
      await createShortUrl(data);

      toast.success("Short URL Created");

      reset();

      onUrlCreated();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Failed to create URL"
      );
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader className="border-b pb-4">
        <CardTitle>Shorten a URL</CardTitle>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 lg:flex-row lg:items-start"
        >
          {/* Original URL */}
          <div className="min-w-0 flex-1">
            <Input
              placeholder="Paste your long URL..."
              {...register("originalUrl")}
            />

            <p className="text-sm text-red-500 mt-1">
              {errors.originalUrl?.message}
            </p>
          </div>

          {/* Custom Alias */}
          <div className="min-w-0 lg:w-1/3">
            <Input
              placeholder="Custom Alias (Optional)"
              {...register("customAlias")}
            />

            <p className="text-sm text-red-500 mt-1">
              {errors.customAlias?.message}
            </p>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full lg:w-auto"
          >
            {isSubmitting
              ? "Creating..."
              : "Shorten URL"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

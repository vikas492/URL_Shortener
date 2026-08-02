"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { register } from "@/services/auth.service";
import {
  registerSchema,
  RegisterFormData,
} from "@/lib/validators/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import PublicRoute from "@/components/auth/PublicRoute";

export default function RegisterPage() {
  const router = useRouter();

  const {
    register: registerField,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await register(data);

      toast.success("Registration Successful");

      router.push("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <PublicRoute>
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div>
              <Input
                placeholder="Name"
                {...registerField("name")}
              />
              <p className="text-red-500 text-sm">
                {errors.name?.message}
              </p>
            </div>

            <div>
              <Input
                placeholder="Email"
                {...registerField("email")}
              />
              <p className="text-red-500 text-sm">
                {errors.email?.message}
              </p>
            </div>

            <div>
              <Input
                type="password"
                placeholder="Password"
                {...registerField("password")}
              />
              <p className="text-red-500 text-sm">
                {errors.password?.message}
              </p>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Registering..." : "Register"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
    </PublicRoute>
  );
}
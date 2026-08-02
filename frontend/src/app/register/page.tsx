"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { register } from "@/services/auth.service";

import {
  registerSchema,
  RegisterFormData,
} from "@/lib/validators/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

  const onSubmit = async (
    data: RegisterFormData
  ) => {
    try {
      await register(data);

      toast.success("Registration Successful");

      router.push("/login");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Registration Failed"
      );
    }
  };

  return (
    <PublicRoute>
      <div className="flex min-h-screen items-center justify-center px-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-2 text-center">
            <div className="text-5xl">🚀</div>

            <CardTitle className="text-3xl font-bold">
              Create Account
            </CardTitle>

            <p className="text-sm text-muted-foreground">
              Start shortening and managing your
              URLs in seconds.
            </p>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
            >
              <div>
                <Input
                  placeholder="Name"
                  {...registerField("name")}
                />

                <p className="mt-1 text-sm text-red-500">
                  {errors.name?.message}
                </p>
              </div>

              <div>
                <Input
                  placeholder="Email"
                  {...registerField("email")}
                />

                <p className="mt-1 text-sm text-red-500">
                  {errors.email?.message}
                </p>
              </div>

              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  {...registerField("password")}
                />

                <p className="mt-1 text-sm text-red-500">
                  {errors.password?.message}
                </p>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Creating Account..."
                  : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 border-t pt-4 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-primary hover:underline"
              >
                Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </PublicRoute>
  );
}
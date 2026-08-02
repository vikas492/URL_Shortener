"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import { login } from "@/services/auth.service";
import {
  loginSchema,
  LoginFormData,
} from "@/lib/validators/auth";
import { loginSuccess } from "@/redux/authSlice";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import PublicRoute from "@/components/auth/PublicRoute";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (
    data: LoginFormData
  ) => {
    try {
      const response = await login(data);

      dispatch(
        loginSuccess({
          accessToken:
            response.data.accessToken,
          user: response.data.user,
        })
      );

      toast.success("Login Successful");

      router.push("/dashboard");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <PublicRoute>
      <div className="flex min-h-screen items-center justify-center px-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-2 text-center">
            <div className="text-5xl">🔗</div>

            <CardTitle className="text-3xl font-bold">
              Welcome Back
            </CardTitle>

            <p className="text-muted-foreground text-sm">
              Sign in to continue managing your
              shortened URLs.
            </p>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
            >
              <div>
                <Input
                  placeholder="Email"
                  {...register("email")}
                />

                <p className="text-sm text-red-500 mt-1">
                  {errors.email?.message}
                </p>
              </div>

              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  {...register("password")}
                />

                <p className="text-sm text-red-500 mt-1">
                  {errors.password?.message}
                </p>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Logging in..."
                  : "Login"}
              </Button>
            </form>

            <div className="mt-6 border-t pt-4 text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-primary hover:underline"
              >
                Register
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </PublicRoute>
  );
}
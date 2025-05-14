"use client";

import { Button } from "@components/shadcn/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/shadcn/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import "@styles/globals.css";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

const loginFormValidationSchema = (t: (key: string) => string) =>
  z.object({
    username: z.string().min(1, { message: t("usernameRequired") }),
    password: z.string().min(1, { message: t("passwordRequired") }),
  });

type LoginFormValues = z.infer<ReturnType<typeof loginFormValidationSchema>>;

export default function LoginForm() {
  const t = useTranslations("frontpage.loginForm");
  const currentSchema = loginFormValidationSchema(t);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(currentSchema),
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onChange",
  });

  return (
    <>
      <div className="flex-grow rounded-lg p-2 background mt-2 w-full">
        <Form {...form}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("usernameLabel")}</FormLabel>
                <FormControl>
                  <input
                    {...field}
                    className="border-1 border-gray-500 rounded-md p-1 "
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <div className="mb-2" />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("passwordLabel")}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      className="border-1 border-gray-500 rounded-md p-1 w-full"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </Form>
        <Button
          onClick={form.handleSubmit((data) => {
            console.log(data);
            router.push("/dashboard");
          })}
          className="w-full mt-4 bg-background text-foreground"
        >
          {t("loginButton")}
        </Button>
        <Link href="/forgot-password">
          <p className="text-xs text-right mt-2">{t("forgotPassword")}</p>
        </Link>
      </div>
    </>
  );
}

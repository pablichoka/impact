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
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const signUpFormValidationSchema = (t: (key: string) => string) =>
  z
    .object({
      username: z.string().min(3, { message: t("usernameRequired") }),
      password: z
        .string()
        .min(8, { message: t("passwordMinLength") })
        .max(30, { message: t("passwordMaxLength") })
        .regex(/[a-z]/, { message: t("passwordLowercase") })
        .regex(/[A-Z]/, { message: t("passwordUppercase") })
        .regex(/[0-9]/, { message: t("passwordNumber") })
        .regex(/[^a-zA-Z0-9]/, { message: t("passwordSpecialChar") }),
      confirmPassword: z
        .string()
        .min(1, { message: t("confirmPasswordRequired") }),
      email: z.string().email({ message: t("emailRequired") }),
      fullName: z.string().min(2, { message: t("fullNameRequired") }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("passwordsDoNotMatch"),
      path: ["confirmPassword"],
    });

type SignUpFormValues = z.infer<ReturnType<typeof signUpFormValidationSchema>>;

export default function SignUpForm() {
  const t = useTranslations("frontpage.signupForm");
  const currentSchema = signUpFormValidationSchema(t);

  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(currentSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      fullName: "",
    },
    mode: "onChange",
  });

  function onSubmit(data: SignUpFormValues) {
    console.log("SignUp data:", data);
  }

  return (
    <>
      <div className="flex-grow rounded-lg p-2 background mt-2 w-full">
        <Form {...form}>
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("fullNameLabel")}</FormLabel>
                <FormControl>
                  <input
                    {...field}
                    className="border-1 border-gray-500 rounded-md p-1 w-full"
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <div className="mb-2" />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("emailLabel")}</FormLabel>
                <FormControl>
                  <input
                    {...field}
                    type="email"
                    className="border-1 border-gray-500 rounded-md p-1 w-full"
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <div className="mb-2" />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("usernameLabel")}</FormLabel>
                <FormControl>
                  <input
                    {...field}
                    className="border-1 border-gray-500 rounded-md p-1 w-full"
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
          <div className="mb-2" />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("confirmPasswordLabel")}</FormLabel>
                <FormControl>
                  <input
                    {...field}
                    type="password"
                    className="border-1 border-gray-500 rounded-md p-1 w-full"
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </Form>
      </div>
      <Button
        onClick={form.handleSubmit(onSubmit)}
        className="w-full mt-4 bg-background text-foreground"
      >
        {t("signUpButton")}
      </Button>
    </>
  );
}

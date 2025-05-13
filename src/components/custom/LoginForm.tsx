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
import { useTranslations } from "next-intl"; // Import useTranslations

const loginFormValidationSchema = (t: (key: string) => string) => z.object({ // Pass t function
  username: z.string().min(1, {message: t("usernameRequired")}), // Use t for validation message
  password: z.string().min(1, {message: t("passwordRequired")}), // Use t for validation message
    // .string()
    // .min(8, {
    //   message: t("passwordMinLength"),
    // })
    // .max(30, {
    //   message: t("passwordMaxLength"),
    // })
    // .regex(/[a-z]/, {
    //   message: t("passwordLowercase"),
    // })
    // .regex(/[A-Z]/, {
    //   message: t("passwordUppercase"),
    // })
    // .regex(/[0-9]/, {
    //   message: t("passwordNumber"),
    // })
    // .regex(/[^a-zA-Z0-9]/, {
    //   message: t("passwordSpecialChar"),
    // }),
});

type LoginFormValues = z.infer<ReturnType<typeof loginFormValidationSchema>>;

export default function LoginForm() {
  const t = useTranslations("frontpage.LoginForm"); 
  const currentSchema = loginFormValidationSchema(t);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(currentSchema), // Use the generated schema
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onChange",
  });

  return (
    <>
      <div className="flex-grow rounded-lg p-4 background mt-2 w-full">
        <Form {...form}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("usernameLabel")}</FormLabel>
                <FormControl>
                  <input {...field} className="border-1 border-gray-500 rounded-md p-1 " />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <div className="mb-4" />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("passwordLabel")}</FormLabel> {/* Translate label */}
                <FormControl>
                  <input
                    {...field}
                    type="password"
                    className="border-1 border-gray-500 rounded-md p-1"
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </Form>
      </div>
      <Button
        onClick={form.handleSubmit((data) => console.log(data))}
        className="w-full mt-4 bg-background text-foreground"
      >
        {t("loginButton")} {/* Translate button text */}
      </Button>
    </>
  );
}

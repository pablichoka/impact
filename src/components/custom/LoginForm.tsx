"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@components/shadcn/ui/form";
import { Button } from "@components/shadcn/ui/button";
import * as z from "zod";

const loginFormValidationSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "El nombre de usuario debe tener al menos 2 caracteres.",
    })
    .max(30, {
      message: "El nombre de usuario no puede tener más de 30 caracteres.",
    }),
  password: z
    .string()
    .min(8, {
      message: "La contraseña debe tener al menos 8 caracteres.",
    })
    .max(30, {
      message: "La contraseña no puede tener más de 30 caracteres.",
    })
    .regex(/[a-z]/, {
      message: "La contraseña debe contener al menos una letra minúscula.",
    })
    .regex(/[A-Z]/, {
      message: "La contraseña debe contener al menos una letra mayúscula.",
    })
    .regex(/[0-9]/, {
      message: "La contraseña debe contener al menos un número.",
    })
    .regex(/[^a-zA-Z0-9]/, {
      message: "La contraseña debe contener al menos un carácter especial.",
    }),
});

type LoginFormValues = z.infer<typeof loginFormValidationSchema>;

export default function LoginForm() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormValidationSchema),
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onChange",
  });

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <input {...field} placeholder="Username" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="mb-4" />
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <input {...field} type="password" placeholder="Password" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  );
}

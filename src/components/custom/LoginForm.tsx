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

const loginFormValidationSchema = z.object({
  username: z.string().min(1, {message: "Introduzca su nombre de usuario"}),
  password: z.string().min(1, {message: "Introduzca su contraseña"}),
    // .string()
    // .min(8, {
    //   message: "La contraseña debe tener al menos 8 caracteres.",
    // })
    // .max(30, {
    //   message: "La contraseña no puede tener más de 30 caracteres.",
    // })
    // .regex(/[a-z]/, {
    //   message: "La contraseña debe contener al menos una letra minúscula.",
    // })
    // .regex(/[A-Z]/, {
    //   message: "La contraseña debe contener al menos una letra mayúscula.",
    // })
    // .regex(/[0-9]/, {
    //   message: "La contraseña debe contener al menos un número.",
    // })
    // .regex(/[^a-zA-Z0-9]/, {
    //   message: "La contraseña debe contener al menos un carácter especial.",
    // }),
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
    <>
      <div className="flex-grow rounded-lg p-4 bg-gray border-2 mt-2 w-full">
        <Form {...form}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <input {...field} className="border-1 rounded-md p-1" />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <input
                    {...field}
                    type="password"
                    className="border-1 rounded-md p-1"
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
        className="w-full mt-4"
      >
        Log in
      </Button>
    </>
  );
}

import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.union([
    z.number().positive("Price must be a positive number"),
    z.string().min(1, "Product price is required"),
  ]),
  description: z.string().min(1, "Description is required"),
  // tag: z.array(z.string()).nonempty("At least one tag is required"),
  tag: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  category: z.string().min(1, "Category is required"),
});

export const CategorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
});

export const TagSchema = z.object({
  name: z.string().min(1, "Category name is required"),
});

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z
    .string()
    .min(3, { message: "Password must be at least 3 characters long" })
    .max(20, { message: "Password must be at most 20 characters long" }),
});

export const RegisterSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email({ message: "Email is required" }),
    password: z
      .string()
      .min(3, { message: "Password must be at least 3 characters long" })
      .max(20, { message: "Password must be at most 20 characters long" }),
    confPassword: z
      .string()
      .min(3, { message: "Confirm Password must be at elast 3 characters long" })
      .max(20, { message: "COnfirm Password must be at most 20 characters long" }),
  })
  .refine((data) => data.password === data.confPassword, {
    path: ["confPassword"],
    message: "Passwords not match",
  });

export const UpdateUserSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email({ message: "Email is required" }),
    password: z.string().max(20, { message: "Password must be at most 20 characters long" }).optional(),
    confPassword: z.string().max(20, { message: "Confirm Password must be at most 20 characters long" }).optional(),
    role: z.enum(["user", "admin"], { message: "Role must be either 'user' or 'admin'" }),
  })
  .refine(
    (data) => {
      if (data.password || data.confPassword) {
        return data.password === data.confPassword;
      }
      return true;
    },
    {
      path: ["confPassword"],
      message: "Passwords do not match",
    }
  );

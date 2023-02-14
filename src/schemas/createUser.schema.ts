import { z } from "zod";

const createUserSchema = z.object({
  name: z
    .string({
      invalid_type_error: "Name must be a string",
      required_error: "Name is required",
    })
    .min(3, "Name must have at least 3 characters")
    .max(20, "Name must have less than 20 characters"),
  email: z
    .string({
      invalid_type_error: "Email must be a string",
      required_error: "Email is required",
    })
    .email({ message: "Invalid email" })
    .min(5, "Email must have at least 5 characters")
    .max(100, "Email must have less than 100 characters"),
  password: z
    .string({
      invalid_type_error: "Password must be a string",
      required_error: "Password is required",
    })
    .regex(
      new RegExp(/(?=.*?[A-Z])/),
      "Password needs at least one uppercase letter"
    )
    .regex(
      new RegExp(/(?=.*?[a-z])/),
      "Password needs at least one lowercase letter"
    )
    .regex(new RegExp(/(?=.*?[0-9])/), "Password needs at least one digit")
    .regex(
      /(?=.*?[#?!@$%^&*-])/,
      "Password needs at least one special character"
    )
    .min(8, {
      message: "Password must have at least 8 characters",
    }),
  admin: z.boolean({
    invalid_type_error: "Admin must be either true or false",
    required_error: "Admin is required",
  }),
});

export { createUserSchema };

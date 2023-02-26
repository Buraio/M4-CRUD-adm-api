import { z } from "zod";

const updateUserSchema = z.object({
  name: z
    .string()
    .min(3, "Name must have at least 3 characters")
    .max(20, "Name must have less than 20 characters")
    .optional()
    .nullable(),
  email: z
    .string()
    .email({ message: "Invalid email" })
    .min(5, "Email must have at least 5 characters")
    .max(100, "Email must have less than 100 characters")
    .optional()
    .nullable(),
  password: z
    .string()
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
    })
    .optional()
    .nullable(),
});

type updateUserRequest = z.infer<typeof updateUserSchema>;

export { updateUserSchema, updateUserRequest };

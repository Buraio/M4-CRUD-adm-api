interface iCreateUserRequest {
  name: string;
  email: string;
  password: string | Promise<string>;
  admin: boolean;
}

export { iCreateUserRequest };

interface iCreateUserRequest {
  name: string;
  email: string;
  password: string | Promise<string>;
  admin: boolean;
}

interface iUserLoginRequest {
  email: string;
  password: string | Promise<string>;
}

interface iRetrievedUserData {
  id: string;
  name: string;
  email: string;
  password: string;
  admin: boolean;
  active: boolean;
}

export { iCreateUserRequest, iUserLoginRequest, iRetrievedUserData };

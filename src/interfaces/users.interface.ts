interface iUserRequest {
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

interface iTokenReturn {
  token: string;
}

export { iUserRequest, iUserLoginRequest, iRetrievedUserData, iTokenReturn };

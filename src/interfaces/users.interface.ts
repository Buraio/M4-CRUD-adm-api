interface iUserRequest {
  name: string;
  email: string;
  password: string | Promise<string>;
  admin: boolean;
}

interface iUserUpdateRequest {
  name: string | null;
  email: string | null;
  password: string | null;
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

export { iUserRequest, iUserUpdateRequest, iUserLoginRequest, iRetrievedUserData, iTokenReturn };

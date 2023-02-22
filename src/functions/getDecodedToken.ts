import jwt from "jsonwebtoken";

const getDecodedToken = (token: string | undefined) => {
  const splitToken = token?.split(" ")[1];

  if (splitToken) {
    const decoded = jwt.decode(splitToken);
    return decoded;
  }
};

export { getDecodedToken };

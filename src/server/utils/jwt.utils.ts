import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

export function sign(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, JWT_SECRET, options);
}

export function decode(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    return { valid: true, expired: false, decoded };
  } catch (error) {
    return {
      valid: false,
      expired: error.message === "jwt expired",
      decoded: null,
    };
  }
}

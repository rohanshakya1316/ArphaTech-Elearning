import { getCookie } from "./cookie";

export const checkSignupSessionValidity = () => {
  const signupToken = getCookie("signUpToken");

  return Boolean(signupToken);
};
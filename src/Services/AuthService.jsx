import * as authController from "../APIHandler/AuthAPIHandler";
import { jwtDecode } from "jwt-decode";

const handleError = (error, message) => {
  console.error(`${message}:`, error.response?.data || error.message);
  return { success: false, message: error.response?.data?.message || message };
};

// const storeToken = (token) => {
//   if (token) localStorage.setItem("token", token);
// };
export const storeUserInfo = (user, token) => {
  if (!user || !token) return;

  const userInfo = {
    userId: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    fullName: `${user.firstName} ${user.lastName}`,
    phoneNumber: user.phoneNumber,
    email: user.email,
    gender: user.gender,
    address: user.address,
  };

  Object.entries(userInfo).forEach(([key, value]) =>
    localStorage.setItem(key, value)
  );
  localStorage.setItem("token", token);
  const decodedToken = jwtDecode(token);
  const roleKey = Object.keys(decodedToken).find((key) => key.includes("role"));
  const role = roleKey ? decodedToken[roleKey] : "Guest";
  localStorage.setItem("role", role);

  return role;
};

export const registerUser = async (userInfo) => {
  const { email, password, firstName, lastName, phoneNumber, gender, address } =
    userInfo;
  // if (
  //   !email ||
  //   !password ||
  //   !confirmPassword ||
  //   !firstName ||
  //   !lastName ||
  //   !phoneNumber ||
  //   !gender
  // ) {
  //   throw new Error("All fields are required!");
  // }

  // if (password !== confirmPassword) {
  //   throw new Error("Passwords do not match");
  // }

  try {
    await authController.registerUser({
      firstName,
      lastName,
      email,
      password,
      gender,
      phoneNumber,
      address,
    });
    return { success: true, email };
  } catch (error) {
    throw new Error(error.message || "Registration failed!");
  }
};

export const login = async (email, password) => {
  try {
    const data = await authController.loginUser(email, password);
    if (!data?.token) throw new Error("Invalid login response: Token missing");

    // storeToken(data.token);
    const role = storeUserInfo(data, data.token);

    return { success: true, data, role };
  } catch (error) {
    return handleError(error, "Login failed");
  }
};

export const forgotPassword = async (email, navigate) => {
  try {
    const data = await authController.forgotPassword(email);
    ToastManager.showSuccess("Reset link sent to your email");

    setTimeout(() => {
      navigate("/verify?email=" + encodeURIComponent(email));
    });

    return { success: true, data };
  } catch (error) {
    ToastManager.showError(error.message || "Error sending reset link");
    return { success: false, error };
  }
};

export const resetPassword = async (resetData) => {
  try {
    const data = await authController.resetPassword(resetData);
    return { success: true, data };
  } catch (error) {
    return handleError(error, "Reset Password Error");
  }
};

export const googleLogin = async (credential) => {
  try {
    const data = await authController.googleLogin(credential);
    if (!data?.accessToken) throw new Error("Invalid Google login response");

    const role = storeUserInfo(data, data.accessToken);

    return { success: true, data, role };
  } catch (error) {
    return handleError(error, "Google Login failed");
  }
};

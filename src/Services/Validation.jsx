export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(String(email).toLowerCase());
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateName = (name) => /^[a-zA-Z\s]+$/.test(name);
export const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);
export const validateGender = (gender) =>
  ["male", "female", "other"].includes(gender);

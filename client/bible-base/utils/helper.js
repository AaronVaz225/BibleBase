//helper for validating email
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email); //returns true if email matches regex, otherwise false
};

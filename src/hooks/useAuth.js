import { useState } from "react";
import { USER } from "../constants";

export const useAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const validatePassword = (password) => {
    const minLength = /.{8,}/;
    const upperCase = /[A-Z]/;
    const number = /[0-9]/;
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/;

    if (!minLength.test(password)) {
      return "Password must be at least 8 characters long.";
    }
    if (!upperCase.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!number.test(password)) {
      return "Password must contain at least one number.";
    }
    if (!specialChar.test(password)) {
      return "Password must include at least one special character.";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (email === USER.email && password === USER.password) {
      setUser({ email });
      // callback(); // Callback for redirection after successful login
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  const login = (callback) => {
    if (email === USER.email && password === USER.password) {
      setUser({ email });
      callback(); // Callback for redirection after successful login
    } else {
      alert("Invalid email or password");
    }
  };

  const logout = (callback) => {
    setUser(null);
    callback();
  };

  return { user, setEmail, setPassword, error, login, logout, handleSubmit };
};

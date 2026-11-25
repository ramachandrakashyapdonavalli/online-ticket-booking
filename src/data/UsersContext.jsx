import { createContext, useContext, useState } from "react";
import {
  getUsers,
  saveUsers,
  getCurrentUser,
  saveCurrentUser,
  removeCurrentUser,
} from "./userStorage";

const UsersContext = createContext(null);

export function UsersProvider({ children }) {
  const [users, setUsers] = useState(getUsers);
  const [currentUser, setCurrentUser] = useState(getCurrentUser);

  function persistUsers(updatedUsers) {
    setUsers(updatedUsers);
    saveUsers(updatedUsers);
  }

  function registerUser(user) {
    const email = user.email.trim().toLowerCase();

    const exists = users.some(
      (item) => item.email.toLowerCase() === email
    );

    if (exists) {
      return {
        success: false,
        message: "An account with this email already exists.",
      };
    }

    const newUser = {
      id: `USR-${Date.now()}`,
      name: user.name.trim(),
      email,
      phone: user.phone.trim(),
      password: user.password,
      status: "Active",
      registeredAt: new Date().toLocaleDateString(),
    };

    const updatedUsers = [...users, newUser];

    persistUsers(updatedUsers);

    const sessionUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
    };

    setCurrentUser(sessionUser);
    saveCurrentUser(sessionUser);

    return { success: true, user: sessionUser };
  }

  function loginUser(email, password) {
    const normalizedEmail = email.trim().toLowerCase();

    const user = users.find(
      (item) =>
        item.email.toLowerCase() === normalizedEmail &&
        item.password === password
    );

    if (!user) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    if (user.status === "Inactive") {
      return {
        success: false,
        message: "This account is inactive.",
      };
    }

    const sessionUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    };

    setCurrentUser(sessionUser);
    saveCurrentUser(sessionUser);

    return { success: true, user: sessionUser };
  }

  function logoutUser() {
    setCurrentUser(null);
    removeCurrentUser();
  }

  function addOrUpdateUser(user) {
    const email = user.email.trim().toLowerCase();

    const existing = users.find(
      (item) => item.email.toLowerCase() === email
    );

    let updatedUsers;

    if (existing) {
      updatedUsers = users.map((item) =>
        item.email.toLowerCase() === email
          ? { ...item, name: user.name, phone: user.phone }
          : item
      );
    } else {
      updatedUsers = [
        ...users,
        {
          ...user,
          id: `USR-${Date.now()}`,
          email,
          status: "Active",
          registeredAt: new Date().toLocaleDateString(),
        },
      ];
    }

    persistUsers(updatedUsers);
  }

  function toggleUserStatus(id) {
    const updatedUsers = users.map((user) =>
      user.id === id
        ? {
            ...user,
            status: user.status === "Active" ? "Inactive" : "Active",
          }
        : user
    );

    persistUsers(updatedUsers);

    if (
      currentUser &&
      currentUser.id === id &&
      updatedUsers.find((user) => user.id === id)?.status === "Inactive"
    ) {
      logoutUser();
    }
  }

  return (
    <UsersContext.Provider
      value={{
        users,
        currentUser,
        registerUser,
        loginUser,
        logoutUser,
        addOrUpdateUser,
        toggleUserStatus,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}

export function useUsers() {
  return useContext(UsersContext);
}
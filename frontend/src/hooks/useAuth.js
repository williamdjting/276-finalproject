import * as React from "react";

const authContext = React.createContext();

function useAuth() {
  const [authed, setAuthed] = React.useState(false);

  return {
    authed,
    logout() {
      return new Promise((res) => {
        setAuthed(false);
        localStorage.clear();
        res();
      });
    },
    login(role) {
      return new Promise((res) => {
        setAuthed(true);
        localStorage.setItem("role", role);
        localStorage.setItem("isAuthed", "true");
        res();
      });
    },
  };
}

export function AuthProvider({ children }) {
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return React.useContext(authContext);
}

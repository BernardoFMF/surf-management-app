import * as React from "react";

const authContext = React.createContext();

function useAuth() {
  const [authed, setAuthed] = React.useState(false);

  React.useEffect(() => {
      const auth = localStorage.getItem('authed')
      if(auth) {
        setAuthed(auth)
      }
  }, [])

  return {
    authed,
    loginHook() {
      setAuthed(true);
      localStorage.setItem('authed', true)
    },
    logoutHook() {
      setAuthed(false);
      localStorage.removeItem('authed')
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
import * as React from "react";

const authContext = React.createContext();

function useAuth() {
  const [authed, setAuthed] = React.useState(false);

  React.useEffect(() => {
      const auth = sessionStorage.getItem('authed')
      if(auth) {
        setAuthed(auth)
      }
  }, [])

  return {
    authed,
    loginHook() {
      setAuthed(true);
      sessionStorage.setItem('authed', true)
    },
    logoutHook() {
      setAuthed(false);
      sessionStorage.removeItem('authed')
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
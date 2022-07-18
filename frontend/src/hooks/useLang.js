import * as React from "react";
import { enUS, ptBR } from '@mui/x-data-grid'

const langContext = React.createContext();

function useLang() {
  const [lang, setLang] = React.useState(enUS.components.MuiDataGrid.defaultProps.localeText);

  React.useEffect(() => {
      const savedLang = localStorage.getItem('i18n-lang')
      if (savedLang === "pt")
        setLang(ptBR.components.MuiDataGrid.defaultProps.localeText)
      else
        setLang(enUS.components.MuiDataGrid.defaultProps.localeText)
  }, [])

  return {
    lang,
    changeLang(lang) {
      if (lang === "pt")
        setLang(ptBR.components.MuiDataGrid.defaultProps.localeText)
      else
        setLang(enUS.components.MuiDataGrid.defaultProps.localeText)
    }
  };
}

export function LangProvider({ children }) {
  const lang = useLang();

  return <langContext.Provider value={lang}>{children}</langContext.Provider>;
}

export default function LangConsumer() {
  return React.useContext(langContext);
}
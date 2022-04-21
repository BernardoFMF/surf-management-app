import { useSelector } from 'react-redux'

import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline, StyledEngineProvider } from '@mui/material'

// routing
import Routes from './routes'

//defaultTheme
import themes from './themes'

// project imports
import NavigationScroll from './layout/NavigationScroll'

function App() {

  return (
    <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes()}>
                <CssBaseline />
                <NavigationScroll>
                    <Routes />
                </NavigationScroll>
            </ThemeProvider>
        </StyledEngineProvider>
  )
}

export default App;

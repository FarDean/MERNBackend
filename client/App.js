import React from 'react'
import { hot } from "react-hot-loader";
import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter } from 'react-router-dom';
import MainRouter from './MainRouter'
import theme from './theme'
import { GlobalProvider } from './context/GlobalContext';

function App() {
    return (
        <GlobalProvider>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <MainRouter />
                </ThemeProvider>        
            </BrowserRouter>
        </GlobalProvider>
    )
}

export default hot(module)(App)
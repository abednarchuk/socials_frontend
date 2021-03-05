import './index.styles.css'
import React from 'react'
import ReactDOM from 'react-dom'
// Redux
import { Provider } from 'react-redux'
import { store } from './app/store'
// Router
import { BrowserRouter } from 'react-router-dom'

import { App } from './App'
import { ThemeProvider } from '@material-ui/core/styles'
import { darkTheme, lightTheme } from './theme.styles'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

import React, { Component } from 'react'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import purple from 'material-ui/colors/purple'
import green from 'material-ui/colors/green'
import CssBaseline from 'material-ui/CssBaseline'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import 'particles.js/particles'
import MainPage from './components/MainPage'
import './App.css'

const particlesJS = window.particlesJS

const theme = createMuiTheme({
  palette: {
    primary: {
      light: purple[300],
      main: purple[500],
      dark: purple[700]
    },
    secondary: {
      light: green[300],
      main: green[500],
      dark: green[700]
    }
  }
})
class App extends Component {
  // constructor (props) {
  //   super(props)
  // }
  componentDidMount () {
    particlesJS.load('particles-js', './animation/particles-final.json', () => {
      console.log('callback - particles-js config loaded')
    })
  }

  render () {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar className='main-header' color='default'>
          <Toolbar>
            <Typography variant='title' color='inherit'>
              QR CODE GENERATOR
            </Typography>
          </Toolbar>
        </AppBar>
        <MainPage theme={theme} toastToggle={this.toastToggle} />
        <div id='particles-js' />
      </MuiThemeProvider>
    )
  }
}

export default App

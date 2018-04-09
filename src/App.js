import React, { Component } from 'react'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import purple from 'material-ui/colors/purple'
import green from 'material-ui/colors/green'
import CssBaseline from 'material-ui/CssBaseline'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import MainPage from './components/MainPage'
import Menu, { MenuItem } from 'material-ui/Menu'
import IconButton from 'material-ui/IconButton'
import SettingsIcon from 'material-ui-icons/Settings'
import './App.css'
import 'particles.js/particles'

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
  constructor (props) {
    super(props)
    let background = window.localStorage.getItem('background')
    if (background) {
      background = JSON.parse(background)
    } else {
      background = ['#48c6ef', '#6f86d6']
    }
    this.state = {
      option: null,
      background
    }

    this.handleMenu = this.handleMenu.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }
  componentDidMount () {
    particlesJS.load('particles-js', './animation/particles-final.json', () => {
      console.log('callback - particles-js config loaded')
    })
  }

  handleMenu (event) {
    this.setState({ option: event.currentTarget })
  }

  handleClose (background = undefined) {
    const { background: oldBackground } = this.state
    let newBackground = oldBackground
    if (background) {
      window.localStorage.setItem('background', JSON.stringify(background))
      newBackground = background
    }
    this.setState({ option: null, background: newBackground })
  }

  render () {
    const { option, background } = this.state
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar className='main-header' color='default'>
          <Toolbar>
            <Typography variant='title' color='inherit'>
              QR CODE GENERATOR
            </Typography>
            <div>
              <IconButton
                aria-owns={Boolean(option) ? 'menu-appbar' : null}
                aria-haspopup='true'
                onClick={this.handleMenu}
                color='inherit'
              >
                <SettingsIcon />
              </IconButton>
              <Menu
                style={{ background: 'transparent' }}
                id='menu-appbar'
                anchorEl={option}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(option)}
                onClose={() => this.handleClose()}
              >
                <MenuItem style={{ background: 'linear-gradient(#a3bded, #6991c7)' }} onClick={() => this.handleClose(['#a3bded', '#6991c7'])}>Great Whale Theme</MenuItem>
                <MenuItem style={{ background: 'linear-gradient(#feada6, #f5efef)' }} onClick={() => this.handleClose(['#feada6', '#f5efef'])}>Fresh Milk Theme</MenuItem>
                <MenuItem style={{ background: 'linear-gradient(#89f7fe, #66a6ff)' }} onClick={() => this.handleClose(['#89f7fe', '#66a6ff'])}>Happy Fisher Theme</MenuItem>
                <MenuItem style={{ background: 'linear-gradient(#48c6ef, #6f86d6)' }} onClick={() => this.handleClose(['#48c6ef', '#6f86d6'])}>Fly High Theme</MenuItem>
                <MenuItem style={{ background: 'linear-gradient(#fdfcfb, #e2d1c3)' }} onClick={() => this.handleClose(['#fdfcfb', '#e2d1c3'])}>Everlasting Sky Theme</MenuItem>
                <MenuItem style={{ background: 'linear-gradient(#f5f7fa, #c3cfe2)' }} onClick={() => this.handleClose(['#f5f7fa', '#c3cfe2'])}>Saint Petersberg Theme</MenuItem>
                <MenuItem style={{ background: 'linear-gradient(#13547a, #80d0c7)' }} onClick={() => this.handleClose(['#13547a', '#80d0c7'])}>Aqua Splash Theme</MenuItem>
                <MenuItem style={{ background: 'linear-gradient(#434343, #000000)' }} onClick={() => this.handleClose(['#434343', '#000000'])}>Premium Dark Theme</MenuItem>
                <MenuItem style={{ background: 'linear-gradient(#868f96, #596164)' }} onClick={() => this.handleClose(['#868f96', '#596164'])}>Mountain Rock Theme</MenuItem>
                <MenuItem style={{ background: 'linear-gradient(#09203f, #537895)' }} onClick={() => this.handleClose(['#09203f', '#537895'])}>Eternal Constance Theme</MenuItem>
                <MenuItem style={{ background: 'linear-gradient(#29323c, #485563)' }} onClick={() => this.handleClose(['#29323c', '#485563'])}>Vicious Stance Theme</MenuItem>
                <MenuItem style={{ background: 'linear-gradient(#1e3c72, #2a5298)' }} onClick={() => this.handleClose(['#1e3c72', '#2a5298'])}>Night Sky Theme</MenuItem>
                <MenuItem style={{ background: 'linear-gradient(#B7F8DB, #50A7C2)' }} onClick={() => this.handleClose(['#B7F8DB', '#50A7C2'])}>Morning Salad Theme</MenuItem>
                <MenuItem style={{ background: 'linear-gradient(#aa076b, #61045f)' }} onClick={() => this.handleClose(['#aa076b', '#61045f'])}>Aubergine Theme</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <MainPage theme={theme} />
        <div id='particles-js' style={{ background: `linear-gradient(${background.join(', ')})` }} />
      </MuiThemeProvider>
    )
  }
}

export default App

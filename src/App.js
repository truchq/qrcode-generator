import React, { Component } from 'react'
import { Theme as UWPThemeProvider, getTheme } from 'react-uwp/Theme'
import MainPage from './components/MainPage'
import Toast from 'react-uwp/Toast'
import './App.css'

const theme = getTheme({
  themeName: 'light', // set custom theme
  accent: '#0078D7', // set accent color
  useFluentDesign: true, // sure you want use new fluent design.
  desktopBackgroundImage: './images/bg2.jpg' // set global desktop background image
})
class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      toast: undefined
    }
    this.toastToggle = this.toastToggle.bind(this)
  }

  toastToggle () {
    const { toast } = this.state
    this.setState({
      toast: !toast
    })
  }

  componentDidMount () {
    // this.setState({
    //   toast: {
    //     title: 'IBL Qrcode Tool',
    //     description: ['Welcome to IBL Qrcode tool is a simple tool', 'help you generate qrcode from text']
    //   }
    // })
  }

  render () {
    const { toast } = this.state
    return (
      <UWPThemeProvider
        theme={theme}
      >
        <MainPage theme={theme} toastToggle={this.toastToggle} />
        {toast !== undefined && <Toast
          theme={theme}
          defaultShow={toast !== undefined}
          // onToggleShowToast={toast => this.setState({ toast: undefined })}
          logoNode={<img style={{ clipPath: 'circle(16px at 16px 16px)' }} src={'./images/logo.png'} />}
          title={toast && toast.title}
          description={toast && toast.description}
          showCloseIcon
        />}
      </UWPThemeProvider>
    )
  }
}

export default App

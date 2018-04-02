import * as React from 'react'
import NavigationView from 'react-uwp/NavigationView'
import SplitViewCommand from 'react-uwp/SplitViewCommand'
import TextBox from 'react-uwp/TextBox'
// import Button from 'react-uwp/Button'
const FontAwesome = require('react-fontawesome')
const QRCode = require('qrcode.react')

export default class MainPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      phone: '',
      text: '',
      qrValue: '',
      mode: 'text'
    }

    this.handleChangePhone = this.handleChangePhone.bind(this)
    this.handleChangeText = this.handleChangeText.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleMode = this.handleMode.bind(this)
  }

  handleMode (mode) {
    this.setState({mode, text: ''})
  }

  handleChangePhone (event) {
    this.handleChange(event.target.value, 'phone')
  }

  handleChangeText (event) {
    this.handleChange(event.target.value, 'text')
  }

  handleChange (value, type = 'text') {
    const { mode, phone, text } = this.state
    const values = { phone, text }
    values[type] = value

    let qrValue = ''
    switch (mode) {
      case 'sms':
        qrValue = `SMSTO:${values.phone}:${values.text}`
        break
      default:
        qrValue = `${values.text}`
        break
    }
    this.setState({ qrValue, [type]: value })
  }

  handleSubmit (event) {
    event.preventDefault()
  }

  render () {
    const { text, phone, mode, qrValue } = this.state
    const { theme } = this.props
    const baseStyle = {
      margin: 0
    }
    const navigationTopNodes = [
      <SplitViewCommand label='Text' icon={'\uE716'} onClick={() => this.handleMode('mode')} />,
      <SplitViewCommand label='Message' icon='MessageLegacy' onClick={() => this.handleMode('sms')} />
    ]

    const navigationBottomNode = [
      // <SplitViewCommand label='Settings' icon={'\uE713'} />,
      // <SplitViewCommand label='CalendarDay' icon={'\uE161'} />
    ]
    const itemStyle = {
      color: theme.baseHigh
    }

    return (
      <NavigationView
        isControlled={false}
        style={{ width: '100%', height: '100%', ...baseStyle }}
        pageTitle=' QR-Code'
        displayMode='compact'
        autoResize={false}
        initWidth={50}
        expandedWidth={200}
        defaultExpanded={false}
        navigationTopNodes={navigationTopNodes}
        navigationBottomNodes={navigationBottomNode}
        focusNavigationNodeIndex={2}
      >
        <div className='main-container'>
          <div className='left-container' style={{ ...itemStyle, background: theme.acrylicTexture40.background }}>
            {mode === 'sms' && (
              <TextBox
                background='none'
                value={phone}
                onChange={this.handleChangePhone}
                placeholder='Enter phone number'
                style={{ height: 40, boxShadow: 'inset 0px 0px 0 2px #ffffff' }}
                leftNode={
                  <FontAwesome
                    name='phone'
                    size='2x'
                    style={{ color: '#FFFFFF', textAlign: 'center', paddingTop: 6, width: 40, height: 40 }}
                  />
                }
              />
            )}
            <TextBox
              background='none'
              value={text}
              onChange={this.handleChangeText}
              placeholder='Enter your text'
              style={{ marginTop: 5, height: 40, boxShadow: 'inset 0px 0px 0 2px #ffffff' }}
              leftNode={
                <FontAwesome
                  name='comment-alt'
                  size='2x'
                  style={{ color: '#FFFFFF', textAlign: 'center', paddingTop: 6, width: 40, height: 40 }}
                />
              }
            />
            {/* <Button
              style={{ margin: 5, height: 40, backgroundColor: '#FFFFFF' }}
              icon='ReshareLegacy'
              onClick={this.handleSubmit}
            >
              Convert
            </Button> */}
          </div>
          <div className='right-container' style={{ ...itemStyle }}>
            <QRCode value={qrValue} size={190} />
          </div>
        </div>
      </NavigationView>
    )
  }
}

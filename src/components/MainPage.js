import * as React from 'react'

import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Tooltip from 'material-ui/Tooltip'
import IconButton from 'material-ui/IconButton'
import ContentCopyIcon from 'material-ui-icons/ContentCopy'
import TextField from 'material-ui/TextField'
import SmsIcon from 'material-ui-icons/Sms'
import PhotoIcon from 'material-ui-icons/Photo'
import DashboardIcon from 'material-ui-icons/Dashboard'
import PhoneAndroidIcon from 'material-ui-icons/PhoneAndroid'
import Snackbar from 'material-ui/Snackbar'
import CloseIcon from 'material-ui-icons/Close'
// import Button from 'react-uwp/Button'
const QRCode = require('qrcode.react')
const QRImage = require('../utils/QrImage')

export default class MainPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      phone: '',
      text: '',
      qrValue: '',
      mode: 'text',
      showLogo: false,
      notification: false
    }

    this.handleNotification = this.handleNotification.bind(this)
    this.handleChangePhone = this.handleChangePhone.bind(this)
    this.handleChangeText = this.handleChangeText.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleMode = this.handleMode.bind(this)
    this.showLogo = this.showLogo.bind(this)
    this.copy = this.copy.bind(this)
  }

  handleNotification (event, reason) {
    const { notification } = this.state
    if (reason === 'clickaway') {
      return
    }
    notification.show = !notification.show
    this.setState({ notification })
  }

  showLogo () {
    const { showLogo, qrValue } = this.state
    if (qrValue < 15) {
      return this.setState({
        notification: {
          show: true,
          message: 'Logo mode require more than 15 character !'
        }
      })
    }
    this.setState({
      showLogo: !showLogo,
      notification: {
        show: true,
        message: showLogo ? 'Changed to normal mode !' : 'Changed to logo mode !'
      }
    })
  }

  copy () {
    const qr = document.getElementById('qrcode')
    this.copyToClipboard(qr.toDataURL())
    this.setState({
      notification: {
        show: true,
        message: 'Copied qr code image to your clipboard !'
      }
    })
  }

  copyToClipboard (text) {
    const dummy = document.createElement('input')
    document.body.appendChild(dummy)
    dummy.setAttribute('value', text)
    dummy.select()
    document.execCommand('copy')
    document.body.removeChild(dummy)
  }

  handleMode (event, mode) {
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
    const { text, phone, mode, qrValue, showLogo, notification } = this.state

    return (
      <div className='main-container'>
        <div className='left-container'>
          <Card className='card-content' style={{ display: 'flex', flexDirection: 'column' }} >
            <CardContent style={{ flex: 1 }} >
              {mode === 'phone' && (
                <TextField
                  label='Enter your phone number'
                  value={phone}
                  onChange={this.handleChangePhone}
                  style={{ width: '100%' }}
                  margin='normal'
                />
              )}
              <TextField
                id='multiline-static'
                label='Enter your text'
                multiline
                rowsMax='6'
                rows='4'
                value={text}
                onChange={this.handleChangeText}
                style={{ width: '100%' }}
                margin='normal'
              />
            </CardContent>
            <CardActions style={{ height: 80 }}>
              <BottomNavigation value={mode} onChange={this.handleMode}>
                <BottomNavigationAction label='Text' value='text' icon={<SmsIcon />} />
                <BottomNavigationAction label='Phone' value='phone' icon={<PhoneAndroidIcon />} />
              </BottomNavigation>
            </CardActions>
          </Card>
        </div>
        <div className='right-container'>
          <Card className='card-content'>
            <div className='qrcode-container'>
              {!showLogo ? (
                <QRCode id='qrcode' className='qrcode' value={qrValue} size={230} />
              ) : (
                <QRImage
                  id='qrcode'
                  className='qrcode'
                  value={qrValue}
                  size={230}
                  logoWidth={80}
                  logoHeight={80}
                  logo={'./images/logo.jpg'}
                />
              )}
            </div>
            <CardActions>
              <Tooltip
                enterDelay={100}
                id='tooltip-controlled'
                leaveDelay={400}
                placement='top'
                title='Copy Image to clipboard'
              >
                <IconButton aria-label='Share'>
                  <ContentCopyIcon onClick={this.copy} />
                </IconButton>
              </Tooltip>
              <Tooltip
                enterDelay={100}
                id='tooltip-controlled'
                leaveDelay={400}
                placement='top'
                title='Add logo to qrcode. Only available with text more than 15 charater !'
              >
                <IconButton aria-label='Share'>
                  {showLogo ? (
                    <DashboardIcon onClick={this.showLogo} />
                  ) : (
                    <PhotoIcon onClick={this.showLogo} />
                  )}
                </IconButton>
              </Tooltip>
              {/* <Button size='small' color='primary'>
                Learn More
              </Button> */}
            </CardActions>
          </Card>
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={notification.show}
          autoHideDuration={6000}
          onClose={this.handleNotification}
          SnackbarContentProps={{
            'aria-describedby': 'message-id'
          }}
          message={<span id='message-id'>{notification.message}</span>}
          action={[
            <IconButton
              key='close'
              aria-label='Close'
              color='inherit'
              onClick={this.handleNotification}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    )
  }
}

const React = require('react')
const PropTypes = require('prop-types')
const ReactDOM = require('react-dom')
const qr = require('qr.js')

function getBackingStorePixelRatio (ctx) {
  return (
    ctx.webkitBackingStorePixelRatio ||
    ctx.mozBackingStorePixelRatio ||
    ctx.msBackingStorePixelRatio ||
    ctx.oBackingStorePixelRatio ||
    ctx.backingStorePixelRatio ||
    1
  )
}

let getDOMNode = null
if (/^0\.14/.test(React.version)) {
  getDOMNode = function (ref) {
    return ref
  }
} else {
  getDOMNode = function (ref) {
    return ReactDOM.findDOMNode(ref)
  }
}

class QRImage extends React.Component {
  shouldComponentUpdate (nextProps) {
    return Object.keys(QRImage.propTypes).some((k) => {
      return this.props[k] !== nextProps[k]
    })
  }

  componentDidMount () {
    this.update()
  }

  componentDidUpdate () {
    this.update()
  }

  utf16to8 (str) {
    let out, i, len, c
    out = ''
    len = str.length
    for (i = 0; i < len; i++) {
      c = str.charCodeAt(i)
      if ((c >= 0x0001) && (c <= 0x007F)) {
        out += str.charAt(i)
      } else if (c > 0x07FF) {
        out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F))
        out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F))
        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F))
      } else {
        out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F))
        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F))
      }
    }
    return out
  }

  update() {
    const value = this.utf16to8(this.props.value)
    const qrcode = qr(value)
    const canvas = getDOMNode(this.refs.canvas)

    const ctx = canvas.getContext('2d')
    const cells = qrcode.modules
    const tileW = this.props.size / cells.length
    const tileH = this.props.size / cells.length
    const scale = (window.devicePixelRatio || 1) / getBackingStorePixelRatio(ctx)
    canvas.height = canvas.width = this.props.size * scale
    ctx.scale(scale, scale)

    cells.forEach((row, rdx) => {
      row.forEach((cell, cdx) => {
        ctx.fillStyle = cell ? this.props.fgColor : this.props.bgColor
        var w = (Math.ceil((cdx + 1) * tileW) - Math.floor(cdx * tileW))
        var h = (Math.ceil((rdx + 1) * tileH) - Math.floor(rdx * tileH))
        ctx.fillRect(Math.round(cdx * tileW), Math.round(rdx * tileH), w, h)
      })
    })

    if (this.props.logo) {
      const size = this.props.size
      const image = document.createElement('img')
      image.src = this.props.logo
      image.onload = () => {
        const dwidth = this.props.logoWidth || size * 0.2
        const dheight = this.props.logoHeight || image.height / image.width * dwidth
        const dx = (size - dwidth) / 2
        const dy = (size - dheight) / 2
        image.width = dwidth
        image.height = dheight
        ctx.drawImage(image, dx, dy, dwidth, dheight)
      }
    }
  }

  render () {
    return React.createElement('canvas', {
      style: { height: this.props.size, width: this.props.size },
      height: this.props.size,
      width: this.props.size,
      ref: 'canvas',
      className: this.props.className,
      id: this.props.id
    })
  }
}

QRImage.propTypes = {
  value: PropTypes.string.isRequired,
  size: PropTypes.number,
  bgColor: PropTypes.string,
  fgColor: PropTypes.string,
  logo: PropTypes.string,
  logoWidth: PropTypes.number,
  logoHeight: PropTypes.number
}

QRImage.defaultProps = {
  size: 128,
  bgColor: '#FFFFFF',
  fgColor: '#000000',
  value: 'http://facebook.github.io/react/'
}

module.exports = QRImage

import React, { Component } from 'react'
import { Button, Alert } from 'react-bootstrap'
import _ from 'lodash'
import Dropzone from 'react-dropzone'

const _SALES = {
  banks_accounts: []
}

class Payment extends Component {

  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      products: [],
      product: null,
      sales: {
        banks_accounts: []
      },
      file: null,
      err: false,
      errmsg: 'Gambar tidak boleh dimuat naik. Besar sangat kot.'
    }

    this.previousStep = this.previousStep.bind(this)
    this.newFile = this.newFile.bind(this)
    this.nextStep = this.nextStep.bind(this)
  }

  componentWillMount () {
    this.setState({
      loading: this.props.loading,
      products: this.props.products || [],
      product: this.props.product || null,
      sales: _.merge(_SALES, this.props.sales || {})
    })
  }

  componentWillUnmount () { }

  componentWillReceiveProps(props) {
    this.setState({
      loading: props.loading,
      products:  props.products || [],
      product: props.product || null,
      sales: _.merge(_SALES, props.sales || {}),
    })
  }

  previousStep () {
    this.setState({ err: false })
    this.props.back()
  }

  newFile ( files, rejected ) {
    if(this.state.file) {
      window.URL.revokeObjectURL(this.state.file.preview)
    }
    if(files.length === 1) {
      this.setState({ file: files[0], err: false })
    } else {
      this.setState({ err: true, errmsg: 'Gambar tidak boleh dimuat naik. Besar sangat kot.' })
    }
  }

  nextStep () {

    if(this.state.sales.can_skip_payment === false && !this.state.file) {
       return this.setState({ err: true, errmsg: 'Sila muat naik bukti pembayaran terlebih dahulu' })
    }

    this.props.receive(this.state.file)
  }

  render () {

    let totalToPay = 0
    if(this.state.products && this.state.products.length !== 0) {
      _.each(this.state.products, product => {
        totalToPay += (parseInt(product.quantity) * parseFloat(product.price))
      })
    } else if(this.state.product) {
      totalToPay = parseInt(this.state.product.quantity) * parseFloat(this.state.product.price)
    }

    let error = null
    if(this.state.err === true) {
      error = (
        <Alert>
          <strong>Ops!</strong> {errmsg}
        </Alert>
      )
    }

    let preview = null
    if(this.state.file && this.state.file.type !== 'application/pdf') {
      preview = <img className="img-responsive" style={{marginTop: 15}} src={this.state.file.preview} alt="Muat naik bukti pembayaran"/>
    } else if(this.state.file && this.state.file.type === 'application/pdf') {
      preview = <div style={{textAlign: 'center', marginTop: 15}}><i className="fa fa-file-pdf-o fa-fw fa-5x" style={{color: 'red'}}></i><br/>{this.state.file.name}</div>
    }

    return (
      <div style={{marginTop: 15}}>

        {error}

        <p>
          Sila lakukan pembayaran sebanyak <code>RM{totalToPay.toFixed(2)}</code> ke mana-mana akaun yang berikut dan muat naik bukti pembayaran anda tersebut ke sini.
        </p>

        <div style={{marginBottom: 15}}>
          {
            this.state.sales.banks_accounts.map((bank, i) => {
              return (
                <div key={i} style={{paddingBottom: 10}}>
                  <i>{bank.bank_name}</i> <br/>
                  <strong><code style={{fontSize: 18}}>{bank.account_number}</code> - {bank.account_owner.toUpperCase()}</strong>
                </div>
              )
            })
          }
        </div>

        <Dropzone
          style={{width: '100%', height: 150, border: '1px dashed #ccc'}}
          multiple={false}
          maxSize={1800000}
          accept="image/jpeg, image/png, application/pdf"
          onDrop={this.newFile}>
          <div style={{marginTop: 60, textAlign: 'center'}}>Sila muat naik bukti pembayaran anda disini. Maximum 2MB</div>
        </Dropzone>

        {preview}

        <hr/>

        <div className="row">
          <div className="col-xs-6">
            <Button onClick={this.previousStep} disabled={this.state.loading}>Sebelumnya</Button>
          </div>
          <div className="col-xs-6 text-right">
            <Button onClick={this.nextStep} disabled={this.state.loading || (this.state.sales && this.state.sales.can_skip_payment === false && !this.state.file)}>Seterusnya</Button>
          </div>
        </div>

      </div>
    )
  }

}

Payment.defaultProps = {}

export default Payment
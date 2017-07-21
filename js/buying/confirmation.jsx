import React, { Component } from 'react'
import { Form, FormGroup, ControlLabel, FormControl, Media, Button } from 'react-bootstrap'
import _ from 'lodash'

class Confirmation extends Component {

  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      buyingdetail: {},
      buyer_detail: {},
      product: {},
      products: [],
      file: null
    }

    this.previousStep = this.previousStep.bind(this)
    this.nextStep = this.nextStep.bind(this)
  }

  componentWillMount () {
    this.setState({
      buyingdetail: this.props.buyingdetail || {},
      loading: this.props.loading || true,
      buyer_detail: this.props.buyer || {},
      product: this.props.product || {},
      products: this.props.products || [],
      file: this.props.file || null
    })
  }

  componentWillUnmount () {

  }

  componentWillReceiveProps(props) {
    this.setState({
      buyingdetail: props.buyingdetail || {},
      loading: props.loading || false,
      buyer_detail: props.buyer || {},
      product: props.product || {},
      products: props.products || [],
      file: props.file || null
    })
  }

  previousStep () {
    this.props.back()
  }

  nextStep () {
    this.props.done()
  }

  render () {

    let product = null
    if(this.state.products && this.state.products.length !== 0) {
      product = (
        <div>
          {
            this.state.products.map((buyproduct, i) => {

              let product = buyproduct.details

              let imageUrl = 'https://storage.googleapis.com/bizsaya_assets/tiada_gambar.jpg'
              if(product.images.length !== 0) {
                imageUrl = product.images[0]
              }

              return (
                <Media key={i}>
                  <Media.Left>
                    <img width={64} height={64} src={imageUrl} alt={`Gambar ${product.name}`} />
                  </Media.Left>
                  <Media.Body>
                    <Media.Heading>{product.name}</Media.Heading>
                    <small>RM{parseFloat(product.price).toFixed(2)} x {product.quantity} = RM{(parseFloat(product.price)*parseInt(product.quantity)).toFixed(2)}</small>
                    <div style={{marginBottom: 15}}>
                      <small> {  _.truncate(product.remarks, {length: (document.body.clientWidth - 200)}) } </small>
                    </div>
                  </Media.Body>
                  <hr/>
                </Media>
              )

            })
          }
        </div>
      )
    } else {

      let imageUrl = 'https://storage.googleapis.com/bizsaya_assets/tiada_gambar.jpg'
      if(this.state.buyingdetail && this.state.buyingdetail.product && this.state.buyingdetail.product.images.length !== 0) {
        imageUrl = this.state.buyingdetail.product.images[0]
      }

      product = (
        <div>
          <Media>
            <Media.Left>
              <img width={64} height={64} src={imageUrl} alt={`Gambar ${this.state.buyingdetail.product? this.state.buyingdetail.product.name : ''}`} />
            </Media.Left>
            <Media.Body>
              <Media.Heading>{this.state.buyingdetail.product? this.state.buyingdetail.product.name : null}</Media.Heading>
              <small>RM{parseFloat(this.state.product.price).toFixed(2)} x {this.state.product.quantity} = RM{(parseFloat(this.state.product.price)*parseInt(this.state.product.quantity)).toFixed(2)}</small>
              <div style={{marginBottom: 15}}>
                <small> {  _.truncate(this.state.product.remarks, {length: (document.body.clientWidth - 200)}) } </small>
              </div>
            </Media.Body>
            <hr/>
          </Media>
        </div>
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

        <Form>

          <FormGroup>
            <ControlLabel>Alamat emel</ControlLabel>
            <FormControl.Static>{this.state.buyer_detail.email}</FormControl.Static>
          </FormGroup>

          <FormGroup>
            <ControlLabel>Nama penuh</ControlLabel>
            <FormControl.Static>{this.state.buyer_detail.buyer_name}</FormControl.Static>
          </FormGroup>

          <FormGroup>
            <ControlLabel>Nombor telefon</ControlLabel>
            <FormControl.Static>{this.state.buyer_detail.phone}</FormControl.Static>
          </FormGroup>

          <FormGroup>
            <ControlLabel>Alamat penghantaran</ControlLabel>
            <FormControl.Static>{this.state.buyer_detail.address}</FormControl.Static>
          </FormGroup>

          <FormGroup>
            <ControlLabel>Produk/Perkhidmatan yang dibeli</ControlLabel>
            {product}
          </FormGroup>

          <FormGroup>
            <ControlLabel>Bukti Pembayaran</ControlLabel>
            {preview}
          </FormGroup>

        </Form>

        <hr/>

        <div className="row">
          <div className="col-xs-6">
            <Button onClick={this.previousStep} disabled={this.state.loading}>Sebelumnya</Button>
          </div>
          <div className="col-xs-6 text-right">
            <Button bsStyle="primary" onClick={this.nextStep} disabled={this.state.loading}>Sahkan pembelian</Button>
          </div>
        </div>

      </div>
    )
  }

}

Confirmation.defaultProps = {}

export default Confirmation
import React, { Component } from 'react'
import { Form, FormGroup, ControlLabel, FormControl, Media, ButtonGroup, Button, Alert } from 'react-bootstrap'
import _ from 'lodash'

class Product extends Component {

  constructor (props) {
    super(props)
    this.state = {
      errqty: false,
      product: {},
      form: {
        quantity: 1,
        remarks: ''
      }
    }

    this.formChange = this.formChange.bind(this)
    this.previousStep = this.previousStep.bind(this)
    this.nextStep = this.nextStep.bind(this)
  }

  componentWillMount () {
    this.setState({
      product: this.props.product || {}
    })
  }

  componentWillUnmount () {

  }

  componentWillReceiveProps(props) {
    this.setState({
      product: props.product || {}
    })
  }

  formChange (key, e) {
    let form = this.state.form
    form[key] = e.target.value

    if(key === 'quantity') {
      return this.setState({ errqty: e.target.value.toString().replace(/\s/g, '').length === 0 })
    }

    this.setState({ form })

  }

  previousStep () {
    this.props.back()
  }

  nextStep () {

    if(this.state.form.quantity.toString().replace(/\s/g, '').length === 0) {
      return this.setState({ errqty: true })
    }

    this.props.receive(this.state.form.quantity, this.state.form.remarks)
  }

  render () {

    let imageUrl = 'https://storage.googleapis.com/bizsaya_assets/tiada_gambar.jpg'
    if(this.state.product.images && this.state.product.images.length !== 0) {
      imageUrl = this.state.product.images[0]
    }

    return (
      <div style={{marginTop: 15}}>

        <Media style={{textAlign: 'center'}}>
          <img width={64} height={64} src={imageUrl} alt={`Gambar ${this.state.product.name}`} />
          <Media.Body>
            <Media.Heading>{this.state.product.name}</Media.Heading>
            <small>RM{parseFloat(this.state.product.price).toFixed(2)}</small>
            <div style={{marginBottom: 15}}>
              <small>{this.state.product.description}</small>
            </div>

            <Button block href={this.state.product.links_to === ''? '#' : this.state.product.links_to} target="_blank" disabled={this.state.product.links_to === ''}>Maklumat lanjut</Button>
          </Media.Body>
        </Media>

        <hr/>

        <Form>

          <FormGroup
            controlId="formBasicText"
            validationState={this.state.errqty === true? 'error' : null} >
            <ControlLabel>Kuantiti <small><sup style={{color: 'red'}}>*</sup></small></ControlLabel>
            <FormControl
              type="number"
              value={this.state.form.quantity}
              placeholder="Kuantiti yang ingin dibeli"
              onClick={()=>this.setState({ errqty: false })}
              onChange={v=>this.formChange('quantity', v)} />
          </FormGroup>

          <FormGroup
            controlId="formControlsTextarea" >
            <ControlLabel>Maklumat tambahan</ControlLabel>
            <FormControl
              rows={5}
              style={{resize: 'none'}}
              componentClass="textarea"
              value={this.state.form.remarks}
              placeholder="Maklumat tambahan pembelian produk ini"
              onChange={v=>this.formChange('remarks', v)} />
          </FormGroup>

        </Form>

        <hr/>
        <div className="row">
          <div className="col-xs-6">
            <Button onClick={this.previousStep} disabled={this.state.loading}>Sebelumnya</Button>
          </div>
          <div className="col-xs-6 text-right">
            <Button onClick={this.nextStep} disabled={this.state.loading || this.state.form.quantity.toString().replace(/\s/g, '').length === 0}>Seterusnya</Button>
          </div>
        </div>

      </div>
    )
  }

}

Product.defaultProps = {}

export default Product
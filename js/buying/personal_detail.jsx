import React, { Component } from 'react'
import { Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'
import _ from 'lodash'

const _FORM = {
  email: '',
  buyer_name: '',
  phone: '',
  address: '',
  file: null
}

class Personaldetail extends Component {

  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      buying_detail: { },
      err: {
        email: false,
        buyer_name: false,
        phone: false,
        address: false
      }
    }

    this.formChange = this.formChange.bind(this)
    this.nextStep = this.nextStep.bind(this)
  }

  componentWillMount () {
    this.setState({
      loading: this.props.loading,
      buying_detail: _.merge(_.cloneDeep(_FORM), this.props.buyingdetail)
    })
  }

  componentWillUnmount () { }

  componentWillReceiveProps(props) {
    if(props.buyingdetail) {
      this.setState({
        loading: props.loading,
        buying_detail:  _.merge(_.cloneDeep(_FORM), props.buyingdetail)
      })
    }
  }

  formChange (key, e) {
    let buying_detail = this.state.buying_detail
    buying_detail[key] = e.target.value
    this.setState({ buying_detail, err: { email: false, buyer_name: false, phone: false, address: false} })
  }


  nextStep () {

    let err = this.state.err

    if(!this.state.buying_detail.buyer_name || this.state.buying_detail.buyer_name.replace(/\s/g, '').length === 0) {
      err.buyer_name = true
      return this.setState({ err })
    } else if(!this.state.buying_detail.phone || this.state.buying_detail.phone.replace(/\s/g, '').length === 0 || isNaN(parseInt(this.state.buying_detail.phone))) {
      err.phone = true
      return this.setState({ err })
    } else if(!this.state.buying_detail.address || this.state.buying_detail.address.replace(/\s/g, '').length === 0) {
      err.address = true
      return this.setState({ err })
    }

    this.props.receive({
      email: this.state.buying_detail.email,
      buyer_name: this.state.buying_detail.buyer_name,
      phone: this.state.buying_detail.phone,
      address: this.state.buying_detail.address
    })
  }

  render () {

    return (
      <div style={{marginTop: 15}}>
        <Form>
          <FormGroup
            controlId="formBasicText"
            validationState={this.state.err.email === true? 'error' : null} >
            <ControlLabel>Alamat emel</ControlLabel>
            <FormControl
              type="email"
              value={this.state.buying_detail.email}
              placeholder="Emel untuk resit pembelian"
              onChange={v=>this.formChange('email', v)} />
          </FormGroup>

          <FormGroup
            controlId="formBasicText"
            validationState={this.state.err.buyer_name === true? 'error' : null} >
            <ControlLabel>Nama penuh <small><sup style={{color: 'red'}}>*</sup></small></ControlLabel>
            <FormControl
              value={this.state.buying_detail.buyer_name}
              placeholder="Nama penuh"
              onChange={v=>this.formChange('buyer_name', v)} />
          </FormGroup>

          <FormGroup
            controlId="formBasicText"
            validationState={this.state.err.phone === true? 'error' : null} >
            <ControlLabel>Nombor telefon <small><sup style={{color: 'red'}}>*</sup></small></ControlLabel>
            <FormControl
              type="number"
              value={this.state.buying_detail.phone}
              placeholder="Nombor telefon"
              onChange={v=>this.formChange('phone', v)} />
          </FormGroup>

          <FormGroup
            controlId="formControlsTextarea"
            validationState={this.state.err.address === true? 'error' : null} >
            <ControlLabel>Alamat penghantaran <small><sup style={{color: 'red'}}>*</sup></small></ControlLabel>
            <FormControl
              rows={5}
              style={{resize: 'none'}}
              componentClass="textarea"
              value={this.state.buying_detail.address}
              placeholder="Alamat penghantaran"
              onChange={v=>this.formChange('address', v)} />
          </FormGroup>

          <hr/>

          <div className="text-right">
            <Button onClick={this.nextStep} disabled={this.state.loading}>Seterusnya</Button>
          </div>

        </Form>
      </div>
    )
  }

}

Personaldetail.defaultProps = {}

export default Personaldetail
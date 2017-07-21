import React, { Component } from 'react'
import { Form, FormGroup, ControlLabel, FormControl, Media, Modal, ButtonGroup, Button, Alert } from 'react-bootstrap'
import _ from 'lodash'

class Products extends Component {

  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      products: [],
      showForm: false,
      showCart: false,
      buying_products: [],
      product_on_form: {},
      form: {
        quantity: 1,
        remarks: ''
      },
      errqty: false,
      showErrorEmptyCart: false
    }

    this.previousStep = this.previousStep.bind(this)
    this.hideShowForm = this.hideShowForm.bind(this)
    this.formChange = this.formChange.bind(this)
    this.addToCart = this.addToCart.bind(this)
    this.showCartOrProduct = this.showCartOrProduct.bind(this)
    this.nextStep = this.nextStep.bind(this)
  }

  componentWillMount () {
    this.setState({
      loading: this.props.loading,
      products: _.orderBy(this.props.products || [], 'name')
    })
  }

  componentWillUnmount () { }

  componentWillReceiveProps(props) {
    if(props.products) {
      this.setState({
        loading: props.loading,
        products: _.orderBy(props.products || [], 'name')
      })
    }
  }

  previousStep () {
    if(this.state.showErrorEmptyCart === true) {
      this.setState({ showErrorEmptyCart: false })
    }
    this.props.back()
  }

  hideShowForm (showForm, on_buying_product = {}) {
    this.setState({ showForm, product_on_form: _.cloneDeep(on_buying_product) })
  }

  editForm (product) {
    let form = {
      quantity: product.quantity,
      remarks: product.remarks
    }
    this.setState({ form }, () => this.hideShowForm(true, _.find(this.state.products, {id: product.id})))
  }

  formChange(key, e) {
    let form = this.state.form
    form[key] = e.target.value
    this.setState({ form, errqty: false })
  }

  addToCart () {

    if(this.state.form.quantity.toString().replace(/\s/g, '').length === 0) {
      return this.setState({ errqty: true })
    }

    let buying_products = this.state.buying_products
    let p = _.cloneDeep(this.state.product_on_form)
    delete p.quantity
    delete p.remarks

    let index = _.findIndex(buying_products, {id: p.id})
    if(index === -1) {
      buying_products.push(_.merge(_.cloneDeep(this.state.form), p))
    } else {
      buying_products[index] = _.merge(_.cloneDeep(this.state.form), p)
    }

    this.setState({ buying_products, form: {quantity: 1, remarks: ''} })
    this.hideShowForm(false)
  }

  showCartOrProduct () {
    this.setState({ showCart: !this.state.showCart })
  }

  nextStep () {
    if(this.state.buying_products.length === 0) {
      return this.setState({ showErrorEmptyCart: true }, () => {
        let react = this
        setTimeout(() => {
          if(react.state.showErrorEmptyCart === true) {
            react.setState({ showErrorEmptyCart: false })
          }
        }, 5000)
      })
    }

    if(this.state.showErrorEmptyCart === true) {
      this.setState({ showErrorEmptyCart: false })
    }

    let toBePassBack = []
    _.each(this.state.buying_products, (product) => {
      toBePassBack.push({
        id: product.id,
        price: product.price,
        quantity: product.quantity,
        remarks: product.remarks,
        details: _.cloneDeep(product)
      })
    })

    this.props.receive(toBePassBack)

  }

  render () {

    let buying_admin_note = null
    if(this.state.product_on_form && this.state.product_on_form.remarks && this.state.product_on_form.remarks.replace(/\s/g, '').length !== 0) {
      buying_admin_note = (
        <small className="text-primary">
          <strong>NOTA DARIPADA ADMIN</strong>
          <p>
            {this.state.product_on_form.remarks}
          </p>
        </small>
      )
    }

    let showBuying = null
    if(this.state.buying_products.length !== 0) {
      showBuying = (
        <div className="text-right" style={{marginBottom: 15}}>
          <Button className="hidden-lg hidden-md" block onClick={this.showCartOrProduct}>Senaraikan produk yang saya {this.state.showCart===true? 'boleh' : 'akan'} beli</Button>
          <Button className="hidden-xs hidden-sm" onClick={this.showCartOrProduct}>Senaraikan produk yang saya {this.state.showCart===true? 'boleh' : 'akan'} beli</Button>
          <hr/>
        </div>
      )
    }

    let emptyCart = null
    if(this.state.showErrorEmptyCart === true) {
      emptyCart = (
        <Alert bsStyle="warning">
          <strong>Ops!</strong> Sila beli sekurang-kurangnya 1 produk/perkhidmatan.
        </Alert>
      )
    }

    let container = (
      <div>
        {
          this.state.products.map((product, i) => {

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
                  <div className="row hidden-xs hidden-sm">
                    <div className="col-md-9">
                      <Media.Heading>{product.name}</Media.Heading>
                      <small>RM{parseFloat(product.price).toFixed(2)}</small>
                      <div style={{marginBottom: 15}}>
                        <small>
                          {
                            _.truncate(product.description, {length: (document.body.clientWidth - 200)})
                          }
                        </small>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <ButtonGroup justified>
                        <Button href={product.links_to === ''? '#' : product.links_to} target="_blank" disabled={product.links_to === ''}>Maklumat lanjut</Button>
                        <Button href="#" onClick={()=>this.hideShowForm(true, product)}>Beli</Button>
                      </ButtonGroup>
                    </div>
                  </div>
                  <div className="hidden-lg hidden-md">
                    <Media.Heading>{product.name}</Media.Heading>
                    <small>RM{parseFloat(product.price).toFixed(2)}</small>
                    <div style={{marginBottom: 15}}>
                      <small>
                        {
                          _.truncate(product.description, {length: (document.body.clientWidth - 200)})
                        }
                      </small>
                    </div>

                    <ButtonGroup justified>
                      <Button href={product.links_to === ''? '#' : product.links_to} target="_blank" disabled={product.links_to === ''}>Maklumat lanjut</Button>
                      <Button href="#" onClick={()=>this.hideShowForm(true, product)}>Beli</Button>
                    </ButtonGroup>
                  </div>
                </Media.Body>
                <hr/>
              </Media>
            )

          })
        }
      </div>
    )
    if(this.state.showCart === true) {
      container = (
        <div>
          {
            this.state.buying_products.map((product, i) => {

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
                    <div className="row hidden-xs hidden-sm">
                      <div className="col-md-9">
                        <Media.Heading>{product.name}</Media.Heading>
                        <small>RM{parseFloat(product.price).toFixed(2)} x {product.quantity} = RM{(parseFloat(product.price)*parseInt(product.quantity)).toFixed(2)}</small>
                        <div style={{marginBottom: 15}}>
                          <small>
                            {
                              _.truncate(product.remarks, {length: (document.body.clientWidth - 200)})
                            }
                          </small>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <ButtonGroup justified>
                          <Button href={product.links_to === ''? '#' : product.links_to} target="_blank" disabled={product.links_to === ''}>Maklumat lanjut</Button>
                          <Button href="#" onClick={()=>this.editForm(product)}>Kemaskini</Button>
                        </ButtonGroup>
                      </div>
                    </div>
                    <div className="hidden-lg hidden-md">
                      <Media.Heading>{product.name}</Media.Heading>
                      <small>RM{parseFloat(product.price).toFixed(2)} x {product.quantity} = RM{(parseFloat(product.price)*parseInt(product.quantity)).toFixed(2)}</small>
                      <div style={{marginBottom: 15}}>
                        <small>
                          {
                            _.truncate(product.remarks, {length: (document.body.clientWidth - 200)})
                          }
                        </small>
                      </div>

                      <ButtonGroup justified>
                        <Button href={product.links_to === ''? '#' : product.links_to} target="_blank" disabled={product.links_to === ''}>Maklumat lanjut</Button>
                        <Button href="#" onClick={()=>this.editForm(product)}>Kemaskini</Button>
                      </ButtonGroup>
                    </div>
                  </Media.Body>
                  <hr/>
                </Media>
              )

            })
          }
        </div>
      )
    }

    return (
      <div style={{marginTop: 15}}>

        {emptyCart}
        {showBuying}
        {container}

        <div className="row">
          <div className="col-xs-6">
            <Button onClick={this.previousStep} disabled={this.state.loading}>Sebelumnya</Button>
          </div>
          <div className="col-xs-6 text-right">
            <Button onClick={this.nextStep} disabled={this.state.loading || this.state.buying_products.length === 0}>Seterusnya</Button>
          </div>
        </div>

        <Modal show={this.state.showForm} onHide={()=>this.hideShowForm(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Pembelian produk/perkhidmatan</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Anda akan membeli produk/perkhidmatan <strong>{this.state.product_on_form.name}</strong>. Sila nyatakan kuantiti yang anda inginkan serta nota tambahan untuk admin
            </p>
            {buying_admin_note}
            <Form>
              <FormGroup
                controlId="formBasicText"
                validationState={this.state.errqty === true? 'error' : null} >
                <ControlLabel>Kuantiti <small><sup style={{color: 'red'}}>*</sup></small></ControlLabel>
                <FormControl
                  type="number"
                  value={this.state.form.quantity}
                  placeholder="Kuantiti"
                  onChange={v=>this.formChange('quantity', v)} />
              </FormGroup>

              <FormGroup
                controlId="formControlsTextarea">
                <ControlLabel>Nota tambahan</ControlLabel>
                <FormControl
                  rows={5}
                  style={{resize: 'none'}}
                  componentClass="textarea"
                  value={this.state.form.remarks}
                  placeholder="Nota tambahan"
                  onChange={v=>this.formChange('remarks', v)} />
              </FormGroup>
            </Form>
            <div className="hidden-lg hidden-md">
              <Button bsStyle="primary" block onClick={this.addToCart}>Beli</Button>
              <Button block onClick={()=>this.hideShowForm(false)}>Batal</Button>
            </div>
          </Modal.Body>
          <Modal.Footer className="hidden-xs hidden-sm">
            <Button onClick={()=>this.hideShowForm(false)}>Batal</Button>
            <Button bsStyle="primary" onClick={this.addToCart}>Beli</Button>
          </Modal.Footer>
        </Modal>

      </div>
    )
  }

}

Products.defaultProps = {}

export default Products
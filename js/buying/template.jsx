import React, { Component } from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import superagent from 'superagent'
import _ from 'lodash'
import Personaldetail from './personal_detail'
import Product from './product'
import Products from './products'
import Payment from './payment'
import Confirmation from './confirmation'

class Template extends Component {

  constructor (props) {
    super(props)
    this.state = {
      activeTab: 1,
      buying_detail: {},
      loading: true,
      buyer_detail: {},
      buy_products: [],
      buy_product: {},
      file: null,
      complete: false,
      saleId: null
    }

    this.getBuyingDetail = this.getBuyingDetail.bind(this)
    this.setActiveTab = this.setActiveTab.bind(this)
    this.back = this.back.bind(this)
    this.getBuyerDetail = this.getBuyerDetail.bind(this)
    this.getProductBuyingDetail = this.getProductBuyingDetail.bind(this)
    this.getProductsBuyingDetail = this.getProductsBuyingDetail.bind(this)
    this.getPaymentDetail = this.getPaymentDetail.bind(this)
    this.closeSale = this.closeSale.bind(this)
  }

  componentWillMount () {

    this.getBuyingDetail()

  }

  componentWillUnmount () {

  }

  componentWillReceiveProps(props) {

  }

  getBuyingDetail () {

    superagent
      .get(`${window.API_URL}buying/publics/${window.location.search}`)
      .end((err, response) => {
        this.setState({loading: false})
        if(err) {
          console.error('Error', response)
        } else {
          this.setState({ buying_detail: response.body.data })
        }
      })

  }

  setActiveTab (activeTab) {
    this.setState({ activeTab })
  }

  doNothing () { }

  back () {
    this.setActiveTab(this.state.activeTab - 1)
  }

  getBuyerDetail (buyer_detail) {
    this.setState({ buyer_detail }, () => {
      this.setActiveTab(2)
    })
  }

  getProductBuyingDetail (quantity, remarks) {
    this.setState({
      buy_product: {
        id: this.state.buying_detail.product.id,
        price: this.state.buying_detail.product.price,
        quantity,
        remarks
      }
    }, () => {
      this.setActiveTab(3)
    })
  }

  getProductsBuyingDetail (buy_products) {
    this.setState({ buy_products }, () => {
      this.setActiveTab(3)
    })
  }

  getPaymentDetail (file) {
    this.setState({ file }, () => {
      this.setActiveTab(4)
    })
  }

  closeSale () {
    this.setState({loading: true}, () => {

      let req = superagent
        .post(`${window.API_URL}buying/publics/${window.location.search}`)
        .field('email', this.state.buyer_detail.email)
        .field('fullname', this.state.buyer_detail.buyer_name)
        .field('phone', this.state.buyer_detail.phone)
        .field('address', this.state.buyer_detail.address)
        .attach('file', this.state.file)

      let breakExecution = false
      if(this.state.buy_products && this.state.buy_products.length !== 0) {
        let product_they_buy = []
        _.each(this.state.buy_products, product => {
          let pd = _.cloneDeep(product)
          delete pd.details
          product_they_buy.push(pd)
        })

        req.field('products', JSON.stringify(product_they_buy))
      } else if(this.state.buy_product) {
        req.field('product', JSON.stringify(this.state.buy_product))
      } else {
        breakExecution = true
      }

      if(breakExecution === false) {
        req.end((err, response) => {
          this.setState({loading: false})
          if(err) {
            console.error('Error', response.body)
          } else {
            this.setState({
              complete: true,
              saleId: response.body.data.id
            })
          }
        })
      }

    })
  }

  render () {

    let productForm = null
    if(this.state.buying_detail.products) {
      productForm = <Products
        loading={this.state.loading}
        products={this.state.buying_detail.products}
        receive={this.getProductsBuyingDetail}
        back={this.back} />
    } else if(this.state.buying_detail.product) {
      productForm = <Product
        loading={this.state.loading}
        product={this.state.buying_detail.product}
        receive={this.getProductBuyingDetail}
        back={this.back} />
    }

    let container = (
      <Tabs activeKey={this.state.activeTab} onSelect={this.doNothing} id="controlled-tab-example">
        <Tab eventKey={1} title={<div><i className="fa fa-vcard-o fa-fw"></i><span className="hidden-xs hidden-sm" style={{paddingLeft: 10}}>Maklumat anda</span></div>}>
          <Personaldetail
            loading={this.state.loading}
            buyingdetail={this.state.buying_detail}
            receive={this.getBuyerDetail} />
        </Tab>
        <Tab eventKey={2} title={<div><i className="fa fa-cubes fa-fw"></i><span className="hidden-xs hidden-sm" style={{paddingLeft: 10}}>Maklumat produk</span></div>}>
          {productForm}
        </Tab>
        <Tab eventKey={3} title={<div><i className="fa fa-money fa-fw"></i><span className="hidden-xs hidden-sm" style={{paddingLeft: 10}}>Maklumat pembayaran</span></div>}>
          <Payment
            loading={this.state.loading}
            sales={this.state.buying_detail.sales}
            products={this.state.buy_products}
            product={this.state.buy_product}
            receive={this.getPaymentDetail}
            back={this.back} />
        </Tab>
        <Tab eventKey={4} title={<div><i className="fa fa-check fa-fw"></i><span className="hidden-xs hidden-sm" style={{paddingLeft: 10}}>Pengesahan</span></div>}>
          <Confirmation
            loading={this.state.loading}
            buyingdetail={this.state.buying_detail}
            buyer={this.state.buyer_detail}
            products={this.state.buy_products}
            product={this.state.buy_product}
            file={this.state.file}
            done={this.closeSale}
            back={this.back} />
        </Tab>
      </Tabs>
    )

    if(this.state.complete === true) {
      container = (
        <div className="text-center">
          Terima kasih atas pembelian anda.
          Sila simpan nombor rekod pembelian anda dibawah bagi memudahkan sebarang semakkan.
          <br/>
          <br/>
          <code><small>{this.state.saleId}</small></code>
        </div>
      )
    }

    return (
      <div style={{paddingBottom: 40}}>

        <div className="page-header" style={{marginTop: 0, paddingTop: 0}}>
          <h3>Beli D' <small style={{textTransform: 'lowercase'}}>{this.state.buying_detail.page_name}</small></h3>
        </div>

        {container}
      </div>
    )
  }

}

Template.defaultProps = {}

export default Template
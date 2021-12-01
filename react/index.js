import React, { Component } from 'react'
import styles from './index.css'
const axios = require('axios');
class ExampleTransactionAuthApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      text: "Payment App Integration",
      appKey: null,
      appToken: null
    }
  }

  componentWillMount = () => {
    // this.injectScript(
    //   'google-recaptcha-v2',
    //   'https://recaptcha.net/recaptcha/api.js?render=explicit',
    //   this.handleOnLoad
    // )
  }

  componentDidMount() {
    $(window).trigger('removePaymentLoading.vtex')
  }

  respondTransaction = status => {
    $(window).trigger('transactionValidation.vtex', [status])
  }

  cancelTransaction = async () => {
    const { paymentId, callbackUrl } = JSON.parse(this.props.appPayload)
    this.setState({ loading: true })
    const inboundAPI = axios.create({
      timeout: 5000,
    })

    try {
      const response = await inboundAPI.post('/_v/partnerintegrationbra.payment-provider/v0/changeStatus',
        {
          paymentId,
          status: "denied",
          callbackUrl
        });
      console.log(response.data)
      this.setState({ text: response.data.text, loading: false })
      this.respondTransaction(false)
    }
    catch (err) {
      this.setState({ text: "Erro", loading: false })
    }

    // fetch(parsedPayload.denyPaymentUrl).then(() => {
    // })
  }

  confirmTransaction = async () => {
    const { paymentId, callbackUrl } = JSON.parse(this.props.appPayload)
    this.setState({ loading: true })
    const inboundAPI = axios.create({
      timeout: 5000,
    })
    try {
      const response = await inboundAPI.post('/_v/partnerintegrationbra.payment-provider/v0/changeStatus',
        {
          paymentId,
          status: "approved",
          callbackUrl
        });
      console.log(response.data)
      this.setState({ text: response.data.text, loading: false })
      this.respondTransaction(true)
    }
    catch (err) {
      this.setState({ text: "Erro", loading: false })
    }

    // fetch(parsedPayload.denyPaymentUrl).then(() => {
    // })
  }

  inboundRequest = async () => {
    const parsedPayload = JSON.parse(this.props.appPayload)
    this.setState({ loading: true })

    const inboundAPI = axios.create({
      //baseURL: body.inboundRequestsUrl.split('/:')[0],
      timeout: 5000,
    })
    try {
      const response = await inboundAPI.post('/_v/partnerintegrationbra.payment-provider/v0/paymentapp',
        {
          inboundRequestsUrl: parsedPayload.inboundRequestsUrl
        });
      console.log(response.data)
      this.setState({ text: response.data.text, appKey: response.data.appKey, appToken: response.data.appToken, loading: false })
    }
    catch (err) {
      this.setState({ text: "Erro", loading: false })
    }
  }

  render() {
    const { loading, text, appKey, appToken } = this.state

    return (
      <div className={styles.wrapper}>
        {!loading ? (
          <>
            <h1>{text}</h1>
            <h3>AppKey: {appKey ? appKey : 'Usar inbound' }</h3>
            <h3>AppToken: {appToken ? appToken : 'Usar inbound'}</h3>
            <button
              id="payment-app-inbound"
              className={styles.buttonInbound}
              onClick={this.inboundRequest}>
              Inbound
            </button>

            <button
              id="payment-app-confirm"
              className={styles.buttonSuccess}
              onClick={this.confirmTransaction}>
              Confirmar
            </button>

            <button
              id="payment-app-cancel"
              className={styles.buttonDanger}
              onClick={this.cancelTransaction}>
              Cancelar
            </button>
          </>
        ) : (
          <h2>Carregando...</h2>
        )}
      </div>
    )
  }
}

export default ExampleTransactionAuthApp

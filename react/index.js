import React, { Component } from 'react'
import styles from './index.css'

class ExampleTransactionAuthApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
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
    // In case you want to remove payment loading in order to show an UI.
    $(window).trigger('removePaymentLoading.vtex')
  }

  respondTransaction = status => {
    $(window).trigger('transactionValidation.vtex', [status])
  }

  cancelTransaction = () => {
    const parsedPayload = JSON.parse(this.props.appPayload)
    this.setState({ loading: true })
    this.respondTransaction(false)

    // fetch(parsedPayload.denyPaymentUrl).then(() => {
    // })
  }

  confirmTransation = () => {
    const parsedPayload = JSON.parse(this.props.appPayload)
    this.setState({ loading: true })
    this.respondTransaction(true)
    // fetch(parsedPayload.inboundRequestsUrl).then(() => {
    //   this.respondTransaction(true)
    // })
  }

  render() {
    const { scriptLoaded, loading } = this.state

    return (
      <div className={styles.wrapper}>
        {!loading ? (
          <>
            <h1>Pedro te amo</h1>
            <button
              id="payment-app-confirm"
              className={styles.buttonSuccess}
              onClick={this.confirmTransation}>
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

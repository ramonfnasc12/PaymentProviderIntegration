import React, { Component, Fragment } from 'react'
import styles from './index.css'
import axios from 'axios';

class ExampleTransactionAuthApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scriptLoaded: true,
      loading: false,
    }

    this.divContainer = React.createRef()
  }

  componentWillMount = () => {
  }

  componentDidMount() {
    // In case you want to remove payment loading in order to show an UI.
    $(window).trigger('removePaymentLoading.vtex')
  }

  respondTransaction = status => {
    $(window).trigger('transactionValidation.vtex', [status])
  }

  cancelTransaction = () => {
    this.respondTransaction(false)
  }

  confirmTransation = async () => {
    const parsedPayload = JSON.parse(this.props.appPayload)
    this.setState({ loading: true })

    const instance = axios.create({
      baseURL: parsedPayload.inboundRequestsUrl,
      timeout: 1000
    });
    
    await instance.post('',{"teste":"teste"});
    
    this.respondTransaction(true);

  }

  render() {
    const { scriptLoaded, loading } = this.state

    return (
      <div className={styles.wrapper}>
        {scriptLoaded && !loading ? (
          <Fragment>
            <button
              id="payment-app-confirm"
              className={styles.buttonSuccess}
              onClick={this.confirmTransation}>
              Confirmar
            </button>
          </Fragment>
        ) : (
          <h2>Carregando...</h2>
        )}

        {!loading && (
          <button
            id="payment-app-cancel"
            className={styles.buttonDanger}
            onClick={this.cancelTransaction}>
            Cancelar
          </button>
        )}
      </div>
    )
  }
}

export default ExampleTransactionAuthApp

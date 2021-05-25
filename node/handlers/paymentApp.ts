import { json } from 'co-body'
import axios from 'axios'
import { PaymentProviderContext } from '@vtex/payment-provider'

export async function inboundRequest(ctx: PaymentProviderContext) {
  const body: {
    inboundRequestsUrl: string
  } = await json(ctx.req)

  const inboundAPI = axios.create({
    baseURL: body.inboundRequestsUrl.split('/:')[0],
    timeout: 5000,
    headers: {
      'Proxy-Authorization': ctx.vtex.authToken,
    },
  })

  const request = {
    text:"Funcionou"
  }

  const response = await inboundAPI.post(
    "/teste",
    request
  )

  ctx.status = 200
  ctx.body =  response.data
}

export async function cancelPayment(ctx: PaymentProviderContext) {
  const body: {
    callbackUrl: string,
    paymentId: string,
    status: string
  } = await json(ctx.req)

  const inboundAPI = axios.create({
    baseURL: body.callbackUrl,
    timeout: 5000,
    headers: {
      'Proxy-Authorization': ctx.vtex.authToken,
    },
  })

  const request = {
    paymentId: body.paymentId,
    status: body.status
  }

  const response = await inboundAPI.post(
    "/",
    request
  )

  ctx.status = 200
  ctx.body =  response.data
}


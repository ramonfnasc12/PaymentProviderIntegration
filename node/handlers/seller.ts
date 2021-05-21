import { json } from 'co-body'
import axios from 'axios'
//  import { PaymentProviderContext } from '@vtex/payment-provider'


export async function shelfSimulation(ctx: any) {
  const body: {
    skuID: string
    endpoint: string
    isVTEXer: boolean
    wantDebugHeader: boolean
  } = await json(ctx.req)

  const shelfSimulationAPI = axios.create({
    baseURL: body.endpoint,
    timeout: 5000,
    headers: {
      'Proxy-Authorization': ctx.vtex.authToken,
      Accept: `${
        body.isVTEXer
          ? body.wantDebugHeader
            ? 'application/vnd.vtex.checkout.debug.v1+json'
            : ''
          : ''
      }`,
      VtexIdclientAutCookie: ctx.vtex.authToken,
    },
  })

  const request = {
    items: [
      {
        id: body.skuID,
        quantity: 1,
        seller: '1',
      },
    ],
  }

  const response = await shelfSimulationAPI.post(
    `/pvt/orderForms/simulation?sc=${ctx.query.sc || 1}`,
    request
  )

  ctx.status = 200

  ctx.body = {
    request,
    response: response.data,
  }
}

export async function cartSimulation(ctx: any) {
  const body: {
    skuID: string
    endpoint: string
    zipCode: string
    isVTEXer: boolean
    wantDebugHeader: boolean
  } = await json(ctx.req)

  const cartSimulationAPI = axios.create({
    baseURL: body.endpoint,
    timeout: 5000,
    headers: {
      'Proxy-Authorization': ctx.vtex.authToken,
      Accept: `${
        body.isVTEXer
          ? body.wantDebugHeader
            ? 'application/vnd.vtex.checkout.debug.v1+json'
            : ''
          : ''
      }`,
      VtexIdclientAutCookie: ctx.vtex.authToken,
    },
  })

  const postalCodeAPI = axios.create({
    baseURL: `http://${ctx.vtex.account}.myvtex.com/api/checkout/pub/postal-code/BRA`,
    timeout: 5000,
    headers: {
      'Proxy-Authorization': ctx.vtex.authToken,
    },
  })

  const {
    data: { geoCoordinates },
  } = await postalCodeAPI.get(`/${body.zipCode}`)

  const request = {
    items: [
      {
        id: body.skuID,
        quantity: 1,
        seller: '1',
      },
    ],
    postalCode: body.zipCode,
    country: 'BRA',
    priceTables: [],
    marketingData: null,
    selectedSla: null,
    clientProfileData: null,
    shippingData: {
      state: null,
      city: null,
      neighborhood: null,
      street: null,
      isFOB: false,
      selectedAddresses: [
        {
          addressType: null,
          receiverName: null,
          addressId: null,
          postalCode: body.zipCode,
          city: null,
          state: null,
          country: 'BRA',
          street: null,
          number: null,
          neighborhood: null,
          complement: null,
          reference: null,
          geoCoordinates,
        },
      ],
      logisticsInfo: [],
    },
    paymentData: null,
    geoCoordinates,
    isCheckedIn: false,
    storeId: null,
    checkedInPickupPointId: null,
    orderFormId: null,
  }

  const response = await cartSimulationAPI.post(
    `/pvt/orderForms/simulation?sc=${ctx.query.sc || 1}`,
    request
  )

  ctx.status = 200
  ctx.body = {
    request,
    response: response.data,
  }
}

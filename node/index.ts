import {
  //  ClientsConfig,
  method,
} from '@vtex/payment-provider/node_modules/@vtex/api'

import { PaymentProviderService } from '@vtex/payment-provider'

import { inboundRequest, cancelPayment } from './handlers/seller'
//  import router from './routes'
import TestSuiteApprover from './connector'

export default new PaymentProviderService({
  connector: TestSuiteApprover,
  routes: {
    paymentApp: method({
      POST: [inboundRequest],
    }),
    cancelPayment: method({
      POST: [cancelPayment],
    }),
  },
})

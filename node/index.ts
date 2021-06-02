import {
  //  ClientsConfig,
  method,
} from '@vtex/api'

import { PaymentProviderService } from '@vtex/payment-provider'

import { inboundRequest, cancelPayment } from './handlers/paymentApp'
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

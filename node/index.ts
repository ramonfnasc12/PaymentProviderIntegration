import {
  //  ClientsConfig,
  method,
} from '@vtex/api'
import { PaymentProviderService } from '@vtex/payment-provider'

import { shelfSimulation } from './handlers/seller'
//  import router from './routes'
import TestSuiteApprover from './connector'

export default new PaymentProviderService({
  connector: TestSuiteApprover,
  routes: {
    paymentApp: method({
      POST: [shelfSimulation],
    }),
  },
})

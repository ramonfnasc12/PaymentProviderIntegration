import {
  ClientsConfig,
  method,
  ServiceContext
} from '@vtex/api'
import { PaymentProviderService } from '@vtex/payment-provider'

import { inboundRequest, changeStatus } from './handlers/paymentApp'
//  import router from './routes'
import TestSuiteApprover from './connector'
import { Clients
 } from './clients'
const TIMEOUT_MS = 15000

const clients: ClientsConfig<Clients> = {
  // We pass our custom implementation of the clients bag, containing the Status client.
  implementation: Clients,
  options: {
    // All IO Clients will be initialized with these options, unless otherwise specified.
    default: {
      retries: 4,
      timeout: TIMEOUT_MS,
    },
  },
}

declare global {
  // We declare a global Context type just to avoid re-writing ServiceContext<Clients, State> in every handler and resolver
  type Context = ServiceContext<Clients>
}

export default new PaymentProviderService({
  clients,
  connector: TestSuiteApprover,
  routes: {
    paymentApp: method({
      POST: [inboundRequest],
    }),
    changeStatus: method({
      POST: [changeStatus],
    }),
  },
})

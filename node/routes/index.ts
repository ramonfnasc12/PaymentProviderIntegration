import { method, ServiceConfig } from '@vtex/api'

import { shelfSimulation } from '../handlers/seller'

const router: ServiceConfig = {
  routes: {
    paymentApp: method({
      POST: [shelfSimulation],
    }),
  },
}

export default router

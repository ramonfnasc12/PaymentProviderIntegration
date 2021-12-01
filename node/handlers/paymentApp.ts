import { json } from 'co-body'

export async function inboundRequest(ctx: Context) {
  const body: {
    inboundRequestsUrl: string
  } = await json(ctx.req)
  
  const request = {
    text:"Funcionou"
  }
  const response = await ctx.clients.external.sendPost(
    `${body.inboundRequestsUrl.split('/:')[0]}/teste`,
    request
  )

  ctx.status = 200
  ctx.body =  response
}

export async function changeStatus(ctx: Context) {
  const body: {
    callbackUrl: string,
    paymentId: string,
    status: string
  } = await json(ctx.req)
  
  const request = {
    paymentId: body.paymentId,
    status: body.status
  }

  const updated = await ctx.clients.paymentIdRepository.saveOrUpdate({
    id: body.paymentId,
    status: body.status,
    paymentId: body.paymentId
  })
  if(updated){
    const response = await ctx.clients.external.sendPost(
      body.callbackUrl,
      request
    )
  
    ctx.status = 200
    ctx.body =  response
  }
  
  else {
    ctx.status = 400
    ctx.body =  {"message": "Error"}
  }
}


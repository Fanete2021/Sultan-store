export const productionURL: string = '/Sultan-store'

export const catalogPageURL: string = '/catalog'
export const cartPageURL: string = '/cart'

export const baseUrl: string = process.env.NODE_ENV === 'production' ? productionURL : ''

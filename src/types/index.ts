import { Order, OrderProducts, Product } from "@prisma/client"
export type orderT=Pick<Product, 'id' | 'name' | 'price'>&{
    quantity: number
    subtotal: number
}


export type orderAdminT= Order&{
    orderProducts: (OrderProducts & {
        product: Product
    })[]
}
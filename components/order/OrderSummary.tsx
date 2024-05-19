"use client"
import { useStore } from "@/src/store"
import ProductDetails from "./ProductDetails"
import { useMemo } from "react"
import { formatCurrency } from "@/src/helpers"
import { createOrder } from "@/actions/create-order-action"
import { OrderSchema } from "@/src/schema"
import  {toast} from 'react-toastify'

export default function OrderSummary() {
  const order = useStore((state)=>state.order)
  const clearOrder = useStore((state)=>state.clearOrder)
  const total = useMemo(()=>order.reduce((total, item)=>total+(item.quantity*item.price),0),[order])

  const handleCreateOrder = async (formData: FormData)=>{
    const data ={
      name: formData.get('name'),
      total,
      order
    }

    // VALIDACION EN CLIENTE
    const result = OrderSchema.safeParse(data)
    
    if(!result.success){
      result.error.issues.forEach((issue)=>{
        toast.error(issue.message)
      })
      return
    }
    
   //VALIDACION DE SERVIDOR
    const response = await createOrder(data)
    if(response?.errores){
      response.errores.forEach((issue)=>{
        toast.error(issue.message)
      })
      return
    }
    
    toast.success('Orden creada con exito')
    clearOrder()
  }

  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
        <h1 className="text-4xl text-center font-black">Mi pedido</h1>
        {order.length===0?<p className="text-center my-10">El pedido esta basio</p>:(
          <div className="mt-5">
            {order.map(order=>(
              <ProductDetails
              key={order.id}
              product={order}/>
            ))}
            <p className="text-2xl mt-20 text-center">
              Total a pagar
              <span className="font-bold">
                {formatCurrency(total)}
              </span>
            </p>
            <form
            className="w-full mt-10 space-y-5"
            action={handleCreateOrder}
            >
              <input type="text"
              placeholder="Tu nombre"
              className="bg-white border border-x-gray-100 p-2 w-full"
              name="name"
              />
              <input type="submit"
              className="py-2 rounded uppercase text-white bg-black w-full text-center 
              cursor-pointer font-bold"
              value={'Confirmar Pedido'}
              />
            </form>
          </div>
        )}
    </aside>
  )
}


"use server"

import { revalidatePath } from "next/cache";
import { prisma } from "@/src/lib/prisma";

export async function completeOrder(formData: FormData){
    try {
        await prisma.order.update({
            where:{
                id: +formData.get('order_id')!
            },
            data:{
                status:true,
                orderReadyAt: new Date()
            }
        })
        revalidatePath('/admin/orders')
    } catch (error) {
        console.log(error);
        
    }
}

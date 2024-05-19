import ProductForm from "@/components/product/ProductForm"
import UpdateProductForm from "@/components/product/UpdateProductForm"
import GoBackButton from "@/components/UI/GoBackButton"
import Heading from "@/components/UI/Heading"
import { prisma } from "@/src/lib/prisma"
import { notFound } from "next/navigation"

async function getProductById(id: number) {
    const product= await prisma.product.findUnique({
    where:{
        id: id
    }})
    if(!product)notFound()
    return product
}

export default async function page({params}:{params:{id: string}}) {

  const product = await getProductById(+params.id)
    
  return (
    <>
    
    <Heading>Actualizar producto: <span className="font-bold uppercase">{product.name}</span></Heading>
    <GoBackButton/>
    <UpdateProductForm
    >
      <ProductForm
      product={product}/>
    </UpdateProductForm>
    </>
  )
}

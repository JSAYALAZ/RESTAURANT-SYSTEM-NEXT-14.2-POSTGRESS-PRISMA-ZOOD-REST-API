
import ProductMain from "@/components/product/ProductMain";
import Heading from "@/components/UI/Heading";
import { prisma } from "@/src/lib/prisma";


async function getProductsByCategory(category: string){
  const products = await prisma.product.findMany({
    where:{
      category: {
        slug: category
      }
    }
  })
  return products
}


export default async function OrderPage({params}:{params:{category: string}}) {
  const products= await getProductsByCategory(params.category)

  return (
    <>
    <Heading>
      Elige el producto que desees
      </Heading>
    <main className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-5 gap-4 items-start">
      {products.map(product=>(
        <ProductMain
        key={product.id}
        product={product}
        />
      ))}
    </main>
    </>
  )
}

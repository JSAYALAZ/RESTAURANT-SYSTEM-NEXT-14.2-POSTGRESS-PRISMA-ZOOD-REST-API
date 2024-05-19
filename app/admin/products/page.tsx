
import ProductsPagination from "@/components/product/ProductsPagination";
import ProductTable from "@/components/product/ProductTable";
import SearchProduct from "@/components/product/SearchProduct";
import Heading from "@/components/UI/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

async function productCount(){
  const cant = await prisma.product.count()
  return cant
}
async function getProducts(page:number, size:number) {
  const products = await prisma.product.findMany({
    take:size,
    skip:(page==1||!page?0:((page-1)*10)),

    include: {
      category: true,
    },
  });
  return products;
}



export type productsWithCategoryT = Awaited<ReturnType<typeof getProducts>>;

export default async function productsPage({searchParams}:{searchParams:{page:number,size?: number}}) {
  const size = searchParams.size!=null?+searchParams.size:10
  const page = +searchParams.page||1

  if(page<0)redirect('/admin/products')

  const productsData = getProducts(searchParams.page,size);
  const cantProductsData = productCount()
  const [products, cantProducts] = await Promise.all([productsData,cantProductsData])
  const totalPages = Math.ceil(cantProducts/size)

  if(page>totalPages)redirect('/admin/products')

  return (
    <>
      <Heading>Administrar Productos</Heading>
      <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
        <Link 
        href={'/admin/products/new'}
        className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center 
        font-bold cursor-pointer">
        Crear producto</Link>
        <SearchProduct/>
      </div>

      <ProductTable products={products} />
      
        
      <ProductsPagination
      actualPage={page}
      totalPages ={totalPages}
      />
      
    </>
  )
}

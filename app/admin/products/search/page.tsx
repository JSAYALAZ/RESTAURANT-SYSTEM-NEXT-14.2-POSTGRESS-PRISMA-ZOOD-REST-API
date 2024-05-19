import ProductTable from "@/components/product/ProductTable";
import SearchProduct from "@/components/product/SearchProduct";
import Heading from "@/components/UI/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";

type paramsT = {
  searchParams: {
    search: string;
  };
};

async function searchByParams(param: string) {
  const products = await prisma.product.findMany({
    where: {
      name: {
        mode: "insensitive",
        contains: param,
      },
    },
    include: {
      category: true,
    },
  });

  if (!products.length) return null;

  return products;
}

export default async function SearchPage({ searchParams }: paramsT) {
  const products = await searchByParams(searchParams.search);

  return (
    <>
      <Heading>Resultado de busqueda</Heading>
      <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
        <SearchProduct />
      </div>
      {products?.length ? (
        <>
          <ProductTable products={products} />
        </>
      ) : (
        <div
          className="flex justify-center text-2xl uppercase  font-bold h-4/6
         items-center"
        >
          No hay resultados de tu busqueda
        </div>
      )}
    </>
  );
}

import { formatCurrency, getImagePath } from "@/src/helpers";
import { Product } from "@prisma/client";
import Image from "next/image";
import AddProductButton from "./AddProductButton";

type propsT = {
  product: Product;
};
export default function ProductMain({ product }: propsT) {

  const imagePath = getImagePath(product.image)

  return (
    <div className="border bg-white">
      <Image
        width={400}
        height={500}
        src={imagePath}
        alt="Imagen producto"
        quality={75}
      />

      <div className="p-5">
        <h3 className="text-2xl font-bold ">{product.name}</h3>
        <p className="mt-5 text-amber-500 font-black text-4xl">
          {formatCurrency(product.price)}
        </p>
        <AddProductButton
        product={product}
        />
      </div>
    </div>
  );
}

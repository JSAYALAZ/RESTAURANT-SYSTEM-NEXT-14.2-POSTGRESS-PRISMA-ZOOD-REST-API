"use client";
import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

type propsT = {
  category: Category;
};

export default function CategoryIcon({ category }: propsT) {
  const params = useParams<{ category: string }>();

  return (
    <Link href={`/order/${category.slug}`}>
      <div
        className={`${
          category.slug === params.category ? "bg-amber-400" : ""
        } flex items-center gap-4 w-full border-b border-gray-200 
                p-3 last-of-type:border-none hover:bg-amber-200`}
      >
        <div className="w-16 h-16 relative">
          <Image
            src={`/icon_${category.slug}.svg`}
            alt="Imagen categorias"
            fill
          />
        </div>
        <p className="text-xl font-bold">{category.name}</p>
      </div>
    </Link>
  );
}

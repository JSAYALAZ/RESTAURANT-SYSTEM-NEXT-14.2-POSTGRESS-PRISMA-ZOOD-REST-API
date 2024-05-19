import AddProductForm from '@/components/product/AddProductForm'
import ProductForm from '@/components/product/ProductForm'
import GoBackButton from '@/components/UI/GoBackButton'
import Heading from '@/components/UI/Heading'
import React from 'react'

export default function CreateProductPage() {
  return (
    <>
    <Heading>Nuevo producto</Heading>
    <GoBackButton/>
    <AddProductForm>
      <ProductForm/>
    </AddProductForm>
    </>
  )
}

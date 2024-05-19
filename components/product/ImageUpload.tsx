"use client"

import { getImagePath } from '@/src/helpers'
import {CldUploadWidget} from 'next-cloudinary'
import Image from 'next/image'
import { useState } from 'react'
import {TbPhotoPlus} from 'react-icons/tb'

type propsT={
    image?:string
}

export default function ImageUpload({image}:propsT) {

    const [imageUrl, setImageUrl] = useState('')


  return (
    <CldUploadWidget
    onSuccess={(result, {widget})=>{
        if(result.event== 'success') {
            widget.close()

            //@ts-ignore
            setImageUrl(result.info.secure_url)
        }
        
    }}
    uploadPreset='uiff5h5a'
    options={{
        maxFiles: 1
    }}
    >
        {({open})=>(
        <>
            <div className='space-y-2'>
                <label 
                className='text-slate-800'
                >Imagen producto</label>
                <div 
                className='relative cursor-pointer hover:opacity-70 
                transition p-10 border-neutral-300 flex flex-col justify-center gap-4 text-neutral-600 bg-slate-100 items-center'
                onClick={()=>open()}
                >
                <TbPhotoPlus
                size={50}
                />
                <p
                className='text-lg font-semibold'
                >Agregar imagen</p>
                {imageUrl&&(
                    <div
                    className='absolute inset-0 w-full h-full'
                    >
                        <Image
                        fill
                        style={{objectFit:'contain'}}
                        src={imageUrl}
                        alt='Imagen de producto'/>
                    </div>
                )}
                </div>
            </div>
            {(image&&imageUrl=='')&&(
                    <div className='space-y-2'>
                        <label>Imagen actual</label>
                        <div className='relative w-64 h-64'>

                        <Image
                        fill
                        src={getImagePath(image)}
                        alt='Imagen de producto'/>
                        </div>
                    </div>
                )}
            <input 
            type="hidden" 
            name="image" 
            value={imageUrl?imageUrl:image} />

        </>)}
        
    </CldUploadWidget>
    
  )
}

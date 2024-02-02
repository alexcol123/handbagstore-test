'use client'

import { updateLocale } from 'moment'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { MdDelete } from 'react-icons/md'

const MyDropZone = ({ setimagesArr, isProductCreated }) => {
  const [files, setFiles] = useState([])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles) => {

      // console.log(acceptedFiles)
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      )
    },
  })

  useEffect(() => {
    if (files.length > 0) setimagesArr(files)
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview))
  }, [files, setimagesArr])

  useEffect(() => {
    if (isProductCreated) {
      setFiles([])
    }
  }, [isProductCreated])

  return (
    <section className='container'>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div
          className=' flex items-center justify-center text-xs  lg:text-sm border s border-dashed border-primary rounded-box w-[70%]  lg:w-[55%] h-16 md:h-20 mx-auto py-2 px-4 mt-4  bg-base-300 pt-3'
          {...getRootProps()}
        >
          {isDragActive ? (
            <div className='font-bold'>
              <p>Drop Files Here</p>
            </div>
          ) : (
            <div className=''>
              <p>Drag and drop files here, or click to select </p>
            </div>
          )}
        </div>
      </div>
      {files?.length > 0 && (
        <div className='grid grid-cols-4 gap-2 mt-4  p-2 rounded-box  '>
          {files.map((file, i) => {
            return (
              <div
                className='relative h-20 w-20 z-0 cursor-pointer group'
                key={i}
              >
                <Image
                  className=' rounded-box shadow-lg h-20 w-20  z-5 mx-auto object-cover '
                  fill
                  alt='product'
                  src={file.preview}
                  onLoad={() => {
                    URL.revokeObjectURL(file.preview)
                  }}
                />
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default MyDropZone

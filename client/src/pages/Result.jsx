import React from 'react'
import { useState } from 'react'
import { assets } from '../assets/assets'

const Result = () => {
  const[image,setimage] = useState(assets.sample_img_2)
  const[isImageLoaded,setisImageLoaded] = useState(false)
  const[loading ,seloading] = useState(false)
  const[input,setinput]= useState()

  const onSubmitHandler = async(e) => {
    e.preventDefault();
    setloading(true)


  }


  return (
    <div>
      Result test
      </div>
  )
}

export default Result
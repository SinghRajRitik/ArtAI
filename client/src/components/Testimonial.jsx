import React from 'react'
import { testimonialsData } from '../assets/assets'

const Testimonial = () => {
  return (
    <div>
        <h1>
          User Review
        </h1>
        <p>What our customers say</p>
        <div>
            {testimonialsData.map((testimonial,index)=>(
                <div key={index}>
                    <div>
                        <img src={testimonial.image} alt="" />
                    </div>

                </div>
            ))}
        </div>
    </div>
  )
}

export default Testimonial
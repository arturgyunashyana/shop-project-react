import { useState } from 'react'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"
import { sliderData } from "./slider-data"
import "./slider.scss"

const Slider = () => {

    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderLength = sliderData.length;

    const nextSlide = () => {
        setCurrentSlide(currentSlide === sliderLength -1 ? 0 : currentSlide + 1);
    }

    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? sliderLength -1 : currentSlide -1);
    }

    return (
        <div className='slider'>
            <AiOutlineArrowLeft
                className='arrow-prev'
                onClick={prevSlide}
            />
            <AiOutlineArrowRight
                className='arrow-next'
                onClick={nextSlide}
            />
            {
                sliderData.map((elm, index) => {
                    const { image, heading, description } = elm
                    console.log(image);
                    return (
                        <div
                            key={index}
                            className={index === currentSlide ?
                                "slide current" : "slide"}
                        >
                            {
                                index === currentSlide && (
                                    <>
                                        <img
                                            src={image}
                                            alt="image"
                                        />
                                        <div className='content'>
                                            <h2>{heading}</h2>
                                            <p>{description}</p>
                                            <hr />
                                            <a
                                                href="#product"
                                                className='slide-btn'
                                            >
                                                Shop Now
                                            </a>
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Slider
import { useEffect, useState } from "react";
import { loginCarouselImages } from "../data/danceImgs.js";

export default function LoginCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const infiniteScroll = () => {
        if (currentIndex === loginCarouselImages.length - 1) {
            return setCurrentIndex(0)
        }
        return setCurrentIndex(currentIndex + 1)
    }

    useEffect(() => {
        const interval = setInterval(() => { infiniteScroll() }, 4000)
        return () => clearInterval(interval)
    })

    return (
        <div className="lg:flex h-svh flex-nowrap lg:w-2/5 lg:flex-shrink-0 overflow-hidden hidden">
            {loginCarouselImages.map((content, index) => {
                return <img src={content.img} alt={content.name} key={index} className="object-cover h-full w-full flex items-center justify-center transition" style={{ transform: `translate(-${currentIndex * 100}%)` }} />
            })}
        </div>

    )
}
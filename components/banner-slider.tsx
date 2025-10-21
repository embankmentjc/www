import React, { useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectFade, Navigation } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import css from './banner-slider.module.css'

export type Btn = { href: string, text: string }

export interface BannerSlideData {
    img: string
    alt: string
    title: string
    subtitle: string
    btns: Btn[]
}

interface BannerSlideProps extends BannerSlideData {
    onSlideClick: () => void
}

function BannerSlide({ img, alt, title, subtitle, btns, onSlideClick }: BannerSlideProps) {
    return (
        <div className={css.slide} style={{ backgroundImage: `url(${img})` }} onClick={onSlideClick}>
            <div className={css.overlay} />
            <div className={css.content}>
                <div className={css.container}>
                    <h1 className={css.title}>{title}</h1>
                    <h4 className={css.subtitle}>{subtitle}</h4>
                    <div className={css.buttons}>
                        {btns.map((btn, key) => (
                            <a key={key} href={btn.href} className={`btn btn-primary btn-lg btn-anis-effect ${css.btn}`} onClick={(e) => e.stopPropagation()}>
                                <span className="btn-text">{btn.text}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

interface BannerSliderProps {
    slides: BannerSlideData[]
}

export default function BannerSlider({ slides }: BannerSliderProps) {
    const [isPaused, setIsPaused] = useState(false)
    const swiperRef = useRef<SwiperType | null>(null)

    const toggleAutoplay = () => {
        if (swiperRef.current?.autoplay) {
            if (isPaused) {
                console.log('Carousel: resuming autoplay')
                swiperRef.current.autoplay.start()
            } else {
                console.log('Carousel: pausing autoplay')
                swiperRef.current.autoplay.stop()
            }
            setIsPaused(!isPaused)
        }
    }

    return (
        <div className={css.sliderWrapper}>
            <Swiper
                modules={[Autoplay, Pagination, EffectFade, Navigation]}
                effect="fade"
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                loop={true}
                className={css.swiper}
                onSwiper={(swiper: SwiperType) => {
                    swiperRef.current = swiper
                }}
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <BannerSlide {...slide} onSlideClick={toggleAutoplay} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

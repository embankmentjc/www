import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectFade, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import css from './banner-slider.module.css'

export type Btn = { href: string, text: string }

interface BannerSlideProps {
    img: string
    alt: string
    title: string
    subtitle: string
    btns: Btn[]
}

function BannerSlide({ img, alt, title, subtitle, btns }: BannerSlideProps) {
    return (
        <div className={css.slide} style={{ backgroundImage: `url(${img})` }}>
            <div className={css.overlay} />
            <div className={css.content}>
                <div className={css.container}>
                    <h1 className={css.title}>{title}</h1>
                    <h4 className={css.subtitle}>{subtitle}</h4>
                    <div className={css.buttons}>
                        {btns.map((btn, key) => (
                            <a key={key} href={btn.href} className={`btn btn-primary btn-lg btn-anis-effect ${css.btn}`}>
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
    slides: BannerSlideProps[]
}

export default function BannerSlider({ slides }: BannerSliderProps) {
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
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <BannerSlide {...slide} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

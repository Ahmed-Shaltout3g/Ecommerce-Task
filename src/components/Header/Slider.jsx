import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useLanguageDirection } from '../../hooks/Language';
import avatar from '../../assets/Avatar.png';
import h1 from '../../assets/h1.webp';
import h2 from '../../assets/h2.png';
import h3 from '../../assets/h3.webp';
import h4 from '../../assets/h4.webp';
import style from "./Slider.module.css";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';  // Ensure you import navigation styles
import '../../../node_modules/swiper/swiper-bundle';
import { useTranslation } from 'react-i18next';

export default function Slider() {
    const { userData } = useLanguageDirection();
    const { t, i18n } = useTranslation();

    // Use useMemo to trigger re-render of Swiper on language change
    const swiperKey = useMemo(() => `swiper-${i18n.language}`, [i18n.language]);

    return (
        <header className="my-5 mx-auto">
            <div className="container">
                <div className="row gy-3">
                    <div className="col-lg-10 col-md-12">
                        {/* Swiper Carousel */}
                        <Swiper
                            key={swiperKey} // This ensures Swiper resets and re-renders on language change
                            spaceBetween={50}
                            slidesPerView={1}
                            loop={true}
                            autoplay={{ delay: 3000 }}
                            navigation
                            pagination={{ clickable: true }}
                        >
                            <SwiperSlide>
                                <img src={h1} className="d-block w-100" alt="..." />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src={h2} className="d-block w-100" alt="..." />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src={h3} className="d-block w-100" alt="..." />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src={h4} className="d-block w-100" alt="..." />
                            </SwiperSlide>
                        </Swiper>
                    </div>

                    <div className={`${style.leftdiv} col-lg-2 col-md-12`}>
                        <div className={style.login}>
                            <div className="d-flex">
                                <div className="d-flex text-success align-items-center me-2">
                                    <img className="w-100" src={avatar} alt="" />
                                </div>
                                <p className="h6">
                                    {t('greeting')} {userData?.name}
                                </p>
                            </div>
                            {userData == null ? (
                                <div>
                                    <Link to="register">
                                        <button className="btn mt-3 w-100 py-1 btn-primary">
                                            {t('joinNow')}
                                        </button>
                                    </Link>
                                    <Link to="login">
                                        <button className="btn text-primary mt-3 w-100 py-1 btn-light">
                                            {t('login')}
                                        </button>
                                    </Link>
                                </div>
                            ) : (
                                ''
                            )}
                        </div>

                        <div className={`${style.getReady} ${style.bgcolor}`}>
                            <p className="h6">
                                {t('getReadyMessage')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

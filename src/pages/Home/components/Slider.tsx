import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const Slider = () => {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      loop={true}
    >
      <SwiperSlide>
        <img src="img/بنر الاول.png" alt="صورة 1" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="img/بنر 2.png" alt="صورة 2" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="img/SLID Q.jpg" alt="صورة 3" />
      </SwiperSlide>
    </Swiper>
  );
};

export default Slider;
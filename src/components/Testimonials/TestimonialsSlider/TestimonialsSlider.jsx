import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import cl from './testimonialsSlider.module.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import reviews from '../../../data/reviews.json';

const Testimonials = () => {
  return (
    <div className={cl.testimonials_wrapper}>
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        pagination={{
          el: `.${cl.paginationContainer}`,
          clickable: true,
          dynamicBullets: true,
          bulletClass: cl.paginationBullet,
          bulletActiveClass: cl.paginationBulletActive,
        }}
        // pagination={{
        //   el: `.${cl.paginationContainer}`,
        //   clickable: true,
        //   dynamicBullets: true,
        // }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Pagination, Autoplay]}
        className={cl.swiperWrapper}
      >
        {reviews.map((item, idx) => (
          <SwiperSlide key={idx}>
            <div className={cl.swiperSlide}>
              <p className={cl.testimonials_text}>{item.review}</p>
              <h4 className={cl.testimonials_name}>{item.name}</h4>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={cl.paginationContainer} />
    </div>
  );
};

export default Testimonials;

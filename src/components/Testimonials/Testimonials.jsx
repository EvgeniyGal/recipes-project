import MainTitle from '../ui/MainTitle';
import Subtitle from '../ui/Subtitle/Subtitle';
import TestimonialsSlider from './TestimonialsSlider';
import { BiSolidQuoteLeft } from 'react-icons/bi';
import cl from './testimonials.module.scss';
import { motion } from 'framer-motion';

const Testimonials = () => {
  return (
    <section id="testimonials" className={cl.section}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className={cl.testimonials_wrapper}>
          <div className={cl.testimonials_title_wrapper}>
            <Subtitle>What our customer say</Subtitle>
            <MainTitle>Testimonials</MainTitle>
          </div>
          <motion.div
            key="quotes"
            initial={{ x: 1000, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 1000, opacity: 0 }}
            transition={{ duration: 1, type: 'spring', stiffness: 120 }}
            className={cl.quotes_wrapper}
          >
            <BiSolidQuoteLeft className={cl.quotes} />
          </motion.div>
          <TestimonialsSlider />
        </div>
      </motion.div>
    </section>
  );
};

export default Testimonials;

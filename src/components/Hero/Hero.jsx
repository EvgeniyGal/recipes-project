import { Link, useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import cl from './hero.module.scss';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Modal from '../ui/Modal';

const Hero = () => {
  const modalType = 'SignInModal';
  const navigate = useNavigate();
  const isLoggedIn = useSelector(state => state.authSlice.isLoggedIn);
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleAddRecipeBtn = () => {
    if (!isLoggedIn) {
      setShowModal(true);
      return;
    }
    navigate('recipe/add');
  };
  return (
    <>
      {showModal && <Modal onClose={toggleModal} type={modalType} />}
      <section className={cl.section}>
        <h1 className={cl.title}>
          Improve Your
          <br />
          Culinary Talents
        </h1>
        <p className={cl.desc}>
          Amazing recipes for beginners in the world of cooking, enveloping you
          in the aromas and tastes of various cuisines.
        </p>
        {/* <Link to=""> */}
        <Button onClick={handleAddRecipeBtn} addClass={cl.button}>
          Add Recipe
        </Button>
        {/* </Link> */}
        <div className={cl.imgContainer}>
          <picture>
            <source
              media="(max-width: 768px)"
              srcSet="/images/hero/desert@1x.jpg"
            />
            <source
              media="(min-width: 769px)"
              srcSet="/images/hero/desert@2x.jpg"
            />
            <img
              className={cl.firstImg}
              src="/images/hero/desert.jpg"
              alt="desert"
            />
          </picture>
          <picture>
            <source
              media="(max-width: 768px)"
              srcSet="/images/hero/meat-and-vine@1x.jpg"
            />
            <source
              media="(min-width: 769px)"
              srcSet="/images/hero/meat-and-vine@2x.jpg"
            />
            <img
              className={cl.lastImg}
              src="/images/hero/meat-and-vine.jpg"
              alt="meat and bottle of vine"
            />
          </picture>
        </div>
      </section>
    </>
  );
};

export default Hero;

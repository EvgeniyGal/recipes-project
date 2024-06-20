import { Outlet } from 'react-router-dom';
import Hero from '../../components/Hero';
import Testimonials from '../../components/Testimonials';
import { Suspense } from 'react';
import Container from '../../components/ui/Container';
import cl from './homePage.module.scss';

export default function HomePage() {
  return (
    <>
      <Hero />

      <section id="categories" className={cl.section}>
        <Container>
          <Suspense fallback={<p>Categories data are loading...</p>}>
            <Outlet />
          </Suspense>
        </Container>
      </section>
      <Testimonials />
    </>
  );
}

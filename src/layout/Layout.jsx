import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Container from '../components/ui/Container';

export default function Layout() {
  return (
    <>
      <Header />
      <Suspense fallback={<Container>Loading main content...</Container>}>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  );
}

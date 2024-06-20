import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import Container from '../../components/ui/Container';
import ButtonLink from '../../components/ui/ButtonLink';
import image404 from '../../assets/icons/foodies404.svg';
import cl from './notFoundPage.module.scss';

export default function NotFoundPage() {
  return (
    <div className={cl.wrapper}>
      <svg className={cl.foodies404} width={320} height={320}>
        <use href={`${image404}#foodies404`}></use>
      </svg>
      <ButtonLink addClass={cl.to_home} to={'/'}>
        Back to Home
      </ButtonLink>
    </div>
  );
}

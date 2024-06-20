import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Categories from './components/Categories';
import Recipes from './components/Recipes';
import HomePage from './pages/HomePage';

export default function App() {
  const RecipePage = lazy(() => import('./pages/RecipePage'));
  const UserPage = lazy(() => import('./pages/UserPage'));
  const AddRecipePage = lazy(() => import('./pages/AddRecipePage'));
  const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

  return (
    <>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />}>
              <Route index element={<Categories />} />
              <Route path="categories/:name" element={<Recipes />} />
            </Route>
            <Route path="/recipe/:recipeId" element={<RecipePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Route>

        <Route element={<PrivateRoute redirectTo="/" />}>
          <Route path="/" element={<Layout />}>
            <Route path="user/:userId" element={<UserPage />} />
            <Route path="recipe/add" element={<AddRecipePage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="dark"
      />
    </>
  );
}

import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Loader from './components/Loader/Loader';

import 'modern-normalize';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const CatalogPage = lazy(() => import('./pages/CatalogPage/CatalogPage'));

function App() {
  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;

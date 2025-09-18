import * as Sentry from '@sentry/react';
import { Route, Routes } from 'react-router-dom';
import ScrollToTop from './hooks/scrollToTop';
import use3DTilt from './hooks/use3DTilt';
import useLenis from './hooks/useLenis';
import HomePage from './pages/HomePage';

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
const App = () => {
  use3DTilt();
  useLenis();
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
      </Routes>
    </>
  );
};

export default Sentry.withProfiler(App);

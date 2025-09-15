import { Route, Routes } from 'react-router-dom';
import use3DTilt from './hooks/use3DTilt';
import useLenis from './hooks/useLenis';
import HomePage from './pages/HomePage';

const App = () => {
  use3DTilt();
  useLenis();
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
    </Routes>
  );
};

export default App;

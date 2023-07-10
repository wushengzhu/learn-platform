import { Outlet } from 'react-router-dom';
import Bottom from './components/Bottom';
import Header from './components/Header';

const App = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Bottom />
    </div>
  );
};

export default App;

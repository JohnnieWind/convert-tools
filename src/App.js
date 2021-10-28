import './App.less';
import HomeLayout from '@components/HomeLayout'
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <HomeLayout />
    </BrowserRouter>
  );
}

export default App;

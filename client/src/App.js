import logo from './logo.svg';
import './App.css';
import Signin from "./components/Signin"
import { Provider } from 'react-redux'
import store from './Store';
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Signin />
      </div>

    </Provider>
    
  );
}

export default App;

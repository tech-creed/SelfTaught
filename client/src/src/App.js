import logo from './logo.svg';
import './App.css';
import Signin from "./Components/Signin"
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Verification from "./Components/Verification"
import store from './Store';
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          
          <Route exact path="/signin">
           
            <Signin />
          </Route>

          <Route exact path="/verification">
            <Verification/>
            
          </Route>
        </Switch>
      </Router>
      
    </Provider>
    
  );
}

export default App;

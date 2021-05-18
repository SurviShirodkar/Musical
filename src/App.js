import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Dashboard from './Components/Dashboard/Dashboard';
import Login from './Components/Login/Login';

function App() {
  return (
    <BrowserRouter>
    <div className="App">

      <Switch>
      <Route path="/dashboard" component={Dashboard}/>
      <Route path="/login" component={Login}/>
      <Route path="/" component={Login}/>
    </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;

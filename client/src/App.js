import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Detail from './components/Detail';
import NewRecipe from './components/NewRecipe';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/home/:idReceta" component={Detail} />
          <Route path="/recipe" component={NewRecipe} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

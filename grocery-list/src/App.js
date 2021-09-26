import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {auth, user} from './firebase';

import {GroceryPage} from './pages/grocery'
import {LoginPage} from './pages/login';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/login'>
          <LoginPage />
        </Route>
        <Route path='/'>
          <GroceryPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

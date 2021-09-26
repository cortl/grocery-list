import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import {GroceryPage} from './pages/grocery'
import {LoginPage} from './pages/login';
import {SettingsPage} from './pages/settings';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/login'>
          <LoginPage />
        </Route>
        <Route path='/settings'>
          <SettingsPage />
        </Route>
        <Route path='/'>
          <GroceryPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

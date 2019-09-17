import React from 'react';
import {
  BrowserRouter as Router, Route, Switch
} from 'react-router-dom';

function NavBar() {
}

const Home = React.lazy(() => import('../home/index'));

export default function Authenticated(props) {
  return (
    <div>
      <a href="/logout">Logout</a>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

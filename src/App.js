import React, { useEffect, Suspense } from 'react';
import { connect } from 'react-redux'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import Spinner from './components/UI/Spinner/Spinner';
import * as actions from './store/actions'

const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout');
})

const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders');
})

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
})

const App = props => {
  const {onTryAutoSignup} = props;

  useEffect(() => {
    onTryAutoSignup()
  },[onTryAutoSignup])

  let routes = (
    <Switch>
      <Route path='/' exact component={BurgerBuilder} />
      <Route path='/auth' render={() => <Auth/>} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path='/' exact component={BurgerBuilder} />
        <Route path='/checkout' render={(props) => <Checkout {...props}/>} />
        <Route path='/orders' render={(props) => <Orders {...props}/>}/>
        <Route path='/logout' component={Logout} />
        <Route path='/auth' render={(props) => <Auth {...props}/>} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <div className="App">
      <Layout>
        <Suspense fallback={<Spinner/>}>
          {routes}
        </Suspense>
      </Layout>
    </div>
  );
  
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispathToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispathToProps)(App))

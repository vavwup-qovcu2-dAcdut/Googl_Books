import React from 'react'
import Header from './Header'
import Body from './Body'
import BookPage from './BookPage'
import Store from './store/Store'
import GlobalContext from './context/GlobalContext'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'


const MainStore = new Store()


const App = () => {
  return (
    <div className="App min-vh-100 border">
      <GlobalContext.Provider value={{
        MainStore,
      }}>
        <Router>
          <Header />
          <Switch>
            <Route path="/" exact component={Body} />
            <Route path="/book/:id" component={BookPage} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </GlobalContext.Provider>
    </div>
  );
}

export default App;

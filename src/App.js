import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import axios from 'axios';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';

class App extends Component {

  state = {
    users: [],
    user: {},
    loading: false,
    alert: null
  }



  //to search the git hub user by the name provided in
  //search.js and props passed upwards 


  searchUsers = async (text) => {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/search/users?q=${text}& client_id=$
    {process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=$
    {process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);


    this.setState({ users: res.data.items, loading: false });

  }
  //get a single github user 

  getUser = async (username) => {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=$
    {process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=$
    {process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);


    this.setState({ user: res.data, loading: false });

  }

  // clear returned users from state 

  clearUsers = () => {
    this.setState({ users: [], loading: false })
  }

  //sets alert 

  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } })
    setTimeout(() => this.setState({ alert: null }), 5000)

  }

  render() {
    const { users, user, loading } = this.state;
    return (

      <Router>
        <Fragment className="App">

          <Navbar />
          <div className="container">
            <Alert alert={this.state.alert} />

            <Switch>

              <Route exact path='/' render={props => (

                <Fragment>

                  <Search searchUsers={this.searchUsers}
                    clearUsers={this.clearUsers}
                    showClear={
                      users.length > 0 ? true : false}
                    setAlert={this.setAlert}
                  />
                  <Users loading={loading} users={users} />

                </Fragment>
              )} />

              <Route exact path='/about' component={About} />
              <Route exct path='/user/:login' render={props => (
                <User {...props}
                  getUser={this.getUser}
                  user={user}
                  loading={loading} />
              )} />
            </Switch>
          </div>

        </Fragment>
      </Router>
    );
  }

}


export default App;

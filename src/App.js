import React, { Fragment, Component } from 'react';

import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import axios from 'axios';
import Search from './components/users/Search';

class App extends Component {

  state = {
    users: [],
    loading: false
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

  // clear returned users from state 

  clearUsers = () => {
    this.setState({ users: [], loading: false })
  }


  render() {
const {users , loading} = this.state;
    return (
      <Fragment className="App">

        <Navbar />
        <div className="container">
          <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers}
            showClear={
              users.length > 0 ? true : false
            } />
          <Users loading={loading} users={users} />
        </div>

      </Fragment>
    );
  }

}


export default App;

import React from 'react'
import PropTypes from 'prop-types'


const Useritem = ({user : {login, avatar_url, html_url}}) => {


  
    return (
        <div className="card text-center">
            <img src={avatar_url} alt=""
                className="round-img" style={{ width: '60px' }} />

            <h3> {login}</h3>
            <div>
                <a href={html_url} className="btn btn-dark btn-sm my-1"  > MORE  </a>
            </div>
        </div>
    )

}
Useritem.propTypes ={
    user:PropTypes.object.isRequired,
}
 
export default Useritem

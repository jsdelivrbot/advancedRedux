import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import * as actions from '../actions';

class Header extends Component {
    authButton(){
        if(this.props.authenticated){
            return <button className="btn navbar-btn" onClick ={() => this.props.authenticate(false)}> Sign Out</button>
        }
        return <button className="btn navbar-btn" onClick={() => this.props.authenticate(true)}>SIgn In</button>;
    }
    render(){
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                <ul className="nav navbar-nav">
                    <li className="navbar-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/resources">Resources</Link>
                    </li>
                    <li className="navbar-item">
                        {this.authButton()}
                    </li>
                </ul>
                </div>
            </nav>
        )
    }
}

function mapStateToProps(state) {
    return {authenticated: state.authenticated};
}

export default connect(mapStateToProps, actions)(Header);
import React from "react";
import './Home.css';
import { BigButton } from './ButtonStyleComponent'
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="home-container">
            <h1 style={{textAlign: 'center' , fontFamily: 'monospace'}}>Welcome to the Billing Page</h1>
            <div className="action-blocks-container">
                <div className="action-block">
                    <Link to="/billing"><BigButton>Billing System</BigButton></Link>
                </div>

                <div className="action-block">
                    <Link to="/reports"><BigButton>Reports Page</BigButton></Link>
                </div>
            </div>

        </div>
    );
}

export default Home;
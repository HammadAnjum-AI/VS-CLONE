import React from "react";
import { Link } from "react-router-dom";
import "./color.css"; 

export default function Home() {
    return (
        <div className="home-container">
            <header className="home-header">
                <img 
                    src="\Images\ChatGPT Image May 5, 2025, 03_19_18 PM.png" 
                    alt="Vaidyakiya Sahayaka Logo" 
                    className="logo" 
                    width="200px" 
                    height="200px" 
                />
                <h1>Vaidyakiya Sahayaka</h1>
            </header>

            <section className="home-intro">
                <h2>About Us</h2>
                <p>
                    Welcome to Vaidyakiya Sahayaka, where we help patients find the right hospitals based on their illness. 
                    Our platform offers personalized hospital recommendations to ensure the best care for your health needs.
                </p>
            </section>

            <div className="home-actions">
                <Link to="/login">
                    <button className="btn">Login</button>
                </Link>

                <Link to="/reg">
                    <button className="btn">Register a New Patient</button>
                </Link>

                <Link to="/admin">
                    <button className="btn">Admin</button>
                </Link>
            </div>
        </div>
    );
}

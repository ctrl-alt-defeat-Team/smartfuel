import React from "react";
import { useState } from "react";
import "../styles/Contact.css";

function Contact() {
    return (
        <div className="page">
            <div className="contact">
                <div className="contact-mes">
                    <h1>Contact Us</h1>
                    <p>Feel free to share your thoughts with us! We will get to you as fast as we can!</p>
                    <div className="form">Name</div>
                    <div className="form">Email</div>
                </div>
                <div className="contact-info">
                    <div id="contact-info">Mesage</div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
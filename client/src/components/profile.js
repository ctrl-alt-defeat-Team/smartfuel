import React from "react";
import { useState } from "react";
import "../styles/profile.css";

function Profile() {
    const [name, setName] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    
    return (
        <div className="page">
            <div id="title">
                <h1>Your Profile</h1>
            </div>
            <div className="contact">
                <div className="contact-mes">
                    <div className="form-group">
                        <form>
                            <label className="name">
                                Name
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                            </label>
                        </form>
                        <form>
                            <label className="name">
                                Full Name
                                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                            </label>
                        </form>
                    </div>
                </div>
                <div className="form-group">
                    <form>
                        <label className="name">
                                Email Address:
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </label>
                            <label className="name">
                                Phone Number:
                                <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                            </label>
                    </form>
                </div>     
            </div>
            <div>
                <button id="save">Save Changes</button>
            </div>            
        </div>
    );
}

export default Profile;
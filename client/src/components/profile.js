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
                    <div className="form-group">
                        <form>
                            <label className="name">
                                <div className="labname">
                                    Name
                                </div>
                                <div className="inp">
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                            </label>
                            <label className="name">
                                <div className="labname">
                                    Full Name
                                </div>
                                <div className="inp">
                                    <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                                </div>
                            </label>
                            <label className="name">
                                <div className="labname">
                                    Email Address:
                                </div>
                                <div className="inp">
                                   <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                            </label>
                            <label className="name">
                                <div className="labname">
                                    Phone Number:
                                </div>
                                <div className="inp">
                                    <input className="inp_prf" type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                </div>
                            </label>
                        </form>
                    </div>
                <div className="form-group">
                </div>     
            </div>
            <div>
                <button id="save">Save Changes</button>
            </div>            
        </div>
    );
}

export default Profile;
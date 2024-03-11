import React from "react";
import { useState } from "react";
import "../styles/profile.css";

function Profile({ user } ) {
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [vegan, setVegan] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
       
    const handleSave = async (e) => {
        e.preventDefault();
        const allergenCheckboxes = document.querySelectorAll('input[name="drone"]:checked');
        const selectedAllergens = Array.from(allergenCheckboxes).map((checkbox) => checkbox.value); 
        const token = localStorage.getItem("token");
        
        const response = await fetch("/api/updateUser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({username, fullName, email, phoneNumber, vegan, selectedAllergens}),
        });
          console.log(response);
    }

    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
      };

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
                                Username
                            </div>
                            <div className="inp">
                                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
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
                    <fieldset id="allergens" >
                    <legend>Select allergens:</legend>

                    <div>
                        <input type="checkbox" id="gluten" name="drone" value="gluten"  />
                        <label for="gluten">Gluten</label>
                    </div>

                    <div>
                        <input type="checkbox" id="milk" name="drone" value="milk" />
                        <label for="milk">Milk</label>
                    </div>

                    <div>
                        <input type="checkbox" id="eggs" name="drone" value="eggs" />
                        <label for="eggs">Eggs</label>
                    </div>
                    <div>
                        <input type="checkbox" id="nuts" name="drone" value="nuts" />
                        <label for="nuts">Nuts</label>
                    </div>
                    <div>
                        <input type="checkbox" id="peanuts" name="drone" value="peanuts" />
                        <label for="peanuts">Peanuts</label>
                    </div>
                    <div>
                        <input type="checkbox" id="sesame" name="drone" value="sesame" />
                        <label for="sesame">Sesame seads</label>
                    </div>
                    <div>
                        <input type="checkbox" id="soybeans" name="drone" value="soybeans" />
                        <label for="soybeans">Soybeans</label>
                    </div>
                    <div>
                        <input type="checkbox" id="celery" name="drone" value="celery" />
                        <label for="celery">Celery</label>
                    </div>
                    <div>
                        <input type="checkbox" id="mustard" name="drone" value="mustard" />
                        <label for="mustard">Mustard</label>
                    </div>
                    <div>
                        <input type="checkbox" id="lupin" name="drone" value="lupin" />
                        <label for="lupin">Lupin</label>
                    </div>
                    <div>
                        <input type="checkbox" id="molluscs" name="drone" value="molluscs" />
                        <label for="molluscs">Molluscs</label>
                    </div>
                    <div>
                        <input type="checkbox" id="fish" name="drone" value="fish" />
                        <label for="fish">Fish</label>
                    </div>
                    <div>
                        <input type="checkbox" id="crustaceans" name="drone" value="crustaceans" />
                        <label for="crustaceans">Crustaceans</label>
                    </div>
                    <div>
                        <input type="checkbox" id="sulphur" name="drone" value="sulphur" />
                        <label for="sulphur">Sulphur dioxide and sulphites</label>
                    </div>
                    </fieldset>
                </div>     
            </div>
            <div className="veg">
        <fieldset id="vegan">
          <legend>Are you vegan?</legend>
          <div>
            <input
              type="radio"
              id="yes"
              name="vegan"
              value="yes"
              checked={vegan === true}
              onChange={() => setVegan(true)}
            />
            <label htmlFor="yes">Yes</label>
          </div>
          <div>
            <input
              type="radio"
              id="no"
              name="vegan"
              value="no"
              checked={vegan === false}
              onChange={() => setVegan(false)}
            />
            <label htmlFor="no">No</label>
          </div>
        </fieldset>
      </div>    
            <div className="savebtn">
                <button id="save" onClick={handleSave}>Save Changes</button>
            </div> 
        </div>
    );
}

export default Profile;
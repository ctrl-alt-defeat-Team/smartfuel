import React from "react";
import { useState, useEffect } from "react";
import "../styles/profile.css";

function Profile({ user } ) {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
   // const [phoneNumber, setPhoneNumber] = useState("");
    const [vegan, setVegan] = useState("");
    const [selectedAllergens, setSelectedAllergens] = useState([]);
    const handleAllergenChange = (e) => {
        const allergen = e.target.value;
        const isChecked = e.target.checked;
        if (isChecked) {
            setSelectedAllergens((prevAllergens) => [...prevAllergens, allergen]);
        } else {
            setSelectedAllergens((prevAllergens) =>
            prevAllergens.filter((a) => a !== allergen)
          );
        }
      };

    const handleSave = async (e) => {
        e.preventDefault();
        console.log("Save changes");
        const token = localStorage.getItem("token");
        const isCompleted = true;
        try{
            console.log(vegan);
        const response = await fetch("/api/updateUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({username, name, email, vegan, selectedAllergens, isCompleted}),
        });
        if(username != user.username){
            localStorage.setItem("token", "");
        }
    } catch (error) {
        console.error("Error updating user", error);
    }
        window.location.reload();
    }


      useEffect(() => {
        console.log(user);
        if (user) {
          setUsername(user.username || "");
          setName(user.name || "");
          setEmail(user.email || "");
         // setPhoneNumber(user.phoneNumber || "");
          setVegan(user.vegan || false);
          setSelectedAllergens(user.intolerance || []);
        }
      }, [user]);

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
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
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
                    {/*
                        <label className="name">
                            <div className="labname">
                                Phone Number:
                            </div>
                            <div className="inp">
                                <input className="inp_prf" type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                            </div>
                        </label>
                    */}
                    </form>
                </div>
                <div className="form-group">
                    <fieldset id="allergens" >
                    <legend>Select allergens:</legend>

                    <div>
                        <input type="checkbox" 
                        id="gluten" 
                        name="drone" 
                        value="gluten" 
                        checked = {selectedAllergens.includes("gluten")}
                        onChange={handleAllergenChange}
                        />
                        <label for="gluten">Gluten</label>
                    </div>

                    <div>
                        <input type="checkbox" id="milk" name="drone" value="milk"
                        checked = {selectedAllergens.includes("milk")}
                        onChange={handleAllergenChange} />
                        <label for="milk">Milk</label>
                    </div>

                    <div>
                        <input type="checkbox" id="eggs" name="drone" value="eggs"
                         checked = {selectedAllergens.includes("eggs")}
                         onChange={handleAllergenChange}
                          />
                        <label for="eggs">Eggs</label>
                    </div>
                    <div>
                        <input type="checkbox" id="nuts" name="drone" value="nuts" 
                         checked = {selectedAllergens.includes("nuts")}
                         onChange={handleAllergenChange}
                         />
                        <label for="nuts">Nuts</label>
                    </div>
                    <div>
                        <input type="checkbox" id="peanuts" name="drone" value="peanuts"
                         checked = {selectedAllergens.includes("peanuts")}
                         onChange={handleAllergenChange}
                        />
                        <label for="peanuts">Peanuts</label>
                    </div>
                    <div>
                        <input type="checkbox" id="sesame" name="drone" value="sesame"
                         checked = {selectedAllergens.includes("sesame")}
                         onChange={handleAllergenChange}
                        />
                        <label for="sesame">Sesame seads</label>
                    </div>
                    <div>
                        <input type="checkbox" id="soybeans" name="drone" value="soybeans"
                         checked = {selectedAllergens.includes("soybeans")}
                         onChange={handleAllergenChange}
                        />
                        <label for="soybeans">Soybeans</label>
                    </div>
                    <div>
                        <input type="checkbox" id="celery" name="drone" value="celery"
                         checked = {selectedAllergens.includes("celery")}
                         onChange={handleAllergenChange} 
                        />
                        <label for="celery">Celery</label>
                    </div>
                    <div>
                        <input type="checkbox" id="mustard" name="drone" value="mustard"
                         checked = {selectedAllergens.includes("mustard")}
                         onChange={handleAllergenChange}
                        />
                        <label for="mustard">Mustard</label>
                    </div>
                    <div>
                        <input type="checkbox" id="lupin" name="drone" value="lupin" 
                         checked = {selectedAllergens.includes("lupin")}
                         onChange={handleAllergenChange}
                        />
                        <label for="lupin">Lupin</label>
                    </div>
                    <div>
                        <input type="checkbox" id="molluscs" name="drone" value="molluscs" 
                         checked = {selectedAllergens.includes("molluscs")}
                         onChange={handleAllergenChange}
                        />
                        <label for="molluscs">Molluscs</label>
                    </div>
                    <div>
                        <input type="checkbox" id="fish" name="drone" value="fish" 
                            checked = {selectedAllergens.includes("fish")}
                            onChange={handleAllergenChange}
                        />
                        <label for="fish">Fish</label>
                    </div>
                    <div>
                        <input type="checkbox" id="crustaceans" name="drone" value="crustaceans" 
                            checked = {selectedAllergens.includes("crustaceans")}
                            onChange={handleAllergenChange}
                        />
                        <label for="crustaceans">Crustaceans</label>
                    </div>
                    <div>
                        <input type="checkbox" id="sulphur" name="drone" value="sulphur" 
                            checked = {selectedAllergens.includes("sulphur")}
                            onChange={handleAllergenChange}
                        />
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
              checked={vegan == true}
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
              checked={vegan != true}
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
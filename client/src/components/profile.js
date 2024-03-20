import React from "react";
import { useState, useEffect } from "react";
import "../styles/profile.css";
import "../styles/Mobile.css";
import necessaryNutrition from "../functions/calcOptimalNutrtion";
import CartHistory from "./cartHistory";

function Profile({ user }) {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [male, setMale] = useState("");
  // const [phoneNumber, setPhoneNumber] = useState("");
  const [vegan, setVegan] = useState("");
  const [selectedAllergens, setSelectedAllergens] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [cartHistory, setCartHistory] = useState([]);
  const [showCartFromHistory, setShowCartFromHistory] = useState(false);
  const [selectedCart, setSelectedCart] = useState({});//[
  //const [cartHistoryID, setCartHistoryID] = useState([]);

  const handleShowHistory = () => {
    setShowHistory(true);
};

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
    try {
      console.log(vegan);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/updateUser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            username,
            name,
            email,
            vegan,
            selectedAllergens,
            isCompleted,
            weight,
            height,
            male,
          }),
        }
      );
      if (username != user.username) {
        localStorage.setItem("token", "");
      }
    } catch (error) {
      console.error("Error updating user", error);
    }
    window.location.reload();
  };

  const fetchCartHistory = async (userID) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/getCartHistory/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        }
      );
      console.log(response);
      const data = await response.json();
      console.log(data);
      setCartHistory(data);
    } catch (error) {}
  };
  useEffect(() => {
    console.log(user);
    if (user) {
      setUsername(user.username || "");
      setName(user.name || "");
      setEmail(user.email || "");
      // setPhoneNumber(user.phoneNumber || "");
      setWeight(user.weight || 0);
      setHeight(user.height || 0);
      setMale(user.male || "");
      setVegan(user.vegan || false);
      setSelectedAllergens(user.intolerance || []);
      console.log(user.shoppingHistory);
//      setCartHistoryID(user.shoppingHistory || []);
      fetchCartHistory();
    }
  }, [user]);

  return ( (!showHistory &&
    <div className="page">
       <div id="title">
                <h1>Your Profile</h1>
                <button className="nav-btn nolog" onClick={handleShowHistory}>
                    View Shopping History
                </button>
            </div>
      <div className="contact">
        <div className="form-group">
          <form>
            <label className="name">
              <div className="labname">Username</div>
              <div className="inp">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </label>
            <label className="name">
              <div className="labname">Full Name</div>
              <div className="inp">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </label>
            <label className="name">
              <div className="labname">Email Address:</div>
              <div className="inp">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </label>
            <label className="name">
              <div className="labname">Weight (kg):</div>
              <div className="inp">
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
            </label>
            <label className="name">
              <div className="labname">Height (cm):</div>
              <div className="inp">
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
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
          <fieldset id="allergens">
            <div className="alergen">Select allergens:</div>

            <div>
              <input
                type="checkbox"
                id="gluten"
                name="drone"
                value="gluten"
                checked={selectedAllergens.includes("gluten")}
                onChange={handleAllergenChange}
              />
              <label for="gluten">Gluten</label>
            </div>

            <div>
              <input
                type="checkbox"
                id="milk"
                name="drone"
                value="milk"
                checked={selectedAllergens.includes("milk")}
                onChange={handleAllergenChange}
              />
              <label for="milk">Milk</label>
            </div>

            <div>
              <input
                type="checkbox"
                id="eggs"
                name="drone"
                value="eggs"
                checked={selectedAllergens.includes("eggs")}
                onChange={handleAllergenChange}
              />
              <label for="eggs">Eggs</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="nuts"
                name="drone"
                value="nuts"
                checked={selectedAllergens.includes("nuts")}
                onChange={handleAllergenChange}
              />
              <label for="nuts">Nuts</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="peanuts"
                name="drone"
                value="peanuts"
                checked={selectedAllergens.includes("peanuts")}
                onChange={handleAllergenChange}
              />
              <label for="peanuts">Peanuts</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="sesame"
                name="drone"
                value="sesame"
                checked={selectedAllergens.includes("sesame")}
                onChange={handleAllergenChange}
              />
              <label for="sesame">Sesame seads</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="soybeans"
                name="drone"
                value="soybeans"
                checked={selectedAllergens.includes("soybeans")}
                onChange={handleAllergenChange}
              />
              <label for="soybeans">Soybeans</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="celery"
                name="drone"
                value="celery"
                checked={selectedAllergens.includes("celery")}
                onChange={handleAllergenChange}
              />
              <label for="celery">Celery</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="mustard"
                name="drone"
                value="mustard"
                checked={selectedAllergens.includes("mustard")}
                onChange={handleAllergenChange}
              />
              <label for="mustard">Mustard</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="lupin"
                name="drone"
                value="lupin"
                checked={selectedAllergens.includes("lupin")}
                onChange={handleAllergenChange}
              />
              <label for="lupin">Lupin</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="molluscs"
                name="drone"
                value="molluscs"
                checked={selectedAllergens.includes("molluscs")}
                onChange={handleAllergenChange}
              />
              <label for="molluscs">Molluscs</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="fish"
                name="drone"
                value="fish"
                checked={selectedAllergens.includes("fish")}
                onChange={handleAllergenChange}
              />
              <label for="fish">Fish</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="crustaceans"
                name="drone"
                value="crustaceans"
                checked={selectedAllergens.includes("crustaceans")}
                onChange={handleAllergenChange}
              />
              <label for="crustaceans">Crustaceans</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="sulphur"
                name="drone"
                value="sulphur"
                checked={selectedAllergens.includes("sulphur")}
                onChange={handleAllergenChange}
              />
              <label for="sulphur">Sulphur dioxide and sulphites</label>
            </div>
            <br />
            <br />
            <div className="gender-label">
              <p>Select Gender:</p>
            </div>
            <div>
              <input
                type="radio"
                id="male"
                name="gender"
                value="true"
                checked={male == true}
                onChange={() => setMale(true)}
              />
              <label htmlFor="male">Male</label>
            </div>
            <div>
              <input
                type="radio"
                id="female"
                name="gender"
                value="false"
                checked={male == false}
                onChange={() => setMale(false)}
              />
              <label htmlFor="female">Female</label>
            </div>
          </fieldset>
        </div>
      </div>
        <div className="product-details">
        <div class="grid-container">
          <div class="grid-item prim">
            <p class="header">Required Calories</p>
            <div className="calories">
              <p>
                {
                necessaryNutrition(user.weight, user.height, user.male)
                .calories
                }
              </p>
            </div>
          </div>
          <div class="grid-item doi">
            <p class="header">Required Proteins</p>
            <div className="proteins">
              <p>
                {
                necessaryNutrition(user.weight, user.height, user.male)
                .proteins
                }
              </p>
            </div>
          </div>
          <div class="grid-item trei">
            <p class="header">Required Fats</p>
            <div className="fats">
              <p>
                {
                necessaryNutrition(user.weight, user.height, user.male)
                .fats
                }
              </p>
            </div>
          </div>
          <div class="grid-item ultim">
            <p class="header">Required Carbs</p>
            <div className="carbs">
              <p>
                {
                necessaryNutrition(user.weight, user.height, user.male)
                .carbs
                }
              </p>
            </div>
          </div>
        </div>
        </div>
      <div className="veg">     
      <fieldset id="vegan">
          <div className="areuvegan">
            <p>Are you vegan?</p>
          </div>
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
        <button id="save" onClick={handleSave}>
          Save Changes
        </button>
      </div>
      <div className="umplutura">
        <p></p>
      </div>
    </div>) ||
    (showHistory && CartHistory({ cartHistory, setShowHistory, showCartFromHistory,setShowCartFromHistory, selectedCart, setSelectedCart }))
  );
}

export default Profile;

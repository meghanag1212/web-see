import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function SIGNUP() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  function handleSignup(e) {

    e.preventDefault();


    if (!name || !email || !password || !confirmPassword) {

      alert("Please fill all fields.");

      return;
    }


    if (password.length < 6) {

      alert("Password must contain at least 6 characters.");

      return;
    }


    if (password !== confirmPassword) {

      alert("Passwords do not match.");

      return;
    }


    const existingUsers =
      JSON.parse(localStorage.getItem("users")) || [];


    const userAlreadyExists = existingUsers.some(
      (user) =>
        user.email.toLowerCase() === email.toLowerCase()
    );


    if (userAlreadyExists) {

      alert("An account with this email already exists.");

      return;
    }


    const newUser = {

      id: Date.now(),

      name: name,

      email: email,

      password: password

    };


    const updatedUsers = [

      ...existingUsers,

      newUser

    ];


    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );


    alert("Account created successfully!");


    navigate("/login");

  }


  return (

    <main className="login-page">

      <div className="login-container">


        <div className="login-left">

          <p className="login-label">
            APARTMENT MANAGEMENT SYSTEM
          </p>


          <h1>
            CREATE
            <br />
            ACCOUNT.
          </h1>


          <p>
            Create your account to manage residents,
            maintenance requests, notices and
            community facilities.
          </p>

        </div>



        <div className="login-card">

          <h2>
            SIGNUP
          </h2>


          <p className="login-subtitle">
            Create a new account to get started.
          </p>



          <form onSubmit={handleSignup}>


            <div className="input-group">

              <label>
                Full Name
              </label>


              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />

            </div>



            <div className="input-group">

              <label>
                Email Address
              </label>


              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

            </div>



            <div className="input-group">

              <label>
                Password
              </label>


              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

            </div>



            <div className="input-group">

              <label>
                Confirm Password
              </label>


              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
              />

            </div>



            <button
              type="submit"
              className="login-button"
            >
              CREATE ACCOUNT
            </button>


          </form>



          <p className="account-link">

            Already have an account?

            {" "}

            <Link to="/login">
              LOGIN
            </Link>

          </p>


        </div>


      </div>

    </main>

  );

}
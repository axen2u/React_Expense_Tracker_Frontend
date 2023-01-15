import React, { useState } from "react"

export default function (props) {
  let [authMode, setAuthMode] = useState("signin")
  let [Name, setName] = useState("")
  let [Mail, setMail] = useState("")
  let [Pass, setPass] = useState("")

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }

 function loginClick() {

    var txt = JSON.stringify({
        "id": 0,
        "name": "string",
        "email": Mail,
        "password": Pass
    })

    console.log(txt);


    fetch('http://localhost:5130/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: txt
        })
            .then(res => res.json())
            .then((result) => {
                localStorage.setItem("session",result);
                console.log(result);
                // window.location.reload();
            }, (error) => {
                alert('Failed');
            })
 }

 function registerClick() {

    var txt = JSON.stringify({
        "id": 0,
        "name": Name,
        "email": Mail,
        "password": Pass
    })

    console.log(txt);


    fetch('http://localhost:5130/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: txt
        })
            .then(res => res.json())
            .then((result) => {
                // localStorage.setItem('items', JSON.stringify(items));
                alert(result);
                window.location.reload();
            }, (error) => {
                alert('Failed');
            })
 }


  if (authMode === "signin") {
    return (
    <div class = "pt-5 d-flex align-items-center justify-content-center">
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Enter email"
                onChange={e=>setMail(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                onChange={e=>setPass(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="button" className="btn btn-primary" onClick={()=>loginClick()}>
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p>
          </div>
        </form>
      </div>
      </div>
    )
  }

  return (
    <div class = "pt-5 d-flex align-items-center justify-content-center">
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
              onChange={e=>setName(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Email Address"
              onChange={e=>setMail(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              onChange={e=>setPass(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="button" className="btn btn-primary" onClick={()=>registerClick()}>
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
    </div>
  )
}
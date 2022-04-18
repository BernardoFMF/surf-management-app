import React, {useState} from 'react'
import './login.css';

const LoginScreen = () => {
    const [clicked, setClicked] = useState(false);
    const [signUpStage, setSignUpStage] = useState(1);

    const toggleClass = () => {
        setClicked(!clicked)
        console.log(clicked)
    }

    const changeStage = (e) => {
        e.preventDefault()
        setSignUpStage(signUpStage + 1)
    }

  return (
    <div className={`container ${clicked ? 'sign-up-mode' : ''}`}>
        <div className="forms-container">
            <div className="signin-signup">
                <form action="#" className="sign-in-form">
                    <h2 className="title">Sign in</h2>
                    <div className="input-field">
                        <i className="fas fa-user"></i>
                        <input type="text" placeholder="Username" />
                    </div>
                    <div className="input-field">
                        <i className="fas fa-lock"></i>
                        <input type="password" placeholder="Password" />
                    </div>
                    <input type="submit" value="Login" className="btn solid" />
                </form>
                <form action="#" className="sign-up-form">
                    <h2 className="title">{`Sign up (${signUpStage} / 4)`}</h2>
                    {signUpStage === 1 ? (<div><div className="input-field">
                        <i className="fas fa-user"></i>
                        <input type="text" placeholder="Username" />
                    </div>
                    <div className="input-field">
                        <i className="fas fa-envelope"></i>
                        <input type="email" placeholder="Email" />
                    </div>
                    <div className="input-field">
                        <i className="fas fa-lock"></i>
                        <input type="password" placeholder="Password" />
                    </div></div>) : signUpStage === 2 ? (<div><div className="input-field">
                        <i className="fas fa-user"></i>
                        <input type="text" placeholder="Full Name" />
                    </div>
                    <div className="input-field">
                        <i className="fas fa-address-card"></i>
                        <input type="email" placeholder="NIF" />
                    </div>
                    <div className="input-field">
                        <i className="fas fa-id-card"></i>
                        <input type="email" placeholder="CC" />
                    </div>
                    <div className="input-field">
                        <i className="fas fa-earth-europe"></i>
                        <input type="email" placeholder="Nationality" />
                    </div>
                    <div className="input-field">
                        <i className="fas fa-calendar"></i>
                        <input type="email" placeholder="Birth Date" />
                    </div>
                    </div>) : signUpStage === 3 ? (<div><div className="input-field">
                        <i className="fas fa-location-dot"></i>
                        <input type="text" placeholder="Location" />
                    </div>
                    <div className="input-field">
                        <i className="fas fa-map"></i>
                        <input type="email" placeholder="Address" />
                    </div>
                    <div className="input-field">
                        <i className="fas fa-location-crosshairs"></i>
                        <input type="email" placeholder="Postal Code" />
                    </div>
                    <div className="input-field">
                        <i className="fas fa-phone"></i>
                        <input type="email" placeholder="Phone Number" />
                    </div>
                    </div>) : (<div>
                        <div className="input-field">
                            <input type="file" id="image-input" accept="image/png, image/jpg"/>
                        </div></div>)}
                    
                    {signUpStage < 4 ? (<input className="btn" type="submit" onClick={changeStage} value="Next"/>) : ""}
                    
                </form>
            </div>
        </div>

        <div className="panels-container">
            <div className="panel left-panel">
                <div className="content">
                    <h3>New here ?</h3>
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
                        ex ratione. Aliquid!
                    </p>
                    <button className="btn transparent" onClick={toggleClass} id="sign-up-btn">
                        Sign up
                    </button>
                </div>
                <img src="img/log.svg" className="image" alt="" />
            </div>
            <div className="panel right-panel">
                <div className="content">
                    <h3>One of us ?</h3>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                        laboriosam ad deleniti.
                    </p>
                    <button className="btn transparent" onClick={toggleClass} id="sign-in-btn">
                        Sign in
                    </button>
                </div>
                <img src="img/register.svg" className="image" alt="" />
                </div>
        </div>
    </div>
  )
}

export default LoginScreen
import React from 'react';

const Register = ({ onRouteChange }) => {
  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_in" className="ba b--transparent ph0 mh0">
            <legend className="white f4 fw6 ph0 mh0">Register</legend>
            <div className="mv3">
              <label className="white db fw6 lh-copy f6" htmlFor="name">Name</label>
              <input className="white b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" />
            </div>
            <div className="mt3">
              <label className="white db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input className="white pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
            </div>
            <div className="mv3">
              <label className="white db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input className="white b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
            </div>
          </fieldset>
          <div className="">
            <input 
              className="white b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib"
              type="submit"
              value="Register"
              onClick={() => onRouteChange('home')}
            />
          </div>
        </div>
      </main>
    </article>  
  );
}

export default Register; 
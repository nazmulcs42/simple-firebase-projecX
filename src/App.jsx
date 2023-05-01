import { React, useState } from 'react'
import { getAuth, GithubAuthProvider, GoogleAuthProvider, TwitterAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import './App.css'
import app from '../firebase.config';

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider ();
const githubProvider = new GithubAuthProvider ();
const twitterProvider = new TwitterAuthProvider();

function App() {
  const [user, setUser] = useState(null);

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
    .then(res => {
      const loggedInUser = res.user;
      console.log(loggedInUser);
      setUser(loggedInUser);
    })
    .catch(err => {
      console.log(err.message);
    })

  }

  const handleGitHubSignIn = () => {
    signInWithPopup(auth, githubProvider)
    .then(res => {
      const loggedInUser = res.user;
      console.log(loggedInUser);
      setUser(loggedInUser);
    })
    .catch(err => {
      console.log(err.message);
    })
  }

  const handleTwitterSignIn = () => {
    signInWithPopup(auth, twitterProvider)
    .then(res => {
      const loggedInUser = res.user;
      console.log(loggedInUser);
      setUser(loggedInUser);
    })
    .catch(err =>{
      console.log(err.message);
    })
  }

  const handleSignOut = () => {
    signOut(auth)
    .then(res => {
      console.log(res);
      setUser(null);
    })
    .catch(err => {
      console.log(err.message);
    })
  }

  return (
    <div>
      <h3>Simple Firebase Project</h3>
      {
        user ? <button onClick={handleSignOut}>LogOut</button>
        : <div>
          <p>Login</p>
          <button className='btn btn-outline-primary' onClick={handleGoogleSignIn}>Google</button>
          <button className='btn btn-outline-primary' onClick={handleGitHubSignIn}>GitHub</button>
          <button className='btn btn-outline-primary' onClick={handleTwitterSignIn}>Twitter</button>
        </div>
      }
      <div className="card">
        {
          user && <div>
            <img src={user.photoURL} alt="Photo"  width="150px"/>
            <h5>{user.displayName}</h5>
            <p><small>{user.phoneNumber} {user.email}</small></p>
          </div>
        }
      </div>
    </div>
  )
}

export default App

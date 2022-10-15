import './App.css';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import app from '../src/firebase.init';
import { useState } from 'react';

const auth = getAuth(app)
function App() {
  const [user, setUser] = useState({})
  const googleProvider = new GoogleAuthProvider()
  const githubProvider = new GithubAuthProvider()

  const googleSignInHandler = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user
        console.log(user)
        setUser(user)
      })
      .catch(error => {
        console.error('error ', error)
      })
  }
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({})
      })
      .catch(error => {
        console.error('this is error mama ', error)
      })
  }
  const githubSignInHandler = () => {
    signInWithPopup(auth, githubProvider)
      .then(result => {
        const user = result.user
        setUser(user)
        console.log(user)
      })
      .catch(error => {
        console.error('github login error ', error)
      })

  }
  return (
    <div className="App">


      {user.uid ?
        <button onClick={handleSignOut}>Sign Out</button>
        :
        <div>
          <button onClick={googleSignInHandler}>Google sign In</button>
          <button onClick={githubSignInHandler}>Github SignIn</button>
        </div>
      }

      {user.uid &&
        <div>
          <h3>user name: {user.displayName}</h3>
          <p>email: {user?.email}</p>
          <img src={user.photoURL} alt='' />
        </div>
      }
    </div>
  );
}

export default App;

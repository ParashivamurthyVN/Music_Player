import React from "react";

const Auth="https://accounts.spotify.com/authorize?client_id=022f96ff220b410585b26556a6f088cf&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";


function Login() {
    return (
      <div className="Login">
        <a href={Auth}>Login with Spotify</a>
      </div>
    );
  }
  
  export default Login;
  
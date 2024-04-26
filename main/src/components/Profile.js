import React from "react";
import "./Style.css"; // Import your CSS file here

const Profile = () => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="icon"
          type="image/x-icon"
          href="C:\Users\Asus FX516P 9775\Downloads\LogoOnlySymbol.png"
        />
        <title>Profile</title>
      </head>
      <body id="Profilebody">
        <div className="profile_main">
          <div className="profile_pic">
            <img
              src="https://avatars.githubusercontent.com/u/1547006?v=4"
              className="profile_pic"
              alt="DefaultPic"
            />
          </div>
          <div className="textfield_username">
            <h1>Display Name</h1>
          </div>
          <div className="description-profile">
            <label className="label-profile" htmlFor="description">
              About Myself:
            </label>
            <input
              className="input-profile"
              type="text"
              id="bio"
              name="bio"
              placeholder="Tell us something about yourself"
            />
          </div>
          <div id="buttons-profile">
            <button id="changeBackgroundButtonPrev">{"<"}</button>
            <button id="changeBackgroundButton">{">"}</button>
          </div>
          {/* You might need to include your script logic here */}
          <div className="vertical-line"></div>
        </div>
      </body>
    </html>
  );
};

export default Profile;

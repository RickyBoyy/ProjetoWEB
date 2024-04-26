import React from "react";
import "./Style.css"; // Import your CSS file here

const Tags = () => {
  const redirectToNav = () => {
    // Implement redirection logic here
  };

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
        <title>Tags</title>
      </head>
      <body id="Tagbody">
        <div className="choose_tags">
          <div className="card_tags">
            <h1>
              What type of gamer are you?
              <br />
              Choose four tags:
            </h1>
            <div className="tag_placement" id="tag_placement"></div>
            <button className="btn_done" onClick={redirectToNav}>
              Done
            </button>
          </div>
        </div>
        <script src="tag.js"></script>
      </body>
    </html>
  );
};

export default Tags;

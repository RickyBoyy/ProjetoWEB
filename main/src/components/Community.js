
import React from 'react';
import "../App.css";
import profilePic from "../images/1547006.jpg";



const Community = () => {

    const redirectToPostFromCommunity = () => {
        window.location.href = "/post"
    };

    const redirectToCreatePostFromCommunity = () => {
        window.location.href = "/create_post"

    };

    
    return (
        <div className="container2">
            <div className="community-header2">
                <img src="https://via.placeholder.com/150x150" alt="Community Image" className="community-image2" />
                <h1 className="community-name2">Minha Comunidade</h1>
            </div>

            <button className="add-post-button2" onClick={redirectToCreatePostFromCommunity}>
                Add Post
            </button>

            <div className="post2">
                <div className="post-content2">
                    <img src="https://via.placeholder.com/700X350" alt="Post Image" className="post-image2" />
                    <div className="user-info right-aligned">
                        <img
                            src={profilePic}
                            alt="user_profile_picture"
                            style={{
                                width: "70px",
                                height: "70px",
                                borderRadius: "50%",
                                marginRight: "10px",
                            }}
                        />
                        <h5 style={{ color: "white" }}>User Display Name</h5>
                    </div>
                    
                    <div className="post-description2">Descrição do post 1</div>
                </div>
            </div>

            <div className="post2">
                <div className="post-content2">
                    <img src="https://via.placeholder.com/700x350" alt="Post Image" className="post-image2" />
                    <div className="user-info right-aligned">
                        <img
                            src={profilePic}
                            alt="user_profile_picture"
                            style={{
                                width: "70px",
                                height: "70px",
                                borderRadius: "50%",
                                marginRight: "10px",
                            }}
                        />
                        <h5 style={{ color: "white" }}>User Display Name</h5>
                    </div>
                    <div className="post-description2">Descrição do post 2</div>
                </div>
            </div>
            <div className="button_for_more">
          <button className="the_button" onClick={redirectToPostFromCommunity}>
            See more
          </button>
            </div>
        </div>
    );
};

export default Community;


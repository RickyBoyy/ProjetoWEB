import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

const Communities = () => {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await axios.get('http://localhost:4000/community'); // Adjust the URL as necessary
        setCommunities(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCommunities();
  }, []);

  const chunkArray = (array, chunkSize) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  const communitiesChunks = chunkArray(communities, 3);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="Communities">
      <div className="PageTitle">
        <h1>Communities</h1>
      </div>

      {communitiesChunks.map((chunk, chunkIndex) => (
        <div className="communities-listing" key={chunkIndex}>
          {chunk.map((community, index) => (
            <div className="card-container" key={index}>
              <div className="card-content">
                <div className="communities-header">
                  <div className="community-icon">
                    <img
                      src={`http://localhost:4000/${community.community_image}`} // Adjust the URL as necessary
                      alt={`${community.name} icon`}
                      width="60"
                      height="60"
                    />
                  </div>
                  <div className="community-info">
                    <div className="community-name">
                      <h3>{community.community_name}</h3>
                    </div>
                    <div className="community-misc">
                      
                    </div>
                  </div>
                </div>
                <div className="community-tags"></div>
              </div>

              <div className="community-body">
                <div className="community_description">
                  {community.community_description}
                </div>
              </div>
              <div className="community-join">
                <button className="join_community">Join?</button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Communities;

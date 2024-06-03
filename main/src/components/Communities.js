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
        const response = await axios.get('http://localhost:4000/community'); // Substitua pela URL correta do seu servidor
        setCommunities(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCommunities();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="Communities">
      <div className="PageTitle">
        <h1>Communities</h1>
      </div>
      <div className="communities-listing">
        {communities.map(community => (
          <div key={community.community_id} className="card-container">
            <div className="card-content">
              <div className="communities-header">
                <div className="community-icon">
                  <img
                    src={`http://localhost:4000/${community.community_image}`} // Ajuste a URL conforme necessário
                    alt={community.community_name}
                    width="60"
                    height="60"
                  />
                </div>
                <div className="community-info">
                  <div className="community-name">
                    <h3>{community.community_name}</h3>
                  </div>
                  <div className="community-misc">
                    <h5>Languages and other stuff</h5>
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
    </div>
  );
};

export default Communities;

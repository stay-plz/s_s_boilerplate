import { Col } from 'antd';
import React, { useEffect } from 'react';


function GridCards(props) {
    
    if(!props.landingPage) {
        return (
          <Col lg={6} md={8} xs={24}>
              <div style={{position : 'relative'}}>
                  <a href={`/movie/${props.movieId}`}>
                      <img style={{width : '100%', height : '320px'}} src={props.image} alt={props.movieName}/>
                  </a>
              </div>
          </Col>
          );
    } else {
        return(
          <Col lg={6} md={8} xs={24}>
              <div style={{position : 'relative'}}>
                    <img style={{width : '100%', height : '320px'}} src={props.image} alt={props.characterName}/>
              </div>
          </Col>
        )
    }
}

export default GridCards;
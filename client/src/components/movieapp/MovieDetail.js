import { Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Favorite from './Favorite';
import GridCards from './GridCards';
import MainImage from './MainImage';
import MovieInfo from './MovieInfo';

function MovieDetail(props) {
    const { id } = useParams();

    const [movie, setMovie] = useState("");
    const [casts, setCasts] = useState([]);
    const [actorToggle, setActorToggle] = useState(false);
    

    useEffect(() => {
        const endpointCrew = `${process.env.REACT_APP_MOVIEAPI_URI}movie/${id}/credits?api_key=${process.env.REACT_APP_MOVIEAPI_KEY}`
        const endpointInfo = `${process.env.REACT_APP_MOVIEAPI_URI}movie/${id}?api_key=${process.env.REACT_APP_MOVIEAPI_KEY}`

        fetch(endpointInfo)
        .then(response => response.json())
        .then(response => {
            setMovie(response);
        });

        fetch(endpointCrew)
        .then(response => response.json())
        .then(response => {
            setCasts(response.cast);
        });
    }, []);
    
    const toggleHandler = () => {
        setActorToggle(!actorToggle);
    };

  return (
      <div>
        {/* Header */}
        {movie &&
            <MainImage 
                image={`${process.env.REACT_APP_MOVIEAPI_IMAGE_URI}w1280${movie.backdrop_path}`}
                title={movie.original_title}
                text={movie.overview}
            />
        }

        {/* Body */}
        <div style={{ width : '85%', margin : '1rem auto'}}>
            {/* Favorite button */}
            <div style={{display : 'flex', justifyContent : 'flex-end'}}>
                    <Favorite 
                        movieInfo={movie}
                        movieId={id}
                        userFrom={localStorage.getItem("userId")}
                    />
            </div>
            {/* Movie Info */}
            <MovieInfo movie={movie} />
            {/* Actors Grid*/}
            <div style={{ display:'flex', justifyContent:'center', margin:'2rem'}}>
                <button onClick={toggleHandler}>Toggle Actor View</button>
            </div>
            {actorToggle &&
                <Row gutter={[10, 10]}>
                    {casts && casts.map((cast, index) => 
                        <React.Fragment key={index}>
                            <GridCards 
                                landingPage
                                image={cast.profile_path ? `${process.env.REACT_APP_MOVIEAPI_IMAGE_URI}w500${cast.profile_path}` : null}
                                charactorName={cast.name}
                            />
                        </React.Fragment>
                    )};
                </Row>
            }
        </div>
        {/* Header */}
      </div>
  );
}

export default MovieDetail;

import React, { useEffect, useState } from 'react';
import GridCards from './GridCards';
import MainImage from "./MainImage";
import { Row } from "antd";

function MovieMain() {

    const [movies, setMovies] = useState([]);
    const [mainMovieImage, setMainMovieImage] = useState(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchMovies(page);
    },[]);

    const fetchMovies = () => {
        const endPoint = `${process.env.REACT_APP_MOVIEAPI_URI}movie/popular?api_key=${process.env.REACT_APP_MOVIEAPI_KEY}&language=en-US&page=${page}`;

        fetch(endPoint)
        .then(response => response.json())
        .then(response => {
            setMovies([...movies, ...response.results]);
            setMainMovieImage(response.results[0]);
            setPage(response.page);
        });
    }
    const loadMoreItems = () => {
        fetchMovies(page+1);
    }

  return (
    <div style={{width : '100%' , margin : '0'}}>
        {mainMovieImage &&
            <MainImage 
                image={`${process.env.REACT_APP_MOVIEAPI_IMAGE_URI}w1280${mainMovieImage.backdrop_path}`}
                title={mainMovieImage.original_title}
                text={mainMovieImage.overview}
            />
        }
        <div style={{width : '85%' , margin : '1rem auto'}}>
            <h2> Movies By Latest</h2>
            <hr />
            <Row gutter={[10, 10]}>
                {movies && movies.map((movie, index) => 
                    <React.Fragment key={index}>
                        <GridCards 
                            image={movie.poster_path ? `${process.env.REACT_APP_MOVIEAPI_IMAGE_URI}w500${movie.poster_path}` : null}
                            movieId={movie.id}
                            movieName={movie.original_title}
                        />
                    </React.Fragment>
                )};
            </Row>
        </div>
        <div style={{display : 'flex', justifyContent : 'center'}}>
            <button onClick={loadMoreItems}>Load More</button>
        </div>
    </div>
    );
}

export default MovieMain;

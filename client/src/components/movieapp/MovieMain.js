import React, { useEffect } from 'react';

function MovieMain() {

    useEffect(() => {
        console.log(process.env);
        const endPoint = `${process.env.REACT_APP_MOVIEAPI_URI}movie/popular?api_key=${process.env.REACT_APP_MOVIEAPI_KEY}`;

    },[]);

  return (
    <div style={{width : '100%' , margin : '0'}}>
        <div style={{width : '85%' , margin : '1rem auth'}}>
            <h2> Movies By Latest</h2>
            <hr />
        </div>
        <div style={{display : 'flex', justifyContent : 'center'}}>
            <button>Load More</button>
        </div>
    </div>
    );
}

export default MovieMain;

import React, { useEffect } from 'react'
import Axios from 'axios';

function Favorite(props) {

    const {
        movieId, userFrom,
        movieInfo : { movieTitle, moviePost, movieRunTime }, 
    } = props;

    useEffect(() => {
    
        let variables = {
            userFrom,
            movieId,
        };

        Axios.post("/api/favorite/favoriteNumber", variables)
        .then(response => {
            console.log(response.data);
            if(response.data.success) {
                alert("success");
            }else {
                alert("숫자 정보를 가져오는데 실패 했습니다.");
            }
        })

    }, []);
    

  return (
    <div>
        <button>Favorite</button>
    </div>
  );
}

export default Favorite
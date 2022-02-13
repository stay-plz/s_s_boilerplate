import React, { useEffect, useState } from 'react'
import Axios from 'axios';

function Favorite(props) {
    const {
        movieId, userFrom,
        movieInfo : { original_title, release_date, runtime}, 
    } = props;

    let variables = {
        userFrom,
        movieId,
        original_title,
        release_date, 
        runtime
    };

    const [favoriteNumber, setFavofiteNumber] = useState(0);
    const [favorited, setFavorited] = useState(false);

    const onClickFavorite = () => {
        if(favorited) {
            Axios.post("/api/favorite/removeFavorite", variables)
                .then(response => {
                    if(response.data.success) {
                        setFavofiteNumber(favoriteNumber - 1);
                        setFavorited(!favorited);
                    }else {
                        alert("favorite remove fail");
                    }
                })
        } else {
            Axios.post("/api/favorite/addFavorite", variables)
                .then(response => {
                    if(response.data.success) {
                        setFavofiteNumber(favoriteNumber + 1);
                        setFavorited(!favorited);
                    }else {
                        alert("favorite add fali");
                    }
                })

        }
    }

    useEffect(() => {
        Axios.post("/api/favorite/favoriteNumber", variables)
            .then(response => {
                if(response.data.success) { 
                    setFavofiteNumber(response.data.favoriteNumber);
                }else {
                    alert("숫자 정보를 가져오는데 실패 했습니다.");
                }
        });

        Axios.post("/api/favorite/favorited", variables)
            .then(response => {
                if(response.data.success) {
                    setFavorited(response.data.isfavorited);
                }else {
                    alert("숫자 정보를 가져오는데 실패 했습니다.");
                }
        });

    }, []);
    

  return (
    <div>
        <button onClick={onClickFavorite}>{favorited ? "Not favorited" : "Add to Favorite"} {favoriteNumber}</button>
    </div>
  );
}

export default Favorite
import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./favorite.css"
import { Popover } from "antd"

function FavoritePage(props) {

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
       fetchFavoriteMovies();
            
    }, []);

    const onClickDelete = (movieId, userFrom) => {

        const variables = {
            movieId,
            userFrom,
        }

        Axios.post("/api/favorite/removeFavorite" , variables)
            .then(response => {
                if(response.data.success) {
                    fetchFavoriteMovies();
                } else {
                    alert("삭제실패")
                }
            })

    }

    const fetchFavoriteMovies = () => {
        Axios.post("/api/favorite/getFavoriteMovie", {userFrom : localStorage.getItem("userId")})
            .then(response => {
                if(response.data.success) {
                    setFavorites(response.data.favorites);
                }else {
                    alert("영화정보를 가져오는데 실패했습니다.")
                }
            })
    };
    
    const renderCards = favorites.map((favorite, index) => {

        const content = (
            <div>
                {favorite.moviePost ? 
                    <img  src={`${process.env.REACT_APP_MOVIEAPI_IMAGE_URI}w500${favorite.moviePost}`}/> : "no Image"
                }
            </div>
        )
        return <tr key={index}>
                    <Popover>
                        <td>{favorite.movieTitle}</td>
                    </Popover>
                        <td>{favorite.movieRunTime}</td>
                        <td><button onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}>Delete</button></td>
                </tr>
    })
                    
                    


    return (
    <div style={{ width : '85%', margin : '3rem auto' }}>
        <h2> Favorite Movies </h2>
        <hr />

        <table>
            <thead>
                <tr>
                    <th>movieTitle</th>
                    <th>Movie Runtime</th>
                    <th>Remove from favorites</th>
                </tr>
            </thead>
            <tbody>
              {renderCards}
            </tbody>
        </table>
    </div>
  )
}

export default FavoritePage
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Games.css";
import { GiftCardCard } from "./GiftCardCard";

export const Games = () => {
    const [games, setgames] = useState([]);

    const [gameSearchInput, setgameSearchInput] = useState("");
    console.log(gameSearchInput);

    useEffect(() => {
        axios
            .get("/getGames", { headers: { input: gameSearchInput } })
            .then((response) => {
                setgames([...response.data]);
            })
            .catch((err) => console.log(err));
    }, [gameSearchInput]);

    return (
        <div className="totalGameCards">
            <div>
                <h1>Games</h1>
            </div>
            <div className="searchGames">
                <input
                    placeholder="Search for games"
                    className="inputSearchGames"
                    type="text"
                    onChange={(e) => setgameSearchInput(e.target.value)}
                />
            </div>
            <div className="allCards">
                {games.map((product, index) => (
                    <Link to={`/giftcards/${product._id}`}>
                        <GiftCardCard
                            key={index}
                            img={product.img}
                            currentPrice={product.currentPrice}
                            originalPrice={product.originalPrice}
                            name={product.name}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
};

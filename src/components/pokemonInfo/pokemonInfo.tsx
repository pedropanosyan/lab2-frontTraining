import "./pokemonInfo.css";
import {IconType} from "react-icons";
import React from "react";
interface PokemonInfoInterface {
    icon:IconType;
    number:string
    category:string
}

function PokemonInfo({icon, number, category}:PokemonInfoInterface) {

    return (
        <div className="pokemonInfo-container">
            <div className="pokemonInfo-container--firstRow">
                {React.createElement(icon)}
                <p>{number}</p>
            </div>
            <p>{category}</p>
        </div>
    )

}


export default PokemonInfo
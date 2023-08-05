import "./pokemon.css"
import pokePh from "../../images/Vaporeon.webp"

function Pokemon() {

    return (
        <div className="pokemonPage-container">
            <div className="pokemonContainer">
                <div className="pokemonContainer-left">
                    <img src={pokePh}/>

                </div>
                <div>

                </div>

            </div>
        </div>
    )

}

export default Pokemon;
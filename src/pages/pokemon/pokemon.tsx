import "./pokemon.css"
import pokePh from "../../images/Vaporeon.webp"
import Type from "../../components/type/type";
import PokemonInfo from "../../components/pokemonInfo/pokemonInfo";
import { FaWeightHanging, FaRulerVertical, FaStar } from 'react-icons/fa';
import Stat from "../../components/stat/stat";
function Pokemon() {

    return (
        <div className="pokemonPage-container">
            <div className="pokemonContainer">
                <div className="pokemonContainer-left">
                    <img alt="" src={pokePh}/>
                    <h2>SomeName</h2>
                    <div className="pokemonContainer-left--types">
                        <Type type={"grass"} />
                        <Type type={"fire"} />
                    </div>
                    <div className="pokemonContainer-left--info">
                        <PokemonInfo icon={FaWeightHanging} number={"87 Kg"} category={"Weight"} />
                        <PokemonInfo icon={FaRulerVertical} number={"7 M"} category={"Height"} />
                        <PokemonInfo icon={FaStar} number={"64 Exp"} category={"Experience"} />
                    </div>
                </div>
                <div className="pokemonContainer-right">
                    <h4>Base Stats</h4>
                    <div>
                        <Stat name={"algo"} number={45} />
                    </div>
                </div>

            </div>
        </div>
    )

}

export default Pokemon;
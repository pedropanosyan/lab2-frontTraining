import pokemon from "../../images/pokemon.png"
import "./home.css"
import PokemonCard from "../../components/pokemonCard/pokemonCard";
import eevee from "../../images/Vaporeon.webp"
import axios from "axios";
import {useEffect, useState} from "react";


function Home() {

    const types = [
        "--Select A Type--",
        "normal",
        "fire",
        "water",
        "grass",
        "electric",
        "ice",
        "fighting",
        "poison",
        "ground",
        "flying",
        "psychic",
        "bug",
        "rock",
        "ghost",
        "dragon",
        "dark",
        "steel",
        "fairy"
    ];
    const [allPokemon, setAllPokemon] = useState<any[]>([]);

    const [search, setSearch] = useState("")


    useEffect(() => {
        async function fetchData() {
            const temp = await fetchAllPokemon();
            setAllPokemon(temp);
        }

        fetchData();
    }, []);
    async function fetchAllPokemon() {
        const totalPokemon = 20;
        const pokemonArray = [];

        for (let i = 1; i <= totalPokemon; i++) {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
            pokemonArray.push(response.data);
        }

        return pokemonArray;
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSearch(e.target.value);
    }

    return (
        <div className="homePage-container">
            <div className="homePage--pokeImgContainer">
                <img alt={"pokemon"} src={pokemon}/>
            </div>
            <div className="homePage--searchContainer">
                <input onChange={(e)=>handleInputChange(e)} placeholder='Buscar pokemon'/>
                <p>or</p>
                <select>
                    {types.map((type, index) => (
                        <option key={index} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <div style={{display:"flex", justifyContent:'center'}}>
                    <div className="homePage-pokemonCardContainer">
                        {allPokemon.map((pokemon, index) => (
                            <PokemonCard
                                id={pokemon.id}
                                name={pokemon.name}
                                types={pokemon.types}
                                imageUrl={pokemon.sprites.other.dream_world.front_default}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
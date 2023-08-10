import "./pokemon.css"
import pokePh from "../../images/Vaporeon.webp"
import Type from "../../components/type/type";
import PokemonInfo from "../../components/pokemonInfo/pokemonInfo";
import { FaWeightHanging, FaRulerVertical, FaStar } from 'react-icons/fa';
import Stat from "../../components/stat/stat";
import Evolution from "../../components/evolution/evolution";
import {useNavigate, useParams} from 'react-router-dom';
import axios from "axios";
import {useEffect, useState} from "react";

function Pokemon() {

    const navigate = useNavigate();

    const {id} = useParams()
    const [pokemon, setPokemon] = useState<any>()
    const [evolutions, setEvolutions] = useState<any[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
                if (response) {
                    setPokemon(response.data);
                    const evolutionChainResponse = await axios.get(`https://pokeapi.co/api/v2/evolution-chain/${id}`);
                    const evolutionChainData = evolutionChainResponse.data.chain.evolves_to;
                    const evolutionsTemp = await getEvolutions(evolutionChainData);
                    setEvolutions(evolutionsTemp)
                }
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, [id]);
    async function getEvolutions(evolutionChainData: any): Promise<any[]> {
        const evolutions: any[] = [];
        const length = evolutionChainData.length
        for (let i = 0; i < length; i++) {
            const pokemon = evolutionChainData[i].species.name;
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
            evolutions.push({
                name: response.data.name,
                image: response.data.sprites.other.dream_world.front_default
            })
        }
        return evolutions;
    }
    function capitalizeFirstLetter(word:string) { return word.charAt(0).toUpperCase() + word.slice(1);}

    function redirect(id: string) {
        navigate(`/pokemon/${id}`);
    }

    return (
        <div className="pokemonPage-container">
            {!pokemon ? (
                <p></p>
            ) : (
                <>
                    <div className="pokemonContainer">
                        <div className="pokemonContainer-left">
                            <img alt="" src={pokemon.sprites.other.dream_world.front_default}/>
                            <h2>{capitalizeFirstLetter(pokemon.name)}</h2>
                            <div className="pokemonContainer-left--types">
                                {pokemon.types.map((type: any, index: number) => (
                                    <Type key={index} shiny={true} type={type.type.name}/>
                                ))}
                            </div>
                            <div className="pokemonContainer-left--info">
                                <PokemonInfo icon={FaWeightHanging} number={`${pokemon.weight}`} category={"Weight"}/>
                                <PokemonInfo icon={FaRulerVertical} number={`${pokemon.height}`} category={"Height"}/>
                                <PokemonInfo icon={FaStar} number={`${pokemon.base_experience}`}
                                             category={"Experience"}/>
                            </div>
                        </div>
                        <div className="pokemonContainer-right">
                            <h4>Base Stats</h4>
                            <div>
                                {pokemon.stats.map((stat: any, index: number) => (
                                    <Stat key={index} name={capitalizeFirstLetter(stat.stat.name)} number={stat.base_stat} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="evolutionsContainer">
                        <div className="evolutionContainer-h3">
                            <h3>EVOLUTIONS</h3>
                        </div>
                        <div className="evolutions">
                            {evolutions.map((evolution, index) => (
                                <Evolution redirect={redirect} key={index} img={evolution.image} num={index + 1} name={evolution.name} />
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
);

}

export default Pokemon;
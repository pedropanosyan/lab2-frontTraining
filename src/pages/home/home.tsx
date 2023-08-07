import pokemon from "../../images/pokemon.png"
import "./home.css"
import PokemonCard from "../../components/pokemonCard/pokemonCard";
import axios from "axios";
import {useEffect, useState} from "react";
import InfiniteScroll from 'react-infinite-scroll-component';


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
    const [loaded, setLoaded] = useState(1)
    const [optionSelected, setOptionSelected] = useState("--Select A Type--");
    const [search, setSearch] = useState("")


    useEffect(() => {
        async function fetchData() {
            fetchPokemon();
        }
        fetchData();
    }, []);

    useEffect(() => {
        fetchPokemon();
    }, [optionSelected]);



    async function fetchAllPokemon() {
        const pokemonArray = [];
        console.log(allPokemon)
        console.log(loaded)
        for (let i = loaded; i <= loaded+15; i++) {
            if (pokemonArray.length > 898) return;
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
            pokemonArray.push(response.data);
        }
        const temp = await [...allPokemon, ...pokemonArray]
        setLoaded(loaded+16);
        setAllPokemon(temp);
        console.log(temp)
    }

    async function filterPokemonByType(targetType:string) {
        const filteredPokemon = [];
        console.log(loaded)
        let found = 0;
        for (let i = loaded; found < 15; i++) {
            if (i > 898) return;
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
            if (response.data.types.some((type: { type: { name: string; }; }) => type.type.name === targetType)) {
                filteredPokemon.push(response.data);
                found++;
            }
        }
        setLoaded(loaded + 16)
        setAllPokemon(filteredPokemon)
        console.log(allPokemon)
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) { setSearch(e.target.value);}

    async function handleSelectChange(option:string) {
        if (option === "--Select A Type--") {setAllPokemon([])}
        setOptionSelected(option);
        setLoaded(1)
    }

    function fetchPokemon() {
        console.log('1')
        if (optionSelected === "--Select A Type--") {
            fetchAllPokemon()
        } else {
            console.log('3')
            filterPokemonByType(optionSelected);
        }
    }

    return (
        <div className="homePage-container">
            <div className="homePage--pokeImgContainer">
                <img alt={"pokemon"} src={pokemon}/>
            </div>
            <div className="homePage--searchContainer">
                <input onChange={(e)=>handleInputChange(e)} placeholder='Buscar pokemon'/>
                <p>or</p>
                <select onChange={(e) => handleSelectChange(e.target.value)}>
                    {types.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                    ))}
                </select>
            </div>
            <div>
                <InfiniteScroll
                    dataLength={allPokemon.length}
                    next={fetchPokemon}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                >
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
                </InfiniteScroll>
            </div>
        </div>
    )
}

export default Home;
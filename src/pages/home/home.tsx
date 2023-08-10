import pokemon from "../../images/pokemon.png"
import "./home.css"
import PokemonCard from "../../components/pokemonCard/pokemonCard";
import axios from "axios";
import {useEffect, useState} from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { FaSearch } from 'react-icons/fa';


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
    const [typeCounter, setTypeCounter] = useState(1);

    const [isLoading, setIsLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)

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
        if (loaded > 1015) return;
        for (let i = loaded ; i <= loaded+15; i++) {
            if (pokemonArray.length > 1015) {setHasMore(false); break;}
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
            pokemonArray.push(response.data);
        }
        const temp = await [...allPokemon, ...pokemonArray]
        setLoaded(loaded+16);
        setAllPokemon(temp);
        setIsLoading(false)
    }

    async function filterPokemonByType(targetType:string) {
        const filteredPokemon = allPokemon;
        let found = 0;
        console.log(typeCounter)
        let i = typeCounter;
        for (i; found < 16; i++) {
            if (i > 1010) {
                setHasMore(false)
                return;
            }
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
            if (response.data.types.some((type: { type: { name: string; }; }) => type.type.name === targetType)) {
                filteredPokemon.push(response.data);
                found++;
            }
        }
        console.log(filteredPokemon)
        setTypeCounter(i)
        setLoaded(loaded + 16)
        setAllPokemon(filteredPokemon)
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSearch(e.target.value);
        setHasMore(true)
    }

    async function handleSelectChange(option:string) {
        setAllPokemon([])
        setHasMore(true)
        setOptionSelected(option);
        setLoaded(1)

    }

    function fetchPokemon() {
        console.log('another')
        setIsLoading(true)
        if (optionSelected === "--Select A Type--") {
            fetchAllPokemon()
        } else {
            filterPokemonByType(optionSelected);
        }
    }
    
    async function handleSubmit() {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`);
            setAllPokemon([response.data]);
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching Pokemon data:', error);
        }

    }

    return (
        <div className="homePage-container">
            <div className="homePage--pokeImgContainer">
                <img alt={"pokemon"} src={pokemon}/>
            </div>
            <div className="homePage--searchContainer">
                <input onSubmit={handleSubmit} onChange={(e)=>handleInputChange(e)} placeholder='Buscar pokemon'/>
                <FaSearch onClick={handleSubmit} style={{cursor:'pointer'}} color={'white'} size={24} />
                <p>or</p>
                <select onChange={(e) => handleSelectChange(e.target.value)}>
                    {types.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                    ))}
                </select>
            </div>
            <div>
                <InfiniteScroll
                    style={{overflow:'hidden'}}
                    dataLength={allPokemon.length}
                    next={fetchPokemon}
                    hasMore={hasMore}
                    loader={isLoading && <Box style={{ display: 'flex', justifyContent:'center' }}><CircularProgress  /></Box>}
                >
                <div style={{display:"flex", justifyContent:'center'}}>
                    <div className="homePage-pokemonCardContainer">
                        {allPokemon && allPokemon.map((pokemon, index) => (
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
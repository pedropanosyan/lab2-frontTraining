import "./evolution.css"
import {useNavigate} from "react-router-dom";
import axios from "axios";

interface EvolutionInterface {
    img:string
    num:number
    name:string
    redirect:(id: string) => void
}

function Evolution({img, num, name, redirect}:EvolutionInterface) {


    function capitalizeFirstLetter(word:string) { return word.charAt(0).toUpperCase() + word.slice(1);}

    async function findPokemon() {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        return response.data.id
    }

    async function goToPokemon() {
        const id = await findPokemon()
        redirect(id)
    }

    return (
        <div className="evolutionContainer">
            <img style={{cursor:'pointer'}} onClick={goToPokemon} alt={name} src={img}/>
            <p>#{num}</p>
            <div className="evolutionContainer-name">
                <p>{capitalizeFirstLetter(name)}</p>
            </div>
        </div>

    )


}

export default Evolution
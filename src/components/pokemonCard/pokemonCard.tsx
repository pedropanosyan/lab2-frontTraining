import {Card, CardContent, CardMedia, Typography, CardActions} from '@mui/material';
import "./pokemonCard.css"
import {useEffect, useState} from "react";
import Type from "../type/type";
import LikeIcon from "./likeIcon";
import { useNavigate } from 'react-router-dom';
interface PokemonCardProps {
    name:string;
    types:any[];
    imageUrl:string;
    id:string
}


const PokemonCard = ({ name, types, imageUrl, id }:PokemonCardProps) => {

    const navigate = useNavigate();

    const [pokemonTypes, setPokemonTypes] = useState<any[]>([])
    const [isLiked, setIsLiked] =useState(false);
    function getTypes() {
        const temp = types.map(type => type.type.name);
        setPokemonTypes(temp)
    }

    useEffect(() => {
        getTypes()
    }, [name, types]);

    function handleLike(value:boolean) {
        setIsLiked(value)
    }
    function capitalizeFirstLetter(word:string) { return word.charAt(0).toUpperCase() + word.slice(1);}

    function goToPokemonPage() {
        navigate(`/pokemon/${id}`);
    }
    
    
    return (
        <div className="pokemonCard-container">
            <Card style={{borderRadius:'16px', width:'270px', height:'auto', backgroundColor:'rgb(0,0,0,0)'}}>
                <div onClick={goToPokemonPage}  className="pokemonCard-imgContainer">
                    <CardMedia component="img" alt={name} image={imageUrl} className="pokemonCard-img" />
                </div>
                <div className="pokemonCard-contentContainer">
                    <CardContent >
                        <div className="pokemonCard-contentContainer--header">
                            <p>Nro° {id}</p>
                            <LikeIcon isLiked={isLiked} onClick={handleLike} />
                        </div>
                        <Typography color={'white'} textAlign={'center'} gutterBottom variant="h5" component="div">
                            {capitalizeFirstLetter(name)}
                        </Typography>
                    </CardContent>
                    <CardActions className="pokemonCard-typesContainer">
                        {pokemonTypes.map((type, index) => (
                            <Type shiny={false} type={type} />
                        ))}
                    </CardActions>
                </div>
            </Card>
        </div>
    );
};
export default PokemonCard;
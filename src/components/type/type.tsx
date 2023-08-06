import "./type.css";


interface TypeInterface {
    type:string
    shiny:boolean
}

function Type({type, shiny}:TypeInterface) {

    const variants = {
        normal: { color: 'black', background: 'gray' },
        fire: { color: 'white', background: 'red' },
        water: { color: 'white', background: 'blue' },
        grass: { color: 'black', background: 'green' },
        electric: { color: 'black', background: 'yellow' },
        ice: { color: 'black', background: 'lightblue' },
        fighting: { color: 'white', background: 'darkred' },
        poison: { color: 'white', background: 'purple' },
        ground: { color: 'black', background: 'tan' },
        flying: { color: 'black', background: 'skyblue' },
        psychic: { color: 'white', background: 'pink' },
        bug: { color: 'black', background: 'green' },
        rock: { color: 'white', background: 'brown' },
        ghost: { color: 'white', background: 'purple' },
        dragon: { color: 'white', background: 'indigo' },
        dark: { color: 'white', background: 'darkgray' },
        steel: { color: 'black', background: 'silver' },
        fairy: { color: 'black', background: 'lightpink' },
    };
    const variant = variants[type as keyof typeof variants];

    const shadow = shiny ? `0 0 6px 3px ${variant.background}` : '';
    const padding = shiny ? '2px 24px' : '2px 8px';

    function capitalizeFirstLetter(word:string) { return word.charAt(0).toUpperCase() + word.slice(1);}


    return (
        <div style={{background:variant.background, boxShadow:shadow, padding:padding}} className="typeContainer">
            <p style={{color: variant.color}}>{capitalizeFirstLetter(type)}</p>
        </div>
    )

}

export default Type;
import "./type.css";


interface TypeInterface {
    type:string
}

function Type({type}:TypeInterface) {

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

    function capitalizeFirstLetter(word:string) { return word.charAt(0).toUpperCase() + word.slice(1);}


    return (
        <div style={{background:variant.background}} className="typeContainer">
            <p style={{color: variant.color}}>{capitalizeFirstLetter(type)}</p>
        </div>
    )

}

export default Type;
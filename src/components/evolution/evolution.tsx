import "./evolution.css"

interface EvolutionInterface {
    img:string
    num:number
    name:string
}

function Evolution({img, num, name}:EvolutionInterface) {

    return (
        <div className="evolutionContainer">
            <img alt={name} src={img}/>
            <p>#{num}</p>
            <div className="evolutionContainer-name">
                <p>{name}</p>
            </div>
        </div>

    )


}

export default Evolution
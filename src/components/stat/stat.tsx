import "./stat.css"
import LinearProgress from '@mui/material/LinearProgress';

interface StatInterface {
    name:string
    number:number
}


function Stat({name, number}:StatInterface) {

    return (
        <div className="statContainer">
            <p>{name}</p>
            <LinearProgress variant="determinate" value={number} sx={{animation: 'none', width:'60%', height:'24px'}} />
        </div>
    )


}

export default Stat
import "./stat.css"
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
interface StatInterface {
    name:string
    number:number
}


function Stat({name, number}:StatInterface) {

    return (
        <div className="statContainer">
            <p>{name}</p>
            <LinearProgress variant="determinate" value={number} sx={{animation: 'none', width:'50%', height:'20px', borderRadius:'16px'}} />
            <span>{number}%</span>
        </div>
    )


}

export default Stat
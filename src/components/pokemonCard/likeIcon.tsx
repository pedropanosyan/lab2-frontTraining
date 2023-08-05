import { IoHeartOutline, IoHeartSharp } from 'react-icons/io5';

interface LikeIconInterface {
    isLiked:boolean
    onClick: (b:boolean) => void
}

const LikeIcon = ({ isLiked, onClick }:LikeIconInterface) => {
    const Icon = isLiked ? IoHeartSharp : IoHeartOutline;
    const handleClick = () => { return onClick(!isLiked) };

    return (
        <Icon style={{cursor:'pointer'}} onClick={handleClick} size={24} color={'red'} />
    );
};

export default LikeIcon;
import PropTypes from "prop-types";
import s from "./CharacterBox.module.scss";
import { useRouter } from "next/router";

function CharacterBox({ character }) {
    const router = useRouter();
    const imageUrl = character?.thumbnail.path.replace("http", "https");

    const handleClick = () => {
        router.push(`/characters/${character?.id}`)
    }
    
    return (
        <div className={s.root} onClick={handleClick} >
            <div className={s.title}>{character?.name}</div>
            <div className={s.image}>
                <img alt={character?.name} className={s.image} src={imageUrl + "/portrait_xlarge." + character?.thumbnail.extension} />
            </div>
        </div>
    )
}

CharacterBox.propTypes = {
    character: PropTypes.object.isRequired,
}


export default CharacterBox;
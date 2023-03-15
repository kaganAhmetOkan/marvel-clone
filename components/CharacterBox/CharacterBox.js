import PropTypes from "prop-types";
import s from "./CharacterBox.module.scss";
import { useRouter } from "next/router";
import { useRef, useEffect } from "react";


function CharacterBox({ character, index}) {
    const router = useRouter();
    const imageUrl = character?.thumbnail.path.replace("http", "https");
    const theRoot = useRef();
    const delay = index * 50 % 2400 + 400;

    const handleClick = () => {
        router.push(`/characters/${character?.id}`)
    }

    useEffect(() => {
        setTimeout(() => {
            if (theRoot.current !== null) {theRoot.current.style.opacity = 100}
        }, delay)
    }, [])

    return (
        <div className={s.root} ref={theRoot} style={{animationDelay: `${delay}ms`}} onClick={handleClick} >
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
import s from "./Characters.module.scss";
import PropTypes from "prop-types";
import CharacterBox from "../CharacterBox/CharacterBox";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import boxStyle from "../CharacterBox/CharacterBox.module.scss";


function Characters({ characterData }) {
    const mockArray = [];
    for (let i = 0; i < 48; i++) {
        mockArray.push(i);
    }

    return (
        <div className={s.root}>{
            characterData?.length > 0 ?
                <div className={s.charactersContainer}>
                    {
                        characterData?.map((item, index) => {
                            return (
                                <CharacterBox key={index} index={index} character={item} />
                            )
                        })
                    }
                </div> :
                <div className={s.charactersContainer}>
                    {
                        mockArray.map((index) => {
                            return (
                                <Skeleton key={index} className={boxStyle.root} style={{borderRadius: "16px", animation: "none", opacity: 100}} amount={48} />
                            )
                        })
                    }
                </div>
            }
        </div>
    )

}

Characters.propTypes = {
    characterData: PropTypes.array,

}

Characters.defaultProps = {
    characterData: [],
}

export default Characters;

//characterData?.length > 0 ? 
// : <img src={loadingForever.src} className={s.loading} ></img>
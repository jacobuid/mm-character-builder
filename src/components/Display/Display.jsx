import React from 'react';
import ToggleSwitch from "../Inputs/ToggleSwitch";

const Display = (props) => {

    const toggleInspiration = (e) => {
        let currentCharacter = { ...props.character };
        currentCharacter.inspiration = !currentCharacter.inspiration;
        props.setCharacter(currentCharacter);
    };

    const setExperience = (e) => {
        let currentCharacter = { ...props.character };
        currentCharacter.experience = e.target.value;
        props.setCharacter(currentCharacter);
    };

    const setLevel = (e) => {
        let currentCharacter = { ...props.character };
        currentCharacter.level = e.target.value;
        props.setCharacter(currentCharacter);
    };

    return (
            <div className="wp-display">
                <img
                    className="wp-charicter-portrait"
                    src="./images/character/bard.png"
                    alt="Character Portrait"
                />
                
                <div className="wp-stats">
                    <p>
                        <span>Inspiration:&nbsp;</span>
                        <ToggleSwitch 
                            checked={props.character.inspiration} 
                            onChange={toggleInspiration}
                        />
                    </p> 
                    <p>
                        <span>Experience:&nbsp;</span>
                        <input type="number" value={props.character.experience} onChange={setExperience} />
                    </p>
                    
                    <p>
                        <span>Level:&nbsp;</span>
                        <input type="number" value={props.character.level} onChange={setLevel} />
                    </p>
                </div> 
            </div>
    );
}

export default Display;
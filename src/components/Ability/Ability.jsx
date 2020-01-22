import React, { Component } from "react";
import PropTypes from "prop-types";
import calculations from "../../_utils/dnd-calculations";

import NumberInput from "../Inputs/NumberInput";
import calculate from "../../_utils/dnd-calculations";

class Ability extends Component {
    handleValueChange = e => {
        if (this.props.onValueChange) {
            this.props.onValueChange(e);
        }
    };

    handleCheckboxChange = e => {
        if (this.props.onCheckboxChange) {
            this.props.onCheckboxChange(e);
        }
    };

    render() {
        let {
            ability,
            bonus,
            proficient,
            advantage,
            disadvantage
        } = this.props;

        let dice = (<img className="dice" src="/images/dice/d20.png" alt="d20" />);
        let advDice = (<img className="dice" src="/images/dice/d20-green.png" alt="d20" />);
        let disadvDice = (<img className="dice" src="/images/dice/d20-red.png" alt="d20" />);

        let roll = advantage && disadvantage ? dice :
            advantage ? [advDice, " + ", dice] :
                disadvantage ? [dice, " + ", disadvDice] :
                    dice;

        let modifier = proficient ? " + " + (calculate.modifier(ability) + bonus) :
            " + " + calculate.modifier(ability);

        return (
            <div className="ability">
                <div className="ability-banner dnd-box">
                    <img
                        className="ability-icon"
                        src="/images/strength.png"
                        alt=""
                    />
                    <p className="ability-tag">Strength</p>
                    <div className="ability-stat">
                        <NumberInput
                            value={ability || ""}
                            id="strength"
                            onChange={this.handleValueChange}
                        />
                    </div>
                    <p className="ability-mod outline">
                        {calculations.modifier(ability)}
                    </p>
                </div>
                <div className="command">
                    <div className="command-tag">
                        Ability Check (pro:
                        <input
                            name="strengthProficient"
                            type="checkbox"
                            checked={proficient || false}
                            onChange={this.handleCheckboxChange}
                        />
                        , adv:
                        <input
                            name="strengthAdvantage"
                            type="checkbox"
                            checked={advantage || false}
                            onChange={this.handleCheckboxChange}
                        />
                        , dis:
                        <input
                            name="strengthDisadvantage"
                            type="checkbox"
                            checked={disadvantage || false}
                            onChange={this.handleCheckboxChange}
                        />
                        )
                    </div>
                    <div className="command-task dnd-box dnd-border">
                        {roll} {modifier}
                    </div>
                </div>
                <div className="command">
                    <div className="command-tag">
                        Saving Throw (pro:
                        <input type="checkbox" />, adv:
                        <input type="checkbox" />, dis:
                        <input type="checkbox" />)
                    </div>
                    <div className="command-task dnd-box dnd-border">
                        <img
                            className="dice"
                            src="/images/dice/d20.png"
                            alt="d20"
                        />{" "}
                        + 6
                    </div>
                </div>
            </div>
        );
    }
}

Ability.propTypes = {
    ability: PropTypes.string,
    bonus: PropTypes.number,
    proficient: PropTypes.bool,
    advantage: PropTypes.bool,
    disadvantage: PropTypes.bool
};

export default Ability;

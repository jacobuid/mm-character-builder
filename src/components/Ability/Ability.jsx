import React, { Component } from "react";
import PropTypes from "prop-types";

import NumberInput from "../Inputs/NumberInput";
import calculate from "../../_utils/wp-calculations";

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
            label,
            bonus,
            proficient,
            expertise,
            advantage,
            disadvantage,
            saveProficient,
            saveExpertise,
            saveAdvantage,
            saveDisadvantage
        } = this.props;

        let d20 = <img className="dice" src="/images/dice/d20.png" alt="d20" key="0" />;
        let d20Adv = <img className="dice" src="/images/dice/d20-green.png" alt="d20 Advantage" key="1" />;
        let d20Dis = <img className="dice" src="/images/dice/d20-red.png" alt="d20 Disadvantage" key="2" />;

        let modifier = calculate.modifier(ability);

        let abilityRoll = calculate.getRoll(advantage, disadvantage, { norm: d20, adv: d20Adv, dis: d20Dis });
        let abilityModifier = calculate.getModifier(expertise, proficient, modifier, bonus);

        let saveRoll = calculate.getRoll(saveAdvantage, saveDisadvantage, { norm: d20, adv: d20Adv, dis: d20Dis });
        let saveModifier = calculate.getModifier(saveExpertise, saveProficient, modifier, bonus);

        return (
            <div className="ability">
                <div className="ability-banner wp-box">
                    <img
                        className="ability-icon"
                        src={`/images/${label}.png`}
                        alt=""
                    />
                    <p className="ability-tag">{label.charAt(0).toUpperCase() + label.slice(1)}</p>
                    <div className="ability-stat">
                        <NumberInput
                            value={ability || ""}
                            id={label}
                            onChange={this.handleValueChange}
                        />
                    </div>
                    <p className="ability-mod outline">
                        {modifier}
                    </p>
                </div>
                <div className="command">
                    <div className="command-tag">
                        <div>Ability Check</div>
                        (exp:
                        <input
                            name={`${label}Expertise`}
                            type="checkbox"
                            checked={expertise || false}
                            onChange={this.handleCheckboxChange}
                        />
                        &nbsp;pro:
                        <input
                            name={`${label}Proficient`}
                            type="checkbox"
                            checked={proficient || 0}
                            onChange={this.handleCheckboxChange}
                        />
                        &nbsp;adv:
                        <input
                            name={`${label}Advantage`}
                            type="checkbox"
                            checked={advantage || false}
                            onChange={this.handleCheckboxChange}
                        />
                        &nbsp;dis:
                        <input
                            name={`${label}Disadvantage`}
                            type="checkbox"
                            checked={disadvantage || false}
                            onChange={this.handleCheckboxChange}
                        />
                        )
                    </div>
                    <div className="command-task wp-box wp-border">
                        {abilityRoll} {abilityModifier}
                    </div>
                </div>
                <div className="command">
                    <div className="command-tag">
                        <div>Saving Throw</div>
                        (exp:
                        <input
                            name={`${label}SaveExpertise`}
                            type="checkbox"
                            checked={saveExpertise || false}
                            onChange={this.handleCheckboxChange}
                        />
                        &nbsp;pro:
                        <input
                            name={`${label}SaveProficient`}
                            type="checkbox"
                            checked={saveProficient || false}
                            onChange={this.handleCheckboxChange}
                        />
                        &nbsp;adv:
                        <input
                            name={`${label}SaveAdvantage`}
                            type="checkbox"
                            checked={saveAdvantage || false}
                            onChange={this.handleCheckboxChange}
                        />
                        &nbsp;dis:
                        <input
                            name={`${label}SaveDisadvantage`}
                            type="checkbox"
                            checked={saveDisadvantage || false}
                            onChange={this.handleCheckboxChange}
                        />
                        )
                    </div>
                    <div className="command-task wp-box wp-border">
                        {saveRoll} {saveModifier}
                    </div>
                </div>
            </div>
        );
    }
}

Ability.propTypes = {
    ability: PropTypes.string,
    bonus: PropTypes.number,
    expertise: PropTypes.bool,
    proficient: PropTypes.string,
    advantage: PropTypes.bool,
    disadvantage: PropTypes.bool
};

export default Ability;

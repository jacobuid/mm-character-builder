import React from 'react';
import { Container, Row } from "../Layout/Layout";
import TextInput from "../Inputs/TextInput";
import NumberInput from "../Inputs/NumberInput";
import ToggleSwitch from "../Inputs/ToggleSwitch";


const SkillList = (props) => {


    const [skill, setSkill] = React.useState('');
    const [proficiency, setProficiency] = React.useState('');
    const [specific, setSpecific] = React.useState(false);

    const skillChange = e => {
        setSkill(e.target.value);
    };
    const proficiencyChange = e => {
        setProficiency(e.target.value);
    };
    const specificChange = e => {
        setSpecific(e.target.checked);
    };

    const addItem = (e) => {
        e.preventDefault();
        let currentCharacter = { ...props.character };
        let max = (specific) ? 12 : 10;
        currentCharacter.skills.push({
            id: "id" + new Date().getTime(),
            name: skill,
            proficiency: proficiency,
            specific: specific,
            max:max
        });
        props.setCharacter(currentCharacter);
        setSkill('');
        setProficiency('');
        setSpecific(false);
    };

    const handleRemove = id => {
        removeItem(id);
    };

    const removeItem = (id) => {
        let currentCharacter = { ...props.character };
        currentCharacter.skills = currentCharacter.skills.filter(
            (value) => value.id !== id
        );
        props.setCharacter(currentCharacter);
    };

    const nameEdit = (e, id) => {
        editItem(e, id, 'name');
    };
    const proficiencyEdit = (e, id) => {
        editItem(e, id, 'proficiency');
    };
    const specificEdit = (e, id) => {
        editItem(e, id, 'specific');
    };

    const editItem = (e, id, attr) => {
        let currentCharacter = { ...props.character };
        currentCharacter.skills = currentCharacter.skills.map(item => {
            let currentItem;
            if (item.id === id) {
                if (attr === 'name') {
                    currentItem = { ...item, name: e.target.value }
                }
                if (attr === 'proficiency') {
                    currentItem = { ...item, proficiency: e.target.value }
                }
                if (attr === 'specific') {
                    if(e.target.checked){
                        item.max = 12;
                        item.proficiency = parseInt(item.proficiency) + 2;
                    } else {
                        item.max = 10
                        item.proficiency = parseInt(item.proficiency) - 2;
                    }
                    currentItem = { ...item, specific: e.target.checked }
                }
            } else {
                currentItem = item;
            }
            return currentItem;
        })
        props.setCharacter(currentCharacter);
    };

    return (
        <>
            <Row>
                <Container>
                    {props.character.skills.map((item, i) => (
                        <div id={'skill-' + item.id} className="wp-skill" key={item.id}>
                            <Row>
                                <Container className="skill-name-padding" size="2">
                                    <TextInput
                                        id={'name-' + item.id}
                                        value={item.name}
                                        onChange={(e) => nameEdit(e, item.id)}
                                    />
                                </Container>
                            </Row>
                            <Row className="skill-info">
                                <Container className="skill-proficiency">
                                    <label className="f-grey h4">Proficiency:</label>
                                    <NumberInput
                                        id={'proficiency-' + item.id}
                                        max={item.max}
                                        value={item.proficiency}
                                        onChange={(e) => proficiencyEdit(e, item.id)}
                                    />
                                </Container>
                                <Container className="skill-specific">
                                    <label className="f-grey h4">Specific:</label>
                                    <ToggleSwitch  
                                        checked={item.specific} 
                                        onChange={(e) => specificEdit(e, item.id)}
                                    />
                                </Container>
                            </Row>
                            <button className="wp-delete" type="button" onClick={() => handleRemove(item.id)}>X</button>
                        </div>
                    ))}
                </Container>
            </Row>
            <form onSubmit={addItem}>
                <Row className="wp-add">
                    <Container>
                        <TextInput
                            value={skill}
                            onChange={skillChange}
                            allowEnter={true}
                        />
                    </Container>
                    <Container>
                        <TextInput
                            value={proficiency}
                            onChange={proficiencyChange}
                            allowEnter={true}
                        />
                    </Container>
                    <Container>
                        <label className="f-grey h4">Specific:</label>
                        <ToggleSwitch checked={specific} onChange={specificChange} />
                    </Container>
                </Row>
                <Row>
                    <button type="submit">Add Item</button>
                </Row>
            </form>

        </>
    );
};

export default SkillList;
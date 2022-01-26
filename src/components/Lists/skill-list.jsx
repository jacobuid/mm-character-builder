import React from 'react';
import { Container, Row } from "../Layout/Layout";
import TextInput from "../Inputs/TextInput";
import NumberInput from "../Inputs/NumberInput";


const SkillList = (props) => {

    const [skill, setSkill] = React.useState('');
    const [proficiency, setProficiency] = React.useState('');

    const skillChange = e => {
        setSkill(e.target.value);
    };
    const proficiencyChange = e => {
        setProficiency(e.target.value);
    };


    const handleSubmit = event => {
        if (props.addCallback && skill) {
            props.addCallback(skill, proficiency, 'skills');
        }
        setSkill('');
        setProficiency('')
        event.preventDefault();
    };

    const handleRemove = id => {
        props.removeCallback(id, 'skills');
    };

    const nameEdit = (e, id) => {
        props.editCallback(e, id, 'skills', 'name');
    };
    const proficiencyEdit = (e, id) => {
        props.editCallback(e, id, 'skills', 'proficiency');
    };

    return (
        <>
            <Row>
                <Container>
                    {props.skills.map((item, i) => (
                        <div className="wp-skill" key={item.id}>
                            <Row>
                                <Container>
                                    <label className="f-grey h4">Name:</label>
                                    <TextInput
                                        value={item.name}
                                        onChange={(e) => nameEdit(e, item.id)}
                                    />
                                </Container>
                                <Container>
                                    <label className="f-grey h4">Proficiency:</label>
                                    <NumberInput
                                        value={item.proficiency}
                                        onChange={(e) => proficiencyEdit(e, item.id)}
                                    />
                                </Container>
                            </Row>


                            <button className="wp-delete" type="button" onClick={() => handleRemove(item.id)}>
                                X
                            </button>
                        </div>
                    ))}
                </Container>
            </Row>
            <form onSubmit={handleSubmit}>
                <Row>
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
                        <button type="submit">Add Item</button>
                    </Container>
                </Row>
            </form>

        </>
    );
};

export default SkillList;
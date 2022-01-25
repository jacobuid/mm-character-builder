import React from 'react';
import { Container, Row } from "../Layout/Layout";

const SkillList = (props) => {

    const [skill, setSkill] = React.useState('');
    const [editing, setEditing] = React.useState(false);

    const handleChange = e => {
        setSkill(e.target.value);
    };

    const handleSubmit = event => {
        if (props.addCallback && skill) {
            props.addCallback(skill, 'skills');
        }
        setSkill('');
        event.preventDefault();
    };

    const handleRemove = name => {
        props.removeCallback(name, 'skills');
    };

    return (
        <>
            <Row>
                <Container>
                    {props.skills.map((item, i) => (
                        <div key={i}>
                            {editing ?
                                <input type="text" value={item.name} /> :
                                <label>{item.name}</label>
                            }


                            <button type="button" onClick={() => setEditing(!editing)}>edit</button>
                            <button type="button" onClick={() => handleRemove(item.id)}>
                                delete
                            </button>
                        </div>
                    ))}
                </Container>
            </Row>
            <Row>
                <Container>
                    <form onSubmit={handleSubmit}>
                        <input type="text" value={skill} onChange={handleChange} />
                        <button type="submit">Add Item</button>
                    </form>
                </Container>
            </Row>
        </>
    );
};

export default SkillList;
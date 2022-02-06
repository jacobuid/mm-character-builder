import React from 'react';
import { Container, Row } from "../Layout/Layout";
import TextInput from "../Inputs/TextInput";
import ToggleSwitch from "../Inputs/ToggleSwitch";


const TraitList = (props) => {

    const [trait, setTrait] = React.useState('');
    const [effect, setEffect] = React.useState('');
    const [active, setActive] = React.useState(false);

    const traitChange = e => {
        setTrait(e.target.value);
    };
    const effectChange = e => {
        setEffect(e.target.value);
    };
    const activeChange = e => {
        setActive(e.target.checked);
    };



    const addItem = (e) => {
        e.preventDefault();
        let currentCharacter = { ...props.character };
        currentCharacter.traits.push({
            id: "id" + new Date().getTime(),
            name: trait,
            effect: effect,
            active: active
        });
        props.setCharacter(currentCharacter);
        setTrait('');
        setEffect('');
        setActive(false);
    };

    const handleRemove = id => {
        removeItem(id);
    };

    const removeItem = (id) => {
        let currentCharacter = { ...props.character };
        currentCharacter.traits = currentCharacter.traits.filter(
            (value) => value.id !== id
        );
        props.setCharacter(currentCharacter);
    };

    const nameEdit = (e, id) => {
        editItem(e, id, 'name');
    };
    const effectEdit = (e, id) => {
        editItem(e, id, 'effect');
    };
    const activeEdit = (e, id) => {
        editItem(e, id, 'active');
    };

    const editItem = (e, id, attr) => {
        let currentCharacter = { ...props.character };
        currentCharacter.traits = currentCharacter.traits.map(item => {
            let currentItem;
            if (item.id === id) {
                if (attr === 'name') {
                    currentItem = { ...item, name: e.target.value }
                }
                if (attr === 'effect') {
                    currentItem = { ...item, effect: e.target.value }
                }
                if (attr === 'active') {
                    currentItem = { ...item, active: e.target.checked }
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
                    {props.character.traits.map((item, i) => (
                        <div className="wp-trait" key={item.id}>
                            <Row>
                                <Container className="trait-name-padding" size="2">
                                    <TextInput
                                        id={'name-' + item.id}
                                        value={item.name}
                                        onChange={(e) => nameEdit(e, item.id)}
                                    />
                                </Container>
                            </Row>
                            <Row className="trait-info">
                                <Container className="trait-effect">
                                    <label className="f-grey h4">Effect:</label>
                                    <TextInput
                                        id={'effect-' + item.id}
                                        value={item.effect}
                                        onChange={(e) => effectEdit(e, item.id)}
                                    />
                                </Container>
                                <Container className="trait-active">
                                    <label className="f-grey h4">Active:</label>
                                    <ToggleSwitch  
                                        checked={item.active} 
                                        onChange={(e) => activeEdit(e, item.id)}
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
                            value={trait}
                            onChange={traitChange}
                            allowEnter={true}
                        />
                    </Container>
                    <Container>
                        <TextInput
                            value={effect}
                            onChange={effectChange}
                            allowEnter={true}
                        />
                    </Container>
                    <Container>
                        <label className="f-grey h4">Active:</label>
                        <ToggleSwitch checked={active} onChange={activeChange} />
                    </Container>
                </Row>
                <Row>
                    <button type="submit">Add Item</button>
                </Row>
            </form>

        </>
    );
};

export default TraitList;
import React from "react";
import { Container, Row, Spacer } from "../Layout/Layout";
import TextInput from "../Inputs/TextInput";
import NumberInput from "../Inputs/NumberInput";
import ToggleSwitch from "../Inputs/ToggleSwitch";

const ActionList = (props) => {
  const [action, setaction] = React.useState("");
  const [proficiency, setProficiency] = React.useState("");
  const [specific, setSpecific] = React.useState(false);

  const actionChange = (e) => {
    setaction(e.target.value);
  };
  const proficiencyChange = (e) => {
    setProficiency(e.target.value);
  };
  const specificChange = (e) => {
    setSpecific(e.target.checked);
  };

  const addItem = (e) => {
    e.preventDefault();
    let currentCharacter = { ...props.character };
    let max = specific ? 12 : 10;
    currentCharacter.actions.push({
      id: "id" + new Date().getTime(),
      name: action,
      proficiency: proficiency,
      specific: specific,
      max: max,
    });
    props.setCharacter(currentCharacter);
    setaction("");
    setProficiency("");
    setSpecific(false);
  };

  const handleRemove = (id) => {
    removeItem(id);
  };

  const removeItem = (id) => {
    let currentCharacter = { ...props.character };
    currentCharacter.actions = currentCharacter.actions.filter(
      (value) => value.id !== id
    );
    props.setCharacter(currentCharacter);
  };

  const nameEdit = (e, id) => {
    editItem(e, id, "name");
  };
  const proficiencyEdit = (e, id) => {
    editItem(e, id, "proficiency");
  };
  const specificEdit = (e, id) => {
    editItem(e, id, "specific");
  };

  const editItem = (e, id, attr) => {
    let currentCharacter = { ...props.character };
    currentCharacter.actions = currentCharacter.actions.map((item) => {
      let currentItem;
      if (item.id === id) {
        if (attr === "name") {
          currentItem = { ...item, name: e.target.value };
        }
        if (attr === "proficiency") {
          currentItem = { ...item, proficiency: e.target.value };
        }
        if (attr === "specific") {
          if (e.target.checked) {
            item.max = 12;
            item.proficiency = parseInt(item.proficiency) + 2;
          } else {
            item.max = 10;
            item.proficiency = parseInt(item.proficiency) - 2;
          }
          currentItem = { ...item, specific: e.target.checked };
        }
      } else {
        currentItem = item;
      }
      return currentItem;
    });
    props.setCharacter(currentCharacter);
  };

  return (
    <>
      <Row>
        <Container>
          {props.character.actions.map((item, i) => (
            <div id={"action-" + item.id} className="mm-action" key={item.id}>
              <Row>
                <Container className="action-name-padding" size="2">
                  <TextInput
                    id={"name-" + item.id}
                    value={item.name}
                    onChange={(e) => nameEdit(e, item.id)}
                  />
                </Container>
              </Row>
              <Row className="action-info">
                <Container className="action-proficiency">
                  <label className="f-grey h5">Proficiency:</label>
                  <NumberInput
                    id={"proficiency-" + item.id}
                    max={item.max}
                    value={item.proficiency}
                    onChange={(e) => proficiencyEdit(e, item.id)}
                  />
                </Container>
                <Container className="action-specific">
                  <label className="f-grey h5">Specific:</label>
                  <ToggleSwitch
                    checked={item.specific}
                    onChange={(e) => specificEdit(e, item.id)}
                  />
                </Container>
              </Row>
              <button
                className="mm-delete"
                type="button"
                onClick={() => handleRemove(item.id)}
              >
                X
              </button>
            </div>
          ))}
        </Container>
      </Row>
      <form className="mm-add" onSubmit={addItem}>
        <Row>
          <Container>
            <h3>Add a new action</h3>
          </Container>
        </Row>
        <Row>
          <Container>
            <label className="f-grey h5">action Name:</label>
            <TextInput value={action} onChange={actionChange} allowEnter={true} />
          </Container>
          <Spacer />
          <Container>
            <label className="f-grey h5">action Proficiency:</label>
            <TextInput
              value={proficiency}
              onChange={proficiencyChange}
              allowEnter={true}
            />
          </Container>
        </Row>
        <Row className="mm-submit">
          <Container>
            <label className="f-grey h5">Specific:</label>
            <ToggleSwitch checked={specific} onChange={specificChange} />
          </Container>
          <Container>
            <button type="submit">Add Item</button>
          </Container>
        </Row>
      </form>
    </>
  );
};

export default ActionList;

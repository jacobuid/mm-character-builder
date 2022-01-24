import React, { useEffect, useState } from "react";
import detectStorage from "../_utils/detect-storage";
import exportCharacter from "../_utils/export-character";
import { characterData } from "../_utils/app-data";
import { Container, Box, Row, VerticalRule } from "./Layout/Layout";
import TextInput from "./Inputs/TextInput";
import NumberInput from "./Inputs/NumberInput";
import SkillList from "./Lists/skill-list";

function App(props) {
    const [notSupported, setNotSupported] = useState("");
    const [character, setCharacter] = useState(characterData);

    useEffect(() => {
        // Load character from localStorage if he exists
        if (detectStorage("localStorage")) {
            if (localStorage.getItem("wp-character")) {
                let storedCharacter = JSON.parse(
                    localStorage.getItem("wp-character")
                );
                setCharacter(storedCharacter);
            } else {
                // Character does not exist, Create New one.
                setCharacter(characterData);
            }
        } else {
            setNotSupported(
                <div>Sorry. App is not supported in this browser.</div>
            );
        }

        // set theme
        document.body.classList.add("light");
    }, []);

    useEffect(() => {
        //do operation on character state change
        if (detectStorage("localStorage")) {
            localStorage.setItem("wp-character", JSON.stringify(character));
        }
    }, [character]);

    const handleExport = (e) => {
        exportCharacter(
            JSON.stringify(character),
            `character-sheet-${character.name}.json`
        );
    };

    const handleChange = (e) => {
        let currentCharacter = { ...character };
        currentCharacter[e.target.id] = e.target.value;
        setCharacter(currentCharacter);
    };

    const addItem = (value, type) => {
        let currentCharacter = { ...character };
        currentCharacter[type].push({
            id: "id" + new Date().getTime(),
            name: value,
            proficency: "todo",
        });
        setCharacter(currentCharacter);
    };

    const removeItem = (id, type) => {
        let currentCharacter = { ...character };
        currentCharacter[type] = currentCharacter[type].filter(
            (value) => value.id !== id
        );
        setCharacter(currentCharacter);
    };

    document.title = character.name
        ? character.name + " | D&D Character Sheet"
        : "D&D Character Sheet";

    let year = new Date().getFullYear();

    return (
        <div id="wp-app">
            {notSupported}
            <header>
                <img
                    id="wp-logo"
                    src="/images/wp-logo.png"
                    alt="D&amp;D Logo"
                />
                <div id="wp-options">
                    <h1 id="wp-title">Character Builder</h1>
                    <button
                        id="wp-export"
                        className="wp-button"
                        onClick={handleExport}
                    >
                        Export Character Data
                    </button>
                </div>
            </header>
            <main id="wp-content">
                <Box>
                    <TextInput
                        value={character.name}
                        id="name"
                        onChange={handleChange}
                        placeholder="Character Name"
                    />
                    <Row>
                        <TextInput
                            value={character.heritage}
                            id="heritage"
                            size="wp-small"
                            onChange={handleChange}
                            placeholder="Heritage"
                        />
                        <VerticalRule />
                        <TextInput
                            value={character.lineage}
                            id="lineage"
                            size="wp-small"
                            onChange={handleChange}
                            placeholder="Lineage"
                        />
                        <VerticalRule />
                        <TextInput
                            value={character.archetypes}
                            id="archetypes"
                            size="wp-small"
                            onChange={handleChange}
                            placeholder="Archetypes"
                        />
                        <VerticalRule />
                        <NumberInput
                            value={character.level}
                            min="0"
                            id="level"
                            size="wp-small"
                            onChange={handleChange}
                            placeholder="Level"
                        />
                        <Container size="3"></Container>
                    </Row>
                </Box>

                <section id="wp-skills">
                    <p>Skills:</p>
                    <SkillList
                        skills={character.skills}
                        addCallback={addItem}
                        removeCallback={removeItem}
                    />
                </section>
            </main>
            <footer>
                <p>&copy; {year} Wayward Path</p>
            </footer>
        </div>
    );
}

export default App;

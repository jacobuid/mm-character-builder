import React, { useEffect, useState } from "react";
import detectStorage from "../_utils/detect-storage";
import exportCharacter from "../_utils/export-character";
import { characterData } from "../_utils/app-data";
import { Container, Box, Row, Spacer } from "./Layout/Layout";
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
        ? character.name + " | WP Character Builder"
        : "WP Character Builder";

    let year = new Date().getFullYear();

    return (
        <div id="wp-app">
            {notSupported}
            <header id="wp-header">
                <div className="wp-content">
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
                </div>
            </header>
            <main id="wp-content">
                <div className="wp-content">
                    <Box>
                        <Row>
                            <Container size="2">
                                <Row>
                                    <Container size="2">
                                        <h2
                                            className="h2 wp-ribbon wp-ribbon-left"
                                        >
                                            Character Info
                                        </h2>
                                    </Container>
                                </Row>
                                <Row>
                                    <Container>
                                        <label className="f-grey h4">
                                            Name:
                                        </label>
                                        <TextInput
                                            value={character.name}
                                            id="name"
                                            onChange={handleChange}
                                            placeholder="Character Name"
                                        />
                                    </Container>
                                </Row>
                                <Row>
                                    <Container>
                                        <label className="f-grey h5">
                                            Heritage:
                                        </label>
                                        <TextInput
                                            value={character.heritage}
                                            id="heritage"
                                            onChange={handleChange}
                                            placeholder="Heritage"
                                        />
                                    </Container>
                                    <Container>
                                        <label className="f-grey h5">
                                            Lineage:
                                        </label>
                                        <TextInput
                                            value={character.lineage}
                                            id="lineage"
                                            onChange={handleChange}
                                            placeholder="Lineage"
                                        />
                                    </Container>
                                    <Container>
                                        <label className="f-grey h5">
                                            Archetypes:
                                        </label>
                                        <TextInput
                                            value={character.archetypes}
                                            id="archetypes"
                                            onChange={handleChange}
                                            placeholder="Archetypes"
                                        />
                                    </Container>
                                    <Container>
                                        <label className="f-grey h5">
                                            Level:
                                        </label>
                                        <NumberInput
                                            value={character.level}
                                            min="0"
                                            id="level"
                                            onChange={handleChange}
                                            placeholder="Level"
                                        />
                                    </Container>
                                </Row>
                            </Container>
                            <Spacer />
                            <Spacer />
                            <Spacer />
                            <Container>
                                <Row>
                                    <Container>
                                        <div className="clip-portrait">
                                            <img
                                                className="wp-charicter-portrait"
                                                src="./images/character/bard.png"
                                                alt="Character Portrait"
                                            />
                                        </div>
                                    </Container>
                                </Row>
                                <Row>
                                    <Container>
                                        <h4
                                            className="h4 wp-ribbon wp-ribbon-right"
                                        >
                                            Skills
                                        </h4>
                                    </Container>
                                </Row>
                                <Row>
                                    <Container>
                                        <SkillList
                                            skills={character.skills}
                                            addCallback={addItem}
                                            removeCallback={removeItem}
                                        />
                                    </Container>
                                </Row>
                            </Container>
                        </Row>
                    </Box>
                </div>
            </main>
            <footer>
                <p>&copy; {year} Wayward Path</p>
            </footer>
        </div>
    );
}

export default App;

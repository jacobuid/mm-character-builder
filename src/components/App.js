import React, { Component } from "react";
import detectStorage from "../_utils/detect-storage";
import exportCharacter from "../_utils/export-character";
//import encodeImage from '../_utils/encode-image'
import characterData from "../_utils/character-data";
import calculate from "../_utils/dnd-calculations";
import { Container, Box, Row, VerticalRule } from "./Layout/Layout";
import TextInput from "./Inputs/TextInput";
import Ability from "./Ability/Ability";

class App extends Component {
    state = {
        theme: "light",
        notSupported: "",
        character: {},
    };

    componentDidMount() {
        // Load character from localStorage if he exists
        if (detectStorage("localStorage")) {
            if (localStorage.getItem("wp-character")) {
                let storedCharacter = JSON.parse(
                    localStorage.getItem("wp-character")
                );
                this.setState({ character: storedCharacter });
            } else {
                // Character does not exist, Create New one.
                this.setState({ character: characterData });
            }
        } else {
            this.setState({
                notSupported: (
                    <div>Sorry. App is not supported in this browser.</div>
                ),
            });
        }

        // set theme
        document.body.classList.add(this.state.theme);

        // add event for saving
        window.addEventListener("beforeunload", this.onUnload);
    }

    componentWillUnmount() {
        window.removeEventListener("beforeunload", this.onUnload);
    }

    onUnload = (e) => {
        if (detectStorage("localStorage")) {
            localStorage.setItem(
                "wp-character",
                JSON.stringify(this.state.character)
            );
            // TODO: localStorage.setItem('settings', this.state.theme);
        }
    };

    handleExport = (e) => {
        exportCharacter(
            JSON.stringify(this.state.character),
            `character-sheet-${this.state.character.name}.json`
        );
    };

    handleChange = (e) => {
        let character = { ...this.state.character };
        character[e.target.id] = e.target.value;
        this.setState({ character });
    };

    handleCheckboxChange = (e) => {
        let character = { ...this.state.character };
        const value = e.target.checked;
        const name = e.target.name;
        character[name] = value;
        this.setState({ character });
    };

    render() {
        document.title = this.state.character.name
            ? this.state.character.name + " | D&D Character Sheet"
            : "D&D Character Sheet";

        let character = this.state.character;
        let characterRace = character.subrace
            ? character.subrace
            : character.race;
        let characterClass = character.subclass
            ? character.subclass
            : character.class;

        let bonus = character.level ? calculate.bonus(character.level) : 0;

        return (
            <div id="dnd-app">
                {this.state.notSupported}
                <header>
                    <img
                        id="wp-logo"
                        src="/images/wp-logo.png"
                        alt="D&amp;D Logo"
                    />
                    <h1 id="wp-title">Character Builder</h1>
                </header>
                <main id="dnd-content">
                    <Box>
                        <TextInput
                            value={character.name || ""}
                            id="name"
                            onChange={this.handleChange}
                            placeholder="Character Name"
                        />
                        <Row>
                            <TextInput
                                value={characterRace || ""}
                                id="race"
                                size="dnd-small"
                                onChange={this.handleChange}
                                placeholder="Race"
                            />
                            <VerticalRule />
                            <TextInput
                                value={characterClass || ""}
                                id="class"
                                size="dnd-small"
                                onChange={this.handleChange}
                                placeholder="Class"
                            />
                            <VerticalRule />
                            <TextInput
                                value={character.level || ""}
                                id="level"
                                size="dnd-small"
                                onChange={this.handleChange}
                                placeholder="Level"
                            />
                            <Container size="3"></Container>
                        </Row>
                    </Box>

                    <section id="dnd-ability-scores">
                        <Ability
                            ability={character.strength}
                            label="strength"
                            bonus={bonus}
                            expertise={character.strengthExpertise}
                            proficient={character.strengthProficient}
                            advantage={character.strengthAdvantage}
                            disadvantage={character.strengthDisadvantage}
                            saveExpertise={character.strengthSaveExpertise}
                            saveProficient={character.strengthSaveProficient}
                            saveAdvantage={character.strengthSaveAdvantage}
                            saveDisadvantage={
                                character.strengthSaveDisadvantage
                            }
                            onValueChange={this.handleChange}
                            onCheckboxChange={this.handleCheckboxChange}
                        />
                        <Ability
                            ability={character.dexterity}
                            label="dexterity"
                            bonus={bonus}
                            expertise={character.dexterityExpertise}
                            proficient={character.dexterityProficient}
                            advantage={character.dexterityAdvantage}
                            disadvantage={character.dexterityDisadvantage}
                            saveExpertise={character.dexteritySaveExpertise}
                            saveProficient={character.dexteritySaveProficient}
                            saveAdvantage={character.dexteritySaveAdvantage}
                            saveDisadvantage={
                                character.dexteritySaveDisadvantage
                            }
                            onValueChange={this.handleChange}
                            onCheckboxChange={this.handleCheckboxChange}
                        />
                    </section>
                </main>
                <footer>
                    <p>&copy; 2019 Jacob King</p>
                </footer>
            </div>
        );
    }
}

export default App;

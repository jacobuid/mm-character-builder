import React, { useEffect, useState } from "react";
import detectStorage from "../_utils/detect-storage";
import exportCharacter from "../_utils/export-character";
import { characterData } from "../_utils/app-data";
import { Container, Box, Row, Spacer } from "./Layout/Layout";
import TextInput from "./Inputs/TextInput";
import NumberInput from "./Inputs/NumberInput";
import ActionList from "./Lists/action-list";
import TraitList from "./Lists/trait-list";
import Display from "./Display/Display";

function App(props) {
  const [notSupported, setNotSupported] = useState("");
  const [character, setCharacter] = useState(characterData);

  useEffect(() => {
    // Load character from localStorage if he exists
    if (detectStorage("localStorage")) {
      if (localStorage.getItem("mm-character")) {
        let storedCharacter = JSON.parse(localStorage.getItem("mm-character"));
        setCharacter(storedCharacter);
      } else {
        // Character does not exist, Create New one.
        setCharacter(characterData);
      }
    } else {
      setNotSupported(<div>Sorry. App is not supported in this browser.</div>);
    }

    // set theme
    document.body.classList.add("light");
  }, []);

  useEffect(() => {
    //do operation on character state change
    if (detectStorage("localStorage")) {
      localStorage.setItem("mm-character", JSON.stringify(character));
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

  document.title = character.name
    ? character.name + " | Might & Miracles Character Builder"
    : "Might & Miracles Character Builder";

  let year = new Date().getFullYear();

  return (
    <div id="mm-app">
      {notSupported}
      <header id="mm-header">
        <div className="mm-content">
          <img id="mm-logo" src="/images/mm-logo.png" alt="D&amp;D Logo" />
          <div id="mm-options">
            <h1 id="mm-title">Character Builder</h1>
            <button id="mm-export" className="mm-button" onClick={handleExport}>
              Export Character Data
            </button>
          </div>
        </div>
      </header>
      <main id="mm-content">
        <div className="mm-content">
          <Box>
            <Row>
              {/* Left Column */}
              <Container size="2">
                <Row>
                  <Container size="2">
                    <h2 className="h2 mm-ribbon mm-ribbon-left">
                      Character Info
                    </h2>
                  </Container>
                </Row>
                <Row>
                  <Container>
                    <label className="f-grey h4">Name:</label>
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
                    <label className="f-grey h5">Lineage:</label>
                    <TextInput
                      value={character.lineage}
                      id="lineage"
                      onChange={handleChange}
                      placeholder="Lineage"
                    />
                  </Container>
                  <Container>
                    <label className="f-grey h5">Heritage:</label>
                    <TextInput
                      value={character.heritage}
                      id="heritage"
                      onChange={handleChange}
                      placeholder="Heritage"
                    />
                  </Container>
                  <Container>
                    <label className="f-grey h5">Archetypes:</label>
                    <TextInput
                      value={character.archetypes}
                      id="archetypes"
                      onChange={handleChange}
                      placeholder="Archetypes"
                    />
                  </Container>
                  <Container>
                    <label className="f-grey h5">Level:</label>
                    <NumberInput
                      value={character.level}
                      min="0"
                      id="level"
                      onChange={handleChange}
                      placeholder="Level"
                    />
                  </Container>
                </Row>
                <Row>
                  <Container>
                    <h4 className="h4 mm-ribbon mm-ribbon-left">Traits</h4>
                  </Container>
                </Row>
                <Row>
                  <Container>
                    <TraitList
                      character={character}
                      setCharacter={setCharacter}
                    />
                  </Container>
                </Row>
              </Container>
              {/* END Left Column */}
              <Spacer />
              <Spacer />
              <Spacer />
              {/* Right Column */}
              <Container>
                <Row>
                  <Container>
                    <Display
                      character={character}
                      setCharacter={setCharacter}
                    />
                  </Container>
                </Row>
                <Row>
                  <Container>
                    <h4 className="h4 mm-ribbon mm-ribbon-right">Actions</h4>
                  </Container>
                </Row>
                <Row>
                  <Container>
                    <ActionList
                      character={character}
                      setCharacter={setCharacter}
                    />
                  </Container>
                </Row>
              </Container>
              {/* END Right Column */}
            </Row>
          </Box>
        </div>
      </main>
      <footer>
        <p>&copy; {year} Might & Miracles </p>
        <p>Creative Commons (Attribution)</p>
      </footer>
    </div>
  );
}

export default App;

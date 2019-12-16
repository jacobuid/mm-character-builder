import React, { Component } from 'react';
import detectStorage from '../_utils/detect-storage'
import exportCharacter from '../_utils/export-character'
//import encodeImage from '../_utils/encode-image'
import characterData from '../_utils/character-data'
import Column from './Column/Column'
import { Container, Spacer, Box } from './Layout/Layout'
import TextInput from './TextInput/TextInput'


class App extends Component {

    state = {
        theme:'light',
        notSupported:'',
        character:{}
    }

    componentDidMount(){
        // Load character from localStorage if he exists
        if (detectStorage('localStorage')) {
            try {
                let storedCharacter = JSON.parse(localStorage.getItem('dnd-character'));
                this.setState({character: storedCharacter})
              } catch(e) {
                // Character does not exist, Create New one.
                this.setState({character: characterData})
              }
        } else {
            this.setState({notSupported: <div>Sorry. App is not supported in this browser.</div>})
        }

        // set theme
        document.body.classList.add(this.state.theme);

        // add event for saving 
        window.addEventListener("beforeunload", this.onUnload)
    }

    componentWillUnmount() {
        window.removeEventListener("beforeunload", this.onUnload)
    }

    onUnload = (event) => {
        if (detectStorage('localStorage')) {
            localStorage.setItem('dnd-character', JSON.stringify(this.state.character));
            // TODO: localStorage.setItem('settings', this.state.theme);
        }
    }

    handleExport = (e) => {
        exportCharacter( JSON.stringify(this.state.character), `character-sheet-${this.state.character.name}.json` );
    }

    handleChange = (e) => {
        let character = {...this.state.character}
        character[e.target.id] = e.target.value;
        this.setState({character})
    }


    render() {

        return (
            <div id="dnd-app">
                { this.state.notSupported }
                <header>
                    <img id="dnd-logo" src="/images/dnd-logo.png" alt="D&amp;D Logo"/>
                    <h1 id="dnd-title">Character Sheet</h1>
                </header>
                <main id="dnd-content">
                    <Container size="4">
                        <Box>
                            <TextInput 
                                value={this.state.character.name || ''} 
                                id="name" 
                                onChange={this.handleChange} 
                                placeholder="Character Name"
                            />
                        </Box>
                        
                    </Container>
                    <Spacer />
                    <Container size="1">
                        <Box tag="Class">
                                <TextInput 
                                    value={this.state.character.class || ''} 
                                    id="class" 
                                    onChange={this.handleChange} 
                                />
                        </Box>
                    </Container>
                    <Spacer />
                    <Container size="1">
                        <Box tag="Race">
                            <TextInput 
                                value={this.state.character.race || ''} 
                                id="race" 
                                onChange={this.handleChange} 
                            />
                        </Box>
                    </Container>
                    <Spacer />
                    <Container size="1">
                        <Box tag="Background">
                            <TextInput 
                                value={this.state.character.background || ''} 
                                id="background" 
                                onChange={this.handleChange} 
                            />
                        </Box>
                    </Container>
                </main>
                <footer>
                    <p>&copy; 2019 Jacob King</p>
                </footer>
            </div>
        );
    }
}

export default App;
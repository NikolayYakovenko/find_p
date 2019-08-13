import React from 'react';

import '../styles/reset.css';
import '../styles/base.css';

import './app.css';

export default class App extends React.Component {
    state = {
        text: 'Your text will be here...',
    };

    handleFileUpload = (event) => {
        const { files } = event.target;
        const reader = new FileReader();

        reader.addEventListener('load', (eventValue) => {
            const textFile = eventValue.target;
            this.setState({ text: textFile.result });
        });

        reader.readAsText(files[0]);
    }

    render() {
        return (
            <form className='wrapper'>
                <fieldset className='fieldRow'>
                    <label htmlFor='textField'>
                        <p>Load text file</p>
                        <input
                            type='file'
                            accept='.txt'
                            id='textField'
                            onChange={this.handleFileUpload}
                        />
                    </label>
                </fieldset>
                <fieldset className='fieldRow'>
                    <div className='uploadedText'>{this.state.text}</div>
                </fieldset>
                <fieldset>
                    <button type='button'>
                        Search
                    </button>
                </fieldset>
            </form>
        );
    }
}

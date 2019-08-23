import React from 'react';

import '../styles/reset.css';
import '../styles/base.css';

import { getAllPalindromesData } from '../utils/palindromes';

import { Highlight } from './Highlight/highlight';
import { FileUpload } from './FileUpload/fileUpload';

import './app.css';


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.fileInputRef = React.createRef();
    }

    state = {
        text: 'А роза, упала. На лапу Азора',
        textFromInput: '',
        longestPalindrom: null,
        allPalindromes: [],
    };

    componentDidMount() {
        this.findPalindrom(this.state.text);
    }

    handleFileUpload = (event) => {
        const { files } = event.target;
        const reader = new FileReader();

        if (files && files.length) {
            reader.addEventListener('load', (eventValue) => {
                this.findPalindrom(eventValue.target.result);
            });

            reader.readAsText(files[0]);
        }
        this.fileInputRef.current.value = '';
    }

    clearText = () => {
        this.setState({
            text: '',
            textFromInput: '',
            allPalindromes: [],
            longestPalindrom: null,
        });
    }

    handleTextChange = (text) => {
        this.setState({ textFromInput: text });
    }

    findPalindrom = (text) => {
        const { allPalindromes, longestPalindrom } = getAllPalindromesData(text);

        this.setState({
            text,
            allPalindromes,
            longestPalindrom,
        });
    }

    findPalindromFromInput = () => {
        this.findPalindrom(this.state.textFromInput);
    }

    formSubmit = event => event.preventDefault();

    render() {
        return (
            <form className='wrapper' onSubmit={this.formSubmit}>
                <fieldset className='fieldRow'>
                    <div className='fileUploadWrapper'>
                        <div className='fileUploadItem'>
                            <FileUpload
                                refElement={this.fileInputRef}
                                handleFileUpload={this.handleFileUpload}
                            />
                        </div>
                        <div className='fileUploadItem'>
                            <button
                                type='button'
                                className='button buttonThemeSimple'
                                onClick={this.clearText}
                            >
                                Clear text
                            </button>
                        </div>
                    </div>
                </fieldset>
                {this.state.text ?
                    <fieldset className='fieldRow'>
                        <p className='label'>
                            Parsed text
                        </p>
                        <Highlight
                            searchWords={this.state.allPalindromes}
                            textToHighlight={this.state.text}
                        />
                    </fieldset>
                    : null
                }
                <fieldset className='fieldRow'>
                    <label className='label' htmlFor='parsedText'>
                        Text to find a palindrome
                        <textarea
                            className='textField'
                            value={this.state.textFromInput}
                            id='parsedText'
                            rows={3}
                            placeholder='Type a text'
                            onChange={event => this.handleTextChange(event.target.value)}
                        />
                    </label>
                    <button
                        disabled={!this.state.textFromInput}
                        className='button'
                        onClick={this.findPalindromFromInput}
                    >
                        Search
                    </button>
                </fieldset>
                <fieldset className='fieldRow'>
                    <p className='label'>
                        All found palindromes
                    </p>
                    {this.state.allPalindromes.length ?
                        this.state.allPalindromes.map(p => <div className='palindrom'>{p}</div>)
                        :
                        <span className='notFound'>no palindromes forund</span>
                    }
                </fieldset>
                <fieldset className='fieldRow'>
                    <p className='label'>
                        Longest palindrome
                    </p>
                    {this.state.longestPalindrom ?
                        <div className='palindrom'>{this.state.longestPalindrom}</div>
                        :
                        <span className='notFound'>no palindromes forund</span>
                    }
                </fieldset>
            </form>
        );
    }
}

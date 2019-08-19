import React from 'react';

import '../styles/reset.css';
import '../styles/base.css';

import { getAllPalindromesData } from '../utils/palindromes';

import { Highlight } from './Highlight/highlight';
import { FileUpload } from './FileUpload/fileUpload';

import './app.css';


export default class App extends React.Component {
    state = {
        text: 'А роза, упала. На лапу Азора',
        longestPalindrom: null,
        allPalindromes: [],
        allPalindromesInitial: [],
    };

    componentDidMount() {
        this.handleTextChange(this.state.text);
    }

    handleFileUpload = (event) => {
        const { files } = event.target;
        const reader = new FileReader();

        if (files && files.length) {
            reader.addEventListener('load', (eventValue) => {
                this.handleTextChange(eventValue.target.result);
            });

            reader.readAsText(files[0]);
        }
    }

    clearText = () => {
        this.setState({
            text: '',
            allPalindromes: [],
            allPalindromesInitial: [],
            longestPalindrom: null,
        });
    }

    handleTextChange = (text) => {
        const { allPalindromes, longestPalindrom } = getAllPalindromesData(text);

        this.setState({
            text,
            allPalindromes,
            longestPalindrom,
            allPalindromesInitial: allPalindromes,
        });
    }

    handleSearch = (event) => {
        const text = event.target.value.trim();
        const { allPalindromesInitial } = this.state;

        this.setState({
            allPalindromes: allPalindromesInitial.filter(p => p.includes(text)),
        });
    }

    formSubmit = event => event.preventDefault();

    render() {
        return (
            <form className='wrapper' onSubmit={this.formSubmit}>
                <fieldset className='fieldRow'>
                    <div className='fileUploadWrapper'>
                        <div className='fileUploadItem'>
                            <FileUpload handleFileUpload={this.handleFileUpload} />
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
                <fieldset className='fieldRow'>
                    <label className='label' htmlFor='parsedText'>
                        Parsed text
                        <textarea
                            className='textField'
                            value={this.state.text}
                            id='parsedText'
                            rows={5}
                            placeholder='Type a text'
                            onChange={event => this.handleTextChange(event.target.value)}
                        />
                    </label>
                </fieldset>
                <fieldset className='fieldRow'>
                    <div className='search'>
                        <input
                            className='textField searchField'
                            type='text'
                            id='searchField'
                            placeholder='Filter palindrome by name'
                            onChange={this.handleSearch}
                        />
                    </div>
                </fieldset>
                <fieldset className='fieldRow'>
                    <label className='label' htmlFor='allPalindromes'>
                        All palindromes
                        <textarea
                            className='textField'
                            value={this.state.allPalindromes.join(' ')}
                            id='allPalindromes'
                            readOnly
                            placeholder='Here will be all found palindromes'
                            rows={5}
                        />
                    </label>
                </fieldset>
                <fieldset className='fieldRow'>
                    <Highlight
                        searchWords={this.state.allPalindromes}
                        textToHighlight={this.state.text}
                    />
                </fieldset>
                {this.state.longestPalindrom ?
                    <fieldset className='fieldRow'>
                        <label className='label' htmlFor='longest'>
                            Longest palindrome
                            <textarea
                                className='textField'
                                value={this.state.longestPalindrom}
                                id='longest'
                                readOnly
                                rows={2}
                            />
                        </label>
                    </fieldset>
                    : null
                }
            </form>
        );
    }
}

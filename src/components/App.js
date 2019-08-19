import React from 'react';

import '../styles/reset.css';
import '../styles/base.css';

import { getAllPalindromesData } from '../utils/palindromes';

import { Highlight } from './Highlight';
import { FileUpload } from './FileUpload';

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
                        <FileUpload handleFileUpload={this.handleFileUpload} />
                        <button
                            type='button'
                            className='button buttonThemeSimple'
                            onClick={this.clearText}
                        >
                            Clear text
                        </button>
                    </div>
                </fieldset>
                <fieldset className='fieldRow'>
                    <label className='label' htmlFor='parsedText'>
                        Parsed text
                        <textarea
                            className='uploadedText'
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
                            className='searchField'
                            type='text'
                            id='searchField'
                            placeholder='Type a palindrome'
                            onChange={this.handleSearch}
                        />
                        <button
                            type='button'
                            className='button searchButton'
                            onChange={this.handleSearch}
                        >
                            Palindrome search
                        </button>
                    </div>
                </fieldset>
                <fieldset className='fieldRow'>
                    <label className='label' htmlFor='allPalindromes'>
                        All palindromes
                        <textarea
                            className='uploadedText'
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
                                className='uploadedText'
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

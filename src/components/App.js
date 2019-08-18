import React from 'react';

import { getLongestPalindrome, getAllPalindromes } from '../utils';
import { Highlight } from './Highlight';

import '../styles/reset.css';
import '../styles/base.css';

import './app.css';

export default class App extends React.Component {
    state = {
        text: 'А роза, упала. На лапу Азора',
        longest: null,
        allPalindromes: ['Not parsed yet...'],
        allPalindromesInit: [],
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

    handleTextChange = (text) => {
        const longest = getLongestPalindrome(text);
        const allPalindromes = getAllPalindromes(text);

        this.setState({
            text,
            longest,
            allPalindromes,
            allPalindromesInit: allPalindromes,
        });
    }

    handleSearch = (event) => {
        const text = event.target.value.trim();
        const { allPalindromesInit } = this.state;
        this.setState({
            allPalindromes: allPalindromesInit.filter(p => p.includes(text)),
        });
    }

    render() {
        return (
            <form className='wrapper'>
                <fieldset className='fieldRow'>
                    <label htmlFor='textField'>
                        <p className='label'>Load text file</p>
                        <input
                            type='file'
                            accept='.txt'
                            id='textField'
                            onChange={this.handleFileUpload}
                        />
                    </label>
                </fieldset>
                <fieldset className='fieldRow'>
                    <label className='label' htmlFor='parsedText'>
                        Parsed text
                        <textarea
                            className='uploadedText'
                            value={this.state.text}
                            id='parsedText'
                            rows={5}
                            onChange={event => this.handleTextChange(event.target.value)}
                        />
                    </label>
                </fieldset>
                <fieldset className='fieldRow'>
                    <label htmlFor='searchField'>
                        <p className='label'>Palindrome search</p>
                        <input
                            type='text'
                            id='searchField'
                            placeholder='Type a palindrome'
                            onChange={this.handleSearch}
                        />
                    </label>
                </fieldset>
                <fieldset className='fieldRow'>
                    <label className='label' htmlFor='allPalindromes'>
                        All palindromes
                        <textarea
                            className='uploadedText'
                            value={this.state.allPalindromes.join(' ')}
                            id='allPalindromes'
                            readOnly
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
                {this.state.longest ?
                    <fieldset className='fieldRow'>
                        <label className='label' htmlFor='longest'>
                            Longest palindrome
                            <textarea
                                className='uploadedText'
                                value={this.state.longest}
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

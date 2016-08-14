import React, { Component } from 'react';
import {
    View,
    Text,
    AppRegistry
} from 'react-native';

import Style from './Style.js';
import InputButton from './InputButton.js';

const inputButtons = [
    [1, 2, 3, '/'],
    [4, 5, 6, '*'],
    [7, 8, 9, '-'],
    [0, '.', '=', '+']
];

class Calculator extends Component {
    constructor(props){
        super(props);

        this.state = {
            inputValue: 0,
            previousInputValue: 0,
            operator: null
        }
    }

    render() {
        return (
            <View style={Style.rootContainer}>
                <View style={Style.displayContainer}>
                    <Text style={Style.displayText}>{this.state.inputValue}</Text>
                </View>
                <View style={Style.inputContainer}> 
                    {this._renderInputButtons()}
                </View>
            </View>
        )
    }

    _renderInputButtons(){
        //views is the whole input pad
        let views = [];
        
        //iterate through all rows
        for(var r = 0; r < inputButtons.length; r++){
            //creates 4 rows
            let row = inputButtons[r]

            //what we'll put in each row
            let inputRow = [];
            for(var i = 0; i < row.length; i++){
                //goes through each value in the sub arrays of inputButtons
                let input = row[i];
                console.log(i);
                //puts each value in each InputButton
                inputRow.push(
                    //props value
                    <InputButton value={input} highlight={this.state.operator === input} onPress={this._onInputButtonPressed.bind(this, input)}/>
                );
            }
            //puts all inputRows in views
            views.push(<View style={Style.inputRow}>{inputRow}</View>);
        }

        return views;
    }

    _onInputButtonPressed(input){
        switch(typeof input){
            case 'number':
                return this._handleInputNumber(input);
            case 'string':
                return this._handleInputString(input);
        }
    }

    _handleInputNumber(num){
        let inputValue = (this.state.inputValue * 10) + num;
        this.setState({inputValue});
    }

    _handleInputString(str){
        switch(str){
            case '/':
            case '*':
            case '+':
            case '-':
                this.setState({
                    operator: str,
                    previousInputValue: this.state.inputValue,
                    inputValue: 0 
                });
                break;
            case '=':
                let symbol = this.state.operator,
                    inputValue = this.state.inputValue,
                    previousInputValue = this.state.previousInputValue;
                
                if (!symbol){
                    return;
                }

                this.setState({
                    previousInputValue: 0,
                    inputValue: eval(previousInputValue + symbol + inputValue),
                    operator: null
                });
                break;
        }
    }
}

AppRegistry.registerComponent('Calculator', () => Calculator);
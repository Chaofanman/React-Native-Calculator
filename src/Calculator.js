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
]

class Calculator extends Component {
    render() {
        return (
            <View style={Style.rootContainer}>
                <View style={Style.displayContainer}></View>
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
                //puts each value in each InputButton
                inputRow.push(
                    <InputButton value={input} />
                );
            }
            //puts all inputRows in views
            views.push(<View syle={Style.inputRow}> {inputRow} </View>);
        }
        
        return views;
    }
}

AppRegistry.registerComponent('Calculator', () => Calculator);
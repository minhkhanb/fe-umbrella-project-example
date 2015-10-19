/*jshint esnext: true*/
import React from 'react/react';
import {Math} from 'calculationjs';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {val1: 1, val2: 1};
        this.cal = new Math();
    }

    handleChangeVal1(event){
        var val = event.target.value;
        if(val && parseInt(val) != NaN)
        {
            this.setState({val1: parseInt(val)});
        }
    }

    handleChangeVal2(event){
        var val = event.target.value;
        if(val && parseInt(val) != NaN)
        {
            this.setState({val2: parseInt(val)});
        }
    }

    render() {
        return (
        <div>
                Awesome web calculator app !!<br/>
                <input type='text' defaultValue={this.state.val1} onChange={this.handleChangeVal1.bind(this)} />
                <input type='text' defaultValue={this.state.val2} onChange={this.handleChangeVal2.bind(this)} />
                <div><b>Answer: </b>{this.cal.add(this.state.val1, this.state.val2)}</div><br/>
                </div>);
    }
}

React.render(<App />, document.getElementById('app'));

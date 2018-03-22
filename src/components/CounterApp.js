import React from 'react';
import ReactDOM from 'react-dom';
import CounterList from './CounterList';
import $ from "jquery";

export default class CounterApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            counters: [],
            title: '',
            total: 0
        };
        this.handleAddCounterClick = this.handleAddCounterClick.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.updateCounters = this.updateCounters.bind(this);
    }
    componentDidMount() {
        $.get("/api/v1/counters", (counters) => {
            console.log(counters)
            this.updateCounters(counters)
        })
    }
    updateCounters(counters){
        console.log(counters)
        let newTotal = 0
        const newCounters = counters.map((counter)=> {
            const newCounterItem = {
                title: counter.title,
                id: counter.id,
                count: counter.count
            }
            newTotal = newTotal + counter.count
            return newCounterItem
        })
        this.setState((prevState) => ({
            counters: newCounters,
            total: newTotal
        }))
    }
    handleAddCounterClick(e) {
        e.preventDefault();
        if (!this.state.title || this.state.title === "") {
            alert("Please input a valid Title")
            return
        }
        $.post("/api/v1/counter", { title: this.state.title }, (counters) => {
            this.updateCounters(counters)
            $('#title-input').val('');
        })
    }
    handleTextChange(e) {
        e.preventDefault();
        this.setState({
            title: e.target.value
        });
    }
    render() {
        return (
            <div className="mainPanel">
                <h1>Counter App</h1>
                <div className="panel-border">
                    <div className="tooltip">
                        <input className="counterTitle" id="title-input" title={this.state.title} onChange={this.handleTextChange}></input>
                        <span className="tooltiptext">Input your counter title here</span>
                    </div>
                    <button className="button button1 tooltip" onClick={this.handleAddCounterClick}>
                        <i className="fa fa-floppy-o"></i>
                        <div className="tooltiptext">Click to increase counter</div>
                    </button>
                </div>
                <div className="panel-border">
                    {   
                        this.state.counters.length > 0 ?
                        <CounterList updateFn={this.updateCounters} counters={this.state.counters}/> :
                        <h4>No counter added.</h4>
                    }
                </div>
                <div className="panel-border">
                    <h4 className="counterTotalTitle">Total</h4>
                    <label className="counterTotal">{this.state.total}</label>
                </div>
            </div>
        )
    }
}
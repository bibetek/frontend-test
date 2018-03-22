import React from 'react';
import ReactDOM from 'react-dom';
import $ from "jquery";

export default class CounterList extends React.Component {
    constructor(props) {
        super(props);
        this.handleRemoveCounter = this.handleRemoveCounter.bind(this)
        this.handleCounterIncrement = this.handleCounterIncrement.bind(this)
        this.handleCounterDecrement = this.handleCounterDecrement.bind(this)
    }
    handleCounterIncrement(counterId) {
        $.post("/api/v1/counter/inc", { id: counterId }, (counters) => {
            this.props.updateFn(counters)
        })
    }
    handleCounterDecrement(counterId) {
        $.post("/api/v1/counter/dec", { id: counterId }, (counters) => {
            this.props.updateFn(counters)
        })
    }
    handleRemoveCounter(counterId) {
        $.ajax({
            url: '/api/v1/counter',
            type: 'DELETE',
            data: { id: counterId },
            success: (counters) => {
                this.props.updateFn(counters)
            }
        })

    }
    render() {
        console.log('render')
        return (
            <ul>
            {this.props.counters.map((counter,index) => (
                <li key={index} className="counterItem">
                    <button className="button button1 tooltip" onClick={()=> {this.handleRemoveCounter(counter.id)}}>
                        <i className="fa fa-trash"></i>
                        <div className="tooltiptext">Click to remove counter</div>
                    </button>
                    <label className="counterItemTitle tooltip">{counter.title}</label>
                    <button className="button button2 tooltip" onClick={()=> {this.handleCounterDecrement(counter.id)}}>
                        <i className="fa fa-minus"></i>
                        <div className="tooltiptext">Click to decrease counter</div>
                    </button>
                    <label className="counterItemCount">{counter.count}</label>
                    <button className="button button2 tooltip" onClick={()=> {this.handleCounterIncrement(counter.id)}}>
                        <i className="fa fa-plus"></i>
                        <div className="tooltiptext">Click to increase counter</div>
                    </button>
                </li>
            ))}
            </ul>
        )
    }
}
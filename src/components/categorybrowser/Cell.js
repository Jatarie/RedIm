import React, {Component} from 'react';
import './CategoryBrowser.css'


class Cell extends Component {

    render() {
        const name = this.props.name;
        return <td className="cell" onClick={() => this.props.cb(name)}>{name}</td>;
    }
}

export default Cell
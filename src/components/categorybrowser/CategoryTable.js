import React, {Component} from 'react'
import Cell from './Cell'


class CategoryTable extends Component {
    render() {
        return (
            <div className="table-wrap col-sm-4 tables">
                <table className="table table-dark">
                    <thead align="center">
                    <tr>
                        <td>
                            <h4>{this.props.tableName}</h4>
                            {this.props.tableName === "SubReddits" && <input type="text" id="searchJSON" onChange={this.props.searchJSON}/>}
                        </td>
                    </tr>
                    </thead>

                    <tbody>
                    {this.props.tableCells.map(x => <tr><Cell name={x} key={x} cb={this.props.handleClick}/></tr>)}
                    {Array.apply(null, {length: 17 - (this.props.tableCells.length)}).map(x => <tr><Cell name={'-'} cb={() => {
                    }}/></tr>)}
                    </tbody>

                </table>
            </div>
        )
    }
}

export default CategoryTable
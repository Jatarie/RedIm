import React, {Component} from 'react';
import {InfiniteLoader, Table} from 'react-virtualized';
import axios from 'axios'
import Post from '../redditbrowser/Post'
import './infinite.css'
import queryString from 'query-string'

class Infinite extends Component {

    constructor(props) {
        super(props);
        this.list = [];
        this.comments = [];
        this.isRowLoaded = this.isRowLoaded.bind(this);
        this.loadMoreRows = this.loadMoreRows.bind(this);
        this.rowRenderer = this.rowRenderer.bind(this);
        this.rowGetter = this.rowGetter.bind(this);
        this.getWidth = this.getWidth.bind(this);
        this.getHeight = this.getHeight.bind(this);
        this.state = {subreddit: ""};
        this.after = "";
        this.t = "";
    }

    componentDidMount() {
        var values = queryString.parse(this.props.t);
        this.t = values.t;
    }


    isRowLoaded({index}) {
        return !!this.list[index];
    }

    setAfter(after) {
        this.after = after;
    }


    loadMoreRows({startIndex, stopIndex}) {
        return (axios.get("https://api.reddit.com/r/" + this.props.subreddit + "/top?t=" + this.t + "&limit=10&after=" + this.after).then(response =>
            response.data.data.children.map(child => this.list.push([child.data.url, child.data.id])) && this.setAfter(response.data.data.after)
        ))
    }


    rowRenderer({key, index, style}) {
        if (!!this.list[index]) {
            return (
                <div key={key} style={style}>
                    <Post url={this.list[index][0]} post_id={this.list[index][1]}/>
                </div>
            )
        }
        else {
        }
    }

    rowGetter(index) {
        return this.list[index]
    }

    getWidth() {
        return window.innerWidth
    }

    getHeight() {
        return window.innerHeight
    }


    render() {
        if (this.props.subreddit === "") {
            return (
                <h1>blank</h1>)
        }
        return (
            <InfiniteLoader
                isRowLoaded={this.isRowLoaded}
                loadMoreRows={this.loadMoreRows}
                rowCount={1000}
                threshold={10}
            >
                {({onRowsRendered, registerChild}) => (
                    <div align="center">
                        <Table className={"infinitetable"}
                               height={this.getHeight()}
                               onRowsRendered={onRowsRendered}
                               ref={registerChild}
                               rowCount={1000}
                               rowHeight={this.getHeight()}
                               rowRenderer={this.rowRenderer}
                               width={this.getWidth()}
                               rowGetter={this.rowGetter}
                               gridClassName={"infinitegrid"}
                               rowClassName={"infiniterow"}
                        >
                        </Table>
                    </div>
                )}
            </InfiniteLoader>
        )
    }
}

export default Infinite;
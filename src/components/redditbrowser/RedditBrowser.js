import React, {Component} from 'react';
import './RedditBrowser.css';
import pornlist from '../categorybrowser/pornlist';
import Infinite from '../infinite/Infinite';

class RedditBrowser extends Component {
    constructor(props) {
        super(props);
        this.state = {t: false, posts: [], subreddit: ""};
        this.subreddit = "";
        this.after = "";
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.defineSubreddit();
    }

    defineSubreddit() {
        if (this.props.match.params.subreddit === "random") {
            let supercats = Object.keys(pornlist.data.list);
            let sc = supercats[Math.floor(Math.random() * supercats.length)];
            let subcats = Object.keys(pornlist.data.list[sc]);
            let sb = subcats[Math.floor(Math.random() * subcats.length)];
            let subreds = Object.keys(pornlist.data.list[sc][sb]);
            this.setState({subreddit: subreds[Math.floor(Math.random() * subreds.length)]});

        }
        else {
            this.setState({subreddit: this.props.match.params.subreddit});
        }

    }

    handleClick(time) {
        if (time === 'back') {
            window.location.href = ('#')
        }
        else {
            window.location.href = ('#/r/' + this.state.subreddit + '?t=' + time);

            window.location.reload(true);
        }

    }



    render() {
        return (
            <div className="container-fluid redditbrowser">
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous"/>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossOrigin="anonymous"/>
                <div align="center" className={"buttons"}>
                    {this.state.subreddit}<br/>
                    <button onClick={() => this.handleClick('back')}> BACK</button>
                    <br/>
                    <button onClick={() => this.handleClick('all')}> ALL</button>
                    <br/>
                    <button onClick={() => this.handleClick('year')}> YEAR</button>
                    <br/>
                    <button onClick={() => this.handleClick('month')}>MONTH</button>
                    <br/>
                    <button onClick={() => this.handleClick('week')}> WEEK</button>
                    <br/>
                    <button onClick={() => this.handleClick('day')}> DAY</button>
                </div>
                <Infinite subreddit={this.state.subreddit} t={this.props.location.search}/>
            </div>

        )

    }

}

export default RedditBrowser;


import React, {Component} from 'react';
import CategoryBrowser from './components/categorybrowser/CategoryBrowser'
import RedditBrowser from './components/redditbrowser/RedditBrowser'
import {HashRouter, Route} from 'react-router-dom';
import Infinite from "./components/infinite/Infinite";

class App extends Component {

    render() {
        return (
            <HashRouter>
                <div className="App">
                    <div>
                        <Route path={'/test'} component={Infinite}/>
                        <Route path={'/r/:subreddit'} component={RedditBrowser}/>
                        <Route exact path={'/'} component={CategoryBrowser}/>
                    </div>
                </div>
            </HashRouter>
        )
    }
}

export default App;

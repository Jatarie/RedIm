import React, {Component} from 'react';
import axios from 'axios'


class Comments extends Component {
    constructor(props) {
        super(props);
        this.comments = [];
        this.state = {comments: []}
    }

    componentDidMount() {
        this.getComments(this.props.post_id)
    }

    getComments(id) {
        axios.get("https://api.reddit.com/comments/" + id + "?limit=1000&sort=top&depth=100").then(response =>
            Object.values(response.data[1].data.children).map(child => this.getCommentsRecursion(child)))
    }

    filterComment(comment) {
        var x = comment.match(/http.+?(\s|$|\))/g);
        if (!x) {
            return null
        }
        else {
            x = x[0]
        }
        if (x.charAt(x.length - 1) === ")") {
            x = x.slice(0, x.length - 1)
        }


        var z = comment.match(/reddit/g);
        if (!!z) {
            z = z[0]
        }
        if (!z) {
            return x
        }

        return null

    }

    getCommentsRecursion(child) {
        if (child.kind === "more") {
            return
        }


        var comment = this.filterComment(child.data.body);
        if (!!comment) {
            this.comments.push(comment);
            this.setState({comments: this.comments});

        }

        if (child.data.replies !== "") {
            Object.values(child.data.replies.data.children).map(child_of_child => this.getCommentsRecursion(child_of_child))
        }

    }

    render() {
        return (
            <div>
                {this.state.comments.length > 0 &&
                <button onClick={() => {
                        this.state.comments.map(x => window.open(x))
                }}>View Source</button>}
                {/*{this.state.comments.map(x => <a href={x} target={"_blank"}>{x}<br/></a>)}*/}
            </div>
        )
    }
}

export default Comments;
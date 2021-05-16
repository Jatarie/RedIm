import React, { Component } from 'react';
import axios from 'axios'
import Comments from './Comments'

class Post extends Component {

    constructor(props) {
        super(props);
        this.state = { url: null };
        this.albumList = [];
        this.albumListIndex = 0;
        this.albumImageFinder = this.albumImageFinder.bind(this);
    }

    video(url) {
        return (<video autoPlay={true} loop={true} controls={"post"} className={"post"}>
            <source src={url} />
        </video>)

    }

    image(url) {
        return (<img src={url} alt="" className={"post"} />)
    }

    album(url) {
        return (
            <div>
                <button onClick={() => this.albumImageFinder(-1)}>Previous</button>
                {this.albumListIndex + 1}/{this.albumList.length}
                <button onClick={() => this.albumImageFinder(1)}>Next</button>
                <br />
                {this.image(url)}
            </div>
        )
    }

    imgur(url) {
        let id = url.match(/\.com\/\w{5,}/);
        if (id !== null) {
            id = id[0].slice(5,);
        }
        let extension = url.match(/\.\w{3,5}$/);
        if (extension == null) {
            extension = ".jpg"
        }
        else {
            extension = extension[0]
        }
        if (extension === ".gifv") {
            extension = ".mp4";
            this.setState({
                url: this.video("https://i.imgur.com/" + id + extension)
            })
        }
        else {
            this.setState({
                url: this.image("https://i.imgur.com/" + id + extension)
            })
        }

    }

    imgurAlbum(url) {
        var album_hash = url.match(/\/a\/.+$/g)[0].slice(3,);
        axios.get("https://api.imgur.com/3/album/" + album_hash + "?client_id=9b80ec93de0f36b").then(response =>
            response.data.data.images.map(image => this.albumList.push(image.link)) && this.setState({ url: this.album(this.albumList[0]) }));
    }

    albumImageFinder(dir) {
        this.albumListIndex += dir;
        if (this.albumListIndex < 0) {
            this.albumListIndex = this.albumList.length - 1
        }
        if (this.albumListIndex >= this.albumList.length) {
            this.albumListIndex = 0;
        }
        this.setState({ url: this.album(this.albumList[this.albumListIndex]) })

    }

    gfycat(url) {
        let id = url.match(/\w{8,}/g);
        console.log(id)
        axios.get("https://api.redgifs.com/v1/gfycats/" + id).then(response =>
            this.setState({
                url: this.video(response.data.gfyItem.mp4Url)
            })
        ).catch(function(error){
            console.log(error)
        })
    }

    reddit(url) {
        this.setState({
            url: this.image(url)
        })
    }

    pornhub(url) {
        let id = url.match(/viewkey=\w+/g)[0].slice(8,);
        this.setState({
            url: <iframe title={id} src={"https://www.pornhub.com/embed/" + id} frameBorder="0" width="1080" height="800" scrolling="no" allowFullScreen />
        })
    }

    redgifs(url) {
        let id = url.match(/watch\/\w+/g)[0].slice(6,)
        axios.get("https://api.redgifs.com/v1/gfycats/" + id).then(response =>
            this.setState({
                url: this.video(response.data.gfyItem.mp4Url)
            })
        )
    }


    componentDidMount() {
        if (!this.props.url) {
            return
        }
        var url = this.props.url;
        if (url.match(/imgur.com\/a\//g)) {
            this.imgurAlbum(url)
        }
        else if (url.match(/imgur/g)) {
            this.imgur(url)
        }
        else if (url.match(/gfycat/g)) {
            this.gfycat(url)
        }
        else if (url.match(/redd\.it/g)) {
            this.reddit(url)
        }
        else if (url.match(/\.mp4/g)) {
            this.setState({ url: this.video(url) })
        }
        else if (url.match(/\.\w{3,5}$/g)) {
            this.setState({ url: this.image(url) });
        }
        else if (url.match(/pornhub/g)) {
            this.pornhub(url)
        }
        else if (url.match(/redgifs/g)) {
            this.redgifs(url)
        }

        else if (url.match(/gfycat/g)) {
            this.gfycat(url)
        }
        else {
            console.log(url);
            this.setState({ url: url });
        }
    }

    render() {
        return (
            <div>
                {this.props.url}
                <div align="center" className={"postimage"}>{this.state.url}</div>
                <Comments post_id={this.props.post_id} />
            </div>
        )
    }
}

export default Post
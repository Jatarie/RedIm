import React, {Component} from 'react';
import pornlist from './pornlist_1'
import CategoryTable from "./CategoryTable";

class CategoryBrowser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            supercategory: null,
            subcategory: null,
            searchText: "",
            flip: true
        };
        this.categoryLists = {
            supercategories: [],
            subcategories: [],
            subreddits: []
        };
        this.handleClickSuperCategory = this.handleClickSuperCategory.bind(this);
        this.handleClickSubCategory = this.handleClickSubCategory.bind(this);
        this.handleClickSubReddit = this.handleClickSubReddit.bind(this);
        this.searchJSON = this.searchJSON.bind(this);
    }

    handleClickSuperCategory(name) {
        this.setState({supercategory: name, subcategory: null});
        this.categoryLists.subreddits = [];
        this.setState({searchText: ""})
    }

    handleClickSubCategory(name) {
        this.setState({subcategory: name});
        this.setState({searchText: ""})
    }

    handleClickSubReddit(name) {
        window.location.href = '#/r/' + name + "?t=all"
    }

    searchJSON() {
        this.setState({searchText: document.getElementById("searchJSON").value});
    }

    generateLists() {
        console.log(this.state.supercategory, this.state.subcategory);

        let subreddit_list = [];
        this.categoryLists.subreddits = [];

        if (this.state.searchText.length > 2) {
            let query = this.state.searchText.toLowerCase();
            let list = pornlist.data.list;
            Object.keys(list).map(sucat => Object.keys(list[sucat]).map(subcat => Object.keys(list[sucat][subcat]).map(subred =>
                ((sucat.toLowerCase().includes(query) || subcat.toLowerCase().includes(query) || subred.toLowerCase().includes(query)) ?
                        subreddit_list.push([subred, pornlist.data.list[sucat][subcat][subred].subscribers]) :
                        {}
                ))));
            subreddit_list.sort(function (a, b) {
                return b[1] - a[1]
            });
            for (var e in subreddit_list) {
                this.categoryLists.subreddits.push(subreddit_list[e][0]);
            }
        }

        else if (!!this.state.subcategory && !!this.state.supercategory) {
            this.categoryLists.subreddits = Object.keys(pornlist.data.list[this.state.supercategory][this.state.subcategory]);
        }

        else if (!!this.state.supercategory) {
            this.categoryLists.subcategories = Object.keys(pornlist.data.list[this.state.supercategory]);
            this.categoryLists.subcategories.map(sc => Object.keys(pornlist.data.list[this.state.supercategory][sc]).map(red =>
                subreddit_list.push([red, pornlist.data.list[this.state.supercategory][sc][red].subscribers])
            ));

            subreddit_list.sort(function (a, b) {
                return b[1] - a[1]
            });
            for (var e in subreddit_list) {
                this.categoryLists.subreddits.push(subreddit_list[e][0])
            }
        }


    }

    render() {
        this.generateLists();
        return (
            <div>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous"/>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossOrigin="anonymous"/>
                <div className="container-fluid">
                    <div className="row">
                        <CategoryTable handleClick={this.handleClickSuperCategory} tableCells={Object.keys(pornlist.data.list)} tableName={"SuperCategories"}/>
                        <CategoryTable handleClick={this.handleClickSubCategory} tableCells={this.categoryLists.subcategories} tableName={"SubCategories"}/>
                        <CategoryTable handleClick={this.handleClickSubReddit} tableCells={this.categoryLists.subreddits} tableName={"SubReddits"} searchJSON={this.searchJSON}/>
                    </div>
                </div>
            </div>

        )
    }
}

export default CategoryBrowser;

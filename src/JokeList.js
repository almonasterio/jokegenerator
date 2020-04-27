import React, { Component } from 'react'
import axios from 'axios'
import './JokeList.css'
import Joke from "./Joke"
import uuid from "uuid/v4"

export default class JokeList extends Component {
     static defaultProps = {
         numJokes: 10
     }
    constructor(props){
        super(props);
        this.state ={
            jokes: []
        }
        this.handleVote = this.handleVote.bind(this)
        
    }
    async componentDidMount() {
        let jokes=[]
        while (jokes.length<this.props.numJokes) {
            let res = await axios.get(`https://icanhazdadjoke.com/`, {headers: {Accept: "application/json"}});
            jokes.push({id: uuid(), joke: res.data.joke, votes:0})
        }
        this.setState({jokes : jokes})
    }
    handleVote(id, delta) {
        this.setState(st=>({
            jokes: st.jokes.map(j=> j.id==id? {...j, votes:j.votes + delta} : j)


        })
        )
    }

    render() {
        console.log(this.state.jokes)
        return (
            <div className="JokeList">
            <div div className = "JokeList-sidebar">
                <h1 className="JokeList-title"><span>Joke</span>Generator</h1>
                 <img src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg' alt="emoji"/>
                 <button className='JokeList-getmore' onClick={this.handleClick}>
            Fetch Jokes</button>
            </div>
                <div className="JokeList-jokes">
                    {this.state.jokes.map(j => (
                        <Joke 
                        key={j.id}
                        text={j.joke} 
                        votes={j.votes}
                        upvote={()=>this.handleVote(j.id,1)}
                        downvote={()=>this.handleVote(j.id,-1)}
                        >
                        </Joke>))}
                </div>
            </div>
        )
    }
}

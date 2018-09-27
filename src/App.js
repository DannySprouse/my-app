import React, { Component } from 'react';
import './App.css';
import cats from './cats.json'
import Wrapper from './components/Wrapper'
import Navigation from './components/Navigation'
import Title from './components/Title'
import CatCard from './components/CatCard'

class App extends Component {
    state = {
        message: "To begin, click on an image",
        topScore: 0,
        curScore: 0,
        cats: cats,
        availableCats: cats
    }

    componentDidMount() {
    }

    shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    selectCat = breed => {
        const findCat = this.state.availableCats.find(item => item.breed === breed);

        if(findCat === undefined) {
            this.setState({ 
                message: "Sorry, wrong breed!",
                topScore: (this.state.curScore > this.state.topScore) ? this.state.curScore : this.state.topScore,
                curScore: 0,
                cats: cats,
                availableCats: cats
            });
        }
        else {
            const newCats = this.state.availableCats.filter(item => item.breed !== breed);
                this.setState({ 
                message: "That's right!",
                curScore: this.state.curScore + 1,
                cats: cats,
                availableCats: newCats
            });
        }

        this.shuffleArray(cats);
    };

    render() {
        return (
            <Wrapper>
                <Navigation
                    message={this.state.message}
                    curScore={this.state.curScore}
                    topScore={this.state.topScore}
                />
                <Title />
                {
                    this.state.cats.map(cat => (
                        <CatCard
                            breed={cat.breed}
                            image={cat.image}
                            selectCat={this.selectCat} 
                            curScore={this.state.curScore}
                        />
                    ))
                }
            </Wrapper>
        );
    }
}

export default App;
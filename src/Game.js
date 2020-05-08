import  React from 'react'
import Board from './Board';

class  Game extends React.Component{
    constructor(props){
        super(props);
        this.state={
            xIsNext:true,
            stepNumber:0,
            history:[
                {square:Array(9).fill(null)}
            ]
        }
    }
jumpTo(step)
{
    this.setState({
        stepNumber:step,
        xIsNext:(step%2)===0
    })
}
    handleClick(i){
        const history=this.state.history.slice(0,this.state.stepNumber+1);
        const current =history[history.length-1];
        const squares=current.squares.slice();
        const winner= calWinner(squares);
        if(winner || squares(i)){
                return;
        } 
        
         squares[i]=this.state.xIsNext?'X':'0';
        this.setState({
            history:history.concat({
                square:squares
            }),
            xIsNext:!this.state.xIsNext,
            stepNumber:history.length
        });

    }
    render(){
        const history=this.state.history;
        const current = history[this.state.stepNumber];


        return(
            <div className="game">
                <div className="game-board">
                    <Board onClick={(i)=>this.onClick(i)}
                        squares={current.squares}    
                    />
                </div>
            </div>
        );
    }
}

function calWinner(squares){
    const lines=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    for(let i=0;i<lines.length;i++){
        const [a,b,c] = lines[i];
        if(squares[a] && squares[a ===squares[b]&& squares[b] ===squares[c]]){
            return squares[a];
        }
    }
    return null;
}

export default Game
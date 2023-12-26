//The Gameboard that represent of the board

function GameBoard (){
    const row = 3;
    const column = 3;
    const board = []

    for(i = 0; i < row*column; i++){
        board[i] = i;
    }

    const getBoard = () => board;

    function pushSimbol(simbol, ind){
        if(boardCheck(board, ind) == false){
            return false;
        }
        index = ind;
        board[index] = simbol
    }

    const boardCheck = (board, i) =>  {
        if(board[i] ==='X' || board[i] ==='O'){
            return false
        }
        else{
            return true
        }
    }
    function printBoard(){
        let pola = [[0,1,2], [3,4,5], [6,7,8]]
        for(i = 0; i< pola.length; i++){
            let [a,b,c] = pola[i];
            console.log(board[a],board[b],board[c]);
        }
    }

    return {getBoard, printBoard, pushSimbol};
}

const Game = () =>{
    const player = (symbol, name) =>{
        const simbol = symbol;
        const nama = name;
        return {simbol, nama};
    }

    let papan = GameBoard()

    player1 = player('X', 'pemain1');
    player2 = player('O', 'pemain2');
    
    let playerAktif = player1

    function switchPlayer(){
        playerAktif = playerAktif === player1 ? player2:player1;
    }

    function printPlayer(){
        console.log(`giliran ${playerAktif.nama} dengan simbol ${playerAktif.simbol}`);
    }

    function newRound(){
        papan.printBoard()
        console.log(`giliran ${playerAktif.nama} untuk jalan`)
    }
    function winner(player){
        console.log(`pemenangnya adalah ${player.nama}`)
    }

    const checkWinner = (board) =>{
        const pattern = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
        for(i = 0; i<pattern.length; i++){
            let [box1,box2,box3] = pattern[i];
            if(board[box1]=='X' && board[box2] == 'X' && board[box3]=='X'){
                winner(player1);
                return true
            }
            else if(board[box1]=='O' && board[box2] == 'O' && board[box3]=='O'){
                winner(player2);
                return true
            }
        }        
    }

    const playRound = (index) => {
        
        
        if(papan.pushSimbol(playerAktif.simbol, index) == false){
            return
        }
        if(checkWinner(papan.getBoard())){
            return;
        }
        switchPlayer();
        newRound();
    }

    return{playRound, printPlayer}
}

let permainan = Game()






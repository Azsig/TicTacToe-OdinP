//The Gameboard that represent of the board

function GameBoard (){
    //make the board
    const row = 3;
    const column = 3;
    const board = []

    for(i = 0; i < row*column; i++){
        board[i] = i;
    }
    //function to call the board
    const getBoard = () => board;
    //add symbol to board array
    function pushSimbol(simbol, ind){
        if(boardCheck(board, ind) == false){
            return false;
        }
        index = ind;
        board[index] = simbol
    }
    //checking the board if the board are empty or not
    const boardCheck = (board, i) =>  {
        if(board[i] ==='X' || board[i] ==='O'){
            return false
        }
        else{
            return true
        }
    }
    //printing the board in console
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
    //factory for player
    const player = (symbol, name) =>{
        const simbol = symbol;
        const nama = name;
        return {simbol, nama};
    }

    //take the element in document that needed
    let cellList = document.querySelectorAll('.cell');
    let text = document.querySelector('#text')
    let resetbtn = document.querySelector('#reset');
    let nama1 = document.querySelector('#nama1');
    let nama2 = document.querySelector('#nama2')

    //add Event on reset button when clicked
    resetbtn.addEventListener('click', reset)

    //add Event on cell board
    cellList.forEach(cell => {
        cell.addEventListener('click',()=>{
            number = +cell.id;
            playRound(number-1, cell);
        })
    })

    //call the game board
    let papan = GameBoard()

    //define player
    player1 = player('X', 'pemain1');
    player2 = player('O', 'pemain2');

    if(nama1.value !== ''){
        player1.nama = nama1.value;
    }
    if(nama2.value !== ''){
        player2.nama = nama2.value
    }
    
    //take the active Player
    let playerAktif = player1

    //switch the active player after one round
    function switchPlayer(){
        playerAktif = playerAktif === player1 ? player2:player1;
    }

    //print the active player on console
    function printPlayer(){
        console.log(`giliran ${playerAktif.nama} dengan simbol ${playerAktif.simbol}`);
    }

    //function to make new round after one round
    function newRound(){
        papan.printBoard()
        text.textContent = `giliran ${playerAktif.nama} untuk jalan`
        console.log(`giliran ${playerAktif.nama} untuk jalan`)
    }

    //function to print the winner
    function winner(player){
        text.textContent = `pemenangnya adalah ${player.nama}`
        console.log(`pemenangnya adalah ${player.nama}`)
    }

    //function that check the winner
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

    //function to play a round
    const playRound = (index, cell) => {
        if(checkWinner(papan.getBoard())){
            return;
        }
        if(papan.pushSimbol(playerAktif.simbol, index) == false){
            return
        }
        cell.textContent = playerAktif.simbol
        if(checkWinner(papan.getBoard())){
            return;
        }
        
        switchPlayer();
        newRound();
    }

    //function to reset the game
    function reset(){
        let papan2 = papan.getBoard()
        for(i = 0; i < papan2.length; i++){
            papan2[i] = i;
        }
        playerAktif = player1;
        text.textContent = `giliran ${playerAktif.nama} untuk jalan`
        cellList.forEach(cell => {
            cell.textContent = ''
        })
    }

    text.textContent = `giliran ${playerAktif.nama} untuk jalan`

    return{playRound, printPlayer, reset}

}






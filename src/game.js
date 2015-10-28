export const player = (name, deck) => {
    return {
        name,
        deck,
        health: 100,
        energy: 0
    };
};

export class Game {
    constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
        this.turns = 0;
        this.currentPlayer;
        this.otherPlayer;
    }
    
    coinToss(rng) {
        if (rng) {
           this.currentPlayer = this.p1;
           this.otherPlayer = this.p2;
        } else {
           this.currentPlayer = this.p2;
           this.otherPlayer = this.p1;
        }
    }
    
    nextTurn(amount) {
        this.turns++;
        [this.currentPlayer, this.otherPlayer] = [this.otherPlayer, this.currentPlayer];
        this.currentPlayer.energy += amount;
    }
    
    start() {
        const rng = Math.floor(Math.random() * 2);
        this.coinToss(rng);
        this.turns++;
        this.currentPlayer.energy += 5;
    }
}
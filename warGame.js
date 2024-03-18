// Define the Deck class to represent a full deck of playing cards
class Deck {
  constructor() {
    this.deck = []; // Array to store the cards
    this.suits = ["Hearts", "Diamonds", "Clubs", "Spades"]; // All possible suits
    this.faceValues = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"]; // All possible face values

    // Create a deck of 52 cards with suits and face values
    for (let suit of this.suits) {
      for (let i = 0; i < this.faceValues.length; i++) {
        this.deck.push({
          suit: suit,
          faceValue: this.faceValues[i],
          // Assigns values 1-10 for Ace to 10, and 10 for Jack, Queen, King
          value: i < 10 ? i + 1 : 10
        });
      }
    }
  }

  // Method to shuffle the deck of cards
  shuffle() {
    for (let i = this.deck.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]]; // Swap elements
    }
  }

  // Method to deal (remove and return) the top card of the deck
  deal() {
    return this.deck.pop();
  }
}

// Define the Player class to represent a player in the game
class Player {
  constructor(name) {
    this.name = name; // Player's name
    this.hand = []; // Array to store the player's cards
    this.score = 0; // Player's score
  }

  // Method for a player to play (remove and return) the top card of their hand
  playCard() {
    return this.hand.pop();
  }

  // Method to add a card to the player's hand
  receiveCard(card) {
    this.hand.push(card);
  }
}

// Define the Game class to manage the gameplay
class Game {
  constructor() {
    this.deck = new Deck(); // Create a new deck of cards
    this.player1 = new Player("Player 1"); // Create player 1
    this.player2 = new Player("Player 2"); // Create player 2
    this.deck.shuffle(); // Shuffle the deck before starting the game
  }

  // Method to deal 26 cards to each player from the deck
  dealCards() {
    for (let i = 0; i < 26; i++) {
      this.player1.receiveCard(this.deck.deal());
      this.player2.receiveCard(this.deck.deal());
    }
  }

  // Method to play a single round of the game
  playRound() {
    let card1 = this.player1.playCard(); // Player 1 plays a card
    let card2 = this.player2.playCard(); // Player 2 plays a card

    // Compare the value of the cards and award points to the player with the higher card
    if (card1.value > card2.value) {
      this.player1.score += 1;
    } else if (card2.value > card1.value) {
      this.player2.score += 1;
    }
    // In case of a tie, no points are awarded
  }

  // Method to play through all rounds until all cards have been played
  playGame() {
    this.dealCards(); // Deal cards to each player
    while (this.player1.hand.length > 0 && this.player2.hand.length > 0) {
      this.playRound(); // Play a round
    }
    this.declareWinner(); // Declare the winner at the end of the game
  }

  // Method to determine and announce the winner based on scores
  declareWinner() {
    if (this.player1.score > this.player2.score) {
      console.log(`Winner is ${this.player1.name} with a score of ${this.player1.score}`);
    } else if (this.player2.score > this.player1.score) {
      console.log(`Winner is ${this.player2.name} with a score of ${this.player2.score}`);
    } else {
      console.log("The game is a tie!"); // In case of a tie
    }
  }
}

// Initiate and play the game
let game = new Game();
game.playGame();
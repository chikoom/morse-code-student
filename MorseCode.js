const BSTree = require('./BinarySearch')
const alphabet = require('./alphabet')

class ScoreTree extends BSTree {
    constructor(value, score) {
        super(value)
        this.score = score
    }
    insertNode(key, score) { //this function inserts a letter into the morse code tree - this should run once in the beginning
        if (!this.value) {
            this.value = key
            this.score = score
        }
        else if (score > this.score && this.rightChild) {
            this.rightChild.insertNode(key, score)
        }
        else if(score <= this.score && this.leftChild) {
            this.leftChild.insertNode(key, score)
        }
        else if (score <= this.score) {
            this.leftChild = new ScoreTree(key, score)
        }
        else {
            this.rightChild = new ScoreTree(key, score)
        }
    }
    findLetter () {
        // this method should record the path to a given letter
    }
    translateWord() {
        //this method should translate a given word from text to Morse Code
    }
    translateMorse() {
        // this function should translate a given code from Morse to English
    }
}
//initializing the MorseCode tree
const morseCode = new ScoreTree("TOP", 50)
Object.keys(alphabet).forEach(l => {
    morseCode.insertNode(l, alphabet[l])
})

morseCode.translateWord("welcome") // should print .-- . .-.. -.-. --- -- . 
morseCode.translateWord("elevation is cool") // should print . .-.. . ...- .- - .. --- -. /.. ... /-.-. --- --- .-.. 
morseCode.translateMorse("... ---- ....")
morseCode.translateMorse("-. .. -.-. . / .--- --- -... / --- -. / - .... . / .-.. . ... ... --- -.")

const BSTree = require('./BinarySearch')
const alphabet = require('./alphabet')

class ScoreTree extends BSTree {
  constructor(value, score) {
    super(value)
    this.score = score
  }
  insertNode(key, score) {
    //this function inserts a letter into the morse code tree - this should run once in the beginning
    if (!this.value) {
      this.value = key
      this.score = score
    } else if (score > this.score && this.rightChild) {
      this.rightChild.insertNode(key, score)
    } else if (score <= this.score && this.leftChild) {
      this.leftChild.insertNode(key, score)
    } else if (score <= this.score) {
      this.leftChild = new ScoreTree(key, score)
    } else {
      this.rightChild = new ScoreTree(key, score)
    }
  }
  findLetter(letter) {
    const letterScore = alphabet[letter.toUpperCase()]
    let strToReturn = ''
    if (letterScore < this.score) {
      if (this.leftChild) {
        strToReturn += '.'
        strToReturn += this.leftChild.findLetter(letter)
      } else {
        return ''
      }
    } else if (letterScore > this.score) {
      if (this.rightChild) {
        strToReturn += '-'
        strToReturn += this.rightChild.findLetter(letter)
      } else if (letterScore === this.score) {
        return ''
      }
    }
    return strToReturn
  }

  getLetterByScore(score) {
    let letter = ''
    for (const [key, value] of Object.entries(alphabet)) {
      if (value === score) letter = key
    }
    return letter
  }
  translateWord(word) {
    let strToReturn = ''
    for (let i = 0; i < word.length; i++) {
      if (word.charAt(i) === ' ') {
        strToReturn += '/'
      } else {
        strToReturn += this.findLetter(word.charAt(i)) + ' '
      }
    }
    console.log(strToReturn.trim())
    return strToReturn
  }
  findCode(code) {
    if (code.length === 0) return this.value
    else {
      if (code.charAt(0) === '.')
        return this.leftChild.findCode(code.substring(1, code.length))
      else if (code.charAt(0) === '-')
        return this.rightChild.findCode(code.substring(1, code.length))
    }
    return this.value
  }
  translateMorse(code) {
    let strToReturn = ''
    let codeWords = code.split('/')
    codeWords.forEach(codeWord => {
      let codeLetter = codeWord.trim().split(' ')
      codeLetter.forEach(letter => {
        strToReturn += this.findCode(letter) + ''
      })
      strToReturn += ' '
    })
    console.log(strToReturn.trim())
    return strToReturn
  }
}
//initializing the MorseCode tree
const morseCode = new ScoreTree('TOP', 50)
Object.keys(alphabet).forEach(l => {
  morseCode.insertNode(l, alphabet[l])
})

morseCode.translateWord('welcome') // should print .-- . .-.. -.-. --- -- .
morseCode.translateWord('elevation is cool') // should print . .-.. . ...- .- - .. --- -. /.. ... /-.-. --- --- .-..
morseCode.translateMorse('... --- ...')
morseCode.translateMorse(
  '-. .. -.-. . / .--- --- -... / --- -. / - .... . / .-.. . ... ... --- -.'
)

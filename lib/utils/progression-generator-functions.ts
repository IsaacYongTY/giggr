const spaceChar = " "

export const renderSpacing = (spacing : number, chordLength : number) => spaceChar.repeat(spacing - (chordLength - 1))


interface KeyInfo {
    id: number
    key: string
    degree: number
    isSharp: boolean
}

export const keyMap : KeyInfo[] = [
    {
        id: 0,
        key: 'C',
        degree: 0,
        isSharp: true
    },
    {
        id: 7,
        key: 'G',
        degree: 1,
        isSharp: true
    },
    {
        id: 2,
        key: 'D',
        degree: 2,
        isSharp: true
    },
    {
        id: 9,
        key: 'A',
        degree: 3,
        isSharp: true
    },
    {
        id: 4,
        key: 'E',
        degree: 4,
        isSharp: true
    },
    {
        id: 11,
        key: 'B',
        degree: 5,
        isSharp: true
    },
    {
        id: 12,
        key: 'F#',
        degree: 6,
        isSharp: true
    },
    {
        id: 5,
        key: 'F',
        degree: 1,
        isSharp: false
    },
    {
        id: 10,
        key: 'Bb',
        degree: 2,
        isSharp: false
    },
    {
        id: 3,
        key: 'Eb',
        degree: 3,
        isSharp: false
    },
    {
        id: 8,
        key: 'Ab',
        degree: 4,
        isSharp: false
    },
    {
        id: 1,
        key: 'Db',
        degree: 5,
        isSharp: false
    },
    {
        id: 6,
        key: 'Gb',
        degree: 6,
        isSharp: false
    },
]

export const createChordsInKey = (inputKey: number) : string[] => {

    const resultKey = keyMap.find(element => element.id === inputKey)

    if(!resultKey) {
        return []
    }

    let { key, degree, isSharp } : KeyInfo = resultKey || {}

    const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
    const keyIndex = notes.indexOf(key[0])

    let reshuffledNotes = notes.slice(keyIndex).concat(notes.slice(0,keyIndex))

    let accidental = isSharp? '#' : 'b'

    let noteIndex = isSharp ? 6 : 3

    // 6 -> 2 -> 5 -> 1
    let i = 0
    while(i < degree) {

        reshuffledNotes[noteIndex] += accidental

        if(isSharp) {
            noteIndex += 3

            if (noteIndex > 6) {
                noteIndex -= notes.length
            }

        }  else {
            noteIndex -= 3
            if (noteIndex < 0) {
                noteIndex += notes.length
            }
        }
        i++
    }
    return reshuffledNotes
}

 export const assignChordsToProg = function (notesInKeyArray : string[], progression : string) : string[] {

     let progressionArray = progression.match(/(b[1-7])|([1-7]m)|([1-7]M)|\d/g)

     if(!progressionArray) {
         return []
     }
     return progressionArray.map((chordNum: string) => {
         // If explicitly specified
         if (chordNum.length > 1) {

             if (chordNum[0] === 'b') {
                 return notesInKeyArray[parseInt(chordNum[1]) - 1] + 'b'
             }

             if (chordNum[1] === 'm') {
                 return notesInKeyArray[parseInt(chordNum[0]) - 1] + 'm'
             }

             if (chordNum[1] === 'M') {
                 return notesInKeyArray[parseInt(chordNum[0]) - 1].replace(/m/, '')
             }
             return ""

         }

         //default family chords
         if(parseInt(chordNum[0]) === 3 || parseInt(chordNum[0]) === 6) {
             return notesInKeyArray[parseInt(chordNum) - 1] + 'm'
         }

         if(parseInt(chordNum[0]) === 2) {
             return notesInKeyArray[parseInt(chordNum) - 1] + 'm7'
         }
         if(parseInt(chordNum[0]) === 7) {
             return notesInKeyArray[parseInt(chordNum) - 1] + 'dim7'
         }
         return notesInKeyArray[parseInt(chordNum[0]) - 1]

     })

 }

 export const fullBarProg = function (chords : string[], space: number) {
    let resultString = ''

    // Generate string
    for( let index = 0; index !== chords.length; index++) {
        resultString = resultString + `|\xa0`

        resultString += `[${chords[index]}]` + renderSpacing(space, chords[index].length)

       if((index + 1) % 4 === 0 && index < chords.length) {
       resultString += `|\n` // Close and go to next line
       }
    }

    // For ending
    if (chords.length > 0 && chords.length % 4 !== 0) {
       resultString += `|\n\n`
    }  else {
       resultString += `\n`
    }

    return resultString
 }

export const halfBarProg = function (chords : string[], space : number) {
    const halfSpace = Math.ceil((space/2))
    let resultString = ''

    // Generate string
    for(let index = 0; index < chords.length; index++) {
    
    // Extra 'if' code for half bar program
       if ((index + 1) % 2 !== 0) {
          resultString = resultString + '|\xa0'
       }
    // 

        if (chords[index].length === 1) {
            resultString += `[${chords[index]}]` + renderSpacing(halfSpace, 0)
        } else {
                resultString += `[${chords[index]}]` + renderSpacing(halfSpace, chords[index].length - 1) 
        }
       
       if((index + 1) % 4 === 0 && index < chords.length) {
            resultString += `|\n` // Ending bar line every 4 chords
        }   
    }
    
    // For ending
    if(chords.length > 0) {
       
        if(chords.length % 2 !== 0) {
            resultString += `${renderSpacing(halfSpace + 3 ,0)}|\n\n`
            // Note: in [Xyyy] halfBarSpace,  included __yyy_KK, y + K = halfBarSpace, empty space = constant = 3
            // For position 2,4,6...
        } else if ((chords.length + 1) % 2 !== 0 && chords.length % 4 !== 0) {
                resultString += `|\n\n`
                
                // Note: in [Xyyy] halfBarSpace,  included __yyy_KK, y + K = halfBarSpace, empty space = constant = 3
                // For position 1,5,9...
        } else {
            resultString += `\n`
        }
    }  

    return resultString
}


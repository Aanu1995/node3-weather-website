const fs = require('fs')
const {default: chalk} = require('chalk')

const success = chalk.green
const error = chalk.red

const addNote = (title, body) => {
    const notes = loadNote()
    const duplicateNotes = notes.find((note) => note.title === title)

    if (! duplicateNotes) {
        notes.push({title: title, body: body})
        saveNotes(notes)
        console.log(success('New note added'))
    } else {
        console.log(error('note title taken'))
    }

}

const removeNote = (title) => {
    const notes = loadNote()

    const noteToKeep = notes.filter(note => note.title !== title)

    if (notes.length > noteToKeep.length) {
        console.log(success("Note removed!"))
        saveNotes(noteToKeep)
    } else {
        console.log(error('No note found'))
    }

}

const saveNotes = (notes) => {
    const dataJson = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJson)
}

const listNote = () => {
    console.log(chalk.blue('Notes list'))
    console.log(chalk.blue('-------------'))
    const notes = loadNote()
    notes.forEach(note => console.log(success(note.title)));
}

const readNote = (title) => {
    const notes = loadNote()

    const read = notes.find((note) => note.title === title)

    if (read) {
        console.log(chalk.bgGreen(read.title))
        console.log(success(read.body))

    } else {
        console.log(error('No note found'))
    }
}


const loadNote = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson);
    } catch (e) {
        return []
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNote: listNote,
    readNote: readNote
}

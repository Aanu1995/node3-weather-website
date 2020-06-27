const {default: chalk} = require("chalk");
const {default: validator} = require("validator");
const yargs = require("yargs");

const note = require("./note.js");
const {demandOption} = require("yargs");

yargs.version("1.1.0");

// create add command
yargs.command({
    command: "add",
    description: "Add a new note",
    builder: {
        title: {
            description: "Note title",
            demandOption: true,
            type: "string"
        },
        body: {
            description: "Note body",
            demandOption: true,
            type: "string"
        }
    },
    handler: (argv) => note.addNote(argv.title, argv.body)


});

// create remove command
yargs.command({
    command: "remove",
    description: "remove an existing note",
    builder: {
        title: {
            description: "Note title",
            demandOption: true,
            type: "string"
        }
    },
    handler: (argv) => note.removeNote(argv.title)

});

// create list command
yargs.command({
    command: "list",
    description: "list all note",
    handler: () => note.listNote()
});

// create read command
yargs.command({
    command: "read",
    description: "read a new note",
    builder: {
        title: {
            description: 'note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => note.readNote(argv.title)
});

yargs.parse();

// console.log(yargs.argv);

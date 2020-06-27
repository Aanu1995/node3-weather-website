const fs = require("fs");

// const databuffer = fs.readFileSync("t-json.json");

// const dataObject = JSON.parse(databuffer.toString());

// dataObject.name = "Aanu Olakunle";
// dataObject.planet = "Mars";
// dataObject.age = 25;

// dataJson = JSON.stringify(dataObject);

// fs.writeFileSync("t-json.json", dataJson);

// console.log(dataObject);

const event = {
    name: 'Birthday Party',
    guestList: [
        'Andrew', 'Jen', 'Mike'
    ],
    printGuestList() {
        console.log('Guest list for ' + this.name)
        this.guestList.forEach(guest => console.log(guest + ' is attending ' + this.name))
    }
}

event.printGuestList()

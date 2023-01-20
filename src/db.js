import Dexie from "dexie";

export const db = new Dexie('stickyNotesDB');
db.version(1).stores({
    notes: 'id,x_coordinate, y_coordinate, content'
});

// db.delete().then(() => {
//     console.log("Database successfully deleted");
// }).catch((err) => {
//     console.error(err);
// })

// db.notes.each(note=> console.log(note))
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'



open({
    filename: './database.db',
    driver: sqlite3.Database
  }).then((db) => {

    db.exec(`CREATE TABLE If NOT EXISTS tokens
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        token TEXT,
        user_id INT
    );`);

  })



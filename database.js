const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./blog.db', (err) => {
    if (err) {
        console.error('Error openeing database: ', err.message);
    } else {
        console.log('Connected to the SQLite database.');

        db.run(`
            create table if not exists users (
                id integer primary key autoincrement,
                name text not null,
                email text unique not null
            );
        `);

        db.run(`
            create table if not exists posts (
                id integer primary key autoincrement,
                user_id integer not null,
                title text not null,
                content text,
                foreign key (user_id) references users(id)
            );
        `);
    }
});


module.exports = db;
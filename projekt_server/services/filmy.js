const db = require('./db');
const config = require('../config');

async function getFilmy(){

    const rows = await db.query(
        'SELECT * from ulubione'
    );

    return rows;
}

async function getFilm(ids){

    const result = await db.query(
        'SELECT * FROM ulubione WHERE id_filmu="'+ids+'";'
    );

    return result;
}

async function addFilm(ids){

    const result=await db.query(
        'INSERT INTO ulubione (id_filmu) VALUES ("'+ids+'");'
    )

    let message = 'Błąd podczas dodawania filmu';

    if (result.affectedRows) {
        message = 'Film pomyślnie dodany';
    }

    return {message};
}

async function deleteFilm(ids){

    const result=await db.query(
        'DELETE FROM ulubione where id_filmu="'+ids+'";'
    )

    let message = 'Błąd podczas usuwania filmu';

    if (result.affectedRows) {
        message = 'Film usunięty pomyślnie';
    }

    return {message};
}

module.exports = {
    getFilmy,
    getFilm,
    addFilm,
    deleteFilm
}
const db = require('../db');

class MemoryRepository {
    constructor(dbName) {
        this.dbName = dbName;
    }

    getAll() {
        return new Promise((resolve) => {
            resolve(db[this.dbName]);
        });
    }

    getById(id) {
        return new Promise((resolve, reject) => {
            const data = db[this.dbName].find((item) => item.id === id);

            if (data) resolve(data);
            else reject(new Error(`${ this.dbName.substring(0, this.dbName.length - 1) } with id ${id} not found`));
        });
    }

    add(payload) {
        return new Promise((resolve) => {
            db[this.dbName].push(payload);
            resolve(payload);
        });
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            const index = db[this.dbName].findIndex((item) => item.id === id);

            if (index !== -1) {
                db[this.dbName].splice(index, 1);
                resolve();
            } else {
                reject(new Error(`${ this.dbName.substring(0, this.dbName.length - 1) } with id ${id} not found`));
            }
        });
    }

    update(payload) {
        return new Promise((resolve, reject) => {
            const index = db[this.dbName].findIndex((item) => item.id === payload.id);

            if (index !== -1) {
                db[this.dbName].splice(index, 1, payload);
                resolve(payload);
            } else {
                reject(new Error(`${ this.dbName.substring(0, this.dbName.length - 1) } with id ${payload.id} not found`));
            }
        })
    }
}

module.exports = { MemoryRepository };

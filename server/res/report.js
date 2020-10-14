class Report{
    static #id = 0;
    constructor(pseudo, description, localisation, date){
        this.id = Report.#id++;
        this.auth = pseudo;
        this.descr = description;
        this.loc = localisation;
        this.date = date;
    }
}

module.exports = Report;

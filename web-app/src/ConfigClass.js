export default class ConfigClass{
    constructor(){

    }

    static getUrlApp(){
        this.urlApp = "http://localhost:3000";
        return this.urlApp;
    }
}
export default class AbstractView{
    constructor() {
        
    }

    setTitile(title){
        document.title = title
    }

    async getHtml(){
        return ``
    }
}
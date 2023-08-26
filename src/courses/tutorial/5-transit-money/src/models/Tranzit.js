class Transit{
    constructor(form, to, exportMoney ){
        this.form = form;
        this.to = to;
        this.exportMoney = exportMoney;
        this.createdat = new Date();
    }
}

module.exports = Transit;
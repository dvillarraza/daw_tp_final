class ViewMainPage {
    constructor(myf) {
        this.myf = myf;
    }
    showDevices(list) {
        // cargo la lista de objetos en el DOM
        let devicesUl = this.myf.getElementById("devicesList");
        let items = "";
        for (let i in list) {
            let checkedStr = "";
            if (list[i].state == "1")
                checkedStr = "checked";
            switch (list[i].type) {
                case 0: // Lampara                     
                    items += "<li class='collection-item avatar'> \
                                <img src='images/lightbulb.png' alt='' class='circle'> \
                                <span class='title'>" + list[i].name + "</span> \
                                <p>" + list[i].description + "<br> \
                                </p> \
                                <a href='#!' class='secondary-content'> <div class='switch'> \
                                                                            <label> \
                                                                            Off \
                                                                            <input type='checkbox' id='dev_" + list[i].id + "' " + checkedStr + "> \
                                                                            <span class='lever'></span> \
                                                                            On \
                                                                            </label> \
                                                                        </div></a> \
                            </li>";
                    break;
                case 1: // Persiana                    
                    items += "<li class='collection-item avatar'> \
                                <img src='images/window.png' alt='' class='circle'> \
                                <span class='title'>" + list[i].name + "</span> \
                                <p>" + list[i].description + "<br> \
                                </p> \
                                <a href='#!' class='secondary-content'> <div class='switch'> \
                                                                            <label> \
                                                                            Off \
                                                                            <input type='checkbox' id='dev_" + list[i].id + "' " + checkedStr + "> \
                                                                            <span class='lever'></span> \
                                                                            On \
                                                                            </label> \
                                                                        </div></a> \
                            </li>";
                    break;
            }
        }
        devicesUl.innerHTML = items;
    }
    getSwitchStateById(id) {
        let el = this.myf.getElementById(id);
        return el.checked;
    }
    MostrarBotones() {
        // cargo la etiqueta Botones del DOM
        let devicesUl = this.myf.getElementById("botones");
        //Agrego los tres botones
        let Botones = "<a class='waves-effect waves-light btn' id='btn_Todos'>TODOS</a> \
                              <a class='waves-effect waves-light btn' id='btn_Lamparas'>LAMPARAS</a> \
                              <a class='waves-effect waves-light btn' id='btn_Persianas'>PERSIANAS</a>";
        devicesUl.innerHTML = Botones;
    }
}
class Main {
    handleEvent(evt) {
        //Recupero el id del objeto que hizo click
        let obj = this.myf.getElementByEvent(evt);
        //Obtenemos un array del id 
        //el primer campo identificar el tipo de objeto
        //el segundo campo para saber dentro del tipo cual hizo el click
        let tipo_id = obj.id.split("_", 2);
        if (tipo_id[0] == "dev") { //Se presiono un switch
            console.log("click en switch");
            console.log("click en device:" + obj.id);
            let data = { "id": obj.id, "state": this.view.getSwitchStateById(obj.id) };
            this.myf.requestPOST("devices", data, this);
            return;
        }
        if (tipo_id[0] == "btn") { //Se presiono un boton
            console.log(tipo_id[1]);
            switch (tipo_id[1]) {
                case "Todos": //Se presiono el boton TODOS
                    console.log("click en boton: " + obj.textContent);
                    //Se hace un GET para obtener todos los dispositivos
                    this.myf.requestGET("devices?filter=0", this);
                    break;
                case "Lamparas": //Se presiono el boton Lamparas
                    console.log("click en boton: " + obj.textContent);
                    //Se hace un GET para obtener solo las lamparas
                    this.myf.requestGET("devices?filter=1", this);
                    break;
                case "Persianas": //Se presiono el boton Persianas
                    console.log("click en boton: " + obj.textContent);
                    //Se hace un GET para obtener solo las persianas
                    this.myf.requestGET("devices?filter=2", this);
                    break;
            }
        }
    }
    handleGETResponse(status, response) {
        if (status == 200) {
            console.log(response);
            let data = JSON.parse(response);
            console.log(data);
            this.view.showDevices(data);
            for (let i in data) {
                let sw = this.myf.getElementById("dev_" + data[i].id);
                sw.addEventListener("click", this);
            }
        }
    }
    handlePOSTResponse(status, response) {
        if (status == 200) {
            console.log(response);
        }
    }
    CrearBotones() {
        //Creo los Botones en el DOM
        this.view.MostrarBotones();
        //Agrego eventos de click de los botones
        this.myf.getElementById("btn_Todos").addEventListener("click", this);
        this.myf.getElementById("btn_Lamparas").addEventListener("click", this);
        this.myf.getElementById("btn_Persianas").addEventListener("click", this);
    }
    main() {
        this.myf = new MyFramework();
        this.view = new ViewMainPage(this.myf);
        //Se crean 3 botones y se agregan eventos de click
        this.CrearBotones();
        this.myf.requestGET("devices?filter=0", this);
    }
}
window.onload = () => {
    let obj = new Main();
    obj.main();
};

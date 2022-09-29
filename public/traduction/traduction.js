var dataJson = {};

function loadTraduction() {
    let userTraduction = localStorage.getItem('traduction') || 'fr';
    document.documentElement.setAttribute('lang', userTraduction);
    let promise = new Promise((resolve, reject) => {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                dataJson = JSON.parse(this.response)
                selectedTraductionComponent();
                document.getElementById("selectTraduction").value = userTraduction;
                resolve(dataJson);
            }
        };
        xhttp.open("GET", "/public/traduction/traduction.json", true);
        xhttp.send();
    }).then((dataJson) => {
        const traduction = dataJson['traduction']
        for (let idTraduction in dataJson["traduction"]) {
            setTraduction(idTraduction, traduction[idTraduction][userTraduction])
        }
    });
}
/**fonction pour inseret la traduction dans la traduction */
function setTraduction(selectedId, value) {
    try {
        document.getElementById(selectedId).innerHTML = value;
    } catch (error) {
        return false;
    }
}

/**fonction pour le l'evenement onChange de la select traduction */
function getSelectedTraduction() {
    let traduction = document.getElementById("selectTraduction").value
    document.documentElement.setAttribute('lang', traduction)
    localStorage.setItem('traduction', traduction)
    loadTraduction();
}


/**fonction pour afficher la list de traduction disponible */
function selectedTraductionComponent() {

    let component = `
    <select id="selectTraduction" onchange="getSelectedTraduction()">
       ${OptionTraduction ()}
    </select>
    `
    document.querySelector('.RmSelectTraduction').innerHTML = component
}
/**fonction pour affiche les options de select traduction */
function OptionTraduction() {
    let options = ""
    try {
        let listTraductionLanguage = Object.keys(dataJson['lang'])
        listTraductionLanguage.map((codeLanguage) => {
            let optionComponent = `<option value=${codeLanguage}>${dataJson['lang'][codeLanguage]}</option>`
            options += optionComponent;

        })
    } finally {
        return options;
    }
}
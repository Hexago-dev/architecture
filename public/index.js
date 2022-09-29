var scriptsList = [];
if (true === true) {
    console.time('build')
    buildApplication();
    console.timeEnd()
    window.addEventListener("DOMContentLoaded", async(e) => {
        statusLoadedPage = () => {
            if (e.target.readyState = "complet") {
                setTimeout(() => {
                    takeIntersection(".get")
                    document.addEventListener('loadedmetadata', loadTraduction())
                    return true
                }, 1000)
            } else {
                console.log(" in-completed");
                return statusLoadedPage()
            }
        }

        statusLoadedPage();
    })
}

function buildApplication() {
    makeXmlHttpRequest("/conf.json")
        .then((result) => {
            let container = document.querySelector("#container_app")
            let sectionsList = result["order_pages"];
            let stylesList = result["styles_pages"];
            scriptsList = result["scripts_files"];
            let primaryArray = [sectionsList.length, stylesList.length]
            container.innerHTML = ""
            for (let index = 0; index < Math.max(...primaryArray); index++) {
                index < stylesList.length ?
                    addStyle(stylesList[index]) : false;
                index < sectionsList.length ?
                    makeXmlHttpRequest(`/src/pages/${sectionsList[index]}`).then((result) => {
                        index < sectionsList.length ? container.innerHTML += result : "";
                        referenciesImageSource();
                        addBackgroud();
                        // specifie intersection file 
                    }) : false;
            }
        })
}

function makeXmlHttpRequest(request) {
    return new Promise((resolve, reject) => {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                try {
                    const result = JSON.parse(this.response)
                    resolve(result);
                } catch (error) {
                    const result = this.response
                    resolve(result)
                }
            }
        };
        xhttp.open("GET", request, true);
        xhttp.send();
    })
}

function addStyle(pathName) {
    return document.head.innerHTML += `<link rel="stylesheet" href="../src/assets/css/${pathName}"></link>`;
}

function addScript(pathName) {
    console.log("is called");
    return document.body.innerHTML += ` <script src='../src//assets//scripts/${pathName}' defer></script>`;
}

function referenciesImageSource() {
    images = document.querySelectorAll(".print-image");
    for (image of images) {
        let fileName = image.attributes["src"].value;
        fileName = fileName.split("/")
        image.setAttribute("src", `../src/assets/img/${fileName[fileName.length - 1]}`)
    }
}

function addBackgroud() {
    const bgImgs = document.querySelectorAll('[bgImg]');
    for (bgImg of bgImgs) {
        let fileName = bgImg.attributes["bgImg"].value;
        fileName = fileName.split("/")
        bgImg.style.backgroundImage = `url('../src/assets/img/${fileName[fileName.length - 1]}')`
    }
}


function takeIntersection(querySelectorDocument) {
    const sections = [...document.querySelectorAll(querySelectorDocument)];
    var options = {
        rootMargin: "0px",
        threshold: 0.25
    };
    var callback = (entries, observer) => {
        entries.forEach(entry => {
            const {
                target
            } = entry;
            if (entry.intersectionRatio >= 0.15) {
                target.classList.add("is-active");
            } else {
                //pass
            }
        });
    };
    const observer = new IntersectionObserver(callback, options);

    sections.forEach((section, index) => {
        observer.observe(section);

    });
}
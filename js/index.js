// fonction pour récupérer le contenu du canvas sous forme d'image
function saveCanvasAsImage() {
    var imageDataUrl = canvas.toDataURL();
    console.log(imageDataUrl);
    var link = document.createElement("a");
    link.download = "digits.png";
    link.href = imageDataUrl;

    link.click();
}

function sendCanvasImageToApi() {
    var imageDataUrl = canvas.toDataURL().split(",");
    imageDataUrl = imageDataUrl.pop();
    var apiUrl = 'http://127.0.0.1:5000/predict';

    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)"
        },
        body: JSON.stringify({ image: imageDataUrl }),
    }

    fetch(apiUrl, options)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.success) {
                document.querySelector(".pred-msg").innerHTML = "Ahh oui ! Je sais c'est un :"
                document.querySelector(".pred-number").innerHTML = data.result.prediction
            } else {
                document.querySelector(".pred-msg").innerHTML = "Oups !! Une erreur s'est produite 🤧"
            }
        })
        .catch(error => {
            console.error(error);
        })
}
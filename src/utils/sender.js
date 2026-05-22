/**
 * Fonction pour récupérer des données dans la base de données
 * @param {Array} data les données à envoyer
 * @param {url} url lien vers le endpoint
 * @returns {Promise<Response>} la réponse de la requête
 */
function sender(data,url){
    //Changer tout simplement l'url où retrouver le fichier request.php
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

export default sender;
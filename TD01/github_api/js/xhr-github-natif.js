


/**
 * @param {string} urlSend URL ou root API
 * @param {function} success function call in success
 * @return init page
 */
function sendXhr(urlSend, success) {
	let xhr = new XMLHttpRequest();
	xhr.open("GET", urlSend);
	xhr.responseType = 'json';

	xhr.addEventListener('load', (response) => {
		success(response.target.response)
	});
	xhr.addEventListener('error', (response) => {
		console.log("error", response);
	})
	xhr.send();
}

/** 
* Recupere les repos d'un user sur Github
* @param {objet} data liste des users github, uid {int} 
* @return none
*/
function getUser (data, userRang){
	let user = data[userRang];
	console.log('user : ', user.login);
	sendXhr(user.repos_url, displayUserRepos);
}

/**
* Fonction qui affiche la liste des repos du user
* @param {objet} reposList liste des repos du user
* @return : none
*/
function displayUserRepos (reposList) {
	console.log('liste des repos : ', reposList)
	let list = document.createElement('ul');
	reposList.forEach(element => {
		console.log(element);
		let items = document.createElement('li');
		items.innerText = element.name;
		list.appendChild(items)
	});
	document.querySelector('#listusers').appendChild(list);
}

/**
* gere les taches pour afficher les repos d'un user
* @param {int} userRang id du user
* @return : none
*/
function getUserRepos(userRang) {
	sendXhr('https://api.github.com/users', (data) => {
		getUser(data, userRang)
	})
}


// -------------- main

document.addEventListener("DOMContentLoaded", () => {
	getUserRepos(3);
})
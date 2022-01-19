


/**
 * @param {string} urlSend URL ou path API
 * @param {requestCallback} success function call in success
 * @return none
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
 * @param {string} urlSend URL ou path API
 * @returns none
 */
function sendXhrPromise(urlSend) {
	return new Promise(function (resolve, reject) {
		let xhr = new XMLHttpRequest();
		xhr.open('GET', urlSend);
		xhr.responseType = 'json';
		xhr.send();

		fetch(urlSend)
			.then((res) => {
				// les données arrivent correctement
				xhr.addEventListener('load', (reponse) => {
					resolve(reponse);
				});
			})
			.catch((err) => {
				// an error occured
				// on a un code d'erreur du serveur
				xhr.addEventListener('error', (reponse) => {
					reject('data transfert error : ' + reponse);
				});
			});
	});
}

/** 
* Recupere les repos d'un user sur Github
* @param {Object} data list github users 
* @param {number} userRang position in list user 
* @return none
*/
function getUser(data, userRang) {
	let user = data[userRang];
	console.log('user : ', user.login);
	// return sendXhrPromise(user.repos_url, displayUserRepos)
	sendXhr(user.repos_url, displayUserRepos);
}

/**
* Function that displays the user's rest list
* @param {Object} reposList list of user's repositories
* @return none
*/
function displayUserRepos(reposList) {
	console.log('list repos : ', reposList)
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
* manage the tasks to display the repository of a user
* @param {number} userRang user id
* @return none
*/
function getUserRepos(userRang) {
	console.log("getUserRepos");

	let result = sendXhrPromise('https://api.github.com/users', (data) => {
		getUser(data, userRang)
	})
	console.log(result);
	console.log(result.target);

	sendXhr('https://api.github.com/users', (data) => {
		getUser(data, userRang)
	})
}


// -------------- main

document.addEventListener("DOMContentLoaded", () => {
	getUserRepos(3);
})
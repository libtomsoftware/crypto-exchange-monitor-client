import fetch from 'isomorphic-fetch';

class Http {
    get(request) {
        return fetch(request.url, {
            method: 'GET',
            headers: {}
        }).then((response) => {
            return response.json();
        });
    }
}

export default new Http();

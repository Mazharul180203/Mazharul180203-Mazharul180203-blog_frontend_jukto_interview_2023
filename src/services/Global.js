export default class Global {
    static BASEURL = "https://jsonplaceholder.typicode.com"
    static async _fetch(url, body = null) {
        let payload = {
            method: body ? 'POST' : 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }
        if (body) {
            payload.body = JSON.stringify(body)
        }
        return fetch(this.BASEURL + url, payload).then(res => res.json())
    }
}
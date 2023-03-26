import Global from "./Global";

export default class PostService {
    static async createPost(data) {
        return Global._fetch('/posts', data)
    }
    static async updatePost(data) {
        return fetch('https://jsonplaceholder.typicode.com/posts/' + data.id, {
            method: 'PUT',
            body: JSON.stringify({ data }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
    }
    static async deletePost(id) {
        return fetch('https://jsonplaceholder.typicode.com/posts/' + id, {
            method: 'DELETE',
        });
    }
    static async fetchPosts(pageNumber) {
        let posts = []
        let promises = []
        for (let n = 1; n < pageNumber + 5; n++) {
            promises.push(this.getPostInfo(n)
                .then((post) => {
                    posts.push(post)
                }))


        }
        await Promise.all(promises)
        return posts
    }
    static async getPostInfo(id) {
        return Global._fetch('/posts/' + (id))
    }
    static async getPostComments(id) {
        return Global._fetch(`/posts/${id}/comments`)
    }
}
class Posts {
    // Get data
    get(posts) {
        return new Promise((resolve, reject) => {
            fetch(posts)
            .then(res => res.json())
            .then(data => resolve(data))
            .catch(err => reject(err));
        });
    }
}

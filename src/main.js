class Queue {
    #items = [];

    enqueue(item) {
        this.#items.push(item);
    }
    
    dequeue() {
        return this.#items.shift();
    }

    isEmpty() {
        return this.#items.length === 0;
    }
}

const promise = new Promise((res, rej) => {
    setTimeout(() => {
        res('promesa 1');
    }, 4000);
});

promise.then(res => console.log(res));


// IFE function
(async () => {
    const data = await promise();
    console.log(data);
})()

function promiseWaiting(time, message)
 {
    return ()  => {
        new Promise((res, rej) => {
            setTimeout(() => {
                res(message);
            }, time);
        });
    }
 };

function fetchWaiting(url) {
    return async () => {
        await new Promise(r => setTimeout(r, 1000));

        return fetch(url).then(res => res.json());
    }
}

const queue = new Queue();

queue.enqueue([promiseWaiting(1000, "p1"), (data) => console.log(data)]);
queue.enqueue([promiseWaiting(1000, "p2"), (data) => console.log(data)]);
queue.enqueue([
    fetchWaiting('http://localhost:3000/api'),
    (data) => document.getElementById('content').innerHTML += `<p>${data.title} </p>`
])

run();

async function run() {
    while(!queue.isEmpty()) {
        const result = queue.dequeue();
        const data = await result[0]();

        res[1](data);
    }
}
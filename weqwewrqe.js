function tricky() {
    console.log('A');

    return new Promise((resolve) => {
        console.log('B');

        setTimeout(() => {
            console.log('C');
            resolve('D');
        }, 0);

        resolve('E');
    }).then((val) => {
        console.log(val);

        return new Promise((resolve) => {
            console.log('F');

            setTimeout(() => {
                console.log('G');
                resolve('H');
            }, 0);

            resolve('I');
        });
    }).then((val) => {
        console.log(val);
    });
}

tricky();

console.log('J');

function challenge() {
    console.log('A');

    return new Promise((resolve) => {
        console.log('B');

        setTimeout(() => {
            console.log('C');

            resolve('D');
        }, 0);

        resolve('E');
    })
        .then((val) => {
            console.log(val);

            return new Promise((resolve) => {
                console.log('F');

                Promise.resolve().then(() => {
                    console.log('G');
                    resolve('H');
                });

                setTimeout(() => {
                    console.log('I');
                }, 0);

                resolve('J');
            });
        })
        .then((val) => {
            console.log(val);
        });
}

challenge();

console.log('K');

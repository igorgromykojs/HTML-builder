const { stdin, stdout } = process;
const fs = require('fs');
const path = require('path');


fs.writeFile(
    path.join(__dirname, 'mynotes.txt'),
    '',
    (err) => {
        if (err) throw err;
    }
);

stdout.write('Введите текст!\n');

stdin.on('data', data => {
    if (data.toString() === "exit") {
        console.log("OOOOKKKKK")
    } else  if (data.toString() != "exit"){
        fs.appendFile(
            path.join(__dirname, 'mynotes.txt'),
            data,
            err => {
                if (err) throw err;
            },
        )
    }
});


process.on('exit', () => stdout.write('Удачи в изучении Node.js!'));
// process.on('exit', code => {
//     if (code === 0) {
//         stdout.write('Всё в порядке');
//     } else {
//         stderr.write(`Что-то пошло не так. Программа завершилась с кодом ${code}`);
//     }
// });



// stdout.write('Как тебя зовут?\n');
// stdin.on('data', data => {
//   stdout.write('Привет, ');
//   stdout.write(data);
//   process.exit();
// });
// process.on('exit', () => stdout.write('Удачи!'));


// stdin.on('data', data => {
//     const text = data.toString();
//     process.exit();
//   });
// fs.appendFile(
    
//     path.join(__dirname, 'mynotes.txt'),
//     text,
//     err => {
//         if (err) throw err;
//     }
// );


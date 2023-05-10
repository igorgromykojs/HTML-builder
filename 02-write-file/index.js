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
    if (data.toString().trim() === "exit") {
        console.log('Goodbye!');
        process.exit();
    } else  if (data.toString().trim() !== "exit"){
        fs.appendFile(
            path.join(__dirname, 'mynotes.txt'),
            data,
            err => {
                if (err) throw err;
            },
        )
    }
});
process.on('SIGINT', () => {
    console.log('Goodbye!');
    process.exit(0);
  });

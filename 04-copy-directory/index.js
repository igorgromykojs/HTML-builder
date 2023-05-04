var fs = require('fs');
var path = require('path');

let folder = path.join(__dirname, 'files');
let removeFolder = path.join(__dirname, 'files-copy');

fs.mkdir(path.join(__dirname, 'files-copy'), err => {
  fs.readdir(removeFolder, {withFileTypes: true}, (error, removeList) => {
    if (!error) {
      removeList.forEach((remove) =>{
        let removeFile = path.join(__dirname, 'files-copy', remove.name);
        fs.unlink(removeFile, err => {
          if(err) throw err; // не удалось удалить файл
       });
      })
      fs.readdir(folder, {withFileTypes: true}, (error, dirEntryList) => {
        if (!error) {
          dirEntryList.forEach((dirEntry) => {
            let file = path.join(__dirname, 'files', dirEntry.name);
            let newFile = path.join(__dirname, 'files-copy', dirEntry.name);
            fs.copyFile(file, newFile, err => {
              if(err) throw err; // не удалось скопировать файл
            });
          })
        } else {
          console.error(error);
        }
      });
    } else {
      console.error(error);
    }
  }) 
});




// fs.mkdir(path.join(__dirname, 'files-copy'), err => {
//   if (err) {

//   } else {
//     fs.readdir(removeFolder, {withFileTypes: true}, (error, removeList) => {
//       if (!error) {
//         removeList.forEach((remove) =>{
//           let removeFile = path.join(__dirname, 'files-copy', remove.name);
//           fs.unlink(removeFile, err => {
//             if(err) {
//               throw err;
//             } else {// не удалось удалить файл
//             fs.readdir(folder, {withFileTypes: true}, (error, dirEntryList) => {
//               if (!error) {
//                 dirEntryList.forEach((dirEntry) => {
//                   let file = path.join(__dirname, 'files', dirEntry.name);
//                   let newFile = path.join(__dirname, 'files-copy', dirEntry.name);
//                   fs.copyFile(file, newFile, err => {
//                     if(err) throw err; // не удалось скопировать файл
//                   });
//                 })
//               } else {
//                 console.error(error);
//               }
//             });
//           }
//          });
//         })
//       } else {
//         console.error(error);
//       }
//     })
//   }
// });


const fs = require('fs');
const path = require('path');

var bundle = path.join(__dirname, 'project-dist', 'style.css');
let styleFolder = path.join(__dirname, 'styles');
const template = path.join(__dirname, 'template.html');

let folder = path.join(__dirname, 'assets');
let removeFolder = path.join(__dirname, 'project-dist', 'assets');

fs.mkdir(path.join(__dirname, 'project-dist'), (err) => {
  if(err) {
    fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), err => {
      if (!err) {
        fs.readdir(removeFolder, {withFileTypes: true}, (error, removeList) => {
          if (!error) {
            fs.readdir(folder, {withFileTypes: true}, (error, dirEntryList) => {
              if (!error) {
                
                dirEntryList.forEach((dirEntry) => {
                  if (dirEntry.isFile()) {
                    let file = path.join(__dirname, 'assets', dirEntry.name);
                    let newFile = path.join(__dirname, 'project-dist', 'assets', dirEntry.name);
                    fs.copyFile(file, newFile, err => {
                      if(err) throw err; // не удалось скопировать файл
                    });
                  } else if (dirEntry.isDirectory()) {
                    fs.mkdir(path.join(__dirname, 'project-dist', 'assets', dirEntry.name), err =>{
                        if (!err) {
                          fs.readdir(path.join(__dirname, 'assets', dirEntry.name), (err, fileList) => {
                            fileList.forEach ((elem) => {
                              fs.copyFile(path.join(__dirname, 'assets', dirEntry.name, elem), path.join(__dirname, 'project-dist', 'assets', dirEntry.name, elem), err => {
                                if(err) throw err; // не удалось скопировать файл
                              });
                            })
                          })
                        } else {
                          fs.readdir(path.join(__dirname, 'assets', dirEntry.name), (err, fileList) => {
                            fileList.forEach ((elem) => {
                              fs.copyFile(path.join(__dirname, 'assets', dirEntry.name, elem), path.join(__dirname, 'project-dist', 'assets', dirEntry.name, elem), err => {
                                if(err) throw err; // не удалось скопировать файл
                              });
                            })
                          })
                        }
                    })
                  }
                })
              } else {
                console.error(error);
              }
            });
          } else {
            console.error(error);
          }
        })
      } else {
        fs.readdir(removeFolder, {withFileTypes: true}, (error, removeList) => {
          if (!error) {
            fs.readdir(folder, {withFileTypes: true}, (error, dirEntryList) => {
              if (!error) {
                
                dirEntryList.forEach((dirEntry) => {
                  if (dirEntry.isFile()) {
                    let file = path.join(__dirname, 'assets', dirEntry.name);
                    let newFile = path.join(__dirname, 'project-dist', 'assets', dirEntry.name);
                    fs.copyFile(file, newFile, err => {
                      if(err) throw err; // не удалось скопировать файл
                    });
                  } else if (dirEntry.isDirectory()) {
                    fs.mkdir(path.join(__dirname, 'project-dist', 'assets', dirEntry.name), err =>{
                        if (!err) {
                          fs.readdir(path.join(__dirname, 'assets', dirEntry.name), (err, fileList) => {
                            fileList.forEach ((elem) => {
                              fs.copyFile(path.join(__dirname, 'assets', dirEntry.name, elem), path.join(__dirname, 'project-dist', 'assets', dirEntry.name, elem), err => {
                                if(err) throw err; // не удалось скопировать файл
                              });
                            })
                          })
                        } else {
                          fs.readdir(path.join(__dirname, 'assets', dirEntry.name), (err, fileList) => {
                            fileList.forEach ((elem) => {
                              fs.copyFile(path.join(__dirname, 'assets', dirEntry.name, elem), path.join(__dirname, 'project-dist', 'assets', dirEntry.name, elem), err => {
                                if(err) throw err; // не удалось скопировать файл
                              });
                            })
                          })
                        }
                    })
                  }
                })
              } else {
                console.error(error);
              }
            });
          } else {
            console.error(error);
          }
        })
      }
      
    });
    fs.readdir(styleFolder, {withFileTypes: true}, (error, fileList) => {
      if (!error) {
        fs.writeFile(bundle, '', function(err){
          if (err) {
              console.log(err);
          } else {
              fileList.forEach((read) => {
                let file = path.join(styleFolder, read.name);
                fs.readFile(file, "utf8", function(error,data){
                  if (error) {
                    console.error(error);
                  } else if (read.isFile() && path.extname(file) === '.css') {
                    fs.appendFile(bundle, data, function(error){
                      if(error) console.error(error);     
                  })}
                })
              })
            }
          });
      } else {
        console.error(error);
      }
    })
    fs.readFile(template, 'utf8', (error, data) => {
      if (error) {
        return console.error(err);
      } else {
        const arr = data.match(/(?<=\{{2}).+?(?=\}{2})/g);
        fs.readFile(path.join(__dirname, 'components', `${arr[0]}.html`), 'utf8', (error, x) => {
          if(error) throw error;
          const y = data.replace(`{{${arr[0]}}}`, x);
          fs.readFile(path.join(__dirname, 'components', `${arr[1]}.html`), 'utf8', (error, z) => {
            if(error) throw error;
            const p = y.replace(`{{${arr[1]}}}`, z);
            fs.readFile(path.join(__dirname, 'components', `${arr[2]}.html`), 'utf8', (error, c) => {
              if(error) throw error;
              const o = p.replace(`{{${arr[2]}}}`, c);
              fs.readFile(path.join(__dirname, 'components', `${arr[3]}.html`), 'utf8', (error, d) => {
                if(error) {
                  fs.writeFile(
                    path.join(__dirname, 'project-dist', 'index.html',),
                    o,
                    (err) => {
                      if (err) {
                        return console.error(err);
                      } else {
                      }
                    }
                  );
                };
                const u = o.replace(`{{${arr[3]}}}`, d);
                fs.writeFile(
                path.join(__dirname, 'project-dist', 'index.html',),
                u,
                (err) => {
                  if (err) {
                    return console.error(err);
                  } else {
                  }
                }
              );
            })
              
            })
          })
        }) 
      }
    });
  } else {
    fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), err => {
      if (!err) {
        fs.readdir(removeFolder, {withFileTypes: true}, (error, removeList) => {
          if (!error) {
            fs.readdir(folder, {withFileTypes: true}, (error, dirEntryList) => {
              if (!error) {
                
                dirEntryList.forEach((dirEntry) => {
                  if (dirEntry.isFile()) {
                    let file = path.join(__dirname, 'assets', dirEntry.name);
                    let newFile = path.join(__dirname, 'project-dist', 'assets', dirEntry.name);
                    fs.copyFile(file, newFile, err => {
                      if(err) throw err; // не удалось скопировать файл
                    });
                  } else if (dirEntry.isDirectory()) {
                    fs.mkdir(path.join(__dirname, 'project-dist', 'assets', dirEntry.name), err =>{
                        if (!err) {
                          fs.readdir(path.join(__dirname, 'assets', dirEntry.name), (err, fileList) => {
                            fileList.forEach ((elem) => {
                              fs.copyFile(path.join(__dirname, 'assets', dirEntry.name, elem), path.join(__dirname, 'project-dist', 'assets', dirEntry.name, elem), err => {
                                if(err) throw err; // не удалось скопировать файл
                              });
                            })
                          })
                        } else {
                          fs.readdir(path.join(__dirname, 'assets', dirEntry.name), (err, fileList) => {
                            fileList.forEach ((elem) => {
                              fs.copyFile(path.join(__dirname, 'assets', dirEntry.name, elem), path.join(__dirname, 'project-dist', 'assets', dirEntry.name, elem), err => {
                                if(err) throw err; // не удалось скопировать файл
                              });
                            })
                          })
                        }
                    })
                  }
                })
              } else {
                console.error(error);
              }
            });
          } else {
            console.error(error);
          }
        })
      } else {
        fs.readdir(removeFolder, {withFileTypes: true}, (error, removeList) => {
          if (!error) {
            fs.readdir(folder, {withFileTypes: true}, (error, dirEntryList) => {
              if (!error) {
                
                dirEntryList.forEach((dirEntry) => {
                  if (dirEntry.isFile()) {
                    let file = path.join(__dirname, 'assets', dirEntry.name);
                    let newFile = path.join(__dirname, 'project-dist', 'assets', dirEntry.name);
                    fs.copyFile(file, newFile, err => {
                      if(err) throw err; // не удалось скопировать файл
                    });
                  } else if (dirEntry.isDirectory()) {
                    fs.mkdir(path.join(__dirname, 'project-dist', 'assets', dirEntry.name), err =>{
                        if (!err) {
                          fs.readdir(path.join(__dirname, 'assets', dirEntry.name), (err, fileList) => {
                            fileList.forEach ((elem) => {
                              fs.copyFile(path.join(__dirname, 'assets', dirEntry.name, elem), path.join(__dirname, 'project-dist', 'assets', dirEntry.name, elem), err => {
                                if(err) throw err; // не удалось скопировать файл
                              });
                            })
                          })
                        } else {
                          fs.readdir(path.join(__dirname, 'assets', dirEntry.name), (err, fileList) => {
                            fileList.forEach ((elem) => {
                              fs.copyFile(path.join(__dirname, 'assets', dirEntry.name, elem), path.join(__dirname, 'project-dist', 'assets', dirEntry.name, elem), err => {
                                if(err) throw err; // не удалось скопировать файл
                              });
                            })
                          })
                        }
                    })
                  }
                })
              } else {
                console.error(error);
              }
            });
          } else {
            console.error(error);
          }
        })
      }
      
    });
    fs.readdir(styleFolder, {withFileTypes: true}, (error, fileList) => {
      if (!error) {
        fs.writeFile(bundle, '', function(err){
          if (err) {
              console.log(err);
          } else {
              fileList.forEach((read) => {
                let file = path.join(styleFolder, read.name);
                fs.readFile(file, "utf8", function(error,data){
                  if (error) {
                    console.error(error);
                  } else if (read.isFile() && path.extname(file) === '.css') {
                    fs.appendFile(bundle, data, function(error){
                      if(error) console.error(error);     
                  })}
                })
              })
            }
          });
      } else {
        console.error(error);
      }
    })
    fs.readFile(template, 'utf8', (error, data) => {
      if (error) {
        return console.error(err);
      } else {
        const arr = data.match(/(?<=\{{2}).+?(?=\}{2})/g);
        fs.readFile(path.join(__dirname, 'components', `${arr[0]}.html`), 'utf8', (error, x) => {
          if(error) throw error;
          const y = data.replace(`{{${arr[0]}}}`, x);
          fs.readFile(path.join(__dirname, 'components', `${arr[1]}.html`), 'utf8', (error, z) => {
            if(error) throw error;
            const p = y.replace(`{{${arr[1]}}}`, z);
            fs.readFile(path.join(__dirname, 'components', `${arr[2]}.html`), 'utf8', (error, c) => {
              if(error) throw error;
              const o = p.replace(`{{${arr[2]}}}`, c);
              fs.readFile(path.join(__dirname, 'components', `${arr[3]}.html`), 'utf8', (error, d) => {
                if(error) {
                  fs.writeFile(
                    path.join(__dirname, 'project-dist', 'index.html',),
                    o,
                    (err) => {
                      if (err) {
                        return console.error(err);
                      } else {
                      }
                    }
                  );
                };
                const u = o.replace(`{{${arr[3]}}}`, d);
                fs.writeFile(
                path.join(__dirname, 'project-dist', 'index.html',),
                u,
                (err) => {
                  if (err) return console.error(err);
                }
              );
            })
            })
          })
        }) 
      }
    });
  }
});


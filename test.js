const xlsxFile = require('read-excel-file/node');

xlsxFile('./test.xlsx').then((rows) => {
rows.forEach((col)=>{
        col.forEach((data)=>{
          console.log(data);
          console.log(typeof data);
        })
    })
})
const pug = require('pug');

var fs = require('fs');
var config = JSON.parse(fs.readFileSync('./report.json', 'utf8'));
var csv = require("fast-csv");
var iconv = require('iconv-lite');
var fs = require('fs');

var dataArray = []

var glob = require("glob")
var globFs = require('glob-fs')();

// options is optional

//获取所有文件夹路径
// var dir = fs.readdirSync('./test')


// dir.forEach(function(value) {
  // glob('./test/' + value + '/*.csv',{}, function (er, files) {
    // var txtFile = globFs.readdirSync('./test/' + value + '/*.txt', {});
    // var data = fs.readFileSync(txtFile[0], 'utf-8')

    var csvFileStr = fs.readFileSync('./inner.csv');
    var buf = new Buffer(csvFileStr, 'binary');
    var csvStr = iconv.decode(buf, 'utf8');

    csv.fromString(csvStr)
    .on("data", function(data){
        dataArray.push(data);
    })
    .on("end", function(){
      dataArray.splice(0,2);
      dataArray.forEach(function(value) {
        console.log(value)
        var content = pug.renderFile('innerFlower1.pug',{
          begin: config.Content.begin.text[0],
          name: value[2],
          phone: value[3],
          // place: data,
          time:  value[1],
          path: './image/' + config.Content.report[0].screenshot,
          brainText: config.Content.report[0].text,
          itemText1: config.Content.item[0].range[0].text,
          itemText2: config.Content.item[1].range[0].text,
          itemText3: config.Content.item[2].range[0].text,
          itemText4: config.Content.item[3].range[0].text,
          endText: config.Content.end.text[0]
        }, './');
        fs.writeFile('./dest' + value[2] + '.html', content, function() {
          // console.log('haha')
      })
      })

  })
// })
// })








// csv.fromString(str)
// .on("data", function(data){
//     // console.log(data);
//     dataArray.push(data);
// })
// .on("end", function(){
//     // console.log(dataArray);
//     var content = pug.renderFile('innerFlower1.pug',{
//       name: dataArray[2][2],
//       phone: dataArray[2][3],
//       // place: "xian",
//       time:  dataArray[2][1]
//     }, './');
//     fs.writeFile('./inner.html', content, function() {
//       console.log('haha')
//
//       var html = fs.readFileSync('./inner.html', 'utf8');
//       var options = {
//         format: 'A2',
//         // 'width': '18in',
//         "base": "file:///Users/xuhaocheng/haochengxu/analysis/",
//       };
//       // pdf.create(html, options).toFile('./inner.pdf', function(err, res) {
//       //   if (err) return console.log(err);
//       //   console.log(res);
//       // });
//     })
// });

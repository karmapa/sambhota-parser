var fs = require('fs');
var parser = require('./src/parser.js');
var data = fs.readFileSync('./test.docx', 'binary');
var assert = require('assert');
var JSZip = require('jszip');

describe('convert', function () {
  it('convert check', function () {
    var correct = '༄༅། །དཀར་མཛེས་ཨ་ཡིག་ལས་འཁྲུངས་ཤེས་བློའི་གཏེར། །ཕས་རྒོལ་ཝ་སྐྱེས་ཟིལ་གནོན་གདོང་ལྔ་བཞིན། །ཆགས་ཐོགས་ཀུན་བྲལ་མཚུངས་མེད་འཇམ་དབྱངས་མཐུས། །མ་ཧཱ་མཁས་པའི་གཙོ་བོ་ཉིད་གྱུར་ཅིག །ཅེས་པ་འདི་ཉིད་ཤིན་ཏུ་གྲགས་པའི་དབྱངས་ཚིག་གོ །';
    var zip = new JSZip(data);
    var xml = zip.file("word/document.xml").asText();
    var doc = parser.docxToJson(xml);
    parser.toUnicode(doc);
    data = parser.jsonToHtml(doc);
    data = data.replace(/<p>/g, '\n').replace(/<.+?>/g, '').replace(/^\r?\n/g, '');
    var result = data.match(correct);
    assert.equal(result, correct);
  });
});
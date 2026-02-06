import express from "express";
import db from "./data/data.js"

const PORT = 3321;
const uri = "/nyiltnap/api/v1"

const app = express();
app.use(express.json());

app.get(uri+"/telepules", (req, res) => {
    var town = req.query.nev;
    var students = db.prepare("SELECT * FROM diakok WHERE telepules = ?").all(town);
    return res.status(200).json(students);
});

app.get(uri+"/tanora", (req, res) => {
    var clases = db.prepare('SELECT datum, terem, id FROM orak WHERE targy = ? ORDER BY datum, id ').all("angol");
    return res.status(200).json(clases);
});

app.get(uri+"/9-matematika-fizika", (req,res) => {
    var clases = db.prepare("SELECT csoport, targy, datum FROM orak WHERE targy = ? OR targy = ? ORDER BY targy").all("matematika","fizika");
    var cl9 = clases.filter(a => a.csoport[0] == "9");
    return res.status(200).json(cl9);
});

app.get(uri+"/telepulesfo", (req,res) => {
    var a = db.prepare("SELECT telepules, COUNT(telepules) as fo FROM diakok GROUP BY telepules ORDER BY fo DESC").all();
    return res.status(200).json(a);
});

app.get(uri+"/tantargyak", (req, res) => {
    var clases = db.prepare("SELECT DISTINCT targy FROM orak ORDER BY targy").all();
    return res.status(200).json(clases);
});

app.get(uri+"/tanar", (req, res) => {
    var teacherName = req.query.tanar;
    var date = req.query.datum;
    var clas = db.prepare("SELECT * FROM orak WHERE datum = ? AND tanar = ?").get(date, teacherName);
    var links = db.prepare("SELECT * FROM kapcsolat WHERE oraid = ?").all(clas.id);
    //7
});

app.get(uri+"/telepulesrol", (req, res) => {
    var name = req.query.nev;
    var student = db.prepare("SELECT * FROM diakok WHERE nev = ?").get(name);
    var students = db.prepare("SELECT nev FROM diakok WHERE telepules = ?").all(student.telepules);
    var minusName = students.filter(a => a.nev != name);
    return res.status(200).json(minusName);
});

app.get(uri+"/szabad", (req, res) => {
    var classes = db.prepare("SELECT * FROM orak").all();
    var links = db.prepare("SELECT oraid, COUNT(oraid) as fo FROM kapcsolat GROUP BY oraid").all();
    var re = [];
    classes.forEach(e => {
        var fo = links.find(b => b.oraid == a.id).fo;
        re.push();
    });
    //var re = classes.map(a => a.ferohely - links.find(b => b.oraid == a.id).fo);
    return res.status(200).json(re);
});

app.listen(PORT, () => {
    console.log(`http://localhost:3321${uri}`);
});
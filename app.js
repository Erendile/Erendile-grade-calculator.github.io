const main = document.getElementById("main-menu");

main.addEventListener("change", getGradeCount);

function getGradeCount(e) {
    if(this.value == "1") {
        addGradeBar(4);
    }
    if(this.value == "2") {
        addGradeBar(5);
    }
    if(this.value == "3") {
        addGradeBar(6);
    }
}

function clear() {
    document.getElementById("kurul").innerHTML = "";
}

function addGradeBar(num) {
    clear();
    for (let index = 0; index < num; index++) {
        document.getElementById("kurul").innerHTML += createGradeBar(index + 1);
    }
}

function createGradeBar(num) {
    return `
    <div>
        <label for="kurul${num}">${num}. Kurul</label>
        <input type="text" id="kurul${num}">
    </div>`;
}

class Util {
    
    static checkTheBlanks(fields) {
        let result = true;
        console.log(fields);
        fields.forEach(field => {
            if(field === "") {
                result = false;
                return false;
            }
        })
        return result;
    }

    static convertToArray(parent) {
        const array = []
        for (let index = 0; index < parent.children.length; index++) {
            array.push(parent.children[index].children[1].value);
        }
        return array;
    }
}

class Student {
    constructor(grade, kurulNotes, finalNote) {
        this.grade = grade;
        this.kurulNotes = kurulNotes;
        this.finalNote = finalNote;
        this.credit = this.getCredit();
        this.mean = this.getMean();
    }

    getMean() {
        let kurul = this.kurulNotes.reduce((temp, element) => {
            temp.push(parseFloat(element));
            return temp;
        }, []).reduce((prev, curr) => {
            return prev += curr * this.credit;
        }, 0);

        return kurul + (parseFloat(this.finalNote) * 0.4);
    }

    getCredit() {
        if(this.grade == "1")
            return .15;

        if(this.grade == "2")
            return .12;

        if(this.grade == "3")
            return .10;
    }
}
 
class UI {
    constructor() {
        this.grade = document.getElementById("main-menu");
        this.kurulNotes = document.getElementById("kurul");
        this.finalNote = document.getElementById("final1");
        this.calculateButton = document.getElementById("calculate");
        this.form = document.getElementById("form-calculate").addEventListener("submit", this.calculate)
    }

    showTheMean(student) {
        document.getElementById("mean").textContent = student.mean;
        this.clearTexts();
    }

    clearTexts() {
        let parent = document.getElementById("kurul");
        for (let index = 0; index < parent.children.length; index++) {
            parent.children[index].children[1].value = "";
        }

        document.getElementById("final1").value = "";
    }

    calculate = (e) => {
        e.preventDefault();
        let kuruls = Util.convertToArray(this.kurulNotes);
        const student = new Student(this.grade.value, kuruls, this.finalNote.value);
        kuruls.push(this.finalNote.value);
        const result =  Util.checkTheBlanks(kuruls);

        if(result) {
            console.log("valid");
            this.showTheMean(student);
        } else {
            alert("Boşluk bırakmayınız.")
            console.log("invalid");
        }
    }
}

document.addEventListener("DOMContentLoaded", function(e) {
    var ui = new UI();
})
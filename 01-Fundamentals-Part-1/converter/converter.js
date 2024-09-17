const toLbs = 2.2;

let kgs;
let lbs;

document.getElementById("mySubmit").onclick = function(){
    kgs=document.getElementById("myText").value;
    kgs = Number(kgs);
    lbs = kgs*toLbs;

    document.getElementById("result").textContent = Math.floor(lbs) + ` lbs !`
}

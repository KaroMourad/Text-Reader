/*********Alphabetical letters*********/

let table, tblBody, childdiv, letter;
let save=document.querySelector("#save");
let inputvalue=document.querySelector("#input");
let display=document.querySelector("#display");
let reset=document.querySelector("#reset");
let printletters=document.querySelector("#printletters");
let saveAll=document.querySelector("#saveAll");
let changableArr=[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
let obj={};
let mainUsableObj={}
	

childdiv=document.querySelector("#childdiv");
table=document.createElement("TABLE");
tblBody=document.createElement("TBODY");
table.appendChild(tblBody);


for(let i=0; i<5; i++){
	let tr=document.createElement("TR");
	tblBody.appendChild(tr);
	for(var j=0; j<5; j++){
		let td=document.createElement("TD");
		td.id=i+"."+j;
		td.setAttribute("class", "squareClass"); 
		tr.appendChild(td);
	}
}

childdiv.appendChild(table);

let squareClass=document.querySelectorAll(".squareClass");
for(let i=0; i<squareClass.length; i++){
    squareClass[i].addEventListener("click",changeData)
}


function changeData(event){
	let elem=event.target.id.split('.');
  console.log(elem);
	let i=parseInt(elem[0]);
	let j=parseInt(elem[1]);
	if(changableArr[i][j]===0){
    console.log("0-na");
        event.target.style.background="black";
        changableArr[i][j]=1;
	}
	else if(changableArr[i][j]===1){

        event.target.style.background="white";
        changableArr[i][j]=0;
	}
}

function saveletters(){
	let letter = inputvalue.value;
	if(letter!=="" && letter == letter.toUpperCase() && isNaN(letter) || letter==" " ){
		obj=Object.assign(obj,{[letter]:changableArr});
	    changableArr=[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
		inputvalue.value="";
		for(let i=0; i<squareClass.length; i++){
			squareClass[i].style.background='white';// after save all buttons background color beocome white
		}
	}else{
		alert("Please put an uppercase letter");
	}
	printletters.textContent="";
	let ArrOfObj=Object.keys(obj);
	for(let key of ArrOfObj){
			printletters.innerHTML+="<div>"+key+"</div><hr>";
	}
}

save.addEventListener("click",saveletters)

function peintWhite(changableArr){
		for(let i=0; i<changableArr.length; i++){
		for(let j=0; j<changableArr[i].length; j++){
			if(changableArr[i][j]==1){
			document.getElementById(i+'.'+j).style.background="white";	
			}
		}
	}
}


display.addEventListener("click", function(){
	peintWhite(changableArr)
	letter=inputvalue.value;
	if(!obj.hasOwnProperty(letter)){
    changableArr=[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
		alert("Letter is not created");
	} else {
		changableArr=JSON.parse(JSON.stringify(obj[letter]));
		changableArr=Object.values(changableArr);
		for(let i=0; i<changableArr.length; i++){
			for(let j=0; j<changableArr[i].length; j++){
				if(changableArr[i][j]==1){
					document.getElementById(i+'.'+j).style.background="black";
				}
			}
		}
	}
	letter="";
})


reset.addEventListener("click", function(){
	peintWhite(changableArr)
	inputvalue.value='';
    changableArr=[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
})


saveAll.addEventListener("click", function(){
	if(inputvalue.value!==""){
		saveletters();
	}

	document.getElementById("main").style.display="none"
	document.getElementById("printletters").style.display="none"
	document.getElementById("secondDisplay").style.display = "block";
	mainUsableObj=JSON.parse(JSON.stringify(obj));
	console.log(mainUsableObj)
})


/********* READER ************/ 
let mytable = document.getElementById("mytable");
let startbut = document.getElementById("start");
let tbody;
let length = 30;
let arrContainAll = [];
let inputArr = [[],[],[],[],[]]; // matrix of text
let timeset=0;


function startDraw() {
    let tr,td;
    if(tbody) {
        tbody.parentNode.removeChild(tbody);
        clearTimeout(timeset);
        timeset = 0;
    }
    tbody = document.createElement("TBODY");
    mytable.appendChild(tbody);
    for(let i = 0; i < 5; i++ ) {
        tr = document.createElement("TR");
        tr.setAttribute("class","tRclass");
        tbody.appendChild(tr);
        arrContainAll.push([0]);
        for(let j = 0; j < length; j++ ) {
            td = document.createElement("TD");
            td.setAttribute("class","tDclass");
            tr.appendChild(td);
            arrContainAll[i].push(0);
        }
    }

    inputArr = [[],[],[],[],[]];// matrix of text
   let inputVal = document.getElementById("inpT").value;//input text string
   let temp;
   for(let el = 0; el < inputVal.length; el++) {
       for(let i = 0; i < 5; i++ ) {
           temp = inputArr[i].concat(mainUsableObj[inputVal[el]][i]);
           inputArr[i] = temp;
           inputArr[i].push(0);//whitespace
       }
   }

   startRead(inputArr);
}

function startRead(inputArr) {
   let elements = document.querySelectorAll(".tRclass");
      
   for(let col = inputArr[0].length + length; col >-1; col--) {
       (function (inputarg) {
           timeset = setTimeout(() => {
               let input = inputarg;
               for(let row = 0; row < 5; row++) {
                   let x = document.createElement("TD");
                   x.setAttribute("class","tDclass");
                   let arr = elements[row].querySelectorAll(".tDclass");
                   elements[row].appendChild(x);
                   arr[0].parentNode.removeChild(arr[0]);
               }
               for(let row = 0; row < 5; row++) {
                   let arr = elements[row].querySelectorAll(".tDclass");
                   if(input < inputArr[0].length) {
                       if(inputArr[row][input]===1) {
                           arr[length-1].style.backgroundColor = color;
                       }
                       else {
                           arr[length-1].style.backgroundColor = "white";
                       }
                   }
                   else {
                       arr[length-1].style.backgroundColor = "white";
                   }
               }
               clearTimeout(timeset);
               timeset = 0;
           },inputarg*150);
       })(col-1);
   }
}

/********* ROTATE ************/

let previousVal;
let previousStorageArr = [];
let color = "black";


function rotateForEach(matrix)
{     //for the rotateing every letter

	matrix = matrix.reverse();
	for (let i = 0; i < matrix.length; i++) 
	{
		for (let j = 0; j < i; j++)
		 {
			let temp = matrix[i][j];
			matrix[i][j] = matrix[j][i];
			matrix[j][i] = temp;
		}
	}
}

document.getElementById("rotate").addEventListener("click",rotate);

function rotate()
{

	let outputArr = [[],[],[],[],[]];
	let storage;
    drawing();
				  	
  	let inputVal = document.getElementById("inpT").value;//get letter from input 
  	if(inputVal !== previousVal)
  	{
  	    previousStorageArr = [];
  		previousVal = inputVal;		  		
  		let temp;
  		for(let el = 0; el < inputVal.length; el++) 
  		{
        let reversedArr = [[],[],[],[],[]]; 

  			for(let i = 0; i < 5; i++ ) 
  			{
  				storage = reversedArr[i].concat(mainUsableObj[inputVal[el]][i]);
  				reversedArr[i] = storage;
  			}
			rotateForEach(reversedArr);  //rotateing one letter
			previousStorageArr.push(reversedArr);
			
  	    }
    }
    else
    {
	   	for(let i=0;i<previousStorageArr.length;i++)
	   	{
	        rotateForEach(previousStorageArr[i])
	   	}
    } 

    for(let k =0; k< previousStorageArr.length; k++)
    {
     	tempArr = previousStorageArr[k]
  		for(let i=0; i < tempArr.length; i++)
  		{
  			for(let j=0 ; j<5; j++)
  			{				  				
  				temp = outputArr[i].concat(tempArr[i][j]);  //concating every letter
  				outputArr[i] = temp;				  				
  			}
  			outputArr[i].push(0)			  			
  		}
        console.log(tempArr)
        console.log(outputArr)
    }
    startRead(outputArr)			   
}


//******Colores******

document.getElementById("red").addEventListener("click",red);
function red(){
	color = "red"
    drawing();
    startRead(inputArr);
}


document.getElementById("yellow").addEventListener("click",yellow);
function yellow(){
	color = "yellow"
    drawing();
    startRead(inputArr);
}

document.getElementById("blue").addEventListener("click",blue);
function blue(){
	color = "blue"
	drawing();
	startRead(inputArr);
	

}
document.getElementById("green").addEventListener("click",green);
function green(){
	color = "green"
	drawing();
	startRead(inputArr);
		
}
document.getElementById("orange").addEventListener("click",orange);
function orange(){
	color = "orange"
	drawing();
    startRead(inputArr);
	
}
document.getElementById("black").addEventListener("click",black);
function black(){
	color = "black"
	drawing();
    startRead(inputArr);
	
}

function drawing(){
	let reversedArr = [[],[],[],[],[]];
	let outputArr = [[],[],[],[],[]];
	let storage;
	let tr,td;
    if(tbody) {
        tbody.parentNode.removeChild(tbody);
        clearTimeout(timeset);
        timeset = 0;
    }
    tbody = document.createElement("TBODY");
    mytable.appendChild(tbody);
    for(let i = 0; i < 5; i++ ) {
        tr = document.createElement("TR");
        tr.setAttribute("class","tRclass");
        tbody.appendChild(tr);
        arrContainAll.push([0]);
        for(let j = 0; j < length; j++ ) {
            td = document.createElement("TD");
            td.setAttribute("class","tDclass");
            tr.appendChild(td);
            arrContainAll[i].push(0);
        }
    }
}   

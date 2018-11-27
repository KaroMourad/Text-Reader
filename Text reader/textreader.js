
    let mytable = document.getElementById("mytable");
    let tbody,tr,td;
    let length = 30;
    let arrContainAll = []; 
    tbody = document.createElement("TBODY");
    mytable.appendChild(tbody);
    for(let i = 0; i < 5; i++ ) {
        tr = document.createElement("TR");
        tbody.appendChild(tr);
        arrContainAll.push([0]);
        for(let j = 0; j < length; j++ ) {
            td = document.createElement("TD");
            tr.appendChild(td);
            arrContainAll[i].push(0);
        }
    }
    let inputArr = [[1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1],
                    [0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0],
                    [0,0,1,0,0,0,1,1,1,1,1,0,1,1,1,1,1,0,0,0,1,0,0],
                    [0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0],
                    [0,0,1,0,0,0,1,1,1,1,1,0,1,1,1,1,1,0,0,0,1,0,0]];

function startDraw() {
    // let inputcol=0;
    // function inps() {
    //     return inputcol++;
    // }
    let timeset;
    let elements = document.getElementsByTagName("tr");
    for(let col = 2*length-1; col >-1; col--) {
        (function (inputarg) {
            timeset = setTimeout(() => {
                let input = inputarg;
                    for(let row = 0; row < 5 ; row++) {
                        let arr = elements[row].getElementsByTagName("td");
                        if(input < inputArr[0].length) {
                            if(inputArr[row][input]===1) {
                                arr[length-1].style.backgroundColor = "black";
                            }
                            else{
                                arr[length-1].style.backgroundColor = "white";
                            }
                        }
                        else{
                            arr[length-1].style.backgroundColor = "white";
                        }
                    }
                    for(let row = 0; row < 5 ; row++) {
                        let x = document.createElement("TD");
                        let arr = elements[row].getElementsByTagName("td");
                        elements[row].appendChild(x);
                        arr[0].parentNode.removeChild(arr[0]);
                    }                  
            },inputarg*100);
        })(col-1);
    }
    clearTimeout(timeset);
}

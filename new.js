let array=[],index=0,isDecimal=false,resultArray=[],answer;


//The displaying functions.


let display=(place)=>{
	let joined='';
	for(let i = 0;i<array.length;i++){
		joined+=array[i];
	}
	place.innerHTML=joined;
}


let check=()=>{                        //checks for operators
	if(index==0){return false;}
	let i=index-1;
	if(array[i]=='÷'|| array[i]=='×' || array[i]=='+' || array[i]=='-'){             
		return true;
	}
	return false;
}

let characterCount=()=>{
	let count = 0;
	for(let i=0;i<array.length;i++){
		count+=array[i].length;
	}
	return count;
}


let arrayCopy=(fromArr, toArr)=>{
	let a=fromArr.length;
	if(check()==true){a-=1}
	for(let i=0;i<a;i++){
		toArr[i]=fromArr[i];
	}
}



let clear=()=>{
	index=0;
	array=[];
	display1.innerHTML='         0';
	result.innerHTML='           0';
	display1.style.color = "#E7E9EC";
}


//the operating functions
let mixer=(arr, pos, value)=>{
	value=value.toString();
	arr[pos]=value;
	for(let a=pos+3;a<arr.length;a++){
		arr[a-2]=arr[a];
	}
	arr.pop();
	arr.pop();
	if(arr==array){index-=2}
}


let add = (arr, i)=>{
	mixer(arr, i-1, Number(arr[i-1]) + Number(arr[i+1]));
}


let subtract = (arr, i)=>{
	
	mixer(arr, i-1, Number(arr[i-1]) - Number(arr[i+1]));
			
}


let multiply = (arr, i)=>{
	mixer(arr,i-1, Number(arr[i-1]) * Number(arr[i+1]));
}


let divide = (arr, i)=>{
	mixer(arr, i-1, Number(arr[i-1]) / Number(arr[i+1]));
}



let operate=(arr)=>{                    //BODMAS=>Brackets > Of > Division > Multiplication > Addition > Subtraction............
	let empty = false;
	while (!empty)
	{
		for (let i = 0; i < arr.length; i++)
		{
			if (i == arr.length - 1)
			{
				empty = true;
			}

			if (arr[i] == "÷")
			{
				divide(arr, i);
				break;
			}
			else if (arr[i] == "×")
			{
				multiply(arr, i);
				break;
			}
			
		}
	}

	empty = false;
	while (!empty)
	{
		for (let i = 0; i < arr.length; i++)
		{
			if (i == arr.length - 1)
			{
				empty = true;
			}

			if (arr[i] == "+")
			{
				add(arr, i);
				break;
			}
			else if (arr[i] == "-")
			{
				subtract(arr, i);
				break;
			}
			
		}
	}
}

let resultMaker=()=>{
	arrayCopy(array,resultArray);
	operate(resultArray);
	if(isFinite(resultArray[0])==false || isNaN(resultArray[0])==true){
		result.innerHTML='      0';
		answer = 'Bad expression';
			
	}else{
		resultArray[0]= Math.round(Number(resultArray[0]) * 100000) / 100000;
		resultArray[0] = resultArray[0].toString();
		result.innerHTML=resultArray[0];
		answer=resultArray[0];
		
	}
	
}


let btnClick=(input)=>{
	display1.style.color = "#E7E9EC";
	if(characterCount()<20){
		if(index==0){
			if( input=='÷' || input=='×' || input=='+' || input=='-' ){         
				if(input=='-'){
					array[0]=' -';
					display(display1);
					index++;
				}
			}
			else{
				array[0]=input;
				display(display1);
				index++;
			}
		}else if(index==1&&array[0]==' -'&&input=='-'){
			
		}else if(input=='÷' || input=='×' || input=='+' || input=='-' ){        
			if(check()==true){
				array[index-1]=input;
				display(display1);
			}else{
				array[index]=input;
				display(display1);
				index++;
			}
		}else{
			if(check()==true){
				array[index]=input;
				display(display1);
				index++;
			}else{
				if(input==='.'){
					let decimalPresent= array[index-1].indexOf('.');
					if(decimalPresent==-1){
						array[index-1] += input;
						display(display1);
					}
					//Do nothing
				}else{
					array[index-1] += input;
					display(display1);
				}
			}
		}
		//Displaying result to the result 'div'
		resultMaker();
	}
}





/*------selectors--------*/

let display1 = document.getElementById("input");
let result = document.getElementById("result");
let btn1 = document.getElementById("one");
let btn2 = document.getElementById("two");
let btn3 = document.getElementById("three");
let btn4 = document.getElementById("four");
let btn5 = document.getElementById("five");
let btn6 = document.getElementById("six");
let btn7 = document.getElementById("seven");
let btn8 = document.getElementById("eight");
let btn9 = document.getElementById("nine");
let btn0 = document.getElementById("zero");
let btnClear = document.getElementById("clear");
let btnBackspace = document.getElementById("backspace");
let btnDivision = document.getElementById("division");
let btnMultiplication = document.getElementById("multiplication");
let btnSubtraction = document.getElementById("subtraction");
let btnAddition = document.getElementById("addition");
let btnDecimal = document.getElementById("decimal");
let btnEqual = document.getElementById("equal");



/*---------Event Listeners--------*/

btn1.onclick =()=>{ btnClick('1'); }      
btn2.onclick =()=>{ btnClick('2'); }
btn3.onclick =()=>{ btnClick('3'); }
btn4.onclick =()=>{ btnClick('4'); }
btn5.onclick =()=>{ btnClick('5'); }
btn6.onclick =()=>{ btnClick('6'); }
btn7.onclick =()=>{ btnClick('7'); }
btn8.onclick =()=>{ btnClick('8'); }
btn9.onclick =()=>{ btnClick('9'); }
btn0.onclick =()=>{ btnClick('0'); }
btnDecimal.onclick =()=>{
	btnClick('.');	 
}


btnDivision.onclick =()=>{ btnClick('÷');  }
btnMultiplication.onclick =()=>{ btnClick('×');  }
btnSubtraction.onclick =()=>{ btnClick('-');  }
btnAddition.onclick =()=>{ btnClick('+');  }
btnClear.onclick =()=>{ clear();  }
btnBackspace.onclick =()=>{
	if(index>0){
		if(array[index-1].length==1){
			array.pop();
			index--;
		}
		else{
			let i =index-1,  a=array[i].length;
			array[i]=array[i].slice(0,	a-1);
		}
		display(display1);
		if(array.length==0){display1.innerHTML='         0'; result.innerHTML='           ';}
		resultMaker();
	}
};



btnEqual.onclick = ()=>{
	display1.innerHTML=answer;
	result.innerHTML='            0';
	array=[];resultArray=[];
	
	if(answer != 'Bad expression'){array[0]=answer;index=0;}
	else{display1.style.color="#F6AEA9";index=0;}
}




display1.innerHTML='         0';
result.innerHTML='            0';




document.onkeyup = function(e) {
  if (e.which == 48 || e.which == 96) {
   btn0.click();
  }else if(e.which == 49 || e.which == 97){
  	btn1.click();
  }else if(e.which == 50 || e.which == 98){
  	btn2.click();
  }else if(e.which == 51 || e.which == 99){
  	btn3.click();
  }else if(e.which == 52 || e.which == 100){
  	btn4.click();
  }else if(e.which == 53 || e.which == 101){
  	btn5.click();
  }else if(e.which == 54 || e.which == 102){
  	btn6.click();
  }else if(e.which == 55 || e.which == 103){
  	btn7.click();
  }else if(e.which == 56 || e.which == 104){
  	btn8.click();
  }else if(e.which == 57 || e.which == 105){
  	btn9.click();
  }else if(e.which == 13 || e.which == 61){
  	btnEqual.click();
  }else if(e.which == 111 || e.which == 191){
  	btnDivision.click();
  }else if(e.which == 107 || e.which == 61){
  	btnAddition.click();
  }else if(e.which == 109 || e.which == 173 || e.which == 189){
  	btnSubtraction.click();
  }else if(e.which == 106){
  	btnMultiplication.click();
  }else if(e.which == 110 || e.which == 190){
  	btnDecimal.click();
  }else if(e.which == 8){
  	btnBackspace.click();
  }
}
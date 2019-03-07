class Stacker{
    constructor(){
        this.items=[];
        this.topIndex=0;
    }
    //adds to the the top of the stack
    push(element){
        this.items[this.topIndex]=element;
        this.topIndex++;
    }
    //removes the top of the stack and returns the item that was removed
    pop(){
        if(!this.isEmpty()){
            this.result = this.items.splice(this.topIndex-1,1);
            this.topIndex--;
            return this.result;
        }
        return undefined
    }
    //retrieves the top of the stack
    peek(){
        if(this.topIndex > 0){
            return this.items[this.items.length-1];
        }
        return null;
    }
    //checks if stack is empty by getting the amount of items in the stack
    isEmpty(){
        return this.items.length == 0;
    }
    // printStack function
    print()
    {
        var str = "";
        for (var i = this.items.length-1; i >= 0; i--)
            str += this.items[i] + "\n";
        return str;
    }


}


//Application
// var stack1 = new Stacker()
// stack1.push(2);
// stack1.push(3);
// console.log(stack1);
// console.log('top'+stack1.peek());
// stack1.pop();
// console.log('top'+stack1.peek());
// console.log(stack1);

//PEMDAS
function pemdas(char){
    switch (char){
        case "+":
        case "-":
            return 1;
        case "*":
        case "/":
            return 2;
        case "^":
            return 3;
        default:
            return -1;
    }
}

//
function isAnOperator(char){
    let operator = /\^|\*|\/|\+|\-/;
    if(operator.test(char)){
        return true;
    }
    return false;
}

//isOpperand
function isOpperand(char) {
    var opperand = /[0-9]/;
    if(opperand.test(char)) {
        return true;
    }
    return false;
}

//helper function
function infix2postfix(exp) {
    let stack = new Stacker();
    let postfix = '';


    for (let i = 0; i < exp.length; i++) {
        //if the character in expression is a number add to output
        if (isOpperand(exp[i])) {
            postfix += exp[i];
        }else if(exp[i]=='('){
            stack.push(exp[i]);
        }else if(exp[i]==')'){
            while (stack.topIndex > 0 && stack.peek() !== '('){
                postfix+=stack.pop();
            }
            if(stack.topIndex > 0 && stack.peek() !== '('){
                return "invalid expression";
            }
            else{
                stack.pop();
            }
        }else{
            while(!stack.isEmpty() && pemdas(exp[i]) <= pemdas(stack.peek())){
                postfix += stack.pop();
            }
            stack.push(exp[i]);
        }

    }
    while(stack.topIndex > 0){
        postfix+=stack.pop();
    }


    return postfix;
}

function postfixCalc(exp){
    let stack = new Stacker();
    var postfix = infix2postfix(exp);
    for(let i=0;i<postfix.length;i++){
        var char = postfix[i];
        if(isOpperand(char)){
            stack.push(char);
        }else{
            var op1 = stack.items.pop();
            var op2 = stack.items.pop();
            var answer = eval((op1.concat(char,op2)));
            stack.push(answer);
        }
    }
    return stack.items.pop();
}
console.log(infix2postfix('(3+4)*2'));
console.log(postfixCalc('(3+4)*2'));

/* const wrapper = document.getElementById('op');

wrapper.addEventListener('click', (event) => {
  const isButton = event.target.nodeName === 'BUTTON';
  if (!isButton) {
    return;
  }

  alert(event.target.id);
}) */
var display = document.getElementsByClassName('screen')[0];
console.log(display.value);

let buttons =document.querySelectorAll('button');

buttons.forEach(function(elem){
    elem.addEventListener('click',function(){
        //alert(elem);
        //Do something
        if(isAnOperator(elem.value) || elem.value === '(' || elem.value === ')' || isOpperand(elem.value)){
            if(display.value === '0'){
                display.value='';
                display.value += elem.value;
            }else{
                display.value += elem.value;
            }
        }

        if(elem.value === '='){
            let result=postfixCalc(infix2postfix(display.value));
            display.value=result;
        }

        if(elem.value === '~'){
            //alert();
            let result=infix2postfix(display.value);
            display.value='';
            display.value=result;
        }

        if(elem.value === 'allclear'){
            display.value=0;
        }
    });
});


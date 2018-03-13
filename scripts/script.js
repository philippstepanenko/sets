var n=0; // number of sets
var m=1; // number of operations
var k=65; // constant value for obtaining set names
var set_id=[]; // id of sets
var set_name=[]; // id of sets
var line_id=[]; // id of lines (examples)
var line_n=0;  // number of lines (examples)
var operations_n=[]; // the number of operations for each example
var elems = data; // attributes of added items
var symbols = ["U","∩","\\","△"]; // symbols of operations

function init(){
	var add_set = document.getElementById("add_set");
	var add_line = document.getElementById("add_example");

	var start_sets = ["1,2,3","1,2,4"];
	var start_n = start_sets.length;
	add_set.addEventListener("click", add_line_of_set, true);
	add_line.addEventListener("click", add_line_of_example, true);
	add_line.addEventListener("click", execute, true);

	add_line_of_example();
	while(n<start_n){ // adding default sets
		add_line_of_set();
		resize(document.getElementById('set_name_'+(n-1)));
		document.getElementById('set_val_'+(n-1)).value=start_sets[n-1];
		resize(document.getElementById('set_val_'+(n-1)));		
	}
	execute();
}


function cons(r,id){
	var res = document.getElementById(id);
	res.value = Array.from(r).sort().join(',');
}

function free_set_name(){
var i=0;
var code=String.fromCharCode(i+k).toUpperCase();
while(set_name.indexOf(code)!=(-1)){
	i++;
	code=String.fromCharCode(i+k).toUpperCase();
}
return code;
}

function del(t){
	t.parentNode.id.indexOf("set")!=(-1)? del_set(t): del_line(t);
}

function del_set(t){
	if (set_name.length>1){
		var num = set_id.indexOf(parseInt(t.id.substr(4)));
		var num_id = parseInt(t.id.substr(4));
		set_name.splice(num,1);
		set_id.splice(num,1);
		n = set_name.length;
		document.getElementById("set_"+num_id).remove();
		update_operands();
		execute();
	}
	else{
		alert("Error! Do not delete all sets!"); // need popup
	}
}

function del_line(t){
		var num = line_id.indexOf(parseInt(t.id.substr(4)));
		var num_id =parseInt(t.id.substr(4));
		line_id.splice(num,1);
		line_n = line_id.length;

		operations_n.splice(num,1);

		document.getElementById("example_"+num_id).remove();
		update_operands();
}

function create_and_append_elem(s,parent){
	var child;
	for (var key in s) {
		if (key!="tag") {
			if (key!="html"){
				child.setAttribute(key,s[key]);
			}
			else{
				child.innerHTML=s[key];
			}
		}
		else {
			child = document.createElement(s.tag);
		}
	}
	parent.appendChild(child);
	return child;
}

function add_line_of_example(){
	if(line_id.indexOf(line_n)!=(-1)) line_n++;
	var examples = document.getElementById('examples');
	var example = create_and_append_elem(elems.div,examples);
	example.setAttribute("id","example_"+line_n);
	
	var operand1 = create_and_append_elem(elems.select,example); 
	operand1.setAttribute("id","operand1_"+line_n);
	
	var operation1 = create_and_append_elem(elems.select,example); 
	operation1.setAttribute("id","operation1_"+line_n);
	for (var i=0; i<symbols.length; i++){
		var option = create_and_append_elem(elems.option,operation1);
		option.setAttribute("value",symbols[i]);
		option.innerHTML=symbols[i];
	}
	
	var operand2 = create_and_append_elem(elems.select,example);
	operand2.setAttribute("id","operand2_"+line_n);

	var b = create_and_append_elem(elems.b,example);
	b.innerHTML="|";
	b.setAttribute("id","marker_"+line_n);
	b.setAttribute("class","marker");
	b.setAttribute("onclick","add_operation(this)");
	var b = create_and_append_elem(elems.b,example);
	b.innerHTML=" = { ";
	
	var res = create_and_append_elem(elems.input,example);
	res.setAttribute("id","res_"+line_n);
	res.setAttributeNode(document.createAttribute("readonly"));
	var b = create_and_append_elem(elems.b,example);
	b.innerHTML=" } ";

	var button = create_and_append_elem(elems.button_del,example);
	button.setAttribute("id","del_"+line_n);

	create_and_append_elem(elems.br,example);
	create_and_append_elem(elems.br,example);

	line_id.push(line_n); // add id of string with an example in array

	operations_n.push(1); // add quantity of operations in array

	line_n++;
	update_operands();

}

function add_operation(t){
var num_id = line_id.indexOf(parseInt(t.id.substr(7)));
var num = document.getElementById('example_'+parseInt(t.id.substr(7)));

var operation = document.createElement('select');
operation.setAttribute("id","operation" + (operations_n[parseInt(t.id.substr(7))] + 1) + "_" + parseInt(t.id.substr(7)));
operation.setAttribute("onchange","execute()");
for (var i=0; i<symbols.length; i++){
	var option = create_and_append_elem(elems.option,operation);
	option.setAttribute("value",symbols[i]);
	option.innerHTML=symbols[i];
}
console.log(t);
console.log(num);

num.insertBefore(operation,t);

var operand = document.createElement('select');
operand.setAttribute("id","operand" + (operations_n[num_id] + 2) + "_" + num_id);
operand.setAttribute("onchange","execute()");

num.insertBefore(operand,t);

operations_n[num_id]++;

update_operands();
execute();
}


function add_line_of_set(){
	if(set_id.indexOf(n)!=(-1)) n++;
	var sets = document.getElementById('sets');
	var set = create_and_append_elem(elems.div,sets);
	set.setAttribute("id","set_"+n);

	var set_label_name = create_and_append_elem(elems.input,set);
	set_label_name.setAttribute("id","set_name_"+n);
	set_label_name.setAttribute("oninput","rename(this)"); 
	set_label_name.setAttribute("value",free_set_name());
	resize(set_label_name);

	var b = create_and_append_elem(elems.b,set);
	b.innerHTML=" = {";

	var set_val = create_and_append_elem(elems.input,set);
	set_val.setAttribute("id","set_val_"+n);
	set_val.setAttribute("oninput","execute()");
	set_val.setAttribute("value","");
	resize(set_val);
	
	var b = create_and_append_elem(elems.b,set);
	b.innerHTML="} ";

	var button = create_and_append_elem(elems.button_del,set);
	button.setAttribute("id","del_"+n);

	create_and_append_elem(elems.br,set);
	create_and_append_elem(elems.br,set);

	set_id.push(n); // add id of set in array
	set_name.push(set_label_name.value); // add name of set in array

	n++;
	update_operands();
}

function update_operands(){
	for (var l=0; l<line_id.length; l++){
		var val="";
		for (var i=0; i<=operations_n[l]; i++){
			var select = document.getElementById("operand"+(i+1)+"_"+line_id[l]);
			val=select.value;
			select.innerHTML="";
			for (var j=0; j<set_id.length; j++){
				select.innerHTML+="<option>"+set_name[j]+"</option>"
			}
			if (set_name.indexOf(val)!=(-1)) {
				select.value=val;
			}
			else{
				select.value=set_name[0];
			}
		resize(select);
		}
	}
}

function rename(t){
	var num = set_id.indexOf(parseInt(t.id.substr(9)));
	set_name[num] = t.value;
	update_operands();
	execute();
	resize(t);
}

function execute(){
for(var l=0; l<line_n; l++){
	var op = document.getElementById('example_'+l).getElementsByTagName('select');
	var operations = [];
	var operands = [];
	for (var j=0; j<op.length; j++){ 
		if (j%2==1) operations.push(op[j].value); //adding operations from op
		else { //adding operands from op
			if (document.getElementById("set_val_"+set_id[set_name.indexOf(op[j].value)]).value!=""){
				operands.push(new Set(document.getElementById("set_val_"+set_id[set_name.indexOf(op[j].value)]).value.split(',')));
			}
			else{
				operands.push(new Set());
			}
		}
		resize(op[j]);
	}
	var id = "res_"+l;
	while(operations.indexOf("∩")!=(-1)){ // intersection
		var calc_n = operations.indexOf("∩");
		var a = operations.splice(calc_n,1);
		var b = operands.splice(calc_n,2);
		operands.splice(calc_n, 0, calc(a,b));
	}
	while(operations.length>0){ // other operations
		var a = operations.splice(0,1);
		var b = operands.splice(0,2);
		operands.splice(0, 0, calc(a,b));	
	}
	cons(operands[0],id);
	resize(document.getElementById(id));
	}
}

function calc(operation,operands){
	switch(operation[0]){
		case "U":
			return union(operands[0],operands[1]);	
			break;
		case "∩":
			return intersection(operands[0],operands[1]);
			break;
		case "\\":
			return difference(operands[0],operands[1]);
			break;
		case "△":
			return difference(union(operands[0],operands[1]),intersection(operands[0],operands[1]));
			break;
	}
}

function resize(t){
	if (t.nodeName=="SELECT"){
		t.style.width = ((t.value.length+1) * 14+12) + 'px';
	}
	else{
		t.style.width = ((t.value.length+1) * 14) + 'px';
	}
}

window.addEventListener("load", init, true);
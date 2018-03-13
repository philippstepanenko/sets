function union(a,b){
	return new Set([...a, ...b]);
}

function intersection(a,b) {
	return new Set([...a].filter(x => b.has(x)));

}

function difference (a,b) {
	return new Set([...a].filter(x => !b.has(x)));
}
t = [[],[],[],[]]
t[0] = document.getElementsByTagName("tr")[0].getElementsByTagName("td");
t[1] = document.getElementsByTagName("tr")[1].getElementsByTagName("td");
t[2] = document.getElementsByTagName("tr")[2].getElementsByTagName("td");
t[3] = document.getElementsByTagName("tr")[3].getElementsByTagName("td");

let p1 = Math.floor(Math.random() * 3) , p2 = Math.floor(Math.random() * 3);

t[p1][p2].innerHTML = 2;
t[p1][p2].style.backgroundColor = 'rgb(135 206 235)';

let score = 0;
let best = 0;

function adjust(l,key){
    p=[];
    if(key=='right'){
        for(let i=0 ; i<4 ; i++){
            x=["","","",""];
            q=3;
            for(let j=3 ; j>=0 ; j--){
                if(l[i][j]!=""){x[q]=l[i][j];q--;}
            }
            l[i] = x;
        }
    }
    if(key=='left'){
        for(let i=0 ; i<4 ; i++){
            x=["","","",""];
            q=0;
            for(let j=0 ; j<4 ; j++){
                if(l[i][j]!=""){x[q]=l[i][j];q++;}
            }
            l[i] = x;
        }
    }
    if(key=='up'){
        let h = [];
        for (let i = 0; i < 4; i++) {
            h.push([]);
            for(let j = 0 ; j < 4 ; j++){
                h[i].push(l[j][i]);
            }
        }
        adjust(h,'left');
        
        for (let i = 0; i < 4; i++) {
            for(let j = 0 ; j < 4 ; j++){
                l[i][j] = h[j][i];
            }
        }
    }
    if(key=='down'){
        let h = [];
        for (let i = 0; i < 4; i++) {
            h.push([]);
            for(let j = 0 ; j < 4 ; j++){
                h[i].push(l[j][i]);
            }
        }
        adjust(h,'right');
        
        for (let i = 0; i < 4; i++) {
            for(let j = 0 ; j < 4 ; j++){
                l[i][j] = h[j][i];
            }
        }
    }
}

function listchange(l,key){
    let h=0;
    let w1=[],w2=[];
    if(key=='right' || key=='down'){
        for(let k=0 ; k<4 ; k++){
            for(let m=3 ; m>=0 ; m--){
                if(l[k][m]!=""){
                    for(let p=m+1 ; p<4 ; p++){
                        if(p>=0 && p<4 && l[k][p]==""){
                            h++;
                            l[k][p] = l[k][p-1];
                            l[k][p-1] = "";
                        }
                    }
                }
            }
            for(let q=3 ; q>=0 ; q--){
                if(l[k][q]!="" && l[k][q] == l[k][q-1]){
                    l[k][q] = 2*l[k][q];
                    score += 2*l[k][q];
                    l[k][q-1] = "";
                    q--;
                    h++;
                }
            }
        }
    }
    else{
        for(let k=0 ; k<4 ; k++){
            for(let m=0 ; m<4 ; m++){
                if(l[k][m]!=""){
                    for(let p=m-1 ; p>=0 ; p--){
                        if(p>=0 && p<4 && l[k][p]==""){
                            l[k][p] = l[k][p+1];
                            l[k][p+1] = "";
                            h++;
                        }
                    }
                }
            }
            for(let q=0 ; q<4 ; q++){
                if(l[k][q]!="" && l[k][q] == l[k][q+1]){
                    l[k][q] = 2*l[k][q];
                    score += 2*l[k][q];
                    l[k][q+1] = "";
                    q++;
                    h++;
                }
            }
        }
    }


    for(let k=0 ; k<4 ; k++){
        for(let z=0 ; z<4 ; z++){
            if(l[k][z]==""){
                w1.push(k);
                w2.push(z);
            }
        }
    }

    if(h!=0){
        let o = Math.floor(Math.random() * (w1.length-1));
        l[w1[o]][w2[o]] = 2*(1 + Math.floor(Math.random() * 1.49));
    }
}

function change(key){
    l=[]
    for (let i = 0; i < 4; i++) {
        p=[];
        for(let j=0 ; j<4 ; j++){
            p.push(t[i][j].innerHTML);
        }
        l.push(p);
    }

    if(key=='right' || key=='left'){
        listchange(l,key);
    }
    if(key=='up' || key=='down'){
        let h = [];
        for (let i = 0; i < 4; i++) {
            h.push([]);
            for(let j = 0 ; j < 4 ; j++){
                h[i].push(l[j][i]);
            }
        }
        listchange(h,key);
        
        for (let i = 0; i < 4; i++) {
            for(let j = 0 ; j < 4 ; j++){
                l[i][j] = h[j][i];
            }
        }
    }

    adjust(l,key);

    let sc = document.getElementsByClassName("score")[0];
    sc.innerHTML = `Score  ${score}`;
    for (let i = 0; i < 4; i++) {
        for(let j = 0 ; j < 4 ; j++){
            let color;
            t[i][j].style.backgroundColor = `rgb(176, 153, 153)`;
            t[i][j].innerHTML = l[i][j];
            if(l[i][j]!=""){
                if(l[i][j]==2){color = 'rgb(135 206 235)';}
                if(l[i][j]==4){color = 'rgb(144 238 144)';}
                if(l[i][j]==8){color = 'rgb(255 255 224)';}
                if(l[i][j]==16){color = 'rgb(191 191 60)';}
                if(l[i][j]==32){color = 'rgb(100, 150, 100)';}
                if(l[i][j]==64){color = 'rgb(109 109 41)';}
                if(l[i][j]==128){color = 'rgb(81 81 146)';}
                if(l[i][j]==256){color = 'rgb(0 0 255)';}
                if(l[i][j]==512){color = 'rgb(125 21 21)';}
                if(l[i][j]==1024){color = 'rgb(90 25 90)';}
                if(l[i][j]==2048){color = 'rgb(56 54 56)';}
                if(l[i][j]>2048){color = `rgb(${l[i][j]} ${l[i][j]*10} ${l[i][j]})`;t[i][j].style.color = 'white';}
                t[i][j].style.backgroundColor = color;
            }
        }
    }
}

function complete(l){
    let h=0;
    for(let i=0 ; i<4 ; i++){
        for(let j=0 ; j<4 ; j++){
            if(l[i][j]!=""){
                if(j-1>=0 && l[i][j]==l[i][j-1]){break;}
                else if(j+1<4 && l[i][j]==l[i][j+1]){break;}
                else if(i-1>=0 && l[i][j]==l[i-1][j]){break;}
                else if(i+1<4 && l[i][j]==l[i+1][j]){break;}
                else{h++;}
            }
        }
    }
    if(h==16){
        alert(`Game is Over \n Your Score is ${score}`);
        if(score > best){
            alert("New High Score");
            best = score;
            let be = document.getElementsByClassName("best")[0];
            be.innerHTML = `Best  ${best}`;
        }
        reload();
    }
}

function reload(){
    score = 0;
    let sc = document.getElementsByClassName("score")[0];
    sc.innerHTML = `Score  ${score}`;
    for(let i=0 ; i<4 ; i++){
        for(let j=0 ; j<4 ; j++){
            t[i][j].innerHTML = "";
            t[i][j].style.backgroundColor = `rgb(176, 153, 153)`;
        }
    }
    p1 = Math.floor(Math.random() * 3) , p2 = Math.floor(Math.random() * 3);
    t[p1][p2].innerHTML = 2;
    t[p1][p2].style.backgroundColor = 'rgb(135 206 235)';
}

document.addEventListener('keydown', keypress);

function keypress(e) {
	let key = '';
	switch (e.key) {
		case 'ArrowUp':
			change('up');
            complete(l);
			break;
		case 'ArrowDown':
			change('down');
            complete(l);
			break;
		case 'ArrowLeft':
			change('left');
            complete(l);
			break;
		case 'ArrowRight':
            change('right');
            complete(l);
			break;
        
	}
	return false;
}



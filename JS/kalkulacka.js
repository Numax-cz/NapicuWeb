function vloz(num){
    document.Lsdxd.textin.value = document.Lsdxd.textin.value+num
}

function pocitej(){
    var L = document.Lsdxd.textin.value;
    if(L){
        document.Lsdxd.textin.value = eval(L);
    }
}

function cotomazesjako(){
    document.Lsdxd.textin.value = "";
}

function procsepletesjako(){
    var L = document.Lsdxd.textin.value;
    document.Lsdxd.textin.value= L.substring(0, L.length-1)


}
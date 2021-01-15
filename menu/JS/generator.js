
function NahodneEZ(){
    Min = document.getElementById('MinNum').value
    Max = document.getElementById('MaxNum').value  

    min = Math.ceil(Min);
    max = Math.floor(Max);
    if (min > max){
    document.getElementById('randomcisloez').innerHTML = 'Error'


    }
    else{
        var random =  Math.floor(Math.random() * (max - min + 1) + min);
        document.getElementById('randomcisloez').innerHTML = random
    }

}
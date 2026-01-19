function btn1_suiv(){

    a = document.getElementById("nbPost")
    a.classList.remove('on')
    a.classList.add('off')

    b = document.getElementById("confPste")
    b.classList.remove("off")
    b.classList.add("on")
}

function next(){
    a = document.getElementById("confPste")
    a.classList.remove('on')
    a.classList.add('off')

    b = document.getElementById("confEtp")
    b.classList.remove("off")
    b.classList.add("on")
}
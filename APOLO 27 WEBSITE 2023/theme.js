


toggle_btn.addEventListener("click", function(){
    setTimeout(function(){
        if (dark) {
            sessionStorage.setItem("color", "dark")
        } else {
            sessionStorage.setItem("color", "light")
        }
    }, 50)
})

let color = sessionStorage.getItem("color");
if (color!=null){
    if (big_wrapper.classList.contains(color) == false){
        toggleAnimation()
    }
}
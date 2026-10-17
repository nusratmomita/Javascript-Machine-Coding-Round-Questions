(function () {
    var hourValue = document.querySelector(".time_hour");
    var minuteValue = document.querySelector(".time_minute");
    var secondValue = document.querySelector(".time_second");
    const startBtn = document.querySelector(".btn_start");
    const stopBtn = document.querySelector(".btn_stop");
    const resetBtn = document.querySelector(".btn_reset");

    var countdownTimer = null;

    startBtn.addEventListener("click", () => {
        // console.log(typeof(hourValue.value))
        if(hourValue.value == 0 && minuteValue.value == 0 && secondValue.value == 0){
            return;
        }

        function startInterval(){
            startBtn.style.display = "none";
            stopBtn.style.display = "initial";

            countdownTimer = setInterval(() => {
                timer();
            },1000)
        }
        startInterval();
    })

    function timer(){
        // formatting time
        // ! DN
        if(secondValue.value > 60){
            minuteValue.value++;
            secondValue.value = parseInt(secondValue.value) - 59;
        }
        // ! DN
        if(minuteValue.value > 60){
            hourValue.value++;
            minuteValue.value = parseInt(minuteValue.value) - 60;
        }

        minuteValue.value = minuteValue.value > 60 ? 60 : minuteValue.value;

        // updating the time
        if(hourValue.value == 0 && minuteValue.value == 0 && secondValue.value == 0){
            hourValue.value = "";
            minuteValue.value = "";
            secondValue.value = "";

            stopInterval();
        }
        else if(secondValue.value != 0){
            secondValue.value = `${secondValue.value <= 10 ? "0" : ""}${secondValue.value - 1}`;
        }
        else if(minuteValue.value != 0 && secondValue.value == 0){
            secondValue.value = 59;
            minuteValue.value = `${minuteValue.value <= 10 ? "0" : ""}${minuteValue.value - 1}`;
        }
         else if(hourValue.value != 0 && minuteValue.value == 0){
            minuteValue.value = 60;
            hourValue.value = `${hourValue.value <= 10 ? "0" : ""}${hourValue.value - 1}`;
        }
        return;
    }

    // stop interval
    function stopInterval(state){
        startBtn.innerHTML = state === "pause" ? "Continue" : "Start";

        stopBtn.style.display = "none";
        startBtn.style.display = "initial";

        clearInterval(countdownTimer);
    }

    // stop timer
    stopBtn.addEventListener("click" , () => {
        stopInterval("pause");
    })

    // reset timer
    resetBtn.addEventListener("click", ()=>{
        hourValue.value = "";
        minuteValue.value = "";
        secondValue.value = "";

        stopInterval();
    })
})()
(function () {
    var hourValue = document.querySelector(".time_hour");
    var minuteValue = document.querySelector(".time_minute");
    var secondValue = document.querySelector(".time_second");
    const startBtn = document.querySelector(".btn_start");
    const stopBtn = document.querySelector(".btn_stop");
    const resetBtn = document.querySelector(".btn_reset");

    let countdownTimer = null;// countdownTimer will store the ID returned by setInterval().

    // version 2
    // ! used AI for betterment of the logic
    function getTotalSeconds(){
        const hours = Number(hourValue.value);
        const minutes = Number(minuteValue.value);
        const seconds = Number(secondValue.value);

        if(!Number.isInteger(hours) || !Number.isInteger(minutes) || !Number.isInteger(seconds) || hours < 0 || (minutes < 0 || minutes > 59) || (seconds < 0 || seconds > 59)){
            alert("Please enter a valid time.")
            return null;
        }

        const totalTime = hours * 3600 + minutes * 60 + seconds;
        // console.log(totalTime);

        if(!Number.isSafeInteger(totalTime) || totalTime <= 0){
            alert("Please enter a time greater than zero.");
            return null;
        }

        return totalTime;
    }

    function displayTime(totalSeconds){
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        // ! Because padStart() is a string method. It works on strings, not numbers.
        hourValue.value = String(hours).padStart(2,"0");
        minuteValue.value = String(minutes).padStart(2,"0");
        secondValue.value = String(seconds).padStart(2,"0");
    }

    function stopInterval(state = 'reset'){
        startBtn.innerHTML = state === "pause" ? "Continue" : "Start";

        stopBtn.style.display = "none";
        startBtn.style.display = "initial";

        clearInterval(countdownTimer);
        countdownTimer = null;
    }

    startBtn.addEventListener("click" , () => {
        // prevent multiple intervals
        if(countdownTimer !== null){
            return;
        }

        const totalSeconds = getTotalSeconds();

        if(totalSeconds === null) return;

        let remainingSeconds = totalSeconds;// is skippable

        displayTime(remainingSeconds);// is skippable

        startBtn.style.display = "none";
        stopBtn.style.display = "initial";

        countdownTimer = setInterval(() => {
            remainingSeconds--;

            displayTime(remainingSeconds);

            if(remainingSeconds <= 0){
                stopInterval();
            }
        },1000);
    })

    stopBtn.addEventListener("click" , () => {
        stopInterval("pause");
    })

    resetBtn.addEventListener("click", () => {
        stopInterval();

        hourValue.value = "";
        minuteValue.value = "";
        secondValue.value = "";
    })

    // version 1
    // startBtn.addEventListener("click", () => {
        // console.log(typeof(hourValue.value))
    //     if(hourValue.value == 0 && minuteValue.value == 0 && secondValue.value == 0){
    //         return;
    //     }

        // if any user passes anything rather than positive numbers
    //     const hours = Number(hourValue.value);
    //     const minutes = Number(minuteValue.value);
    //     const seconds = Number(secondValue.value);

    //     if(!Number.isInteger(hours) || !Number.isInteger(minutes) || !Number.isInteger(seconds) || hours < 0 || (minutes < 0 || minutes > 59) || (seconds < 0 || seconds > 59)){
    //         alert("Please enter a valid time.")
    //         return;
    //     }

    //     // ! what if a user presses the start button repeatedly
    //     function startInterval(){
    //         if(countdownTimer != null){
    //             return;
    //         }

    //         startBtn.style.display = "none";
    //         stopBtn.style.display = "initial";

    //         countdownTimer = setInterval(() => {
    //             timer();
    //         },1000)
    //     }
    //     startInterval();
    // })

    // function timer(){
    //     // ! formatting time (edge case)
    //     if(secondValue.value >= 60){
    //         minuteValue.value++;
    //         secondValue.value = parseInt(secondValue.value) - 59;
    //     }

    //     if(minuteValue.value >= 60){
    //         hourValue.value++;
    //         minuteValue.value = parseInt(minuteValue.value) - 60;
    //     }

    //     minuteValue.value = minuteValue.value > 60 ? 60 : minuteValue.value;

    //     // updating the time(Checking whether the countdown has finished)
    //     if(hourValue.value == 0 && minuteValue.value == 0 && secondValue.value == 0){
    //         hourValue.value = "";
    //         minuteValue.value = "";
    //         secondValue.value = "";

    //         stopInterval();
    //     }
    //     else if(secondValue.value != 0){
    //         secondValue.value = `${secondValue.value <= 10 ? "0" : ""}${secondValue.value - 1}`;
    //     }
    //     // 00:05:00 becomes 00:04:59
    //     else if(minuteValue.value != 0 && secondValue.value == 0){
    //         secondValue.value = 59;
    //         minuteValue.value = `${minuteValue.value <= 10 ? "0" : ""}${minuteValue.value - 1}`;
    //     }
    //      else if(hourValue.value != 0 && minuteValue.value == 0){
    //         minuteValue.value = 59;
    //         secondValue.value = 59;
    //         hourValue.value = `${hourValue.value <= 10 ? "0" : ""}${hourValue.value - 1}`;
    //     }
    //     return;
    // }

    // stop interval
    // function stopInterval(state){
    //     startBtn.innerHTML = state === "pause" ? "Continue" : "Start";

    //     stopBtn.style.display = "none";
    //     startBtn.style.display = "initial";

    //     clearInterval(countdownTimer);
    //     countdownTimer = null;
    // }

    // stop timer
    // stopBtn.addEventListener("click" , () => {
    //     stopInterval("pause");
    // })

    // reset timer
    // resetBtn.addEventListener("click", ()=>{
    //     hourValue.value = "";
    //     minuteValue.value = "";
    //     secondValue.value = "";

    //     stopInterval();
    // })
})()
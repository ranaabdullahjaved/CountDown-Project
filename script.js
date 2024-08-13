document.addEventListener("DOMContentLoaded", () => {
  // Start Button
  const StartButton = document.getElementById("Startbtn");
  const PauseButton = document.getElementById("Pausebtn");
  const ResumeButton = document.getElementById("Resumebtn");
  const CancelButton = document.getElementById("Cancelbtn");

  let endTime;
  let countDownTimer;
  // Function to update Display
  function UpdateDisplay(time) {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    document.getElementById("Days").textContent = days
      .toString()
      .padStart(2, "0");
    document.getElementById("Hours").textContent = hours
      .toString()
      .padStart(2, "0");
    document.getElementById("Minutes").textContent = minutes
      .toString()
      .padStart(2, "0");
    document.getElementById("Seconds").textContent = seconds
      .toString()
      .padStart(2, "0");
  }

  function ResetDate() {
    document.getElementById("DateTime").value = "";
    document.getElementById("Days").textContent = "00";
    document.getElementById("Hours").textContent = "00";
    document.getElementById("Minutes").textContent = "00";
    document.getElementById("Seconds").textContent = "00";
    StartButton.disabled = false;
    PauseButton.disabled = true;
    CancelButton.disabled = true;
    ResumeButton.disabled = true;
  }

  function StartCountDown(duration, isResuming = false) {
    if (!isResuming) {
      endTime = Date.now() + duration;
    }
    countDownTimer = setInterval(() => {
      const now = Date.now();
      const timeleft = endTime - now;
      if (timeleft <= 0) {
        clearInterval(countDownTimer);
        DisplayMessage("Countdown Finished");
        localStorage.removeItem("countdownTarget");
        ResetDate();
        return;
      }
      UpdateDisplay(timeleft);
    }, 1000);
    PauseButton.disabled = false;
    CancelButton.disabled = false;
  }

  function DisplayMessage(message) {
    const display = document.getElementsByClassName("date_time");
    display.textContent = message;
  }

  StartButton.addEventListener("click", function () {
    const targetdatevalue = document.getElementById("DateTime").value;
    if (targetdatevalue) {
      const targetdate = new Date(targetdatevalue);
      const now = new Date();
      if (targetdate > now) {
        const duration = targetdate - now;
        localStorage.setItem("countdownTarget", targetdate.toString());
        StartButton.disabled = true;
        PauseButton.disabled = false;
        CancelButton.disabled = false;
        ResumeButton.disabled = true;
        StartCountDown(duration);
      } else {
        alert("Please Select A future Date");
      }
    } else {
      alert("Please Select Date and time");
    }
  });

  PauseButton.addEventListener("click", function () {
    clearInterval(countDownTimer);
    PauseButton.disabled = true;
    ResumeButton.disabled = false;
  });

  ResumeButton.addEventListener("click", function () {
    const duration = endTime - Date.now();
    StartCountDown(duration, true);
    PauseButton.disabled = false;
    ResumeButton.disabled = true;
  });

  CancelButton.addEventListener("click", function () {
    clearInterval(countDownTimer);
    localStorage.removeItem("countdownTarget");
    ResetDate();
  });

  const SavedDate = localStorage.getItem("countdownTarget");
  if (SavedDate) {
    const targetdate = new Date(SavedDate);
    now = new Date();
    if (targetdate > now) {
      const duration = targetdate - now;
      StartCountDown(duration);
      StartButton.disabled = true;
      PauseButton.disabled = false;
      CancelButton.disabled = false;
    } else {
      localStorage.removeItem("countdownTarget");
      ResetDate();
    }
  }
});

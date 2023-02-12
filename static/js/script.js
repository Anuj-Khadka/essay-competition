let blurCounter = 1;
let pasteCounter = 1;
let blurTime = 0;
let essaletea = document.getElementById("essayArea");
let submitEssay = document.getElementById("submitEssay");
let wordCount = document.getElementById("wordCount");

window.addEventListener("focus", (event) => {
  console.log("tab is active");
});
window.addEventListener("blur", (event) => {
  console.log("tab is inactive");
  let date = new Date();
  console.log(date);
  let alertMsg = `
    <div class="alert alert-secondary" role="alert">
        We tried to switch the tab. Information recorded! ${blurCounter}
    </div>
`;
  let switchTabs = document.getElementById("switchTab");
  switchTabs.value = blurCounter;
  let container = document.getElementById("container");
  container.insertAdjacentHTML("afterbegin", alertMsg);
  blurCounter++;
});

// Run myfunc every second

let myfunc = setInterval(function () {
  let now = new Date().getTime();
  let countDownDate = new Date(`Sun Feb 12 2023 15:45:05`).getTime();
  let timeleft = countDownDate - now;

  // Calculating the minutes and seconds left
  let minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

  if (minutes <= 30) {
    essayArea.removeAttribute("disabled");
    submitEssay.removeAttribute("disabled");
  }

  document.getElementById("timer").innerText = `${minutes} : ${seconds}`;

  // Display the message when countdown is over
  if (timeleft < 0) {
    clearInterval(myfunc);
    document.getElementById("timer").innerHTML = "TIME UP!!";
  }
}, 1000);

essayArea.addEventListener("paste", () => {
  let pasteMsg = `
    <div class="alert alert-secondary" role="alert">
        We tried to paste something. Information recorded! ${pasteCounter}
    </div>
`;
  let copyPaste = document.getElementById("copyPaste");
  copyPaste.value = pasteCounter;
  pasteCounter++;
  let container = document.getElementById("container");
  container.insertAdjacentHTML("afterbegin", pasteMsg);
});

submitEssay.addEventListener("submit", (event) => {
  event.preventDefault();
  let submitMsg = `
    <div class="alert alert-primary" role="alert">
        The essay has been received. thanks for you submission.
    </div>
`;
  let container = document.getElementById("container");
  container.insertAdjacentHTML("afterbegin", submitMsg);
});

// word count
essayArea.addEventListener("input", function () {
  var words = essayArea.value.split(/\s+/);
  wordCount.innerHTML = `Word Count: ${words.length - 1}`;
});


let score = 0;
let draggedElement = null;
let originBox = null;

document.querySelectorAll('.element').forEach(tile => {
  tile.setAttribute('draggable', 'true');
  tile.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text/plain', tile.dataset.symbol);
    draggedElement = tile; // save reference to the actual element
    // tile.classList.add('dragged-from-level1');
    originBox = e.target.parentElement; // assuming element is inside an element-box
    e.dataTransfer.setData("text/plain", e.target.dataset.symbol);
    //  e.dataTransfer.effectAllowed = 'move';
  });
});













//test





//  for level 2 
const lvl2 = document.getElementById("level-2");
const lvl2Child = Array.from(lvl2.children);

// Fisher-Yates shuffle
for (let i = lvl2Child.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [lvl2Child[i], lvl2Child[j]] = [lvl2Child[j], lvl2Child[i]];
}

const randomTen2 = lvl2Child.slice(0, 10);


lvl2.innerHTML = "";
randomTen2.forEach(el => {
  el.dataset.origin = "level-2";  // ✅ assign origin here
  lvl2.appendChild(el);
});













document.querySelectorAll('.element-box').forEach(box => {
  box.addEventListener('dragover', e => {
    e.preventDefault();
  });

  box.addEventListener('drop', e => {
    e.preventDefault();

    const draggedSymbol = e.dataTransfer.getData('text/plain');
    const targetBox = e.currentTarget;
    const correctSymbol = box.dataset.symbol;
    let elementBank = document.querySelector('#level-1');


    // const draggedElement = document.querySelector(`.element[data-symbol="${draggedSymbol}"]`);



    // ✅ Deduct score if a correct element is moved out of its correct box and into a wrong one
    const oldBox = draggedElement.parentElement;
    if (
      oldBox.classList.contains('element-box') &&
      oldBox.dataset.symbol === draggedSymbol
      // came from correct box
      && targetBox.dataset.symbol !== draggedSymbol // dropped into wrong box
    ) {
      score = Math.max(0, score - 1);
      updateScore();
      oldBox.style.backgroundColor = '#3498db';

    }

    // targetBox.appendChild(draggedElement);
    // checkDragElem(draggedSymbol, correctSymbol, targetBox);


    const existingElement = box.querySelector('.element');
    if (existingElement) {

      //try
      const existingSymbol = existingElement.dataset.symbol;

      // ✅ Deduct 1 if existing was correct and new is wrong
      if (existingSymbol === correctSymbol) {
        score = Math.max(0, score - 1); // avoid negative scores
        updateScore();
      }




      existingElement.removeAttribute('style');
      elementBank.appendChild(existingElement); // move old element back to bank
    }

    if (draggedElement) {
      box.appendChild(draggedElement); // move new dragged element into box
    }

    // Now after moving, check if it's correct
    checkDragElem(draggedSymbol, correctSymbol, box, draggedElement);
    if (oldBox !== box) {
      oldBox.style.backgroundColor = ''; // or set a default like '#ffffff'
    }

  });

});







function checkDragElem(draggedSymbol, correctSymbol, box, draggedElement) {
  draggedElement.style.background = 'none';
  draggedElement.style.color = "black";
  draggedElement.style.fontSize = "25px";
  if (draggedSymbol === correctSymbol) {

    box.style.background = '#b6eeb6'; // green background for correct
    score++;
    updateScore();
  }
  else {

    box.style.background = '#b6eeb6'; // green background even if wrong

  }
}

function updateScore() {
  console.log("Updating score to:", score); // Debug line
  const scoreElement = document.getElementById('score');
  if (scoreElement) {
    scoreElement.textContent = `SCORE: ${score}`;
  } else {
    console.error("Score element not found!");
  }
}




document.querySelector("#closeBtn").addEventListener("click", function () {
  document.querySelector(".popup").style.display = "none";
})
document.getElementById("submit").addEventListener("click", function () {
  document.querySelector(".popup").style.display = "flex";
})



// //start
document.querySelector("#start").addEventListener("click", function () {
  document.querySelector("#level-1").style.display = "flex";  //else .element-bank
  document.querySelector("#start").style.display = "none";
  document.querySelector("#submit").style.display = "flex";
  startTimer();
})






//timer

let timer = 30;
let interval;

const timerClock = document.getElementById("time");


function startTimer() {
  interval = setInterval(() => {
    timer--;
    // time.textContent= `Time: ${timer}`;
    document.querySelector("#time").textContent = `Time: ${timer}`;

    if (timer <= 0) {
      clearInterval(interval);
      // alert("time is over");
      document.querySelector("#submit").click();
    }
  }, 1000);
};











document.getElementById("submit").addEventListener("click", function () {
  clearInterval(interval);

  // Show message as per score
  if (score > 2) {
    document.querySelector("#loss").style.display = "none";
  } else {
    document.querySelector("#win").style.display = "none";
    document.querySelector("#nextLev").style.display = "none";
  }

  // ✅ Update score at the moment of submit
  const finalScore = document.querySelector("#scoreMsg");
  finalScore.textContent = `SCORE: ${score}`;

  if (timer == 0) {
    alert("time is over");
  }
});








//for level 2 

document.getElementById("nextLev").addEventListener("click", function () {
  // Hide level 1
  document.getElementById("level-1").style.display = "none";
  // document.querySelectorAll(".element-box").style.background= "blue";
  document.querySelector(".popup").style.display = "none";

  // Show level 2
  lvl2.style.display = "flex";

  //update level at theh right side
  document.getElementById("Level").innerHTML = "level: 2"

  // Reset timer and score if needed
  timer = 30;
  startTimer();

  // Optionally reset score
  score = 0;
  updateScore();


  // Hide Next button and show Submit again

  document.getElementById("nextLev").style.display = "none";
  document.getElementById("submit").style.display = "flex";

  const elementBox = document.querySelectorAll(".element-box");
  if (elementBox) {
    elementBox.forEach(box => {
      Array.from(box.children).forEach(child => {
        child.remove();

      });
      box.style.background = "#3498db";


    });
  }
  if (score >= 1) {
    // document.querySelector("#loss").style.display = "none";
    document.querySelector("#win").style.display = "flex";

  } else {
    document.querySelector("#loss").style.display = "flex";
    // document.querySelector("#nextLev").style.display = "none";
  }



});




document.addEventListener("DOMContentLoaded", function () {
  let darkOverlay = document.querySelector(".dark-overlay");

  if (!darkOverlay) {
    console.error("dark-overlay not found in the DOM!");
    return;
  }

  function updateDarkOverlay() {
  let scrollPos = window.scrollY || document.documentElement.scrollTop;
  let maxScroll = document.documentElement.scrollHeight - window.innerHeight;

  // Use a power function to make the darkness increase more rapidly near the bottom
  let opacity = Math.min(1, Math.pow(scrollPos / maxScroll, 1.8) * 3);

  console.log("Scroll Y:", scrollPos, "Opacity:", opacity.toFixed(2));

  requestAnimationFrame(() => {
    document.querySelector(".dark-overlay").style.opacity = opacity.toFixed(2);
  });
}

// ✅ Ensure overlay updates correctly
window.addEventListener("scroll", updateDarkOverlay);
updateDarkOverlay(); // Set initial state

});


$(document).ready(function () {
  // =================================================
  //  Apply lettering.js for text effects
  // =================================================
  $("#letters p").lettering();
  $("#words p").lettering("words");
  $("#lines p").lettering("lines");

  // =================================================
  //  Blown Away Effect on Hover
  // =================================================
  document.querySelectorAll(".blown-away").forEach((p) => {
    p.innerHTML = p.textContent
      .split("")
      .map((char) =>
        char === " " ? `<span>&nbsp;</span>` : `<span>${char}</span>`
      )
      .join("");

    p.querySelectorAll("span").forEach((span) => {
      span.addEventListener("mouseenter", function () {
        this.style.setProperty("--x", `${Math.random() * 100 - 50}px`);
        this.style.setProperty("--y", `${Math.random() * 50 - 25}px`);
        this.style.setProperty("--r", `${Math.random() * 30 - 15}deg`);
        this.classList.add("blow");

        setTimeout(() => {
          this.classList.remove("blow");
          this.style.animation = "reappear 0.5s forwards";
        }, 1500);
      });
    });
  });

  // =================================================
  //  Draggable Popups (Fixed Positioning)
  // =================================================
  document.querySelectorAll(".popup").forEach((popup, index) => {
    randomPosition(popup, index);

    popup.addEventListener("mousedown", function (event) {
      event.preventDefault();

      let shiftX = event.clientX - popup.getBoundingClientRect().left;
      let shiftY = event.clientY - popup.getBoundingClientRect().top;

      function moveAt(pageX, pageY) {
        let newX = Math.max(
          0,
          Math.min(pageX - shiftX, window.innerWidth - popup.clientWidth)
        );
        let newY = Math.max(
          0,
          Math.min(pageY - shiftY, window.innerHeight - popup.clientHeight)
        );
        popup.style.left = `${newX}px`;
        popup.style.top = `${newY}px`;
      }

      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
      }

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener(
        "mouseup",
        function () {
          document.removeEventListener("mousemove", onMouseMove);
        },
        { once: true }
      );
    });

    popup.ondragstart = function () {
      return false;
    };
  });

  // =================================================
  //  Ensure Popups Stay Within Bounds on Resize
  // =================================================
  window.addEventListener("resize", () => {
    document.querySelectorAll(".popup").forEach((popup, index) => {
      randomPosition(popup, index);
    });
  });

  // =================================================
  //  Random Position for Popups (Now Overlapping Slightly)
  // =================================================
  function randomPosition(el, index) {
    let container = document.getElementById("panel-popups");
    let containerRect = container.getBoundingClientRect();

    let maxX = containerRect.width - el.clientWidth - 80; // Closer together
    let maxY = containerRect.height - el.clientHeight - 50; // Ensure overlapping

    let baseX = containerRect.width / 2 - 120; // Centered slightly left
    let baseY = containerRect.height / 2 - 60; // Centered slightly up

    let randomX = Math.max(10, baseX + Math.random() * maxX - maxX / 2);
    let randomY = Math.max(10, baseY + Math.random() * maxY - maxY / 2);

    el.style.position = "absolute";
    el.style.left = `${randomX}px`;
    el.style.top = `${randomY}px`;
    el.style.zIndex = 100 + index;
  }

  // =================================================
  //  Snow Effect
  // =================================================
  document.body.insertAdjacentHTML(
    "beforeend",
    '<div class="snow-container"></div>'
  );
  const snowContainer = document.querySelector(".snow-container");

  function createSnowflake() {
    const snowflake = document.createElement("div");
    snowflake.innerHTML = "❆";
    snowflake.classList.add("snowflake");

    snowflake.style.left = `${Math.random() * 100}vw`;
    snowflake.style.fontSize = `${Math.random() * 12 + 8}px`;
    snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`;

    snowContainer.appendChild(snowflake);

    setTimeout(() => {
      snowflake.remove();
    }, 5000);
  }

  setInterval(createSnowflake, 200);
});



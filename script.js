document.addEventListener("DOMContentLoaded", () => {
    const tilePoetry = document.getElementById("tile-poetry");
    const poetryOverlay = document.getElementById("poetryOverlay");
    const poetryIntro = document.getElementById("poetryIntro");
    const mainApp = document.getElementById("mainApp");
    const closePoetry = document.getElementById("closePoetry");

    const optionsDiv = document.getElementById("options");
    const generateBtn = document.getElementById("generateBtn");
    const poemSection = document.getElementById("poemSection");
    const poemText = document.getElementById("poemText");
    const restartBtn = document.getElementById("restartBtn");
    const shareBtn = document.getElementById("shareBtn");

    const items = [
        "Poetry", "Music", "Nature", "Love", "Travel", "Family", "Friendship",
        "Sports", "Art", "Peace", "Hope", "Stars", "Ocean", "Mountains",
        "Happiness", "Dreams", "Food", "Laughter", "Memories", "Kindness"
    ];

    const bgColors = {
        Nature: "#d0ffe1",
        Love: "#ffd6e4",
        Music: "#d7e3ff",
        Dreams: "#f7e6ff",
        Stars: "#e7e7ff",
        Ocean: "#dff7ff",
        Happiness: "#fff7d0"
    };

    // Build checkboxes once
    items.forEach(item => {
        const label = document.createElement("label");
        label.innerHTML = `<input type="checkbox" value="${item}"> ${item}`;
        optionsDiv.appendChild(label);
        optionsDiv.appendChild(document.createElement("br"));
    });

    function resetPoetry() {
        document.querySelectorAll("#options input:checked").forEach(i => (i.checked = false));
        poemSection.classList.add("hidden");
        poemText.innerText = "";
        document.body.style.background = "linear-gradient(135deg, #f7f5ff, #e6f3ff)";
        // reset intro so it can show again next time
        poetryIntro.style.display = "flex";
        poetryIntro.style.opacity = "1";
    }

    // Open Poetry tile
    tilePoetry.addEventListener("click", () => {
        poetryOverlay.classList.remove("hidden");
        mainApp.classList.add("hidden");
        poetryIntro.style.display = "flex";
        poetryIntro.style.opacity = "1";

        // After intro animation, hide intro & show main app
        setTimeout(() => {
            poetryIntro.style.opacity = "0";
            setTimeout(() => {
                poetryIntro.style.display = "none";
                mainApp.classList.remove("hidden");
            }, 500);
        }, 3000); // matches CSS animation duration
    });

    // Close Poetry tile
    closePoetry.addEventListener("click", () => {
        poetryOverlay.classList.add("hidden");
        resetPoetry();
    });

    // Generate poem
    generateBtn.addEventListener("click", () => {
        const selected = [...document.querySelectorAll("#options input:checked")].map(i => i.value);

        if (selected.length !== 7) {
            alert("Please select exactly 7 things ✨");
            return;
        }

        // Dynamic background
        selected.forEach(choice => {
            if (bgColors[choice]) {
                document.body.style.background = `linear-gradient(135deg, #ffffff, ${bgColors[choice]})`;
            }
        });

        const poem = `
From the gentle touch of ${selected[0]},
to the warm embrace of ${selected[1]},
life blossoms in colors only the soul can see.

${selected[2]} whispers softly to your heart,
while ${selected[3]} lights the sky within you.

You walk through days filled with ${selected[4]},
holding on to ${selected[5]} and ${selected[6]},
reminders that the world is still beautiful.

Keep smiling. Keep shining.
Your heart is brighter than you know.
        `;

        poemText.innerText = poem;
        poemSection.classList.remove("hidden");
    });

    // Restart inside app
    restartBtn.addEventListener("click", () => {
        document.querySelectorAll("#options input:checked").forEach(i => (i.checked = false));
        poemSection.classList.add("hidden");
        poemText.innerText = "";
        document.body.style.background = "linear-gradient(135deg, #f7f5ff, #e6f3ff)";
    });

    // Share poem on Twitter/X
    shareBtn.addEventListener("click", () => {
        const poem = poemText.innerText.trim();
        if (!poem) {
            alert("Generate a poem first ✨");
            return;
        }
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(poem)}`;
        window.open(url, "_blank");
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const addBtn = document.getElementById("addBtn");
    const pools = document.getElementById("pools");

    addBtn.addEventListener("click", function() {
        const i = document.querySelectorAll(".choose").length + 1;

        let div = document.createElement("div");
        div.className = "choose";
        div.id = `Parent${i}`;

        let input = document.createElement("input");
        input.type = "text";
        input.placeholder = `option ${i}`;
        input.className = "Input";
        input.name = "option[]"
        
        let img = document.createElement("img");
        img.src = "/img/cross-23.svg";
        img.alt = "Remove";
        img.className = "remove-button";
        img.style.marginTop = "5px";

        img.addEventListener("click", function() {
            div.remove();
            updateRemoveButtonVisibility();
        });

        div.appendChild(input);
        div.appendChild(img);
        pools.appendChild(div);

        updateRemoveButtonVisibility();
    });

    pools.addEventListener("click", function(event) {
        if (event.target.classList.contains("remove-button")) {
            event.target.parentElement.remove();
            updateRemoveButtonVisibility();
        }
    });

    function updateRemoveButtonVisibility() {
        const removeButtons = document.querySelectorAll(".remove-button");
        if (removeButtons.length === 1) {
            removeButtons[0].style.display = "none";
        } else {
            removeButtons[0].style.display = "block";
        }
    }

    updateRemoveButtonVisibility();
});

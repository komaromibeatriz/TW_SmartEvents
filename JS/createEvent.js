var form = document.querySelector(".event-form");
var list = document.getElementById("eventList");
var events = [];
var editIndex = new URLSearchParams(window.location.search).get("edit");

window.addEventListener("DOMContentLoaded", function () {
    var stored = localStorage.getItem("myEvents");
    if (stored) events = JSON.parse(stored);
    if (form && editIndex !== null) {
        var ev = events[Number(editIndex)];
        if (ev) {
            document.getElementById("title").value = ev.title || "";
            document.getElementById("category").value = ev.category || "";
            document.getElementById("date").value = ev.date || "";
            document.getElementById("time").value = ev.time || "";
            document.getElementById("location").value = ev.location || "";
            document.getElementById("capacity").value = ev.capacity || "";
            document.getElementById("desc").value = ev.description || "";
            var btn = form.querySelector(".btn.primary");
            if (btn) btn.textContent = "Save";
        }
    }

    if (list) renderEvents();
});

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        var titleInput = document.getElementById("title");
        var categoryInput = document.getElementById("category");
        var dateInput = document.getElementById("date");
        var timeInput = document.getElementById("time");
        var locationInput = document.getElementById("location");
        var capacityInput = document.getElementById("capacity");
        var descInput = document.getElementById("desc");

        var newEvent = {
            title: titleInput.value.trim(),
            category: categoryInput.value,
            date: dateInput.value,
            time: timeInput.value,
            location: locationInput.value.trim(),
            capacity: capacityInput.value,
            description: descInput.value.trim()
        };

        if (editIndex !== null) {
            events[Number(editIndex)] = newEvent;
        } else {
            events.push(newEvent);
        }

        localStorage.setItem("myEvents", JSON.stringify(events));

        form.reset();
        window.location.href = "organizerAccount.html";
    });
}

function renderEvents() {
    list.innerHTML = "";

    events.forEach(function (evt, i) {
        var li = document.createElement("li");
        li.innerHTML =
            "<div class='event-card'>" +
            "<h3>" + evt.title + "</h3>" +
            "<span class='category-tag'>" + evt.category + "</span>" +
            "<p class='event-details'>" +
            " " + evt.date + " |  " + evt.time + " |  " + evt.location +
            (evt.capacity ? " | " + evt.capacity : "") +
            "</p>" +
            "<p class='event-desc'>" + evt.description + "</p>" +
            "<div class='item-actions'>" +
              "<button class='btn' data-action='edit' data-index='" + i + "'>Edit</button>" +
              "<button class='btn ghost' data-action='delete' data-index='" + i + "'>Delete</button>" +
            "</div>" +
            "</div><hr>";
        list.appendChild(li);
    });
}
if (list) {
    list.addEventListener("click", function (e) {
        var btn = e.target.closest("button");
        if (!btn) return;

        var action = btn.getAttribute("data-action");
        var idx = Number(btn.getAttribute("data-index"));

        if (action === "edit") {
            window.location.href = "createEvent.html?edit=" + idx;
            return;
        }
        if (action === "delete") {
            if (!Number.isNaN(idx)) {
                events.splice(idx, 1);
                localStorage.setItem("myEvents", JSON.stringify(events));
                renderEvents();
            }
            return;
        }
    });
}

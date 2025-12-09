var grid = document.getElementById("eventsGrid");
var events = [];

window.addEventListener("DOMContentLoaded", () => {
    var stored = localStorage.getItem("myEvents");

    if(stored){
        events = JSON.parse(stored);
    }

    render();
});

function render(){
    grid.innerHTML = "";

    events.forEach(evt => {
        let card = `
        <div class="event-card">
            <div class="event-body">

                <h3>${evt.title}</h3>
                <div class="meta">${evt.category}</div>

                <div class="meta">
                    📅 ${evt.date} | ⏰ ${evt.time} | 📍 ${evt.location}
                </div>

                <p>${evt.description}</p>
            </div>
        </div>
        `;

        grid.innerHTML += card;
    });
}

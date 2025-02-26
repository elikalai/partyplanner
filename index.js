const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2412-FTB-ET-WEB-AM";
const API = BASE + COHORT;

//state

let events = [];
let selectedevent;

async function getEvents () {
    try { 
    const response = await fetch(API + "/events");
    const result = await response.json();
    events = result.data;
    render();
    } catch (e){
    console.error(e);
    }
}

async function getEvent (id) {
    try {
    const response = await fetch(API + "/events/" + id);
    const result = await response.json();
    selectedevent = result.data;
    render();
    } catch (e){
    console.error(e);
    }
}

//components

function eventListItem (event) {
const $li = document.createElement("li");
$li.innerHTML = `
<a href=#selected>${event.name}</a>
`;
$li.addEventListener("click",  () => getEvent(event.id));
return $li;
}

function EventList () {
    const $ul = document.createElement("ul");
    //adds a class to element for css styling
    $ul.classList.add("event");
    const $events = events.map(eventListItem);
    $ul.replaceChildren(...$events)
    return $ul;
}

function EventDetails () {
    if (!selectedevent) {
        const $p = document.createElement("p");
        $p.textContent = "select Event to learn more";
        return $p;
    }

const $section = document.createElement("section");
$section.innerHTML = `
<h3>${selectedevent.name} #${selectedevent.id}</h3>
<figure>
<img alt= ${selectedevent.name} src=${selectedevent.imageUrl}/>
</figure>
<p>${selectedevent.date}</p>
<p>${selectedevent.description}</p>
`;
return $section;
}

//render 

function render () {
    const $app = document.querySelector("#app");
    $app.innerHTML = `
    <h1>Fullstack Events</h1>
    <main>
    <section>
    <h2>Upcoming Events</h2>
    <EventList></EventList>
    </section>
    <section id="selected">
    <h2>Event Details</h2>
    <EventDetails></EventDetails>
    </section>
    </main>
    `;
    $app.querySelector("section").replaceWith(EventList());
    $app.querySelector("#selected").replaceWith(EventDetails());
}

async function init () {
    await getEvents();
    render();
}

init();
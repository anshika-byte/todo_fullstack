const backendURL = "http://16.16.207.234:5000/api";

async function loadTodos() {
    const res = await fetch(`${backendURL}/todos`);
    const todos = await res.json();
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    todos.forEach(t => {
        const item = document.createElement("li");
        item.textContent = t.text;

        item.onclick = async () => {
            await fetch(`${backendURL}/todos/${t.id}`, { method: "DELETE" });
            loadTodos();
        };
        list.appendChild(item);
    });
}

async function addTask() {
    const text = document.getElementById("taskInput").value;
    await fetch(`${backendURL}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
    });
    document.getElementById("taskInput").value = "";
    loadTodos();
}

loadTodos();

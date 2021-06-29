document.addEventListener("DOMContentLoaded", async () => {
    fetch("./manifest.json").then((response) => response.json()
        .then(data => {
                document.getElementById("name").textContent = data.name
                document.getElementById("version").textContent = `(${data.version})`
                document.getElementById("description").textContent = data.description
        })
    )
}, false)
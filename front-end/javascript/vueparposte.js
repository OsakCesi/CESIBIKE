const selectPoste = document.getElementById("select-poste");
const stockBody = document.getElementById("stock-body");
let chart = null;

//charge les données d’un poste depuis le backend
async function chargerPoste(numero) {
    try {
        // Appel au backend (à adapter)
        const response = await fetch(`getPoste.php?poste=${numero}`);

        // Récupération du JSON
        const data = await response.json();

        // Vérification
        if (!data.stock || !data.temps) {
            console.error("Format JSON incorrect :", data);
            return;
        }

        // Mise à jour du tableau du stock
        stockBody.innerHTML = "";
        data.stock.forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML = `<td>${item.piece}</td><td>${item.quantite}</td>`;
            stockBody.appendChild(row);
        });

        // Mise à jour du graphique
        const ctx = document.getElementById("graph-etapes").getContext("2d");

        if (chart) chart.destroy();

        chart = new Chart(ctx, {
            type: "line",
            data: {
                labels: data.etapes,   // ex: ["Découpe", "Soudure", ...]
                datasets: [{
                    label: "Temps (min)",
                    data: data.temps,   // ex: [3, 5, 2, 4, 1]
                    borderColor: "#4da3ff",
                    backgroundColor: "rgba(77,163,255,0.2)",
                    fill: true,
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { labels: { color: "#e6e6e6" } }
                },
                scales: {
                    x: { ticks: { color: "#e6e6e6" } },
                    y: { ticks: { color: "#e6e6e6" } }
                }
            }
        });

    } catch (error) {
        console.error("Erreur lors du chargement du poste :", error);
    }
}

// Quand on change de poste dans le menu
selectPoste.addEventListener("change", () => {
    chargerPoste(selectPoste.value);
});

// Chargement initial
chargerPoste(selectPoste.value);
const postes = [
    { nom: "Poste 1", stock: 72, temps: 4 },
    { nom: "Poste 2", stock: 35, temps: 2 },
    { nom: "Poste 3", stock: 90, temps: 7 },
    { nom: "Poste 4", stock: 50, temps: 3 },
    { nom: "Poste 5", stock: 10, temps: 1 },
    { nom: "Poste 6", stock: 65, temps: 5 }
];


const tbody = document.getElementById("table-body");


tbody.innerHTML = "";

postes.forEach(poste => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
        <td>${poste.nom}</td>

        <td>
            <div class="jauge-barre">
                <div class="jauge-remplissage" style="--valeur: ${poste.stock}%"></div>
            </div>
            <span class="valeur">${poste.stock}%</span>
        </td>

        <td>${poste.temps} min</td>
    `;

    tbody.appendChild(tr);
});
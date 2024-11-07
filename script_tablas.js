// URL de la API para la clasificación de pilotos 2024
const apiUrl = "http://ergast.com/api/f1/current/driverStandings.json";

// Función para obtener y mostrar los datos
async function loadDriverStandings() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Acceder a la lista de clasificaciones de pilotos
        const standings = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        const tableBody = document.querySelector(".table-container tbody");

        // Limpiar el contenido de la tabla (por si se recarga)
        tableBody.innerHTML = "";

        // Llenar la tabla con los datos de cada piloto
        standings.forEach((driver, index) => {
            const team = driver.Constructors[0].name; // Obtener el nombre del equipo
            const row = document.createElement("tr");
            row.className = `table-content driver${index + 1}`; // Añadir clase según posición

            row.innerHTML = `
                <td>
                    <span class="position">${index + 1}</span>
                    <span class="driver-name">${driver.Driver.givenName}</span>
                    <span class="driver-surname">${driver.Driver.familyName}</span>
                    <span class="team">${team}</span>
                </td>
                <td>
                    <span class="points">${driver.points} PTS</span>
                    <i class="fas fa-chevron-right"></i>
                </td>
            `;

            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error al cargar los datos:", error);
    }
}

// Llamar a la función al cargar la página
document.addEventListener("DOMContentLoaded", loadDriverStandings);

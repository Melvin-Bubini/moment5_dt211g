"use strict";

import Chart from 'chart.js/auto'; // Importera Chart.js

const url = 'https://studenter.miun.se/~mallar/dt211g/';

window.onload = init;

async function init() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const barchartEl = document.getElementById('barChart');
        const doughnutChartEl = document.getElementById('doughnutChart')

        // Filtrera ut bara kurser och program
        const kurser = data.filter(item => item.type === 'Kurs');
        const program = data.filter(item => item.type === 'Program');

        // Sortera kurser och program baserat på applicantsTotal i fallande ordning
        const sortedKurser = kurser.sort((a, b) => b.applicantsTotal - a.applicantsTotal);
        const sortedProgram = program.sort((a, b) => b.applicantsTotal - a.applicantsTotal);

        // Välj de första sex kurserna och fem programmen från den sorterade listan
        const topSixKurser = sortedKurser.slice(0, 6);
        const topSixProgram = sortedProgram.slice(0, 5);

        const largeScreenLabels = topSixKurser.map(kurs => kurs.name);
        const smallScreenLabels = ['Beteende', 'Grund Psykologi', 'Kriminologi', 'Krim Psykologi', 'Juridik', 'Psykologi Intro'];

        new Chart(barchartEl, {
            type: 'bar',
            data: {
                labels: (window.innerWidth > 800) ? largeScreenLabels : smallScreenLabels,
                datasets: [{
                    label: ' Number of Applicants',
                    data: topSixKurser.map(kurs => kurs.applicantsTotal),
                    borderWidth: 2,
                    hoverOffset: 4
                }]
            }
        });




        new Chart(doughnutChartEl, {
            type: 'doughnut',
            data: {
                labels: topSixProgram.map(program => program.name),
                datasets: [{
                    label: ' Number of Applicants',
                    data: topSixProgram.map(program => program.applicantsTotal),
                    borderWidth: 2,
                    hoverOffset: 4
                }]
            }
        });
    }
    catch {
        document.getElementById("error").innerHTML = "<p>Något gick fel</p>";
    }
}

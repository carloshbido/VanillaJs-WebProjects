const form = document.getElementById('form');

//Form Action
form.addEventListener('submit', handle);

function handle(e) {
    e.preventDefault();
    generateResults();
}

// Results
function generateResults() {
    //Display Elements
    const display_el = document.getElementById("results");
    const displayTable_el = document.getElementById("results-table");

    //Form Values
    let initialValue = getNumbers('initial-value');
    let initialContribution = getNumbers('initial-contribution');
    let monthlyInterest = getNumbers('monthly-interest');
    let numberMonths = getNumbers('number-months');

    //Helpers variables
    let totalLine;
    const results = [];
    let countMounth = 1;

    //Total applied without interest
    let totalApplied = initialValue + (initialContribution * numberMonths);

    //Array results
    for(countMounth; countMounth <= numberMonths; countMounth++) {

        monthValue = initialValue + initialContribution;
        totalLine = monthValue + (((monthValue) * monthlyInterest) / 100);

        results.push({
            initialValue,
            initialContribution, 
            monthValue,
            monthlyInterest,
            totalLine,
            monthValueInterest: totalLine - monthValue
            })

        initialValue = totalLine;
    }

    //Total applied with interest
    const resultTotalLine = results[numberMonths - 1].totalLine;

    //Total gain
    const gainResults = Number(resultTotalLine).toFixed(2) - Number(totalApplied).toFixed(2);

    //Print Display
    display_el.innerHTML = `
        <p>Total do valor aplicado sem Juros: <span> ${CurrencyMask(totalApplied)}</span> </p>
        <p>Total do resgate após o vencimento: <span> ${CurrencyMask(resultTotalLine)}</span></p>
        <p>Total de juros acumulado: <span> ${CurrencyMask(gainResults)}</span></p>
        `;
    display_el.style.display = 'block';

    //Print Table
    displayTable_el.innerHTML = `
        <h4>Extrato detalhado</h4>
        <table>
            <thead> 
                <tr>
                    <th>Mês</th>
                    <th>Valor</th>
                    <th>Aporte</th>
                    <th>Valor do Mês</th>
                    <th>Juros</th>
                    <th>Juros do Mês</th>
                    <th>Total Consolidado</th>
                </tr>
            </thead>
            <tbody>
                ${results.map((result, index) => 
                `
                <tr>
                    <td>${numberMask(index + 1)}</td>
                    <td>${CurrencyMask(result.initialValue)}</td>
                    <td>${CurrencyMask(result.initialContribution)}</td>
                    <td>${CurrencyMask(result.monthValue)}</td>
                    <td>${result.monthlyInterest.toFixed(2).replace(".",",")} %</td>
                    <td>${CurrencyMask(result.monthValueInterest)}</td>
                    <td>${CurrencyMask(result.totalLine)}</td>
                </tr>
                `
                ).join('')}
            </tbody>
        </table>
        `;
    displayTable_el.style.display = 'block';
}
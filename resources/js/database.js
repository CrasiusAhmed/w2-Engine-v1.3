let tableNames = document.querySelectorAll('.table-name');
let columnDataElements = document.querySelectorAll('.column-data');
let columnValueElements = document.querySelectorAll('.column-values');

tableNames.forEach(tableName => {
    tableName.onclick = function () {
        let tableNameAttr = tableName.getAttribute('data-table');

        let detailTable = tableName.nextElementSibling;

        detailTable.classList.toggle('active');
        tableName.classList.toggle('active');

        columnDataElements.forEach(columnData => {
            columnData.classList.remove('active');
        });
        columnValueElements.forEach(columnValue => {
            columnValue.classList.remove('active');
        });
        /* columnValueElements.forEach(columnValue => {
            if (columnValue.getAttribute('data-table') === tableNameAttr) {
                columnValue.classList.toggle('active'); // Toggle only the matching ones
            } else {
                columnValue.classList.remove('active'); // Hide non-matching
            }
        });
 */

        let matchingColumnData = document.querySelector(`.column-data[data-table="${tableNameAttr}"]`);
        let matchingColumnValues = document.querySelectorAll(`.column-values[data-table="${tableNameAttr}"]`);

        if (matchingColumnData) {
            matchingColumnData.classList.add('active');
        }
        matchingColumnValues.forEach(columnValue => {
            columnValue.classList.add('active');
        });


                // Automatically activate the first column-data on page load option 2
        /* let firstColumnData = document.querySelector('.column-data');
        if (firstColumnData) {
            firstColumnData.classList.add('active');
        } */
    }
});







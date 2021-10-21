import xlsExport from 'xlsexport';

const arrayRange = (start, end, step=1) => {
    let arr = [];
    for(let i = start; i <= end; i += step ){
        arr.push(i);
    }

    return arr;
}

const exporToExcel = (data, sheetname, filename) => {
    const xls = new xlsExport(data, sheetname)
    xls.exportToXLS(filename+'.xls')
}

export { arrayRange, exporToExcel }
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver'; // Importando corretamente

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  exportToExcel(data: any[], fileName: string) {
    const mappedData = data.map(item => ({
      "Apartamento": item.userApt,
      "Nome": item.userName,
      "CPF": item.userCPF,
      "Máquina":item.machine,
      "Horário Inicial": item.start_time,
      "Horário Final": item.end_time,
      "Data": item.date,
      "Valor": item.total_cost
    }));
  
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(mappedData, {
      header: [
        "Apartamento", "Nome", "CPF","Máquina", "Horário Inicial", "Horário Final", "Data", "Valor"
      ]
    });
  
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    FileSaver.saveAs(blob, fileName + '.xlsx');
  }
  
  
}

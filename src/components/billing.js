import React, {Component} from 'react';
import Bill from './bill.generator';
import waitForElm from '../middlewares/waitForElm';
import HistorySearch from './history.formField';
import dateValue from "../constant/date"

class Billing extends Component{
  render(){
    return (
      <div className='billing content'>
        <div className='breadCrum'><a href='#'>Trang Chủ</a> - <a href='#'>VCB</a> - <a href='#'>Chuyển Khoản</a></div>
        <h2 className='pageTitle'>Hóa Đơn Chuyển Khoản</h2>
        <HistorySearch />
        <table className='transHistory' cellSpacing={0}>
          <thead>
            <th>In</th>
            <th>Player Id</th>
            <th>Số Tiền</th>
            <th>Thời gian Duyệt</th>
            <th>Số Tài Khoản</th>
            <th>Ngân Hàng</th>
            <th>Tên Khách Hàng</th>
            <th>Mã Xuất Khoản</th>
            <th>Mã Giao Dịch</th>
          </thead>
          <tbody className='tableData' cellSpacing={0}> 

          </tbody>
        </table>
        <table className='tableResult' cellSpacing={0}> 
          <thead>
            <th>Tổng Đơn</th>
            <th>Tổng Xuất</th>
          </thead>
          <tbody>
            <td id='tongdon'>0</td>
            <td id='tongxuat'>0</td>
          </tbody>
        </table>
      <Bill />
      </div>
    )
  }
}

waitForElm('#startTime').then(()=>{
  document.getElementById('startTime').value = new Date(dateValue.currentStartDay).getFullYear()+"-"+(new Date(dateValue.currentStartDay).getMonth()+1)+'-'+(new Date(dateValue.currentStartDay).getDate())+'T00:00:00'
  document.getElementById('endTime').value = new Date(dateValue.currentEndDay).getFullYear()+"-"+(new Date(dateValue.currentStartDay).getMonth()+1)+'-'+(new Date(dateValue.currentStartDay).getDate())+'T23:59:59'
})

waitForElm('.billPrinter').then(()=>{
  let billingContent = document.getElementsByClassName('bill-wrapper')[0]
  document.getElementsByClassName('cancelPrnt')[0].addEventListener('click',function(){
    console.log('center')
    billingContent.style.opacity='0'
    billingContent.style.zIndex='-1'
  })
})

waitForElm('.transHistory').then(()=>{
  function downloadCSVFile(csv, filename) {
    var csv_file, download_link;
    csv_file = new Blob([csv], {type: "text/csv"});
    download_link = document.createElement("a");
    download_link.download = filename;
    download_link.href = window.URL.createObjectURL(csv_file);
    download_link.style.display = "none";
    document.body.appendChild(download_link);
    download_link.click();
  }
  document.getElementById("download-button").addEventListener("click", function () {
    var html = document.getElementsByClassName("tableData")[0].outerHTML;
    htmlToCSV(html, "TaiBieu.csv");
  });


  function htmlToCSV(html, filename) {
    var data = [];
    var rows = document.querySelectorAll("table tr");					
    for (var i = 0; i < rows.length; i++) {
      var row = [], cols = rows[i].querySelectorAll("td, th");						
      for (var j = 0; j < cols.length; j++) {
        row.push(cols[j].innerText);
      }
      data.push(row.join(","));		
    }
    downloadCSVFile(data.join("\n"), filename);
  }
})

export default Billing;

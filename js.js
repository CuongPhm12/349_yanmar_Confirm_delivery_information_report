$("#release_no_table").hide()
$(".page-break0").hide()
$(".page-break1").hide()
$(".page-break2").hide()

getData();
function getData() {
    let releaseNo = $("#release_no").text().trim();
    let wh_nm = $("#wh_nm").text().trim();
    let end_agency_tel_no = $("#end_agency_tel_no").text().trim();
    let load_finish_date = $("#load_finish_date").text().trim();
    let agency_name = $("#agency_name").text().trim();
    let end_agency_address = $("#end_agency_address").text().trim();
    let release_order_date_ko = $("#release_order_date_ko").text().trim();
    let agency_remark = $("#agency_remark_id").text().trim();
     let ynk_remark = $("#ynk_remark_id").text().trim();
    let region = $("#region").text().trim();
    let driver_name = $("#driver_name").text().trim();
    let car_no = $("#car_no").text().trim();
    let driver_tel_no = $("#driver_tel_no").text().trim();
    let load_type = $("#load_type").text().trim();
    
    // console.log(load_finish_date)
    const data_Send = {};
    data_Send.menucode = "M000000349";
    data_Send.type = "get_data";
    data_Send.header = JSON.stringify({ releaseNo: releaseNo });
    $.ajax({
        type: "post",
        dataType: "JSON",
        url: "/ajax.do",
        data: data_Send,
        async: false,
        success: function (response, status, request) {
            const { res, sql, driver,item } = response;
            console.log( response );
            
            for(let j=0;j<item.length;j++){
                let is_completee_detail= ""; 
                let item_data = item[j];
                if(item_data.length !== 0){
                   $(".page-break" + j).show();  
                   let item_name_detail = ""
                  for(let o=0;o<item_data.length;o++){
                  let item_name =  item_data[o].sales_cd || "";
                //   let spec =  item_data[o].spec || "";
                //   let unit =  item_data[o].unit || "";
                  let qty = item_data[o].qty || "";
                  
                  let newRowDetail = `
                            <tr class="rowsrepeat"  style="height: 40px;text-align: center;">
                            <td style="width: 20px;">${o +1}</td>
                            <td style="width: 117px;">${item_name}</td>
                            <td style="width: 117px;"></td>
                            <td style="width: 40px;">개</td>
                            <td style="width: 40px;">${qty}</td>
                            <td style="width: 40px;">${qty}</td>
                            <td style="width: 117px;"></td>
                            </tr>
                       `
                  is_completee_detail += newRowDetail
                  item_name_detail = item_name
                  }
                   $("#item_name" + j).text("제품명 :" + item_name_detail) 
                   $("#detail" + j).after(is_completee_detail)
                  
                }
                
            }
           
            let total = 0;
            var is_completee = "";
            let delv_comp_name = driver.cust_name ||"";
            let delv_comp_phone = driver.tel_no ||"";
            let delv_comp_addr = driver.address ||"";
            let ceo_name = driver.ceo_name||"";
 
            // $("#rowspan_id").attr("rowspan",res.length+3);//rowspan depends rows add
            $("#rowspan_id").attr("rowspan",res.length+4);//rowspan depends rows add
            for (let i = 0; i < res.length; i++) {
                let item = res[i];
                total += item.release_qty;
                
                let sales_cd = item.sales_cd || "";
                let spec = item.spec || "";
                let release_qty = item.release_qty || "";
                let machine_no = item.machine_no || "";
                let built_no = item.built_no || "";
                let plate_no3 = item.plate_no3 || "";
                let option_1 = item.option_1_name || "";
            //   option_1 = option_1 == "Y" ? "X" : "";

                let newRow = `
              <tr class="rowsrepeat"  style="height: 40px;text-align: center;">
                      <td style="width: 129px;  text-align: center">이앙기</td>
                      <td style="width: 319.219px;"><span class="sales_cd">${sales_cd}</span></td>
                      <td style="width: 62.7812px;"><span class="spec"></span></td>
                      <td style="width: 37px; "><span class="release_qty">${release_qty}</span></td>
                      <td style="width: 89px; "><span class="machine_no">${machine_no}</span></td>
                      <td style="width: 72px; "><span class="built_no">${built_no}</span></td>
                      <td style="width: 73px; "><span class="plate_no3">${plate_no3}</span></td>
                      <td style="width: 40px; "><span class="option_1">${option_1}</span></td>
                </tr>
                `
                
                is_completee+=newRow
            }
            
            $("#tr_lv2").after(is_completee)
            
            $("#release_no_id").text(releaseNo);
            $("#date_ko_render").text(release_order_date_ko);
            $("#delv_comp_name_id").text(delv_comp_name);
            $("#delv_comp_name_id_2").text(delv_comp_name);
            $("#delv_comp_phone_id").text(delv_comp_phone);
            $("#delv_comp_addr_id").text(delv_comp_addr);
            $("#ceo_name_id").text(ceo_name);
            $("#release_qty_no").text(total);
            
            $("#driver_name_id").text(driver_name);
            $("#car_no_id").text(car_no);
            $("#driver_tel_no_id").text(driver_tel_no);
            $("#load_type_id").text(load_type);
            
            $("#delv_cust_remark_id").append(
              "<span>대리점 주문시 요청사항: " + agency_remark + "</span><br>" +
              "<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;YNK 출하시 의뢰사항: " + ynk_remark + "</span>"
            );
           
            $("#driver_name_id_sub0").text("운전자명 : "+driver_name);
            $("#driver_name_id_sub1").text("운전자명 : "+driver_name);
            $("#driver_name_id_sub2").text("운전자명 : "+driver_name);
            $("#car_no_id_sub0").text(car_no);
            $("#car_no_id_sub1").text(car_no);
            $("#car_no_id_sub2").text(car_no);
            $("#agency_name_id_sub0").text(region +" "+  agency_name);
            $("#agency_name_id_sub1").text(region +" "+  agency_name);
            $("#agency_name_id_sub2").text(region +" "+  agency_name);
            $("#end_agency_address_id_sub0").text(end_agency_address);
            $("#end_agency_address_id_sub1").text(end_agency_address);
            $("#end_agency_address_id_sub2").text(end_agency_address);
            
             $("#date_ko_render_sub0").text("출하일자 : "+release_order_date_ko);
             $("#date_ko_render_sub1").text("출하일자 : "+release_order_date_ko);
             $("#date_ko_render_sub2").text("출하일자 : "+release_order_date_ko);

            $("#agency_name_id").text(region +" "+  agency_name);
            $("#agency_name_id_2").text(region +" "+  agency_name);
            $("#end_agency_address_id").text(end_agency_address);
            $("#end_agency_address_id_2").text(end_agency_address);
            $("#end_agency_tel_no_id").text(end_agency_tel_no);
            
            
        },
        error: function (xmlHttpRequest, txtStatus, errorThrown) {
            console.log("erorr")
        }
    });
}

//adding blank row to full of 9 rows
const count_tr_selector = $("#data_tbl tbody tr");

let string = "";

for (let i = 1; i < 11 - count_tr_selector.length; i++) {
  string +=
    `<tr class="rowsrepeat" style="height: 40px;text-align: center;">
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    </tr>`;
}
// const test = $("#data_tbl tbody tr:last-child")
const test = $("#last_tr")
console.log(count_tr_selector.length)
$("#last_tr").before(string);


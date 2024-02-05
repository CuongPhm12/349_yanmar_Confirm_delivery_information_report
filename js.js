$("#release_no_table").hide();
$(".page-break0").hide();
$(".page-break1").hide();
$(".page-break2").hide();
$(".336-print").hide();

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
      const { res, sql, driver, item, list_336, list_last_print_page } =
        response;
      console.log(response);
      if (!list_336[0][0] || !list_336[0][0].ng_type) {
        $("#no_line_1").css({
          "font-weight": "bold",
          "text-decoration": "underline",
        });
        $("#no_line_2").css({
          "font-weight": "bold",
          "text-decoration": "underline",
        });
      } else {
        if (list_336[0][0].ng_type == "성능불량") {
          $("#yes_line_1").css({
            "font-weight": "bold",
            "text-decoration": "underline",
          });
        } else {
          $("#no_line_1").css({
            "font-weight": "bold",
            "text-decoration": "underline",
          });
        }

        if (list_336.length > 0 && list_336[0][0].ng_type == "외관불량") {
          $("#yes_line_2").css({
            "font-weight": "bold",
            "text-decoration": "underline",
          });
        } else {
          $("#no_line_2").css({
            "font-weight": "bold",
            "text-decoration": "underline",
          });
        }

        if (
          list_336[0][0].ng_type == "성능불량" ||
          list_336[0][0].ng_type == "외관불량"
        ) {
          $(".336-print").show();

          let release_ng_no = list_336[0][0].release_ng_no;
          let print_date = list_336[0][0].print_date;
          let ng_area = list_336[0][0].ng_area;
          let invoice_no = list_336[0][0].invoice_no;
          let store_date = list_336[0][0].store_date;
          let carcass_cd = list_336[0][0].carcass_cd;
          let machine_no = list_336[0][0].machine_no;
          let sales_cd_NG = list_336[0][0].sales_cd_NG;
          let built_no = list_336[0][0].built_no;
          let ng_manager = list_336[0][0].ng_manager;
          let engine_no = list_336[0][0].engine_no;
          let ng_type = list_336[0][0].ng_type;
          let ng_reason = list_336[0][0].ng_reason;
          let handle_reason = list_336[0][0].handle_reason;
          let handle_manager = list_336[0][0].handle_manager;
          let handle_date = list_336[0][0].handle_date;

          let ng_files_id = list_336[0][0].ng_files;
          if (ng_files_id != null || ng_files_id != " ") {
            ng_files_id = ng_files_id
              .replace(/SIMBIZPER/g, "%")
              .replace(/SIMBIZSQT/g, "'")
              .replace(/SIMBIZDQT/g, '"')
              .replace(/SIMBIZCOMMA/g, ",")
              .replace(/SIMBIZEQ/g, "=");
          }

          let handle_files_id = list_336[0][0].handle_files;
          if (handle_files_id != null || handle_files_id != " ") {
            handle_files_id = handle_files_id
              .replace(/SIMBIZPER/g, "%")
              .replace(/SIMBIZSQT/g, "'")
              .replace(/SIMBIZDQT/g, '"')
              .replace(/SIMBIZCOMMA/g, ",")
              .replace(/SIMBIZEQ/g, "=");
          }

          // console.log( ng_files_id);
          // console.log(handle_files_id);
          $("#release_ng_no").text("일련번호 : " + release_ng_no);
          $("#print_date").text("출력일 : " + print_date);
          $("#ng_area").text(ng_area);
          $("#invoice_no").text(invoice_no);
          $("#print_date_1").text(print_date);
          $("#store_date").text(store_date);
          $("#carcass_cd").text(carcass_cd);
          $("#machine_no").text(machine_no);
          $("#sales_cd_NG").text(sales_cd_NG);
          $("#built_no").text(built_no);
          $("#ng_manager").text(ng_manager);
          $("#engine_no").text(engine_no);
          $("#ng_type").text(ng_type);
          $("#ng_reason").text(ng_reason);
          $("#handle_reason").text(handle_reason);
          $("#handle_manager").text(handle_manager);
          $("#handle_date").text(handle_date);
          $("#ng_files").text(ng_files_id);
          $("#handle_files").text(handle_files_id);

          $("#result").hide();
          let ng_files = $("#ng_files")[0].innerText;
          // console.log(ng_files)

          let pattern = /newfilename%22%3A%22.{32}\.jpg/g;

          if (ng_files != null || ng_files != " ") {
            let matches = ng_files.match(pattern);

            let resultArray = matches.map((match) =>
              match.replace("newfilename%22%3A%22", "")
            );

            if (resultArray.length != 0) {
              for (let i = 0; i < resultArray.length; i++) {
                let img = "#img" + i;
                let text =
                  `<img style="width: 100%; height: 100%;" src="http://yanmar.simbizkorea.com/file/` +
                  resultArray[i] +
                  `" />`;
                $(img).html(text);
              }
            }
          }

          let handle_files = $("#handle_files")[0].innerText;
          console.log(handle_files);
          if (!handle_files) {
            console.error(
              "handle_files is null or empty. Taking appropriate actions."
            );
          } else {
            let matches_handle = handle_files.match(pattern);
            let resultHandle = matches_handle.map((handle) =>
              handle.replace("newfilename%22%3A%22", "")
            );
            if (resultHandle.length != 0) {
              for (let j = 0; j < resultHandle.length; j++) {
                let img1 = "#himg" + j;
                let text1 =
                  `<img style="width: 100%; height: 100%;" src="http://yanmar.simbizkorea.com/file/` +
                  resultHandle[j] +
                  `" />`;
                $(img1).html(text1);
              }
            }
          }
        }
      }

      let prod_type1 = "";
      let sale_code = "";

      for (let j = 0; j < item.length; j++) {
        let is_completee_detail = "";
        let item_data = item[j];
        if (item_data.length !== 0) {
          $(".page-break" + j).show();

          // }
          let item_name_detail = "";

          for (let o = 0; o < item_data.length; o++) {
            let item_name = item_data[o].option_sales_cd || "";
            let qty = item_data[o].qty || "";
            //   console.log( prod_type1 );
            let newRowDetail = `
                            <tr class="rowsrepeat"  style="height: 40px;text-align: center;">
                            <td style="width: 20px;">${o + 1}</td>
                            <td style="width: 117px;">${item_name}</td>
                            <td style="width: 40px;">개</td>
                            <td style="width: 40px;">${qty}</td>
                            <td style="width: 40px;">${qty}</td>
                            <td style="width: 117px;"></td>
                            </tr>
                       `;
            is_completee_detail += newRowDetail;
            item_name_detail = item_name;
          }

          $("#detail" + j).after(is_completee_detail);
        }
      }
      for (let t = 0; t < res.length; t++) {
        let item_res = res[t];
        let sales_cd = item_res.sales_cd || "";
        let prod_type1 = item_res.prod_type1 || "";
        for (let j = 0; j < item.length; j++) {
          $("#item_name" + j).text("제품명 :" + prod_type1);
          $("#sale_code" + j).text("형식명 :" + sales_cd);
        }
      }

      // }

      let total = 0;
      var is_completee = "";
      var is_completee_last_page = "";
      let delv_comp_name = driver.cust_name || "";
      let delv_comp_phone = driver.tel_no || "";
      let delv_comp_addr = driver.address || "";
      let ceo_name = driver.ceo_name || "";

      // $("#rowspan_id").attr("rowspan",res.length+3);//rowspan depends rows add
      $("#rowspan_id").attr("rowspan", res.length + 4); //rowspan depends rows add
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
        let prod_type1 = item.prod_type1 || "";
        //   option_1 = option_1 == "Y" ? "X" : "";

        let newRow = `
              <tr class="rowsrepeat"  style="height: 40px;text-align: center;">
                      <td style="width: 129px;  text-align: center">${prod_type1}</td>
                      <td style="width: 319.219px;"><span class="sales_cd">${sales_cd}</span></td>
                      <td style="width: 62.7812px;"><span class="spec"></span></td>
                      <td style="width: 37px; "><span class="release_qty">${release_qty}</span></td>
                      <td style="width: 89px; "><span class="machine_no">${machine_no}</span></td>
                      <td style="width: 72px; "><span class="built_no">${built_no}</span></td>
                      <td style="width: 73px; "><span class="plate_no3">${plate_no3}</span></td>
                      <td style="width: 40px; "><span class="option_1">${option_1}</span></td>
                </tr>
                `;

        is_completee += newRow;
      }
      console.log(list_last_print_page[0].length);
      for (let k = 0; k < list_last_print_page[0].length; k++) {
        let item = list_last_print_page[0][k];

        let check_title = item.check_title || "";
        let check_item = item.check_item || "";
        let content = item.content || "";

        let newRow = `
              <tr class="rowsrepeat"  style="height: 40px;">
                    <td style="width: 57.775px; height: 35px; text-align: center;">${check_title}</td>
                    <td style="width: 198.288px; height: 35px;">${check_item}</td>
                    <td style="width: 505.95px; height: 35px;">${content}</td>
                    <td style="width: 122.162px; height: 35px; text-align: center;">합, 부</td>
                    <td style="width: 101.625px; height: 35px;"> </td>
                </tr>
                `;

        is_completee_last_page += newRow;
      }

      //   console.log(is_completee_last_page)

      $("#tr_lv2").after(is_completee);
      $("#tr_lv2_last_page").after(is_completee_last_page);

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
        "<span>대리점 주문시 요청사항: " +
          agency_remark +
          "</span><br>" +
          "<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;YNK 출하시 의뢰사항: " +
          ynk_remark +
          "</span>"
      );

      $("#driver_name_id_sub0").text("운전자명 : " + driver_name);
      $("#driver_name_id_sub1").text("운전자명 : " + driver_name);
      $("#driver_name_id_sub2").text("운전자명 : " + driver_name);
      $("#car_no_id_sub0").text(car_no);
      $("#car_no_id_sub1").text(car_no);
      $("#car_no_id_sub2").text(car_no);
      $("#agency_name_id_sub0").text(region + " " + agency_name);
      $("#agency_name_id_sub1").text(region + " " + agency_name);
      $("#agency_name_id_sub2").text(region + " " + agency_name);
      $("#end_agency_address_id_sub0").text(end_agency_address);
      $("#end_agency_address_id_sub1").text(end_agency_address);
      $("#end_agency_address_id_sub2").text(end_agency_address);

      $("#date_ko_render_sub0").text("출하일자 : " + release_order_date_ko);
      $("#date_ko_render_sub1").text("출하일자 : " + release_order_date_ko);
      $("#date_ko_render_sub2").text("출하일자 : " + release_order_date_ko);

      //  $("#item_name0").text("제품명 : "+release_order_date_ko);
      //  $("#item_name1").text("제품명 : "+release_order_date_ko);
      //  $("#item_name2").text("제품명 : "+release_order_date_ko);

      $("#agency_name_id").text(region + " " + agency_name);
      $("#agency_name_id_2").text(region + " " + agency_name);
      $("#end_agency_address_id").text(end_agency_address);
      $("#end_agency_address_id_2").text(end_agency_address);
      $("#end_agency_tel_no_id").text(end_agency_tel_no);
    },
    error: function (xmlHttpRequest, txtStatus, errorThrown) {
      console.log("erorr");
    },
  });
}

//adding blank row to full of 9 rows
const count_tr_selector = $("#data_tbl tbody tr");

let string = "";

for (let i = 1; i < 11 - count_tr_selector.length; i++) {
  string += `<tr class="rowsrepeat" style="height: 40px;text-align: center;">
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
const test = $("#last_tr");
// console.log(count_tr_selector.length)
$("#last_tr").before(string);

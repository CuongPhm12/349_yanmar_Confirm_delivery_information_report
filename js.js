$("#release_no_table").hide();
$(".page-break0").hide();
$(".page-break1").hide();
$(".page-break2").hide();
$(".336-print0").hide();
$(".336-print1").hide();
$(".336-print2").hide();
$(".last_page0").hide();
$(".last_page1").hide();
$(".last_page2").hide();
$("#data_tbl").parent().parent().css({ width: "fit-content" });

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
  let agency_order_no = $("#agency_order_no_id").text().trim();
  let item_cd = $("#item_cd_id").text().trim();
  let currentYear = new Date().getFullYear();

  // console.log(load_finish_date)
  const data_Send = {};
  data_Send.menucode = "M000000349";
  data_Send.type = "get_data";
  data_Send.header = JSON.stringify({ releaseNo: releaseNo, item_cd: item_cd });
  $.ajax({
    type: "post",
    dataType: "JSON",
    url: "/ajax.do",
    data: data_Send,
    async: false,
    success: function (response, status, request) {
      const { res, sql, driver, item, list_336, list_last_print_page, date } =
        response;
      console.log(response);

      let date_on_top = date[0].date_on_top;
      console.log(date_on_top);
      if (list_336[0].length == 0) {
        $("#no_line_1").css({
          "font-weight": "bold",
          "text-decoration": "underline",
        });
        $("#no_line_2").css({
          "font-weight": "bold",
          "text-decoration": "underline",
        });
      }
      //   console.log(date_on_top);
      for (let a = 0; a < list_336.length; a++) {
        for (let b = 0; b < list_336[a].length; b++) {
          if (!list_336[a][b] || !list_336[a][b].ng_type) {
            $("#no_line_1").css({
              "font-weight": "bold",
              "text-decoration": "underline",
            });
            $("#no_line_2").css({
              "font-weight": "bold",
              "text-decoration": "underline",
            });
          } else {
            if (list_336[a][b].ng_type == "성능불량") {
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

            if (list_336.length > 0 && list_336[a][b].ng_type == "외관불량") {
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
              list_336[a][b].ng_type == "성능불량" ||
              list_336[a][b].ng_type == "외관불량"
            ) {
              $(".336-print" + a).show();
            }

            let release_ng_no = list_336[a][b].release_ng_no;
            let print_date = list_336[a][b].print_date;
            let ng_area = list_336[a][b].ng_area;
            let invoice_no = list_336[a][b].invoice_no;
            let store_date = list_336[a][b].store_date;
            let carcass_cd = list_336[a][b].carcass_cd;
            let machine_no = list_336[a][b].machine_no;
            let sales_cd_NG = list_336[a][b].sales_cd_NG;
            let built_no = list_336[a][b].built_no;
            let ng_manager = list_336[a][b].ng_manager;
            let engine_no = list_336[a][b].engine_no;
            let ng_type = list_336[a][b].ng_type;
            let ng_reason = list_336[a][b].ng_reason;
            let handle_reason = list_336[a][b].handle_reason;
            let handle_manager = list_336[a][b].handle_manager;
            let handle_date = list_336[a][b].handle_date;

            let ng_files_id = list_336[a][b].ng_files;
            if (ng_files_id != null || ng_files_id != " ") {
              ng_files_id = ng_files_id
                .replace(/SIMBIZPER/g, "%")
                .replace(/SIMBIZSQT/g, "'")
                .replace(/SIMBIZDQT/g, '"')
                .replace(/SIMBIZCOMMA/g, ",")
                .replace(/SIMBIZEQ/g, "=");
            }

            let handle_files_id = list_336[a][b].handle_files;
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
            $("#release_ng_no" + a).text("일련번호 : " + release_ng_no);
            $("#print_date" + a).text("출력일 : " + print_date);
            $("#ng_area" + a).text(ng_area);
            $("#invoice_no" + a).text(invoice_no);
            $("#print_date_1" + a).text(print_date);
            $("#store_date" + a).text(store_date);
            $("#carcass_cd" + a).text(carcass_cd);
            $("#machine_no" + a).text(machine_no);
            $("#sales_cd_NG" + a).text(sales_cd_NG);
            $("#built_no" + a).text(built_no);
            $("#ng_manager" + a).text(ng_manager);
            $("#engine_no" + a).text(engine_no);
            $("#ng_type" + a).text(ng_type);
            $("#ng_reason" + a).text(ng_reason);
            $("#handle_reason" + a).text(handle_reason);
            $("#handle_manager" + a).text(handle_manager);
            $("#handle_date" + a).text(handle_date);
            $("#ng_files" + a).text(ng_files_id);
            $("#handle_files" + a).text(handle_files_id);

            $("#result" + a).hide();
            let ng_files = $("#ng_files" + a)[0].innerText;
            // console.log(ng_files)

            let pattern = /newfilename%22%3A%22.{32}\.jpg/g;

            if (ng_files != null || ng_files != " ") {
              let matches = ng_files.match(pattern);

              let resultArray = matches.map((match) =>
                match.replace("newfilename%22%3A%22", "")
              );

              if (resultArray.length != 0) {
                for (let i = 0; i < resultArray.length; i++) {
                  let img = "#img" + i + a;
                  let text =
                    `<img style="width: 100%; height: 100%;" src="http://yanmar.simbizkorea.com/file/` +
                    resultArray[i] +
                    `" />`;
                  $(img).html(text);
                }
              }

              let handle_files = $("#handle_files" + a)[0].innerText;
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
                    let img1 = "#himg" + j + a;
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
          //   if (!list_336[0][0] || !list_336[0][0].ng_type) {
          //     $("#no_line_1").css({
          //       "font-weight": "bold",
          //       "text-decoration": "underline",
          //     });
          //     $("#no_line_2").css({
          //       "font-weight": "bold",
          //       "text-decoration": "underline",
          //     });
          //   } else {
          //     if (list_336[0][0].ng_type == "성능불량") {
          //       $("#yes_line_1").css({
          //         "font-weight": "bold",
          //         "text-decoration": "underline",
          //       });
          //     } else {
          //       $("#no_line_1").css({
          //         "font-weight": "bold",
          //         "text-decoration": "underline",
          //       });
          //     }

          //     if (list_336.length > 0 && list_336[0][0].ng_type == "외관불량") {
          //       $("#yes_line_2").css({
          //         "font-weight": "bold",
          //         "text-decoration": "underline",
          //       });
          //     } else {
          //       $("#no_line_2").css({
          //         "font-weight": "bold",
          //         "text-decoration": "underline",
          //       });
          //     }

          //     if (
          //       list_336[0][0].ng_type == "성능불량" ||
          //       list_336[0][0].ng_type == "외관불량"
          //     ) {
          //       $(".336-print").show();

          //   let release_ng_no = list_336[0][0].release_ng_no;
          //   let print_date = list_336[0][0].print_date;
          //   let ng_area = list_336[0][0].ng_area;
          //   let invoice_no = list_336[0][0].invoice_no;
          //   let store_date = list_336[0][0].store_date;
          //   let carcass_cd = list_336[0][0].carcass_cd;
          //   let machine_no = list_336[0][0].machine_no;
          //   let sales_cd_NG = list_336[0][0].sales_cd_NG;
          //   let built_no = list_336[0][0].built_no;
          //   let ng_manager = list_336[0][0].ng_manager;
          //   let engine_no = list_336[0][0].engine_no;
          //   let ng_type = list_336[0][0].ng_type;
          //   let ng_reason = list_336[0][0].ng_reason;
          //   let handle_reason = list_336[0][0].handle_reason;
          //   let handle_manager = list_336[0][0].handle_manager;
          //   let handle_date = list_336[0][0].handle_date;

          //   let ng_files_id = list_336[0][0].ng_files;
          //   if (ng_files_id != null || ng_files_id != " ") {
          //     ng_files_id = ng_files_id
          //       .replace(/SIMBIZPER/g, "%")
          //       .replace(/SIMBIZSQT/g, "'")
          //       .replace(/SIMBIZDQT/g, '"')
          //       .replace(/SIMBIZCOMMA/g, ",")
          //       .replace(/SIMBIZEQ/g, "=");
          //   }

          //   let handle_files_id = list_336[0][0].handle_files;
          //   if (handle_files_id != null || handle_files_id != " ") {
          //     handle_files_id = handle_files_id
          //       .replace(/SIMBIZPER/g, "%")
          //       .replace(/SIMBIZSQT/g, "'")
          //       .replace(/SIMBIZDQT/g, '"')
          //       .replace(/SIMBIZCOMMA/g, ",")
          //       .replace(/SIMBIZEQ/g, "=");
          //   }

          //   // console.log( ng_files_id);
          //   // console.log(handle_files_id);
          //   $("#release_ng_no").text("일련번호 : " + release_ng_no);
          //   $("#print_date").text("출력일 : " + print_date);
          //   $("#ng_area").text(ng_area);
          //   $("#invoice_no").text(invoice_no);
          //   $("#print_date_1").text(print_date);
          //   $("#store_date").text(store_date);
          //   $("#carcass_cd").text(carcass_cd);
          //   $("#machine_no").text(machine_no);
          //   $("#sales_cd_NG").text(sales_cd_NG);
          //   $("#built_no").text(built_no);
          //   $("#ng_manager").text(ng_manager);
          //   $("#engine_no").text(engine_no);
          //   $("#ng_type").text(ng_type);
          //   $("#ng_reason").text(ng_reason);
          //   $("#handle_reason").text(handle_reason);
          //   $("#handle_manager").text(handle_manager);
          //   $("#handle_date").text(handle_date);
          //   $("#ng_files").text(ng_files_id);
          //   $("#handle_files").text(handle_files_id);

          //   $("#result").hide();
          //   let ng_files = $("#ng_files")[0].innerText;
          //   // console.log(ng_files)

          //   let pattern = /newfilename%22%3A%22.{32}\.jpg/g;

          //   if (ng_files != null || ng_files != " ") {
          //     let matches = ng_files.match(pattern);

          //     let resultArray = matches.map((match) =>
          //       match.replace("newfilename%22%3A%22", "")
          //     );

          //     if (resultArray.length != 0) {
          //       for (let i = 0; i < resultArray.length; i++) {
          //         let img = "#img" + i;
          //         let text =
          //           `<img style="width: 100%; height: 100%;" src="http://yanmar.simbizkorea.com/file/` +
          //           resultArray[i] +
          //           `" />`;
          //         $(img).html(text);
          //       }
          //     }
          //   }

          //   let handle_files = $("#handle_files")[0].innerText;
          //   console.log(handle_files);
          //   if (!handle_files) {
          //     console.error(
          //       "handle_files is null or empty. Taking appropriate actions."
          //     );
          //   } else {
          //     let matches_handle = handle_files.match(pattern);
          //     let resultHandle = matches_handle.map((handle) =>
          //       handle.replace("newfilename%22%3A%22", "")
          //     );
          //     if (resultHandle.length != 0) {
          //       for (let j = 0; j < resultHandle.length; j++) {
          //         let img1 = "#himg" + j;
          //         let text1 =
          //           `<img style="width: 100%; height: 100%;" src="http://yanmar.simbizkorea.com/file/` +
          //           resultHandle[j] +
          //           `" />`;
          //         $(img1).html(text1);
          //       }
          //     }
          //   }
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
            let item_name = item_data[o].item_name || "";
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
          $("#item_name" + j)
            .text("제품명: " + prod_type1)
            .css({ "font-weight": "bold", "font-size": "15px" });
          $("#sale_code" + j)
            .text("형식명: " + sales_cd)
            .css({ "font-weight": "bold", "font-size": "15px" });
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
                      <td style="width: 120px;  text-align: center">${prod_type1}</td>
                      <td style="width: 380px;"><span class="sales_cd">${sales_cd}</span></td>
                      <td style="width: 40px;text-align: right;padding-right:10px "><span class="release_qty">${release_qty}</span></td>
                      <td style="width: 89px; "><span class="machine_no">${machine_no}</span></td>
                      <td style="width: 72px; "><span class="built_no">${built_no}</span></td>
                      <td style="width: 73px; "><span class="plate_no3">${plate_no3}</span></td>
                      <td style="width: 40px; "><span class="option_1">${option_1}</span></td>
                </tr>
                `;

        is_completee += newRow;
      }
      let count_one = 0;
      let count_two = 0;

      for (let k = 0; k < list_last_print_page.length; k++) {
        for (let l = 0; l < list_last_print_page[k].length; l++) {
          if (list_last_print_page[k].length > 0) {
            $(".last_page" + k).show();
            let item = list_last_print_page[k][l];

            let check_title = item.check_title || "";
            // console.log(check_title)
            if (check_title == "외관") {
              count_one++;
            } else {
              count_two++;
            }
            let check_item = item.check_item || "";
            let content = item.content || "";

            let newRow = `
                                  <tr class="rowsrepeat"  style="height: 40px;">
                                        <td style="width: 57.775px; height: 35px; text-align: center;">${check_title}</td>
                                        <td style="width: 198.288px; height: 35px;padding-left: 8px;">${check_item}</td>
                                        <td style="width: 505.95px; height: 35px;padding-left: 8px;">${content}</td>
                                        <td style="width: 122.162px; height: 35px; text-align: center;">합,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;부</td>
                                        <td style="width: 101.625px; height: 35px;"> </td>
                                    </tr>
                                    `;

            is_completee_last_page += newRow;
          }
        }
        $("#tr_lv2_last_page" + k).after(is_completee_last_page);
      }

      //   console.log(count_one, count_two)

      for (let i = 0; i < res.length; i++) {
        let item = res[i];
        let prod_type1_extra = item.prod_type1 || "";
        let sales_cd_extra = item.sales_cd || "";
        let machine_no_extra = item.machine_no || "";
        for (let j = 0; j < list_last_print_page.length; j++) {
          $("#prod_type1_last_page" + j)
            .text(prod_type1_extra + " 하차(입고)검사 기준서")
            .css({ "font-weight": "bold" });
          $("#sales_cd_last_page" + j).text("※모델: " + sales_cd_extra);
          $("#machine_no_last_page" + j).text(
            "(기대번호: " + machine_no_extra + ")"
          );
          $("#region_agency_last_page" + j).text(
            "[" + region + " " + agency_name + " 대리점 ]"
          );
        }
      }

      $("#tr_lv2").after(is_completee);
      //   $("#tr_lv2_last_page0").after(is_completee_last_page);

      $("#release_no_id").text(agency_order_no + "(" + releaseNo + ")");
      $("#date_ko_render").text(release_order_date_ko);
      $("#delv_comp_name_id").text(delv_comp_name);
      $("#delv_comp_name_id_2").text(delv_comp_name);
      $("#delv_comp_phone_id").text(delv_comp_phone);
      $("#delv_comp_addr_id")
        .text(delv_comp_addr)
        .css({ "padding-left": "10px" });
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

      $("#driver_name_id_sub0").text("운전자명:  " + driver_name);
      $("#driver_name_id_sub1").text("운전자명:  " + driver_name);
      $("#driver_name_id_sub2").text("운전자명:  " + driver_name);
      $("#car_no_id_sub0").text(car_no);
      $("#car_no_id_sub1").text(car_no);
      $("#car_no_id_sub2").text(car_no);
      $("#agency_name_id_sub0")
        .text(region + " " + agency_name)
        .css({ "padding-left": "10px" });
      $("#agency_name_id_sub1")
        .text(region + " " + agency_name)
        .css({ "padding-left": "10px" });
      $("#agency_name_id_sub2")
        .text(region + " " + agency_name)
        .css({ "padding-left": "10px" });
      $("#end_agency_address_id_sub0")
        .text(end_agency_address)
        .css({ "padding-left": "10px" });
      $("#end_agency_address_id_sub1")
        .text(end_agency_address)
        .css({ "padding-left": "10px" });
      $("#end_agency_address_id_sub2")
        .text(end_agency_address)
        .css({ "padding-left": "10px" });

      $("#date_ko_render_sub0")
        .text("출하일자 : " + release_order_date_ko)
        .css({ "font-weight": "bold", "font-size": "15px" });
      $("#date_ko_render_sub1")
        .text("출하일자 : " + release_order_date_ko)
        .css({ "font-weight": "bold", "font-size": "15px" });
      $("#date_ko_render_sub2")
        .text("출하일자 : " + release_order_date_ko)
        .css({ "font-weight": "bold", "font-size": "15px" });

      $("#date_text0").text(
        "※아래 부대품 지급내역은 " + date_on_top + " 기준입니다 "
      );
      $("#date_text1").text(
        "※아래 부대품 지급내역은 " + date_on_top + " 기준입니다 "
      );
      $("#date_text2").text(
        "※아래 부대품 지급내역은 " + date_on_top + " 기준입니다 "
      );

      $("#fix_date0")
        .text(currentYear + " 년................월.................일")
        .css({ "font-weight": "bold" });
      $("#fix_date1")
        .text(currentYear + " 년................월.................일")
        .css({ "font-weight": "bold" });
      $("#fix_date2")
        .text(currentYear + " 년................월.................일")
        .css({ "font-weight": "bold" });

      $("#date_ko_render_bottom0")
        .text("출하일자: " + release_order_date_ko)
        .css({ "text-align": "right" });
      $("#date_ko_render_bottom1")
        .text("출하일자: " + release_order_date_ko)
        .css({ "text-align": "right" });
      $("#date_ko_render_bottom2")
        .text("출하일자: " + release_order_date_ko)
        .css({ "text-align": "right" });

      //  $("#item_name0").text("제품명 : "+release_order_date_ko);
      //  $("#item_name1").text("제품명 : "+release_order_date_ko);
      //  $("#item_name2").text("제품명 : "+release_order_date_ko);

      $("#agency_name_id").text(region + " " + agency_name);
      $("#agency_name_id_2").text(region + " " + agency_name);
      $("#end_agency_address_id").text(end_agency_address);
      $("#end_agency_address_id_2").text(end_agency_address);
      $("#end_agency_tel_no_id").text(end_agency_tel_no);

      //adding blank row to full of 9 rows
      for (let j = 0; j < item.length; j++) {
        const count_tr_selector_423 = $("#row_add_423-" + j + " tbody tr");
        console.log(count_tr_selector_423.length);
        let string_423 = "";

        for (let i = 1; i < 22 - count_tr_selector_423.length; i++) {
          string_423 += `<tr style="height: 40px;">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>`;
        }
        // const test = $("#data_tbl tbody tr:last-child")
        // const test = $("#last_tr");
        // console.log(count_tr_selector.length)
        // console.log(string_423)
        $("#row_add_423-" + j + " tbody tr:last-child").after(string_423);
        string_423 = "";
      }
    },
    error: function (xmlHttpRequest, txtStatus, errorThrown) {
      console.log("erorr");
    },
  });
}

//adding blank row to full of 9 rows
const count_tr_selector = $("#data_tbl tbody tr");

let string = "";

for (let i = 1; i < 10 - count_tr_selector.length; i++) {
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
// const test = $("#last_tr");
// console.log(count_tr_selector.length)
$("#last_tr").before(string);

//rowspan
$(document).ready(function () {
  // Loop through each row with class "rowsrepeat"
  $(".rowsrepeat").each(function (index) {
    // Get the text content of the first td element within the current row
    var currentText = $(this).find("td:first").text();
    // If the currentText matches "외관" or "기타"
    if (currentText === "외관" || currentText === "기타") {
      // Get the number of rowspans needed
      var rowspan = $(".rowsrepeat").filter(function () {
        return $(this).find("td:first").text() === currentText;
      }).length;
      // If it's the first row with the value "외관" or "기타", set the rowspan
      if (
        index === 0 ||
        $(this).prev().find("td:first").text() !== currentText
      ) {
        $(this).find("td:first").attr("rowspan", rowspan);
      } else {
        // If not, hide the current td element
        $(this).find("td:first").hide();
      }
    }
  });
});

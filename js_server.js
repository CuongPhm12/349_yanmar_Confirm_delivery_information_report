$("#del_btn").hide();
$("#header-addrow").hide();
$("#header-delrow").hide();
$("#cust_btn1").hide();
$("#excelupload").hide();

$(`#${itmobj1["from_ser"]}`).val(moment().format("YYYY-MM-01"));
$(`#${itmobj1["to_ser"]}`).val(moment().format("YYYY-MM-DD"));

//handle filter
setAllDefaultValue([itmobj1["from_ser"], itmobj1["to_ser"]]);
$("#search_btn").on("click", function () {
  //from date, to date
  const date_obj = {
    from_ser: $(`#${itmobj1["from_ser"]}`).val(),
    to_ser: $(`#${itmobj1["to_ser"]}`).val(),
  };
  $("#DUMMY15").val(JSON.stringify(date_obj));
});

grid1.on("check uncheck", function () {
  if ($("#DUMMY15").val()) {
    date_obj = JSON.parse($("#DUMMY15").val());
    $(`#${itmobj1["from_ser"]}`).val(date_obj["from_ser"]);
    $(`#${itmobj1["to_ser"]}`).val(date_obj["to_ser"]);
  }
});

$("#search_btn").trigger("click");

$("#cust_btn4").on("click", function (event) {
  const selectedRow = grid1.getCheckedRows();

  if (selectedRow.length === 1) {
    // if (selectedRow[itmobj1["load_finish_date"]] == null) {
    //   msg("아직 상차확정이 완료되지 않았습니다.");
    //   return;
    // }
    $("#print_btn").trigger("click");
  } else if (selectedRow.length >= 2) {
    const releaseNo = selectedRow[0][itmobj1["release_no"]];

    for (let i = 1; i < selectedRow.length; i++) {
      if (selectedRow[i][itmobj1["release_no"]] !== releaseNo) {
        msg("두 번의 운송을 선택할 수 없습니다.");
        return;
      }
      //   if (selectedRow[itmobj1[i]["load_finish_date"]] == null) {
      //     msg("아직 상차확정이 완료되지 않았습니다.");
      //     return;
      //   }
    }

    $("#print_btn").trigger("click");
  }
  if ($("#msgconfirm").is(":visible")) {
    $("#msgconfirm").dialog("destroy");
  }
});

// grid1.on("check uncheck", function() {
//     setTimeout(function() {
//         let check = true;
//         const checked = grid1.getCheckedRows();
//         if (checked.length == 1) {
//             check = false
//         } else {
//             for (let i = 0; i < checked.length; i++) {
//                 if (nvl(checked[i][itmobj1["load_type"]],"") == "" || nvl(checked[i][itmobj1["driver_name"]],"") == "" || nvl(checked[i][itmobj1["driver_tel_no"]],"") == "" || nvl(checked[i][itmobj1["car_no"]],"") == "") {
//                     check = false;
//                 }
//             }
//         }
//         if (check) {
//              $("#cust_btn4").hide()
//         } else {
//             $("#cust_btn4").show()
//         }
//     }, 100);
// })

grid1.on("check", function (event) {
  const value = grid1.getRow(event.rowKey);
  if (value[itmobj1["release_no"]]) {
    const rows = grid1.getRows();
    for (let i = 0; i < rows.length; i++) {
      if (rows[i][itmobj1["release_no"]] == value[itmobj1["release_no"]])
        grid1.check(i);
    }
  }
});

grid1.on("uncheck", function (event) {
  const value = grid1.getRow(event.rowKey);
  if (value[itmobj1["release_no"]]) {
    const rows = grid1.getRows();
    for (let i = 0; i < rows.length; i++) {
      if (rows[i][itmobj1["release_no"]] == value[itmobj1["release_no"]])
        grid1.uncheck(i);
    }
  }
});

$("#reset_btn").on("click", function () {
  $(`#${itmobj1["from_ser"]}`).val(moment().format("YYYY-MM-01"));
  $(`#${itmobj1["to_ser"]}`).val(moment().format("YYYY-MM-DD"));
  $("#DUMMY1").val("");
  $("#DUMMY2").val("");
  $("#DUMMY3").val("");
  $("#DUMMY4").val("");
  $("#DUMMY5").val("");
  $("#DUMMY6").val("");
});

grid1.on("dblclick", function (event) {
  if (
    event.columnName == itmobj1["carcass_cd"] ||
    event.columnName == itmobj1["sales_cd"] ||
    event.columnName == itmobj1["machine_no"] ||
    event.columnName == itmobj1["built_no"] ||
    event.columnName == itmobj1["engine_no"] ||
    event.columnName == itmobj1["name_plate"] ||
    event.columnName == itmobj1["approval_no"]
  ) {
    const rowKey = event.rowKey;
    if (nvl(rowKey + "", "") != "") {
      grid1.check(event.rowKey);
      $("#cust_btn2").trigger("click");
    }
  }
});

$("#cust_btn2").on("click", function () {
  var gd1 = grid1.getCheckedRows();
  if (gd1.length == 1) {
    $("#DUMMY1").val(gd1[0][itmobj1["item_cd"]]);
    $("#DUMMY2").val(gd1[0][itmobj1["machine_no"]]);
    $("#DUMMY3").val(gd1[0][itmobj1["built_no"]]);
    $("#DUMMY4").val(gd1[0][itmobj1["engine_no"]]);
    $("#DUMMY5").val(gd1[0][itmobj1["name_plate"]]);
    $("#DUMMY6").val(gd1[0][itmobj1["approval_no"]]);
  }
});

$(window).on("resize", function () {
  var height =
    $(".right-content").height() -
    ($(".ui-widget-header").height() + $(".editer-content1").height() + 100);
  grid1.setHeight(height);
});

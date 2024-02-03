var height =
  $(".right-content").height() -
  ($(".ui-widget-header").height() + $(".editer-content1").height() + 100);
grid1.setHeight(height);

const release_nos = grid1.getColumnValues(itmobj1["release_no"]);
for (let i = 0; i < release_nos.length; i++) {
  if (release_nos[i] == "소계" || release_nos[i] == "합계") {
    grid1.addRowClassName(i, "sub_total_grid");
  }
}

const rows = grid1.getRows();
if (rows.length > 0 && rows[rows.length - 1][itmobj1["release_no"]] == "합계")
  grid1.removeRow(rows.length - 1);

//rowspan
let agency_name;
let wh_nm;
let release_no;
let end_agency_address;
let region;
let address_detail;
let load_type;
let driver_name;
let driver_tel_no;
let car_no;
let load_finish_date;
let date_ko;
let release_no_text = "";
let release_no_span = 1;
$(
  `#grid1 .tui-grid-rside-area td[data-column-name="${itmobj1["agency_name"]}"]`
).each(function (index) {
  if (index == 0) {
    agency_name = $(this);
    wh_nm = $(
      `#grid1 .tui-grid-rside-area td[data-column-name="${
        itmobj1["wh_nm"]
      }"][data-row-key="${$(this).attr("data-row-key")}"]`
    ).first();
    release_no = $(
      `#grid1 .tui-grid-rside-area td[data-column-name="${
        itmobj1["release_no"]
      }"][data-row-key="${$(this).attr("data-row-key")}"]`
    ).first();
    end_agency_address = $(
      `#grid1 .tui-grid-rside-area td[data-column-name="${
        itmobj1["end_agency_address"]
      }"][data-row-key="${$(this).attr("data-row-key")}"]`
    ).first();
    region = $(
      `#grid1 .tui-grid-rside-area td[data-column-name="${
        itmobj1["region"]
      }"][data-row-key="${$(this).attr("data-row-key")}"]`
    ).first();
    address_detail = $(
      `#grid1 .tui-grid-rside-area td[data-column-name="${
        itmobj1["address_detail"]
      }"][data-row-key="${$(this).attr("data-row-key")}"]`
    ).first();
    load_type = $(
      `#grid1 .tui-grid-rside-area td[data-column-name="${
        itmobj1["load_type"]
      }"][data-row-key="${$(this).attr("data-row-key")}"]`
    ).first();
    driver_name = $(
      `#grid1 .tui-grid-rside-area td[data-column-name="${
        itmobj1["driver_name"]
      }"][data-row-key="${$(this).attr("data-row-key")}"]`
    ).first();
    driver_tel_no = $(
      `#grid1 .tui-grid-rside-area td[data-column-name="${
        itmobj1["driver_tel_no"]
      }"][data-row-key="${$(this).attr("data-row-key")}"]`
    ).first();
    car_no = $(
      `#grid1 .tui-grid-rside-area td[data-column-name="${
        itmobj1["car_no"]
      }"][data-row-key="${$(this).attr("data-row-key")}"]`
    ).first();
    load_finish_date = $(
      `#grid1 .tui-grid-rside-area td[data-column-name="${
        itmobj1["load_finish_date"]
      }"][data-row-key="${$(this).attr("data-row-key")}"]`
    ).first();
    date_ko = $(
      `#grid1 .tui-grid-rside-area td[data-column-name="${
        itmobj1["release_order_date_ko"]
      }"][data-row-key="${$(this).attr("data-row-key")}"]`
    ).first();
    release_no_text = grid1.getValue(
      $(this).attr("data-row-key"),
      itmobj1["release_no"]
    );
  } else {
    if (
      release_no_text !=
      grid1.getValue($(this).attr("data-row-key"), itmobj1["release_no"])
    ) {
      agency_name.attr("rowspan", release_no_span);
      wh_nm.attr("rowspan", release_no_span);
      release_no.attr("rowspan", release_no_span);
      end_agency_address.attr("rowspan", release_no_span);
      region.attr("rowspan", release_no_span);
      address_detail.attr("rowspan", release_no_span);
      load_type.attr("rowspan", release_no_span);
      driver_name.attr("rowspan", release_no_span);
      driver_tel_no.attr("rowspan", release_no_span);
      car_no.attr("rowspan", release_no_span);
      load_finish_date.attr("rowspan", release_no_span);
      date_ko.attr("rowspan", release_no_span);
      agency_name = $(this);
      wh_nm = $(
        `#grid1 .tui-grid-rside-area td[data-column-name="${
          itmobj1["wh_nm"]
        }"][data-row-key="${$(this).attr("data-row-key")}"]`
      ).first();
      release_no = $(
        `#grid1 .tui-grid-rside-area td[data-column-name="${
          itmobj1["release_no"]
        }"][data-row-key="${$(this).attr("data-row-key")}"]`
      ).first();
      end_agency_address = $(
        `#grid1 .tui-grid-rside-area td[data-column-name="${
          itmobj1["end_agency_address"]
        }"][data-row-key="${$(this).attr("data-row-key")}"]`
      ).first();
      region = $(
        `#grid1 .tui-grid-rside-area td[data-column-name="${
          itmobj1["region"]
        }"][data-row-key="${$(this).attr("data-row-key")}"]`
      ).first();
      address_detail = $(
        `#grid1 .tui-grid-rside-area td[data-column-name="${
          itmobj1["address_detail"]
        }"][data-row-key="${$(this).attr("data-row-key")}"]`
      ).first();
      load_type = $(
        `#grid1 .tui-grid-rside-area td[data-column-name="${
          itmobj1["load_type"]
        }"][data-row-key="${$(this).attr("data-row-key")}"]`
      ).first();
      driver_name = $(
        `#grid1 .tui-grid-rside-area td[data-column-name="${
          itmobj1["driver_name"]
        }"][data-row-key="${$(this).attr("data-row-key")}"]`
      ).first();
      driver_tel_no = $(
        `#grid1 .tui-grid-rside-area td[data-column-name="${
          itmobj1["driver_tel_no"]
        }"][data-row-key="${$(this).attr("data-row-key")}"]`
      ).first();
      car_no = $(
        `#grid1 .tui-grid-rside-area td[data-column-name="${
          itmobj1["car_no"]
        }"][data-row-key="${$(this).attr("data-row-key")}"]`
      ).first();
      load_finish_date = $(
        `#grid1 .tui-grid-rside-area td[data-column-name="${
          itmobj1["load_finish_date"]
        }"][data-row-key="${$(this).attr("data-row-key")}"]`
      ).first();
      date_ko = $(
        `#grid1 .tui-grid-rside-area td[data-column-name="${
          itmobj1["release_order_date_ko"]
        }"][data-row-key="${$(this).attr("data-row-key")}"]`
      ).first();
      release_no_text = grid1.getValue(
        $(this).attr("data-row-key"),
        itmobj1["release_no"]
      );
      release_no_span = 1;
    } else {
      release_no_span += 1;
      $(
        `#grid1 .tui-grid-rside-area td[data-column-name="${
          itmobj1["wh_nm"]
        }"][data-row-key="${$(this).attr("data-row-key")}"]`
      )
        .first()
        .remove();
      $(
        `#grid1 .tui-grid-rside-area td[data-column-name="${
          itmobj1["release_no"]
        }"][data-row-key="${$(this).attr("data-row-key")}"]`
      )
        .first()
        .remove();
      $(
        `#grid1 .tui-grid-rside-area td[data-column-name="${
          itmobj1["end_agency_address"]
        }"][data-row-key="${$(this).attr("data-row-key")}"]`
      )
        .first()
        .remove();
      $(
        `#grid1 .tui-grid-rside-area td[data-column-name="${
          itmobj1["region"]
        }"][data-row-key="${$(this).attr("data-row-key")}"]`
      )
        .first()
        .remove();
      $(
        `#grid1 .tui-grid-rside-area td[data-column-name="${
          itmobj1["address_detail"]
        }"][data-row-key="${$(this).attr("data-row-key")}"]`
      )
        .first()
        .remove();
      $(
        `#grid1 .tui-grid-rside-area td[data-column-name="${
          itmobj1["load_type"]
        }"][data-row-key="${$(this).attr("data-row-key")}"]`
      )
        .first()
        .remove();
      $(
        `#grid1 .tui-grid-rside-area td[data-column-name="${
          itmobj1["driver_name"]
        }"][data-row-key="${$(this).attr("data-row-key")}"]`
      )
        .first()
        .remove();
      $(
        `#grid1 .tui-grid-rside-area td[data-column-name="${
          itmobj1["driver_tel_no"]
        }"][data-row-key="${$(this).attr("data-row-key")}"]`
      )
        .first()
        .remove();
      $(
        `#grid1 .tui-grid-rside-area td[data-column-name="${
          itmobj1["car_no"]
        }"][data-row-key="${$(this).attr("data-row-key")}"]`
      )
        .first()
        .remove();
      $(
        `#grid1 .tui-grid-rside-area td[data-column-name="${
          itmobj1["load_finish_date"]
        }"][data-row-key="${$(this).attr("data-row-key")}"]`
      )
        .first()
        .remove();
      $(
        `#grid1 .tui-grid-rside-area td[data-column-name="${
          itmobj1["release_order_date_ko"]
        }"][data-row-key="${$(this).attr("data-row-key")}"]`
      )
        .first()
        .remove();
      $(this).remove();
    }
  }
});

let arrChange = ["load_type", "driver_name", "driver_tel_no", "car_no"];

arrChange.forEach(function (item) {
  changeColor(item);
});

function changeColor(item) {
  const listCheck = grid1.getColumnValues(itmobj1[item]);
  for (let i = 0; i <= listCheck.length; i++) {
    grid1.getElement(i, itmobj1[item]).css({
      "background-color": "#ffffcc!important",
    });
  }
}

//show files in grid
const file_img = "/resources/images/file_icon_detail.png";
$(`td[data-column-name=${itmobj1["ng_files"]}]`).each(function (i, obj) {
  let html = "";
  let plan_file = $(obj).find(".tui-grid-cell-content").text().trim();
  if (plan_file) {
    plan_file = JSON.parse(decodeURIComponent(plan_file));
    for (let i = 0; i < plan_file.length; i++) {
      html += `<a target="_blank" href="/file/${plan_file[i].newfilename}">
                <img src="${file_img}" />
            </a>`;
    }
  }
  if (nvl(html, "") !== "") {
    $(obj).find(".tui-grid-cell-content").html(html);
  }
});

$(`td[data-column-name=${itmobj1["handle_files"]}]`).each(function (i, obj) {
  let html = "";
  let plan_file = $(obj).find(".tui-grid-cell-content").text().trim();
  if (plan_file) {
    plan_file = JSON.parse(decodeURIComponent(plan_file));
    for (let i = 0; i < plan_file.length; i++) {
      html += `<a target="_blank" href="/file/${plan_file[i].newfilename}">
                <img src="${file_img}" />
            </a>`;
    }
  }
  if (nvl(html, "") !== "") {
    $(obj).find(".tui-grid-cell-content").html(html);
  }
});

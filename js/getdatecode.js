

function generateRows(rowContainer,columnTag, rowData, renderKeyOrValue) {
    const rowWrapper = $(`#myDataTable >  ${rowContainer}`),
    className = columnTag === 'th' ? '' : rowData['id'] % 2 === 0 ? 'evenRow' : 'oddRow';
    trElement = $('<tr>', {
      class: className
    });
    
    for (let key in rowData) {
      const thElement = $(`<${columnTag}>`, {
        html: renderKeyOrValue ?  key : rowData[key]
      });
      trElement.append(thElement)
    }
  
    rowWrapper.append(trElement);
  }
  
  function addTableData(tableData) {
    const tableBody = $('#myDataTable > tbody'),
    tableDataLength= tableData.length;
    
    tableDataLength > 0 && generateRows('thead', 'th',tableData[0], true);
    for(let i=0; i< tableDataLength; i++) {
      generateRows('tbody', 'td',tableData[i], false);
    }
  }
  
  $('#myselect').on('change',function(e){
    $('tr').show();
    let selectedValue = e.target.value,
    rowsTohide = (selectedValue === 'all' ? '' : (selectedValue === "odd" ? '.evenRow' : '.oddRow'));
    
    rowsTohide && $(rowsTohide).hide();
  })
  
  $.ajax({
      url: "https://jsonplaceholder.typicode.com/posts",
      type: "GET",
      dataType : "json",
  })
    .done(function( data ) {
      addTableData(data);
    })
    .fail(function( xhr, status, errorThrown ) {
      alert( "Sorry, there was a problem!" );
      console.log( "Error: " + errorThrown );
      console.log( "Status: " + status );
      console.dir( xhr );
    });
    
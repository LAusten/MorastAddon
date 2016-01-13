
self.port.on("post", function (text){
    getPart(text);
});

function getPart(text)
{
    var PartNumber = document.getElementById("divMouserPartNum").innerHTML;
    var Description = document.getElementById("divDes").innerHTML;
    // console.log(PartNumber);
    // console.log(text["InputQuantity"]);
    // console.log(text["InputCostCenter"]);

    var count;
    for(count = 1; parseInt((document.getElementById("ctl00_ContentMain_ucP_rptrPriceBreaks_ctl0" + count + "_lnkQuantity").innerHTML)) <= parseInt(text["InputQuantity"]); count++);

    count -= 1;
    var Price = document.getElementById("ctl00_ContentMain_ucP_rptrPriceBreaks_ctl0" + count + "_lblPrice").innerHTML;

    Price = Price.slice(4, 100);
	post("http://morast/Ordering_Table/Active_Table.php?Supl=Mous&Order_By=Entry_ID", {Quantity: text["InputQuantity"], Ordering_Code: PartNumber, Description: Description, Cost_Center: text["InputCostCenter"], Price: Price});

    self.port.emit("sucess", 1);
    //console.log("yaay");
}

function post(path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.
    console.log(params);
    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
         }
    }

    document.body.appendChild(form);
    form.submit();
}


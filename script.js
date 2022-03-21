(function($){

    let trigger;
    trigger = false;

    let shipping;
    shipping = false;

    $(document).ready(function(){

        let page;
        page = window.location.href;

        $(".product-right .product-options .product-options-content").find(".radio-custom").each(function(){

            if(page.indexOf($(this).find("input").attr("data-url")) !== -1){

                $("body").addClass("d-none");

                let customInfo;
                customInfo = sessionStorage.getItem("customInfo");
                $(".product-customization-group[data-group-id='1'] textarea[data-selector='customization-form-field']").val(customInfo);

                if(typeof $(".product-right a[data-selector='add-to-cart']").attr("data-product-id") !== "undefined"){

                    $("body").after(`<div class="shopping-information-cart">
                        <div class="shopping-information-cart-inside" style="display: grid!important;">
                            <span class="text-center">ÜRÜN SEPETİNİZE EKLENİYOR</span>
                            <span class="text-center font-size-2">Lütfen bekleyiniz...</span>
                            <a href="javascript:void(0)" class="btn btn-loading disabled mt-4 p-4"></a>
                        </div>
                    </div>`);
                    $(".product-right a[data-selector='add-to-cart']").trigger("click");
                    setTimeout(function() {

                        window.location.href = "/sepet";

                    }, 1500);

                }
                else{

                    $(".shopping-information-cart").remove();
                    $("body").after(`<div class="shopping-information-cart">
                        <div class="shopping-information-cart-inside" style="display: grid!important;">
                            <span class="text-center">BİLGİLENDİRME</span>
                            <span class="text-center font-size-2">Bu ürün için stoklarmız tükenmiştir.</span>
                            <a href="javascript:void(0)" class="btn btn-loading disabled mt-4 p-4"></a>
                        </div>
                    </div>`);

                    setTimeout(function() {

                        window.location.href = "/urun" + sessionStorage.getItem("last-page");
                        
                    }, 1500);

                }

            }

        });

        $.getJSON("***/dosya/shipping.json", function(data){

            shipping = data;
            let variants;

            $(".product-area-bottom").after($(`<div class="container p-4" id="product-package"></div>`));
            $("#product-package").load("***/wellbox/form.package.php");

            let interval;
            interval = setInterval(function(){

                if($("#product-package #district").length > 0 && $("#product-package #neighborhood").length > 0){

                    clearInterval(interval);
                    
                    if(Object.keys(shipping).length > 1){

                        $("#product-package #city").parent().removeClass("d-none");
                        $("#product-package #district").parent().addClass("mt-3 mt-md-0");

                        $("#product-package #city").parents(".row:eq(0)").find(".col-md-4").each(function(){

                            $(this).removeClass("col-md-4").addClass("col-md-3");

                        });

                        for (const key in shipping) {
                        
                            $("#product-package #city").append($(`
                                <option value="${key}">${key}</option>
                            `));

                        }

                    }

                    for (let index = 0; index < shipping["Ankara"].length; index++) {

                        $("#product-package #district").append($(`
                            <option value="${shipping["Ankara"][index].ilce}">${shipping["Ankara"][index].ilce}</option>
                        `));
                    }

                    for (let index = 0; index < shipping["Ankara"][0].mahalle.length; index++) {

                        $("#product-package #neighborhood").append($(`
                            <option value="${shipping["Ankara"][0].mahalle[index]}">${shipping["Ankara"][0].mahalle[index]}</option>
                        `));
                        
                    }

                    variants = new Array();

                    $(".product-right .product-options .product-options-content").find(".radio-custom").each(function(){

                        let variant;
                        variant = {};

                        let labelAsAnArray;
                        labelAsAnArray = $(this).find("label").text().split("-");

                        variant["product"] = $(this).find("input").attr("data-product-id");
                        variant["id"] = $(this).find("input").attr("id");
                        variant["url"] = $(this).find("input").attr("data-url");
                        variant["label"] = new Array();

                        for (let index = 0; index < labelAsAnArray.length; index++) {

                            variant["label"].push(labelAsAnArray[index].replace("(", "").replace(")\n", "").trim());
                            
                        }

                        variants.push(variant);

                    });

                    let variant1;
                    variant1 = new Array();

                    let variant2;
                    variant2 = new Array();

                    let variant3;
                    variant3 = new Array();

                    for (let index = 0; index < variants.length; index++) {

                        let has1;
                        has1 = false;

                        let has2;
                        has2 = false;

                        let has3;
                        has3 = false;

                        for (let index2 = 0; index2 < variant1.length; index2++) {

                            if(variant1[index2] == variants[index].label[0]){
                                has1 = true;
                                break;

                            }

                        }

                        for (let index2 = 0; index2 < variant2.length; index2++) {

                            if(variant2[index2] == variants[index].label[2]){
                                has2 = true;
                                break;

                            }

                        }

                        for (let index2 = 0; index2 < variant3.length; index2++) {

                            if(variant3[index2] == variants[index].label[1]){
                                has3 = true;
                                break;

                            }

                        }

                        if(has1 === false){

                            variant1.push(variants[index].label[0]);

                        }

                        if(has2 === false){

                            variant2.push(variants[index].label[2]);

                        }

                        if(has3 === false){

                            variant3.push(variants[index].label[1]);

                        }

                    }

                    for (let index = 0; index < variant1.length; index++) {

                        let selected;
                        selected = (index == 0) ? "selected" : "";

                        $("#product-package #variant-1-content .body").append(`<div class="meal-box justify-content-center text-center ${selected} mb-3" style="display: grid!important;">
                            <div class="variant1-text top"></div>
                            <div class="variant1-text bottom">${variant1[index]}</div>
                        </div>`);

                    }

                    for (let index = 0; index < variant2.length; index++) {

                        let selected;
                        selected = (index == 0) ? "selected" : "";

                        $("#product-package #variant-2-content .body").append(`<div class="calorie-box justify-content-center text-center mb-3" style="display: grid!important;">
                            <div class="${selected}">
                                <div class="variant2-text top">KALORİ</div>
                                <div class="variant2-text bottom">${variant2[index]}</div>
                            </div>
                        </div>`);

                    }

                    for (let index = 0; index < variant3.length; index++) {

                        let selected;
                        selected = (index == 0) ? "selected" : "";

                        $("#product-package #variant-3-content .body").append(`<div class="date-box justify-content-center text-center mb-3" style="display: grid!important;">
                            <div class="${selected}">
                                <div class="variant3-text top">${variant3[index]}</div>
                                <div class="variant3-text bottom">55,00 TL / Gün</div>
                            </div>
                        </div>`);

                    }
                    
                    calculateDaily();

                }

            });

            let redirectUrl;
            redirectUrl = "javascript:void(0)";

            let redirect;
            redirect = false;

            String.prototype.turkishtoEnglish = function () {
                return this.replace(/Ğ/gim, "g")
                .replace(/Ü/gim, "u")
                .replace(/Ş/gim, "s")
                .replace(/I/gim, "i")
                .replace(/İ/gim, "i")
                .replace(/Ö/gim, "o")
                .replace(/Ç/gim, "c")
                .replace(/ğ/gim, "g")
                .replace(/ü/gim, "u")
                .replace(/ş/gim, "s")
                .replace(/ı/gim, "i")
                .replace(/ö/gim, "o")
                .replace(/ç/gim, "c");
            };
            
            function calculateDaily() {

                let selectedVariant;
                selectedVariant = "";

                selectedVariant += $("#product-package #variants-content").find(".selected .variant1-text.bottom").text() + " ";
                selectedVariant += $("#product-package #variants-content").find(".selected .variant3-text.top").text() + " ";
                selectedVariant += $("#product-package #variants-content").find(".selected .variant2-text.bottom").text().replace(" cal", "");

                let asUrl = convertToUrl(selectedVariant);
                let totalamount;

                let counter;
                counter = 0;

                for (let index = 0; index < variants.length; index++) {

                    if(variants[index].url.indexOf(asUrl) !== -1){

                        totalamount = parseFloat(variants[index].label[3].replace(".", "").replace(",", ".").replace(" TL", ""));
                        $("#product-package #display-results a[data-selector='total-amount']").text(variants[index].label[3]);
                        redirectUrl = variants[index].url;

                    }

                    if(variants[index].label[0] == $("#product-package #variants-content").find(".selected .variant1-text.bottom").text() && variants[index].label[2] == $("#product-package #variants-content").find(".selected .variant2-text.bottom").text().replace(" cal", "")){

                        let day;
                        day = parseInt(variants[index].label[1].replace(" Gün", ""));

                        let amount;
                        amount = parseFloat(variants[index].label[3].replace(".", "").replace(",", ".").replace(" TL", ""));

                        let daily;
                        daily = Math.ceil(amount/day);
                        
                        $("#product-package #variants-content #variant-3-content").find(".variant3-text.bottom:eq(" + counter + ")").text(daily + " TL / Gün");
                        counter++;

                    }

                }

            }

            function convertToUrl(text){

                url = text.toLowerCase();
                url = url.replace("+", "").replace(/\s/g, '-');
                url = url.turkishtoEnglish();
                
                return url;

            }

            $(document).on("click", "#product-package #variant-1-content .meal-box", function(){

                $(this).parent().find(".meal-box").each(function(){

                    if($(this).hasClass("selected") !== false){

                        $(this).removeClass("selected");

                    }

                });

                ($(this).hasClass("selected") === false) ? $(this).addClass("selected") : false;
                calculateDaily();

            });

            $(document).on("click", "#product-package #variant-2-content .calorie-box", function(){

                $(this).parent().find(".date-box, .calorie-box").each(function(){

                    if($(this).children().hasClass("selected") !== false){

                        $(this).children().removeClass("selected");

                    }

                });

                ($(this).children().hasClass("selected") === false) ? $(this).children().addClass("selected") : false;
                calculateDaily();

            });

            $(document).on("click", "#product-package #variant-3-content .date-box", function(){

                $(this).parent().find(".date-box, .calorie-box").each(function(){

                    if($(this).children().hasClass("selected") !== false){

                        $(this).children().removeClass("selected");

                    }

                });

                ($(this).children().hasClass("selected") === false) ? $(this).children().addClass("selected") : false;

                let selectedVariant;
                selectedVariant = "";

                selectedVariant += $("#product-package #variants-content").find(".selected .variant1-text.bottom").text() + " ";
                selectedVariant += $("#product-package #variants-content").find(".selected .variant3-text.top").text() + " ";
                selectedVariant += $("#product-package #variants-content").find(".selected .variant2-text.bottom").text().replace(" cal", "");

                console.log(selectedVariant);

                let asUrl = convertToUrl(selectedVariant);
                let totalamount;

                for (let index = 0; index < variants.length; index++) {
                    console.log(variants[index]);

                    if(variants[index].url.indexOf(asUrl) !== -1){

                        totalamount = parseFloat(variants[index].label[3].replace(".", "").replace(",", ".").replace(" TL", ""));
                        $("#product-package #display-results a[data-selector='total-amount']").text(variants[index].label[3]);
                        redirectUrl = variants[index].url;

                    }

                }

            });

            $(document).on("keydown", "#product-package #delivery-time input, #product-package #delivery-date input", function(){
                return false;
            });
            
            $(document).on("click", "#product-package #display-results a[data-selector='redirect-to-variant']", function(){

                if(/*$("#delivery-time input").val() == "" || */ $("#delivery-date input").val() == ""){

                    Swal.fire({
                        icon: "warning",
                        title: "Zorunlu Alan!",
                        text: "Lütfen teslimat tarihinizi seçiniz.",
                        confirmButtonText: "Tamam",
                        willOpen: function(){

                            /*if($("#delivery-time input").val() == ""){

                                if($("#delivery-time input").parent().find(".star").length == 0){

                                    $("#delivery-time input").before(`<span style="color:#CC0000;" class="d-flex align-items-center mr-1 star">*</span>`);

                                }

                            }
                            else{
                             
                                $("#delivery-time input").parent().find(".star").remove();
                                
                            }*/

                            if($("#delivery-date input").val() == ""){

                                if($("#delivery-date input").parent().find(".star").length == 0){

                                    $("#delivery-date input").before(`<span style="color:#CC0000;" class="d-flex align-items-center mr-1 star">*</span>`);

                                }

                            }
                            else{
                             
                                $("#delivery-date input").parent().find(".star").remove();
                                
                            }

                        }

                    });

                }else if(redirect === false){
                    
                    $(this).attr("href", redirectUrl);
                    redirect = true;

                    $(this).trigger("click");

                }

                if(redirect !== false){

                    let customInfo;
                    customInfo = "";

                    let deliveryAddress;
                    deliveryAddress = "";

                    let firstSeparator;
                    firstSeparator = 0;

                    $("#product-package").find(".shipping").each(function(){

                        deliveryAddress += (firstSeparator == 0) ? "" : " - ";
                        deliveryAddress += $(this).find("select option:selected").text();

                        firstSeparator = 1;

                    });

                    customInfo = "Teslimat Address: " + deliveryAddress;
                   // customInfo += "Teslimat Saati: " + $("#product-package #delivery-time input").val();
                    customInfo += "Teslimat Tarihi: " + $("#product-package #delivery-date input").val();
                    customInfo += "Müşteri Notu: " + $("#product-package #note textarea").val();

                    sessionStorage.setItem("customInfo", customInfo);
                    sessionStorage.setItem("last-page", page.split("/urun")[1]);
                    
                }

            });

        });

        if($(".custom-form-wrapper .special-button").length > 0){

            $(".custom-form-wrapper").before($(`<form id="calculator" class="default-products popular-products my-5 py-5 d-flex flex-column align-items-center" onsubmit="return false;"></form>`))

        }
            $("#calculator").load("***/wellbox/form.calculator.php");

    });

    $(document).on("change", "#product-package #city", function(){

        let value;
        value = $(this).val();
        
        for (const key in shipping) {

            if(key == value){

                $("#product-package #district").html("");
                $("#product-package #neighborhood").html("");

                for (let index = 0; index < shipping[key].length; index++) {

                    $("#product-package #district").append($(`
                        <option value="${shipping[key][index].ilce}">${shipping[key][index].ilce}</option>
                    `));
                    
                }

                for (let index = 0; index < shipping[key][0].mahalle.length; index++) {

                    $("#product-package #neighborhood").append($(`
                        <option value="${shipping[key][0].mahalle[index]}">${shipping[key][0].mahalle[index]}</option>
                    `));
                    
                }

                break;

            }

        }
    });

    $(document).on("change", "#product-package #district", function(){

        let value;
        value = $(this).val();

        for (const key in shipping) {

            for (let index = 0; index < shipping[key].length; index++) {

                if(shipping[key][index].ilce == value){

                    $("#product-package #neighborhood").html("");

                    for (let index2 = 0; index2 < shipping[key][index].mahalle.length; index2++) {

                        $("#product-package #neighborhood").append($(`
                            <option value="${shipping[key][index].mahalle[index2]}">${shipping[key][index].mahalle[index2]}</option>
                        `));

                    }

                    break;
                }

            }

        }

    });

    $(document).on("click", ".custom-form-wrapper .special-button", function(e){

        if(trigger === false && $(this).parents("form:eq(0)").find("#special-agreement")[0].checked !== false){

            e.preventDefault();
            e.stopImmediatePropagation();
            
            trigger = true;

            $(this).parents("form:eq(0)").attr("action", "***/wellbox/mailer.php");
            $(this).trigger("click");

        }
        else{
            trigger = false;
        }

    });

    $(document).on("keypress", "#weight",function(e) {
        
        let acceptStatus = 1;
        let refuseKeyCodes = [
            43, 45, 46, 101
        ];

        refuseKeyCodes.forEach(element => {

            if(e.which == element) {

                acceptStatus = 0;

            }

        });

        if(acceptStatus == 0){
            
            e.preventDefault();

        }

    });
    
    $(document).on("keypress", "#height, #age", function(e) {
        
        let acceptStatus = 1;
        let refuseKeyCodes = [
            43, 44, 45, 46, 101
        ];

        refuseKeyCodes.forEach(element => {

            if(e.which == element) {

                acceptStatus = 0;

            }

        });

        if(acceptStatus == 0){
            
            e.preventDefault();

        }

    });

    $(document).on("change", "#weight", function(){

        let value = $(this).val();
        if(value < 1){

            $(this).val(1);

        }else if(value > 250){

            $(this).val(250);

        }

    });

    $(document).on("change", "#height", function(){

        let value = $(this).val();
        if(value < 150){

            $(this).val(150);
            
        } else if(value > 250){

            $(this).val(250);

        }

    });

    $(document).on("change", "#age", function(){

        let value = $(this).val();
        if(value < 1){

            $(this).val(1);
            
        } else if(value > 99){

            $(this).val(99);

        }

    });

    $(document).on("submit", "#calculator", function(){
        let age = $("#age").val();
        let height = $("#height").val();
        let weight = $("#weight").val();
        let gender = $("#gender").val();
        let sport = $("#sport").val();
        let ideal = 0;
        let ccal = 0;
        let ccal2 = 0;

        ccal = weight * 10 + height * 6.25 - age * 5;

        if(gender == 1) {
            ideal = 50 + 2.3 * (height / 2.54 - 60);
            ccal += 5;
        }
        else {
            ideal = 45.5 + 2.3 * (height / 2.54 - 60);
            ccal -= 161;
        }

        if(sport == 1) {
            ccal += 100;
            ccal2 += 100;
        }

        ccal2 = ccal * 1.25;

        if($("#calculator .info").length > 0){

            $("#calculator .info").remove();
            
        }

        $("#calculator").append($(`
            <div class="row info mt-5 d-flex flex-row" style="font-size: 1.5rem;">
                <div class="col-12 col-md-4 d-flex flex-column first p-4 justify-content-center text-center" style="background: #FFB347;">
                    <span class="small font-size-11">İdeal Kilonuz</span>
                    <span id="_weight" class="font-size-16">${ideal.toFixed(2).replace(".",",") + " kg"}</span>
                </div>
                <div class="col-12 col-md-4 d-flex flex-column second p-4 justify-content-center text-center" style="background: #966FD6;">
                    <span class="small font-size-11">Kilo vermek için gereken günlük kalori miktarı</span>
                    <span id="_cccal" class="font-size-16">${ccal.toFixed(2).replace(".",",") + "  kkal"}</span>
                </div>
                <div class="col-12 col-md-4 d-flex flex-column third p-4 justify-content-center text-center" style="background: #FBCCD1;">
                    <span class="small font-size-11">Form korumak için gereken günlük kalori miktarı</span>
                    <span id="_ccal2" class="font-size-16">${ccal2.toFixed(2).replace(".",",") + "  kkal"}</span>
                </div>
            </div>
        `));

    });

})(jQuery);

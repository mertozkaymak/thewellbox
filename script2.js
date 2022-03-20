(($) => {

    let app = {
        productPage: {
            jsonData: new Array(),
            variants: new Array(),
            selectedVariantUrl: "",
            orderInfo: "",
            eventListener: {
                numberFormat: (number, decimals, dec_point, thousands_sep) => {
                    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
                    var n = !isFinite(+number) ? 0 : +number,
                        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
                        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
                        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
                        s = '',
                        toFixedFix = function (n, prec) {
                            var k = Math.pow(10, prec);
                            return '' + Math.round(n * k) / k;
                        };
                    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
                    if (s[0].length > 3) {
                        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
                    }
                    if ((s[1] || '').length < prec) {
                        s[1] = s[1] || '';
                        s[1] += new Array(prec - s[1].length + 1).join('0');
                    }
                    return s.join(dec);
                },
                init: () => {
                    $(".product-right .product-options .product-options-content").find(".radio-custom").each((index, elem) => {
                        if(window.location.href.indexOf($(elem).find("input").attr("data-url")) !== -1){
                            app.productPage.eventListener.variantPage();
                            return false;
                        }
                    });
                    app.productPage.eventListener.getJson().then(() => {
                        $(".product-area-bottom").after($(`<div class="container p-4" id="product-package"></div>`));
                        app.productPage.eventListener.getForm().then(res => {
                            $("#product-package").append(res);
                            console.log(app.productPage.jsonData);
                            if (Object.keys(app.productPage.jsonData).length > 1) $("#product-package #city").removeClass("disabled").removeAttr("disabled");
                            $("#product-package #city").html(null);
                            $("#product-package #city").append($(`<option value="">İl Seçiniz</option>`));
                            for (const key in app.productPage.jsonData) {
                                $("#product-package #city").append($(`<option value="${key}">${key}</option>`));
                            }
                            $("#product-package #city").val($("#product-package #city option:eq(1)").val()).trigger("change");
                            app.productPage.eventListener.getValuesFromVariants();
                            app.productPage.eventListener.possibleResults();
                            $("#product-package #variant-3-content .date-box .selected").trigger("click");
                        });
                    });
                },
                variantPage: () => {
                    $("body").addClass("d-none");
                    let response = localStorage.getItem("orderInfo");
                    $(".product-customization-group[data-group-id='1'] textarea[data-selector='customization-form-field']").val(response).trigger("change");
                    if(typeof $(".product-right a[data-selector='add-to-cart']").attr("data-product-id") !== "undefined" && response !== null){
                        $("body").after(`<div class="shopping-information-cart">
                            <div class="shopping-information-cart-inside" style="display: grid!important;">
                                <span class="text-center">ÜRÜN SEPETİNİZE EKLENİYOR</span>
                                <span class="text-center font-size-2">Lütfen bekleyiniz...</span>
                                <a href="javascript:void(0)" class="btn btn-loading disabled mt-4 p-4"></a>
                            </div>
                        </div>`);
                        $(".product-right a[data-selector='add-to-cart']").trigger("click");
                        setTimeout(() => { window.location.href = "/sepet"; }, 1500);
                    }else{
                        $(".shopping-information-cart").remove();
                        $("body").after(`<div class="shopping-information-cart">
                            <div class="shopping-information-cart-inside" style="display: grid!important;">
                                <span class="text-center">BİLGİLENDİRME</span>
                                <span class="text-center font-size-2">Bu ürün için stoklarmız tükenmiştir.</span>
                                <a href="javascript:void(0)" class="btn btn-loading disabled mt-4 p-4"></a>
                            </div>
                        </div>`);
                        setTimeout(() => { window.location.href = "/urun" + localStorage.getItem("last-page"); }, 1500);
                    }
                },
                getJson: async () => {
                    await $.getJSON("https://www.thewellbox.com.tr/dosya/shipping.json", function(data){
                        app.productPage.jsonData = data;
                    });
                },
                getForm: async () => {
                    return $.ajax({
                        url: "https://dev.digitalfikirler.com/wellbox/form.package.php",
                        type: "post"
                    });
                },
                getValuesFromVariants: () => {
                    let variant = new Array();
                    $(".product-right .product-options .product-options-content").find(".radio-custom").each((index, elem) => {
                        variant = $(elem).find("label").text().trim().split("-");
                        for (let index = 0; index < variant.length; index++) {
                            variant[index] = variant[index].trim();
                        }
                        if($("#product-package #variant-1-content .body").html().indexOf(variant[0]) === -1){
                            $("#product-package #variant-1-content .body").append(`<div class="meal-box justify-content-center text-center ${ (index === 0) ? "selected" : "" } mb-3" style="display: grid!important;">
                                <div class="variant1-text top"></div>
                                <div class="variant1-text bottom">${ variant[0] }</div>
                            </div>`);
                        }
                        if($("#product-package #variant-2-content .body").html().indexOf(variant[1]) === -1){
                            $("#product-package #variant-2-content .body").append(`<div class="calorie-box justify-content-center text-center mb-3" style="display: grid!important;">
                                <div class="${ (index === 0) ? "selected" : "" }">
                                    <div class="variant2-text top">KALORİ</div>
                                    <div class="variant2-text bottom">${ variant[1] }</div>
                                </div>
                            </div>`);
                        }
                        if($("#product-package #variant-3-content .body").html().indexOf(variant[2]) === -1){
                            $("#product-package #variant-3-content .body").append(`<div class="date-box justify-content-center text-center mb-3" style="display: grid!important;">
                                <div class="${ (index === 0) ? "selected" : "" }">
                                    <div class="variant3-text top">${ variant[2] }</div>
                                    <div class="variant3-text bottom">0,00 TL / Gün</div>
                                </div>
                            </div>`);
                        }
                    });
                },
                possibleResults: () => {
                    let subVariants = {
                        v1: $("#product-package #variants-content #variant-1-content .selected .variant1-text.bottom").text().trim(),
                        v2: $("#product-package #variants-content #variant-2-content .selected .variant2-text.bottom").text().trim()
                    }
                    let targetPrice = "";
                    let counter = 0;
                    $(".product-right .product-options .product-options-content").find(".radio-custom").each((index, elem) => {
                        if($(elem).find("label").text().trim().indexOf(subVariants.v1) !== -1 && $(elem).find("label").text().trim().indexOf(subVariants.v2) !== -1){
                            targetPrice = $(elem).find("label").text().trim().split("-")[$(elem).find("label").text().trim().split("-").length - 1].replace("( ", "").replace(" )", "");
                            targetPrice = parseFloat(targetPrice.replace(".", "").replace("," , ".").replace(" TL", ""));
                            targetPrice = targetPrice / parseInt($("#product-package #variants-content #variant-3-content .variant3-text.top:eq(" + counter + ")").text().replace(" Gün", ""));
                            targetPrice = app.productPage.eventListener.numberFormat(targetPrice, 2, ",", ".") + " TL";
                            $("#product-package #variants-content #variant-3-content .variant3-text.bottom:eq(" + counter + ")").text(`${ targetPrice } / Gün`);
                            counter++;
                        }
                    });
                },
                selectTargetVariant: () => {
                    let subVariants = {
                        v1: $("#product-package #variants-content #variant-1-content .selected .variant1-text.bottom").text().trim(),
                        v2: $("#product-package #variants-content #variant-2-content .selected .variant2-text.bottom").text().trim(),
                        v3: $("#product-package #variants-content #variant-3-content .selected .variant3-text.top").text().trim()
                    }
                    $(".product-right .product-options .product-options-content").find(".radio-custom").each((index, elem) => {
                        if($(elem).find("label").text().trim().indexOf(subVariants.v1) !== -1 && $(elem).find("label").text().trim().indexOf(subVariants.v2) !== -1 && $(elem).find("label").text().trim().indexOf(subVariants.v3) !== -1){
                            app.productPage.selectedVariantUrl = $(elem).find("input").attr("data-url");
                            $("#product-package #display-results a[data-selector='total-amount']").text($(elem).find("label").text().split("- (")[1].replace(" )", "").trim());
                        }
                    });
                }
            }
        },
        calculateCalorie: {
            eventListener: {
                init: () => {
                    if($(".custom-form-wrapper .special-button").length > 0) $(".custom-form-wrapper").before($(`<form id="calculator" class="default-products popular-products my-5 py-5 d-flex flex-column align-items-center" onsubmit="return false;"></form>`));
                    app.calculateCalorie.eventListener.getForm().then(res => { $("#calculator").append(res); });
                },
                getForm: async () => {
                    return $.ajax({
                        url: "https://dev.digitalfikirler.com/wellbox/form.calculator.php",
                        type: "post"
                    });
                },
            }
        },
        contactFrom: {
            contactTrigger: false,
            sendMail: async () => {
                return $.ajax({
                    url: 'https://dev.digitalfikirler.com/wellbox/mailer.php',
                    type : "POST",
                    data : $("[data-selector='contact-form']").serialize(),
                });
            }
        }
    };

    $(document).ready(() => {
        if(window.location.href.indexOf("/urun") !== -1) app.productPage.eventListener.init();
        app.calculateCalorie.eventListener.init();
    });

    $(document).on("DOMNodeRemoved", ".loading-bar", () => {
        if(window.location.href.indexOf("/urun") !== -1) app.productPage.eventListener.init();
    });

    $(document).on("change", "#product-package #city", (e) => {

        if($(e.currentTarget).val() === ""){
            $("#product-package #district").html(null);
            return false;
        }

        for (const key in app.productPage.jsonData) {
            if(key === $(e.currentTarget).find("option:selected").val()){
                $("#product-package #district").html(`<option value="">İlçe Seçiniz</option>`);
                $("#product-package #neighborhood").html(`<option value="">Mahalle Seçiniz</option>`);
                app.productPage.jsonData[key].forEach(element => {
                    $("#product-package #district").append($(`
                        <option value="${element.ilce}">${element.ilce}</option>
                    `));
                });
                break;
            }
        }

    });

    $(document).on("change", "#product-package #district", (e) => {

        if($(e.currentTarget).val() === ""){
            $("#product-package #neighborhood").html(`<option value="">Mahalle Seçiniz</option>`);
            return false;
        }

        for (const key in app.productPage.jsonData) {
            app.productPage.jsonData[key].forEach(element => {
                if(element.ilce === $(e.currentTarget).find("option:selected").val()){
                    $("#product-package #neighborhood").html(`<option value="">Mahalle Seçiniz</option>`);
                    element.mahalle.forEach(element2 => {
                        $("#product-package #neighborhood").append($(`
                            <option value="${element2}">${element2}</option>
                        `)); 
                    });
                }
            });
        }

    });

    $(document).on("click", "#product-package #variant-1-content .meal-box", (e) => {
        $(e.currentTarget).parent().find(".meal-box.selected").removeClass("selected");
        $(e.currentTarget).addClass("selected");
        app.productPage.eventListener.possibleResults();
        app.productPage.eventListener.selectTargetVariant();
    });

    $(document).on("click", "#product-package #variant-2-content .calorie-box", (e) => {
        $(e.currentTarget).parent().find(".calorie-box .selected").removeClass("selected");
        $(e.currentTarget).children().addClass("selected");
        app.productPage.eventListener.possibleResults();
        app.productPage.eventListener.selectTargetVariant();
    });

    $(document).on("click", "#product-package #variant-3-content .date-box", (e) => {
        $(e.currentTarget).parent().find(".date-box .selected").removeClass("selected");
        $(e.currentTarget).children().addClass("selected");
        app.productPage.eventListener.possibleResults();
        app.productPage.eventListener.selectTargetVariant();
    });

    $(document).on("click", "#product-package #display-results a[data-selector='redirect-to-variant']", (e) => {
        if(typeof $(".product-right [data-selector='add-to-cart']").attr("data-product-id") === "undefined"){
            Swal.fire({
                icon: "warning",
                title: "Bilgilendirme!",
                text: "Bu ürün için stoklarmız tükenmiştir.",
                confirmButtonText: "Tamam"
            });
            return false;
        }
        if($("#delivery-date input").val() == ""){
            Swal.fire({
                icon: "warning",
                title: "Zorunlu Alan!",
                text: "Lütfen teslimat tarihinizi seçiniz.",
                confirmButtonText: "Tamam"
            });
            return false;
        }
        let deliveryAddress = "";
        let firstSeparator = 0;
        let error = false;
        $("#product-package").find(".shipping").each((index, elem) => {
            if($(elem).find("select option:selected").val() === ""){
                Swal.fire({
                    icon: "warning",
                    title: "Zorunlu Alan!",
                    text: "Lütfen teslimat adresinizi eksiksiz giriniz.",
                    confirmButtonText: "Tamam"
                });

                error = true;
                return false;
            }
            deliveryAddress += (firstSeparator == 0) ? "" : " - ";
            deliveryAddress += $(elem).find("select option:selected").text();
            firstSeparator = 1;
        });
        if(error === false){
            app.productPage.orderInfo = "Teslimat Address: " + deliveryAddress;
            app.productPage.orderInfo += " | Teslimat Tarihi: " + $("#product-package #delivery-date input").val();
            app.productPage.orderInfo += ($("#product-package #note textarea").val() !== "") ? " | Müşteri Notu: " + $("#product-package #note textarea").val() : "";
            localStorage.setItem("orderInfo", JSON.stringify(app.productPage.orderInfo));
            localStorage.setItem("last-page", window.location.href.split("/urun")[1]);
            window.location.href = app.productPage.selectedVariantUrl;
        }
    });

    $(document).on("keypress", "#weight", (e) => {
        let acceptStatus = 1;
        let refuseKeyCodes = [ 43, 45, 46, 101 ];
        refuseKeyCodes.forEach(element => {
            if(e.which == element) acceptStatus = 0;
        });
        if(acceptStatus == 0) e.preventDefault();
    });

    $(document).on("keypress", "#height, #age", (e) => {
        let acceptStatus = 1;
        let refuseKeyCodes = [ 43, 44, 45, 46, 101 ];
        refuseKeyCodes.forEach(element => {
            if(e.which == element) acceptStatus = 0;
        });
        if(acceptStatus == 0) e.preventDefault();
    });

    $(document).on("change", "#weight", (e) => {
        let value = $(e.currentTarget).val();
        if(value < 1) $(e.currentTarget).val(1); else if(value > 250) $(e.currentTarget).val(250);
    });

    $(document).on("change", "#height", (e) => {
        let value = $(e.currentTarget).val();
        if(value < 150) $(e.currentTarget).val(150); else if(value > 250) $(e.currentTarget).val(250);
    });

    $(document).on("change", "#age", (e) => {
        let value = $(e.currentTarget).val();
        if(value < 1) $(e.currentTarget).val(1); else if(value > 99) $(e.currentTarget).val(99);
    });

    $(document).on("submit", "#calculator", (e) => {
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
        }else {
            ideal = 45.5 + 2.3 * (height / 2.54 - 60);
            ccal -= 161;
        }
        if(sport == 1) {
            ccal += 100;
            ccal2 += 100;
        }
        ccal2 = ccal * 1.25;
        if($("#calculator .info").length > 0) $("#calculator .info").remove();
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

    $(document).on("click", ".custom-form-wrapper .special-button", (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        if(app.contactFrom.contactTrigger === false){
            if($(e.currentTarget).parents("form:eq(0)").find("#special-agreement")[0].checked === false){
                swal.fire({
                    icon: "warning",
                    title: "Zorunlu alan \" İletişim Aydınlatma Metni \"",
                    confirmButtonText: "Tamam"
                })
                return false;
            }
            app.contactFrom.contactTrigger = true;
            app.contactFrom.sendMail().then(res => console.log(res));
            setTimeout(() => app.contactFrom.contactTrigger = false, 250);
        }
    });

})(jQuery);
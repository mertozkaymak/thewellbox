<?php header("Access-Control-Allow-Origin: *"); ?>
<div class="row d-flex justify-content-center">
    <span class="font-weight-bold mb-5" id="header-text">ŞİMDİ PAKETİNİZİ OLUŞTURALIM</span>
</div>
<div class="row d-flex justify-content-center mb-5">
    <div class="col-12 col-md-3 mr-md-3 p-3 shipping">
        İLİNİZ
        <select id="city" class="form-select disabled" disabled></select>
    </div>
    <div class="col-12 col-md-3 mr-md-3 p-3 shipping">
        İLÇENİZ
        <select id="district" class="form-select"></select>
    </div>
    <div class="col-12 col-md-3 mt-3 mt-md-0 p-3 shipping">
        MAHALLENİZ
        <select id="neighborhood" class="form-select"></select>
    </div>
</div>
<div class="row d-flex justify-content-between mb-5">
    <div class="col-12 col-md-8 mb-5 mb-md-0 order-1">
        <div class="row" id="variants-content">
            <div class="col-md-4" id="variant-1-content">
                <div class="row d-flex justify-content-center header mb-5 mt-5 mt-md-0">
                    SİZE EN UYGUN ÖĞÜN HANGİSİ?
                </div>
                <div class="row justify-content-center body">

                </div>
            </div>
            <div class="col-md-4" id="variant-2-content">
                <div class="row d-flex justify-content-center header mb-5 mt-5 mt-md-0">
                    KAÇ KALORİ?
                </div>
                <div class="row d-flex justify-content-center body">

                </div>
            </div>
            <div class="col-md-4" id="variant-3-content">
                <div class="row d-flex justify-content-center header mb-5 mt-5 mt-md-0">
                    KAÇ GÜN?
                </div>
                <div class="row d-flex justify-content-center body">

                </div>
            </div>
        </div>
    </div>
    <div class="col-12 col-md-3 order-2">
       <!-- <div class="row w-100 p-3 mb-3" id="delivery-time">
            <span class="title mb-3 w-100">Teslimat Saati</span>
            <div class="input-group clockpicker">
                <input type="text" class="form-control">
                <span class="input-group-addon d-flex justify-content-center align-items-center">
                    <span class="far fa-clock"></span>
                </span>
            </div>
            <script type="text/javascript">
                $('.clockpicker').clockpicker({
                    donetext: 'Seç'
                });
            </script>
        </div>-->
        <div class="row d-flex justify-content-center w-100 p-3" id="delivery-date">
            <span class="title mb-3 w-100">Teslimat Tarihi</span>
            <div class="input-group d-flex justify-content-center datepicker">
                <input type="text" class="form-control d-none d-md-block">
                <span class="input-group-addon d-flex justify-content-center align-items-center">
                    <span class="far fa-calendar-alt"></span>
                </span>
            </div>
            <script type="text/javascript">
                $('.datepicker').datepicker({
                    language: "tr",
                    format: "dd/mm/yyyy",
                    startDate: '+2d',
                });
            </script>
            <div class="alert alert-warning mt-3 w-100 text-center" role="alert">
                Siparişinizi en az iki gün öncesinden vermenizi rica ederiz. 
            </div>
        </div>
        <div class="row d-flex justify-content-center w-100 p-3" id="note">
            <div class="input-group">
                <span class="w-100 mb-3">Not:</span>
                <textarea class="form-control border" placeholder="İletmek istediğiniz bir şey var mı?"></textarea>
            </div>
        </div>
        <div class="row w-100" style="font-size:large" id="display-results">
            <a href="javascript:void(0);" class="btn btn-primary d-flex justify-content-center align-items-center mb-3 w-100 disabled" data-selector="total-amount" style="font-size:large">0,00 TL</a>
            <a href="javascript:void(0);" class="btn btn-primary d-flex justify-content-center align-items-center w-100" data-selector="redirect-to-variant" style="font-size:large">SEPETE EKLE</a>
        </div>
    </div>
</div>
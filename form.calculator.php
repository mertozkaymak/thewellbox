<?php header("Access-Control-Allow-Origin: *"); ?>
    <div class="products-header d-flex flex-column mb-5">
        <span class="text-center mb-3">KALORİ MİKTARI HESAPLAMA</span>
        <span class="small mb-3">Günlük kalori ihtiyacınızı tablodaki bilgileri tamamlayarak kolaylıkla öğrenebilirsiniz.</span>
    </div>
    <div class="row w-75">
        <div class="col-12 col-md-4 form-group">
            <label>Kilonuz (kg)</label>
            <input class="form-control" id="weight" placeholder="Kilonuz" type="number" min="1" max="250" required="">
        </div>
        <div class="col-12 col-md-4 form-group">
            <label>Boyunuz (cm)</label>
            <input class="form-control" id="height" placeholder="Boyunuz" type="number" min="150" max="250" required="">
        </div>
        <div class="col-12 col-md-4 form-group">
            <label>Yaşınız</label>
            <input class="form-control" id="age" placeholder="Yaşınız" type="number" min="1" max="99" required="">
        </div>
    </div>
    <div class="row w-xs-75 w-50">
        <div class="col-12 col-md-6 form-group">
            <label>Cinsiyetiniz</label>
            <select id="gender" class="form-control" required="">
            <option value="">Seçiniz</option>
            <option value="1">Erkek</option>
            <option value="0">Kadın</option>
            </select>
        </div>
        <div class="col-12 col-md-6 form-group">
            <label>Spor yapıyor musunuz?</label>
            <select id="sport" class="form-control" required="">
            <option value="">Seçiniz</option>
            <option value="1">Evet</option>
            <option value="0">Hayır</option>
            </select>
        </div>
    </div>
    <div class="row w-25">
        <button type="submit" class="btn btn-danger w-100">Hesapla</button>
    </div>
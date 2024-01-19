<template>
    <div class="klasifikasi">


       <!-- ======= Services Section ======= -->
    <section id="services" class="services">
      <div class="container" data-aos="fade-up">

        <div class="section-title">
          <h2>Analisis Sentimen</h2>
          <br>
          <p>
              <div class="group">
                <form action="" @submit.prevent="onSubmit">
                  <input class="form-control" v-model="kata_kunci" type="text" id="input_kk" required="" oninvalid="this.setCustomValidity('Harus Masukkan Kata Kunci')" oninput="setCustomValidity('')">
                  <span class="highlight"></span>
                  <span class="bar"></span>
                  <div class="garis_bawah"></div>
                  <label>Masukkan Kata Kunci</label>
                  <button type="submit">Search &nbsp;<i class='bx bx-search bx-tada-hover'></i></button> 
                </form>
              </div>
            </p>
            <div style="width: 100%" v-show="hide_progress">
              <LvProgressBar :value="value" />
            </div> 
        </div>
        <div class="row" v-show="hide">
          <h2><b>Hasil Analisis :</b></h2>
          <div class="col-lg-3 col-md-6 d-flex align-items-stretch mt-4 mt-md-0" data-aos="zoom-in" data-aos-delay="100">
            <div class="icon-box iconbox-blue">
                Data Awal
                <br>
                <h6>Banyak Data: <b style="color:deeppink;">{{ result_L_DA }}</b></h6>
                <br>
                <apexchart type="radialBar" height="300" :options="chartOptions" :series="series_DA"></apexchart>
                <h6>Hasil Klasifikasi Input: <b style="color:deeppink;">{{ result_K_DA }}</b></h6> 
                <br>
            </div>
          </div>

          <div class="col-lg-3 col-md-6 d-flex align-items-stretch mt-4 mt-md-0" data-aos="zoom-in" data-aos-delay="200">
            <div class="icon-box iconbox-orange ">
                Data Smote
                <br>
                <h6>Banyak Data: <b style="color:deeppink;">{{ result_L_DS }}</b></h6>
                <br>
                <apexchart type="radialBar" height="300" :options="chartOptions" :series="series_DS"></apexchart>
                <h6>Hasil Klasifikasi Input: <b style="color:deeppink;">{{ result_K_DS }}</b></h6> 
                <br>
            </div>
          </div>

          <div class="col-lg-3 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0" data-aos="zoom-in" data-aos-delay="300">
            <div class="icon-box iconbox-pink">
                Data Over
                <br>
                <h6>Banyak Data: <b style="color:deeppink;">{{ result_L_DO }}</b></h6>
                <br>
                <apexchart type="radialBar" height="300" :options="chartOptions" :series="series_DO"></apexchart>
                <h6>Hasil Klasifikasi Input: <b style="color:deeppink;">{{ result_K_DO }}</b></h6> 
                <br>
            </div>
          </div>

          <div class="col-lg-3 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0" data-aos="zoom-in" data-aos-delay="100">
            <div class="icon-box iconbox-yellow">
                Data Under
                <br>
                <h6>Banyak Data: <b style="color:deeppink;">{{ result_L_DU }}</b></h6>
                <br>
                <apexchart type="radialBar" height="300" :options="chartOptions" :series="series_DU"></apexchart>
                <h6>Hasil Klasifikasi Input: <b style="color:deeppink;">{{ result_K_DU }}</b></h6> 
                <br>
            </div>
          </div>

        </div>

      </div>
    </section><!-- End Services Section -->


    <!-- <main id="main"> -->
     
    <!-- </main> -->
  </div>
</template>


<script>
import axios from 'axios'
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.css";
import "datatables.net-bs4";
import LvProgressBar from 'lightvue/progress-bar';

export default {
  data: () =>{
    return{
      kata_kunci: '',
      value: 0,
      hide_progress: false,
      hide: false,

      // hasil Klasifikasi
      result_K_DA: '',
      result_K_DS: '',
      result_K_DO: '',
      result_K_DU: '',

      result_L_DA: '',
      result_L_DS: '',
      result_L_DO: '',
      result_L_DU: '',
      
      series_DA: [0],
      series_DS: [0],
      series_DO: [0],
      series_DU: [0],
      chartOptions: {
        chart: {
          type: 'radialBar',
          // toolbar: {
          //   show: true,
          //   width: 100
          // }
        },
        plotOptions: {
          radialBar: {
            hollow: {
              margin:0,
              size: '65%',
              background: '#fff',
              image: undefined,
              imageOffsetX: 0,
              imageOffsetY: 0,
              position: 'front',
              dropShadow: {
                enabled: true,
                top: 3,
                left: 0,
                blur: 4,
                opacity: 0.24
              }
            },
            track: {
              background: '#fff',
              strokeWidth: '110%',
              dropShadow: {
                enabled: true,
                top: -3,
                left: 0,
                blur: 4,
                opacity: 0.35
              }
            },
            dataLabels: {
              show: true,
              name: {
                offsetY: -10,
                show: true,
                color: '#888',
                fontSize: '17px'
              },
              value: {
                formatter: function(val) {
                  return parseInt(val);
                },
                color: '#111',
                fontSize: '20px',
                show: true,
              }
            },
          },
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'horizontal',
            shadeIntensity: 0.5,
            gradientToColors: ['#ABE5A1'],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100]
          }
        },
        stroke: {
              lineCap: 'round'
            },
        labels: ['Percent'],
      },
    }
  },
  methods: {
    onSubmit(event){
      this.endProgress()
      this.onInterval()
      this.hide = false,
      this.hide_progress = true;
      if (this.kata_kunci != '') {
        Swal.fire({
            type: 'success',
            title: 'Proses Pencarian Tunggu Sebentar..!',
            showConfirmButton: false,
            timer: 3000 
        });
        var config = { headers: {  
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*'}
					}
        const path = 'http://localhost:5000/KlasifikasiKNNApi'
        axios.post(path, { KataKunci : this.kata_kunci }, config
        )
        .then((res) =>{
          // console.log(res)
          this.res = res

          var dataAakurasi = res.data.data[0].resultDA[0].dataAkurasi
          var dataAdatalabel= res.data.data[0].resultDA[0].dataLabel
          var dataAjumlahdata = res.data.data[0].resultDA[0].lenData
          this.series_DA = [dataAakurasi]
          this.result_K_DA = dataAdatalabel
          this.result_L_DA = dataAjumlahdata

          var dataSakurasi = res.data.data[0].resultDS[0].dataAkurasi
          var dataSdatalabel= res.data.data[0].resultDS[0].dataLabel
          var dataSjumlahdata = res.data.data[0].resultDS[0].lenData
          this.series_DS = [dataSakurasi]
          this.result_K_DS = dataSdatalabel
          this.result_L_DS = dataSjumlahdata

          var dataOakurasi = res.data.data[0].resultDO[0].dataAkurasi
          var dataOdatalabel= res.data.data[0].resultDO[0].dataLabel
          var dataOjumlahdata = res.data.data[0].resultDO[0].lenData
          this.series_DO = [dataOakurasi]
          this.result_K_DO = dataOdatalabel
          this.result_L_DO = dataOjumlahdata

          var dataUakurasi = res.data.data[0].resultDU[0].dataAkurasi
          var dataUdatalabel= res.data.data[0].resultDU[0].dataLabel
          var dataUjumlahdata = res.data.data[0].resultDU[0].lenData
          this.series_DU = [dataUakurasi]
          this.result_K_DU = dataUdatalabel
          this.result_L_DU = dataUjumlahdata

          // this.kata_kunci = ''
        }).catch((error) => {
          return error
        })
      }
      else{
        Swal.fire({
          type: 'warning',
          title: 'Harus Masukkan Kata Kunci..!!',
          showConfirmButton: false,
          timer: 3000
        })
      }
    },
    onInterval(){
      var i = 0;
      this.interval = setInterval(() => {
        if(i>=100){
          clearInterval(this.interval)
          this.hide = true
          i = 0-1
          this.hide_progress = false
        }
        else if(this.res != ''){
          i = 99
          this.res = ''
        }
        i++
        this.value = i;
      }, 3000);
    },
    endProgress() {
      clearInterval(this.interval);
      this.interval = null;
    },
  },
  components: {
    LvProgressBar: LvProgressBar,
  },
}
</script>


<style lang="scss" scoped>
   /* untuk style form ------------------------------- */
  .group{ 
    position:relative;
    margin-bottom:30px;
  }
  .group{
    button{
      position:absolute;
      top:10px;
      right: 1%;
      background: none;
      border: none;
    }
    button:hover{
      color: red;
    }
    @media only screen and (max-width:400px){
      button{
        right: 3%;
      }
    }
  }
  input:focus   { background: none; outline:none; box-shadow: inset 0 -1px 0 #ddd; }
  input{
    background: none;
  }
  // hr
  .garis_bawah{
    position: relative;
    border-bottom: 2px #757575 solid;
    top:-2px;
    opacity: 0.2;
    transition: opacity 0.3s 0.2s;
  }

  .group:hover .garis_bawah{
    opacity: 0.5;
  }

  /* untuk label ======================================= */
  label      {
    color:#999; 
    font-size:20px;
    font-weight:normal;
    position:absolute;
    pointer-events:none;
    left:14px;
    top:10px;
    transition:0.2s ease all; 
    -moz-transition:0.2s ease all; 
    -webkit-transition:0.2s ease all;
  }

  
  input:focus ~ label, input:valid ~ label   {
    top:-30px;
    font-size:20px;
    color:#5264AE;
  }

  // class form control
  .form-control{
    display:block; 
    border:none; 
    border-bottom:0px solid #757575;
    background: none;
  }

  /* untuk garis bawah ================================= */
  .bar  { position:relative; display:block; }
  .bar:before, .bar:after  {
    content:'';
    height:2px; 
    width:0;
    bottom:0px; 
    position:absolute;
    background: #ca1bca; 
    transition:0.6s ease all; 
    -moz-transition:0.6s ease all; 
    -webkit-transition:0.6s ease all;
  }
  .bar:before {
    left:50%;
  }
  .bar:after {
    right:50%; 
  }

  input:focus ~ .bar:before, input:focus ~ .bar:after {
    width:50%;
  }

  /* untuk HIGHLIGHTER ================================== */
  .highlight {
    position:absolute;
    height:60%; 
    width:100px; 
    top:25%; 
    left:0;
    pointer-events:none;
    opacity:0.5;
  }

  input:focus ~ .highlight {
    -webkit-animation:inputHighlighter 0.3s ease;
    -moz-animation:inputHighlighter 0.3s ease;
    animation:inputHighlighter 0.3s ease;
  }

  /* membuat animasi ================ */
  @-webkit-keyframes inputHighlighter {
   from { background:#5264AE; }
    to  { width:0; background:transparent; }
  }
  @-moz-keyframes inputHighlighter {
   from { background:#5264AE; }
    to  { width:0; background:transparent; }
  }
  @keyframes inputHighlighter {
   from { background:#5264AE; }
    to  { width:0; background:transparent; }
  }

</style>
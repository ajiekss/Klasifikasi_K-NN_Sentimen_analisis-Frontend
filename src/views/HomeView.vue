<template>
   <div class="home">
    <!-- ======= Hero Section ======= -->
    <section id="hero" class="d-flex flex-column justify-content-center">
      <div class="container" data-aos="zoom-in" data-aos-delay="100">
        <h1 class="judul" v-for="dj in dataJudul">{{ dj.judul }}</h1>
        <p>
          {{ subJudul }}
          <span class="typed-text">{{ typeValue }}</span>
          <span class="cursor" :class="{'typing': typeStatus}">&nbsp;</span>
        </p>
        <div class="social-links">
          <router-link class="btn-a" type="button" to="/klasifikasi">Show Classification</router-link>
        </div>
      </div>
    </section>
    <!-- End Hero -->
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data: () =>{
    return {
      dataJudul: [],
      subJudul:'',
      typeValue: '',
      typeStatus: false,
      typeArray: [],
      typingSpeed: 200,
      erasingSpeed: 100,
      newTextDelay: 2000,
      typeArrayIndex: 0,
      charIndex: 0
    }
  },
  methods: {
    getDataJudul(){
      const path = 'http://localhost:5000/Judul'
      axios.get(path).then((res) => {
        this.dataJudul = res.data.dataJudul;
        const data = this.dataJudul[0]['dataType']
        this.typeArray = data.split(",")
        this.subJudul = this.dataJudul[0]['subjudul']
      })
      .catch((error) => {
      })
    },
    typeText() {
      
      if(this.charIndex < this.typeArray[this.typeArrayIndex].length){
        if(!this.typeStatus)
          this.typeStatus = true;
        
        this.typeValue += this.typeArray[this.typeArrayIndex].charAt(this.charIndex);
        this.charIndex += 1;

        setTimeout(this.typeText, this.typingSpeed);
      } 
      else {
        this.typeStatus = false;
        setTimeout(this.eraseText, this.newTextDelay);
      }
    },
    eraseText() {
      if(this.charIndex > 0){
        if(!this.typeStatus)
          this.typeStatus = true;

          this.typeValue = this.typeArray[this.typeArrayIndex].substring(0, this.charIndex - 1);
          this.charIndex -= 1;
          setTimeout(this.eraseText, this.erasingSpeed);
      }
      else{
        this.typeStatus = false;
        this.typeArrayIndex += 1;
        if(this.typeArrayIndex >= this.typeArray.length)
          this.typeArrayIndex = 0;

        setTimeout(this.typeText, this.typingSpeed + 1000);
      }
    }
  },
  created() {
    setTimeout(this.typeText, this.newTextDelay + 200);
    this.getDataJudul()
  }
}
</script>

<style lang="scss" scoped>

h1.judul{
  text-transform: capitalize;
}

span.typed-text{
  color: rgb(245, 27, 7);
}

span.cursor{
  display: inline-block;
  margin-left: 3px;
  width: 4px;
  background-color: black;
  animation: cursorBlink 1s infinite;
}

span.cursor.typing{
  animation:none;
}

@keyframes cursorBlink{
  49%{ background-color: #fff;}
  50%{ background-color: transparent;}
  99%{ background-color: transparent;}
}
.btn-a{
  text-decoration: none;
}
</style>


<template>
    <!-- ======= Footer ======= -->
    <footer id="footer">
      <div class="container">
        <div class="copyright">
          Copyright &copy; <strong><span>{{ footer }}</span></strong
          >
        </div>
      </div>
    </footer>
    <!-- End Footer -->
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      footer: ''
    }
  },
 methods: {
  getdataFooter(){
    const path = 'http://localhost:5000/Footer'
    axios.get(path)
    .then(res => {
      this.footer = res.data.dataFooter[0].username_profile
    })
    .catch(err =>{

    })
  }
 },
  created() {
    this.getdataFooter()
  }
}
</script>

<style lang="scss" scoped>
#footer{
  width: 100%;
	height: 1px;
	display: flex;
	justify-content: center;
	align-items: center;
	background: rgb(248, 27, 3);
	color:#ffffff;
	text-transform: uppercase;
	position: fixed;
	bottom: -0px;
	z-index: 1;
}
</style>
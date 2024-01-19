<template>
  <header id="header" class="d-flex flex-column justify-content-center">
    <nav id="navbar" class="navbar nav-menu">
      <ul id="nav">
        <li>
          <router-link to="/" class="nav-link scrollto"
            ><i class='bx bx-home bx-tada-hover'></i><span>Home</span></router-link
          >
        </li>
        <li>
          <router-link to="/klasifikasi" class="nav-link scrollto"
            ><i class="bx bx-file-find bx-tada-hover"></i
            ><span>Klasifikasi</span></router-link
          >
        </li>
      </ul>
    </nav>
  </header>
</template>


<style>
#nav a.router-link-exact-active {
  color: white;
  background-color: #ee6102;
}
</style>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Admin Motor Teres App
        </q-toolbar-title>

        <div>
          <q-btn @click="logout" icon="logout" flat round/>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above content class="bg-orange-2">
      <q-list>
        <q-item-label
          header
        >
          Menu Utama
        </q-item-label>
        <q-item
        clickable
        :to="{name: 'dashboardAdmin'}"
        >

        <q-item-section avatar>
          <q-icon name="grid_view"/>
        </q-item-section>
        <q-item-section>
          <q-item-label>Dasboard</q-item-label>
        </q-item-section>
        </q-item>
        <q-item
        clickable
        :to="{name: 'dataTipeAdmin'}"
        >

        <q-item-section avatar>
          <q-icon name="category"/>
        </q-item-section>
        <q-item-section>
          <q-item-label>Data Tipe</q-item-label>
        </q-item-section>
        </q-item>
        <q-item
        clickable
        :to="{name: 'dataMotorAdmin'}"
        >

        <q-item-section avatar>
          <q-icon name="circle"/>
        </q-item-section>
        <q-item-section>
          <q-item-label>Data Motor</q-item-label>
        </q-item-section>
        </q-item>    

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { Cookies } from 'quasar'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const leftDrawerOpen = ref(false)
const router = useRouter()

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const logout = () => {
  Cookies.remove('dataUser')
  router.push({
    name: 'loginPage'
  })
}
</script>

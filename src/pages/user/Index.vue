<template>
  <q-page padding>
    <div class="text-h6 text-orange-grey-14">Daftar Harga Motor</div>
    <div class="row q-mt-md">
      <div class="col-4" v-for="(data, i) in datas" :key="i">
      <q-card flat class="q-px-md">
        <q-img :src="`${baseURL}/img/motor/${data.gambar}`"/>
        <q-card-section>
          <div class="text-body1">{{ data.merek }}</div>

          <div class="text-bold">{{ formatPrice(data.harga) }}</div>
          <div class="text-body2">{{ data.tipe_motor_tipeTotipe.jenis }}</div>
          <div class="text- caption ellipsis-2-lines">{{ data.keterangan }}</div>
          <div class="row q-mt-sm justify-between q-gutter-x-sm">
            <q-btn @click="openDialog(data)" class="col-9" label="Beli" outline icon="shopping_bag"/>
            <q-btn class="col-2" unelevated color="dark" outline icon="share"/>
          </div>
        </q-card-section>
      </q-card>
      </div>
    </div>
    <q-dialog
      v-model="dialogPembayaran"
      v-if="activeData !== null"
    >
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Pembayaran</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
            <q-form ref="formPembayaran" @submit="onSubmit">
              <div>{{ activeData.merek }} - {{ activeData.harga }}</div>
              <q-input
              v-model="jumlah"
              :rules="[
                val => val > 0 || 'Mohon isi dengan benar'
              ]"
              />
              <div class="q-mt-sm">Total {{ jumlah * activeData.harga }}</div>
            </q-form>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat color="primary" label="Cancel" v-close-popup />
          <q-btn unelevated label="Save" @click="formPembayaran.submit()" color="primary"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script setup>
import { Notify } from 'quasar'
import { api, baseURL } from 'src/boot/axios'
import { formatPrice } from 'src/helper/FormatPrice'
import { getProfile } from 'src/helper/Profile'
import { onMounted, ref } from 'vue'

const datas = ref([])
const dialogPembayaran = ref(false)
const activeData = ref(null)
const jumlah = ref(0)
const formPembayaran = ref()

onMounted(() => getData())

const getData = async () => {
  try {
    const res = await api.get('motor/get-all')
    datas.value = res.data.data
  } catch (error) {

  }
}

const openDialog = (data) => {
  activeData.value = data
  dialogPembayaran.value = true
}

const onSubmit = async (data) => {
  try {
    const res = await api.post('pembayaran/insert', {
      idPengguna: getProfile().username,
      idMotor: activeData.value.id_motor,
      harga: activeData.value.harga,
      jumlah: jumlah.value,
      total: activeData.value.harga * jumlah.value
    })
    if (res.data.status) {
      Notify.create({
        message: res.data.msg,
        color: 'positive'
      })
      dialogPembayaran.value = false
    }
    console.log(res)
  } catch (error) {

  }
}
</script>

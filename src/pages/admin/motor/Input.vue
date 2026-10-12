<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class="text-h6 q-mb-md">Form Input Motor</div>
        <q-form @submit="onSubmit">
         <q-input
         v-model="form.merek"
         label="Merek"
         outlined
         dense
         :rules="[val => val !== '' || 'Mohon Isi']"
         />
         <q-input
         v-model="form.harga"
         label="Harga"
         outlined
         dense
         :rules="[val => val > 0 || 'Mohon Isi']"
         />
         <q-select
         v-model="tipeSelected"
         :options="listTipe"
         label="Pilih Tipe"
         outlined
         dense
         option-value="idTipe"
         option-label="jenis"
         :rules="[val => val || 'Mohon Pilih']"
         />

         <q-input
         v-model="form.keterangan"
         label="keterangan"
         outlined
         dense
         type="textarea"
         :rules="[val => val !== '' || 'Mohon isi']"
         />
        <q-file accept=".jpg, image/*" outlined v-model="gambar" label="Poster Image" :rules="[val => val !== null || 'Mohon Pilih']">
            <template v-slot:prepend>
              <q-icon name="attach_file" />
            </template>
          </q-file>
         <q-btn type="submit" label="Simpan" unelevated color="primary" no-caps/>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script setup>
import { Notify } from 'quasar'
import { api } from 'src/boot/axios'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const form = ref({
  merek: '',
  harga: 0,
  tipe: 0,

  keterangan: ''
})
const tipeSelected = ref(null)
const listTipe = ref([])
const gambar = ref(null)
const router = useRouter()

onMounted(() => {
  getTipe()
})

const getTipe = async () => {
  try {
    const res = await api.get('tipe/get')
    if (res.data.status) {
      listTipe.value = res.data.data
    }
  } catch (error) {
    console.log(error)
    Notify.create({
      message: 'Terjadi Kesalahan',
      color: 'negative'
    })
  }
}

const onSubmit = async () => {
  try {
    
    const formData = new FormData()
    formData.append('gambar', gambar.value)
    formData.append("merek", form.value.merek)
    formData.append("harga", form.value.harga)
    formData.append("tipe", tipeSelected.value.idTipe)

    formData.append("keterangan", form.value.keterangan)
    const res = await api.post('motor/insert', formData)
    console.log(res)
    if (res.data.status) {
      Notify.create({
        message: res.data.msg,
        color: 'positive'
      })
      router.back()
    } else {
      Notify.create({
        message: res.data.msg,
        color: 'negative'
      })
    }
  } catch (error) {
    console.log(error)
    Notify.create({
      message: 'Terjadi Kesalahan',
      color: 'negative'
    })
  }
}

</script>

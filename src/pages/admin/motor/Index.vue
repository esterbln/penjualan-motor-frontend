<template>
  <q-page padding>
    <q-table
      flat
      bordered
      title="Penjualan Motor Teres"
      :rows="rows"
      :columns="columns"
      row-key="name"
    >
    <template v-slot:top-right>
      <q-btn :to="{name: 'inputDataMotorAdmin'}" label="Tambah" uneleveted icon="add" no-caps color="primary"/>
    </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="merek" :props="props">
            {{ props.row.merek }}
          </q-td>
          <q-td key="harga" :props="props">
              {{ props.row.harga }}
          </q-td>

          <q-td key="keterangan" :props="props">
            <div class="ellipsis" style="width: 5em;">
              {{ props.row.keterangan }}
            </div>
          </q-td>
            <q-td key="gambar" :props="props">
              <q-img
              :src="`${baseURL}/img/motor/${props.row.gambar}`"
              />
          </q-td>
          <q-td key="action" :props="props">
            <div class="row q-gutter-x-sm">
              <q-btn :to="{name:'editDataMotorAdmin', params: {id: props.row.id_motor}}" label="Edit" color="warning" unelevated icon="edit" no-caps/>
              <q-btn @click="deleteMotor(props.row.id_motor)" label="Delete" color="negative" unelevated icon="delete" no-caps/>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>
<script setup>
import { Notify, useQuasar } from 'quasar'
import { api, baseURL } from 'src/boot/axios'
import { onMounted, ref } from 'vue'

const rows = ref([])
const columns = [
  { name: 'merek', align: 'left', label: 'Merek', field: 'merek', sortable: true },
  { name: 'harga', align: 'left', label: 'Harga', field: 'harga', sortable: true },

  { name: 'keterangan', align: 'left', label: 'Keterangan', field: 'keterangan', sortable: true },
  { name: 'gambar', align: 'left', label: 'Gambar', field: 'gambar', sortable: true },
  { name: 'action', align: 'left', label: 'Action', field: 'action', sortable: true }
]
const q = useQuasar()

onMounted(() => getData())

const getData = async () => {
  try {
    const res = await api.get('motor/get-all')
    if (res.data.status) {
      rows.value = res.data.data
    }
  } catch (error) {

  }
}

const deleteMotor = (id) => {
  q.dialog({
    title: 'Konfirmasi',
    message: 'Apakah kamu yakin ingin menghapus data?',
    cancel: true,
    persistent: true
  }).onOk(async () => {
    try {
      const res = await api.delete(`motor/delete/${id}`)
      if (res.data.status) {
        Notify.create({
          message: res.data.msg,
          color: 'positive'
        })
        getData()
      } else {
        Notify.create({
          message: res.data.msg,
          color: 'negative'
        })
      }
    } catch (error) {
      Notify.create({
        message: 'Terjadi Kesalahan',
        color: 'negative'
      })
    }
  })
}
</script>

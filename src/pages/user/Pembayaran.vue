<template>
  <q-page padding>
    <q-table
      flat
      bordered
      title="Pembayaran Anda"
      :rows="rows"
      :columns="columns"
      row-key="name"
      :loading="loading"
    >
      <template v-slot:body="props">
       <q-tr :props="props">
          <q-td key="idPembayaran" :props="props">
            {{ props.row.idPembayaran }}
          </q-td>
          <q-td key="motor" :props="props">
              {{ props.row.motor.merek }}
          </q-td>
          <q-td key="jumlah" :props="props">
              {{ props.row.jumlah }}
          </q-td>
          <q-td key="harga" :props="props">
              {{ formatPrice(props.row.harga) }}
          </q-td>
          <q-td key="total" :props="props">
              {{ formatPrice(props.row.total) }}
          </q-td>
          <q-td key="status" :props="props">
            <q-badge class="q-pa-sm" :color="props.row.status === 1 ? 'negative' : 'positive'">
              {{ props.row.status === 1 ? 'Unconfirmed' : 'Confirmed' }}
            </q-badge>
          </q-td>
          </q-tr>
          </template>
          </q-table>
  </q-page>
</template>
<script setup>
import { api } from 'src/boot/axios'
import { formatPrice } from 'src/helper/FormatPrice'
import { getProfile } from 'src/helper/Profile'
import { onMounted, ref } from 'vue'

const columns = [
  { name: 'idPembayaran', align: 'left', label: 'ID Pembayaran', field: 'idPembayaran', sortable: true },
  { name: 'motor', align: 'left', label: 'Motor', field: 'motor', sortable: true },
  { name: 'jumlah', align: 'left', label: 'Jumlah', field: 'jumlah', sortable: true },
  { name: 'harga', align: 'left', label: 'Harga', field: 'harga', sortable: true },
  { name: 'total', align: 'left', label: 'Total', field: 'total', sortable: true },
  { name: 'status', align: 'left', label: 'Status', field: 'status', sortable: true }
]
const rows = ref([])
const loading = ref(true)

onMounted(() => getData())

const getData = async () => {
  try {
    loading.value = true
    const res = await api.get(`pembayaran/get/${getProfile().username}`)
    console.log(res)
    rows.value = res.data.data
  } finally {
    loading.value = false
  }
}
</script>

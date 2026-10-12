<template>
  <q-page padding>
    <q-table
      flat
      bordered
      title="Daftar Tipe Motor"
      :rows="rows"
      :columns="columns"
      row-key="name"
    >
    <template v-slot:top-right>
      <q-btn @click="openDialog()" label="Tambah" uneleveted icon="add" no-caps color="primary"/>
    </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props">
            {{ props.row.idTipe }}
          </q-td>
          <q-td key="jenis" :props="props">
            <q-badge color="green">
              {{ props.row.jenis }}
            </q-badge>
          </q-td>
          <q-td key="action" :props="props">
            <div class="row q-gutter-x-sm">
              <q-btn @click="openDialog(true, props.row)" label="Edit" color="warning" unelevated icon="edit" no-caps/>
              <q-btn @click="deleteTipe(props.row.idTipe)" label="Delete" color="negative" unelevated icon="delete" no-caps/>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-dialog
      v-model="formDialog"
    >
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">{{ editMode ? 'Edit' : 'Add' }} Tipe</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form @submit="onSubmit" ref="formTipe">
            <q-input
              v-model="jenis"
              label="Jenis"
              outlined
              :rules="[
                val => val !== '' || 'Mohon isi'
              ]"
            />
          </q-form>
        </q-card-section>

        <q-card-actions align="right" class="bg-white">
          <q-btn flat label="Batal" no-caps v-close-popup />
          <q-btn label="Simpan" @click="formTipe.submit()" color="primary" no-caps unelevated/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script setup>
import { Notify, useQuasar } from 'quasar'
import { api } from 'src/boot/axios'
import { onMounted, ref } from 'vue'

const columns = [
  { name: 'id', align: 'left', label: 'ID Tipe', field: 'id', sortable: true },
  { name: 'jenis', align: 'left', label: 'Jenis', field: 'jenis', sortable: true },
  { name: 'action', align: 'left', label: 'Action', field: 'action', sortable: true }
]
const rows = ref([])
const formDialog = ref(false)
const jenis = ref('')
const idActive = ref(0)
const editMode = ref(false)
const formTipe = ref()
const q = useQuasar()

onMounted(() => getData())

const getData = async () => {
  try {
    const res = await api.get('tipe/get')
    console.log(res)
    if (res.data.status) {
      rows.value = res.data.data
    }
  } catch (error) {
    Notify.create({
      message: 'Terjadi Kesalahan',
      color: 'negative'
    })
  }
}

const openDialog = (isEdit = false, data) => {
  jenis.value = ''
  if (isEdit) {
    editMode.value = isEdit
    jenis.value = data.jenis
    idActive.value = data.idTipe
  }
  formDialog.value = true
}
const onSubmit = async () => {
  if (editMode.value) {
    try {
      const res = await api.put(`tipe/edit/${idActive.value}`, {
        jenis : jenis.value
      })
      if (res.data.status) {
        Notify.create({
          message: res.data.msg,
          color: 'positive'
        })
        resetForm()
        formDialog.value = false
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
  } else {
    try {
      const res = await api.post('tipe/insert', {
        jenis: jenis.value
      })
      if (res.data.status) {
        Notify.create({
          message: res.data.msg,
          color: 'positive'
        })
        resetForm()
        formDialog.value = false
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
  }
}

const resetForm = () => {
  editMode.value = false
  formDialog.value = false
  idActive.value = 0
  jenis.value = ''
}

const deleteTipe = (id) => {
  q.dialog({
    title: 'Konfirmasi',
    message: 'Anda Yakin Ingin Menghapus Data Ini?',
    cancel: true,
    persistent: true
  }).onOk(async () => {
    try {
      const res = await api.delete(`tipe/delete/${id}`)
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

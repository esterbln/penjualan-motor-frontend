<template>
  <q-page>
    <h2>{{ nama }}</h2>
    <q-input
    v-model="nama"
    />
    <q-btn
    @click="onSubmit"
    label="Klik Aku Dong"
    color="orange-3"
    class="my-btn"
    />
  </q-page>
</template>
<script setup>
import { onMounted, ref } from 'vue'

const nama = ref('')

nama.value = 'Ester Belen Wijaya'

const onSubmit = () => {
  alert('kamu klik nih')
}

onMounted(() => {
  onSubmit()
})
</script>
<style lang="sass" scoped>
.my-btn
  background-color: orange-3 !important
</style>

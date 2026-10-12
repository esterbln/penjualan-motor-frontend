<template>
  <q-layout>
    <q-page-container class="bg-orange-3">
      <q-page padding class="row items-center justify-center">
        <div class="row full-width">
          <div class="col-md-4 offset-md-4 offset-sm-3 col-sm-6 col-xs-12">
            <q-card>
              <q-card-section>
                <div class="text-h6 text-primary">Register</div>
                <div class="text caption">Silahkan Masukan Data Diri Anda!</div>
                <q-form @submit="onSubmit">
                  <q-input
                    v-model="form.username"
                    label="Masukan Username Anda"
                  />
                  <q-input
                    v-model="form.fullname"
                    label="Fullname"
                  />
                  <q-input
                    v-model="form.email"
                    label="E-mail"
                  />
                  <q-input
                    v-model="form.password"
                    type="password"
                    label="Masukan Password Anda"
                  />
                  <q-input
                    v-model="form.noTelp"
                    label="Nomor Telepon"
                  />
                  <q-btn
                    label="Registrasi"
                    class="q-mt-md full-width"
                    unelevated
                    color="orange-5"
                    no-caps
                    type="submit"
                  />
                  <q-btn
                    label="Login"
                    class="q-mt-md full-width"
                    outline
                    :to="{name: 'loginPage'}"
                    color="orange-5"
                  />
                </q-form>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script setup>
import { api } from 'src/boot/axios'
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const q = useQuasar()
const form = ref({
  // object pasangan key dan value
  username: '',
  password: '',
  fullname: '',
  email: '',
  noTelp: ''
})

const onSubmit = async () => {
  try {
    const res = await api.post('pengguna/register', {
      ...form.value
    })
    console.log(res)
    if (res.data.status) {
      q.notify({
        message: res.data.msg,
        color: 'positive'
      })
    } else {
      q.notify({
        message: res.data.msg,
        color: 'negative'
      })
    }
  } catch (error) {

  }
}
</script>

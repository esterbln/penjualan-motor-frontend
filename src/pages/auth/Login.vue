<template>
  <q-layout>
    <q-page-container class="bg-orange-3">
      <q-page padding class="row items-center justify-center">
        <div class="row full-width">
          <div class="col-md-4 offset-md-4 offset-sm-3 col-sm-6 col-xs-12">
            <q-card>
              <q-card-section>
                <q-form @submit="onLogin">
                  <div class="text-h6 text-primary">Login</div>
                  <div class="text caption">Masukan Username dan Password</div>
                  <q-input
                    v-model="username"
                    label="Masukan Username Anda"
                    :rules="[
                      val => val !== ''  || 'Mohon isi'
                    ]"
                    />
                    <q-input
                    v-model="password"
                    label="Masukan Password Anda"
                    :rules="[
                      val => val !== ''  || 'Mohon isi'
                    ]"
                    />
                  <q-btn
                    no-caps
                    label="Login"
                    unelevated
                    class="q-mt-md full-width"
                    color="orange-5"
                    type="submit"
                  />
                    <q-btn
                    no-caps
                    label="Register"
                    outline
                    :to="{name: 'registerPage'}"
                    class="q-mt-md full-width"
                    color="orange-5"
                    type="submit"
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
import { useQuasar } from 'quasar'
import { api } from 'src/boot/axios'
import { all } from 'src/helper/ListAkses'
import { setProfile } from 'src/helper/Profile'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const q = useQuasar()
const router = useRouter()

const onLogin = async () => {
  try {
    const res = await api.post('pengguna/login', {
      username: username.value,
      password: password.value
    })
    if (res.data.status) {
      q.notify({
        messege: res.data.msg,
        color: 'positive'
      })

      const dataUser = res.data.data
      const adaUser = all.find(r => r.value === dataUser.role)

      if (adaUser) {
        setProfile(dataUser)
        router.push({
          name: adaUser.index
        })
      } else {
        q.notify({
          messege: 'Mohon maaf akses dilarang',
          color: 'negative'
        })
      }
    } else {
      q.notify({
        messege: res.data.msg,
        color: 'negative'
      })
    }
  } catch (error) {
  }
}
</script>

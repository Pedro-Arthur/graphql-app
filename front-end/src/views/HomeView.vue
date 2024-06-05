<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'

interface IAddress {
  city: string
  state: string
  country: string
}

interface IUser {
  id: number
  name: string
  email: string
  age: number
  addresses: IAddress[]
}

const usersRest = ref<IUser[]>([])
const usersGraphql = ref<Partial<IUser>[]>([])

onMounted(async () => {
  try {
    const responseGraphql = await axios.post('http://localhost:3000/api/graphql', {
      query: `
          query {
            users {
              id
              name
              addresses {
                country
              }
            }
          }
        `
    })
    usersGraphql.value = responseGraphql.data.data.users

    const responseRest = await axios.get('http://localhost:3000/api/users')
    usersRest.value = responseRest.data
  } catch (error) {
    console.error('Erro ao buscar dados:', error)
  }
})
</script>

<template>
  <div>
    <h2>Usuários Graphql</h2>
    <ul>
      <li v-for="(user, index) in usersGraphql" :key="index">
        {{ user }}
      </li>
    </ul>

    <h2>Usuários REST</h2>
    <ul>
      <li v-for="(user, index) in usersRest" :key="index">
        {{ user }}
      </li>
    </ul>
  </div>
</template>

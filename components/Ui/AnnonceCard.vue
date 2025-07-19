<script setup>
import { computed } from 'vue'

const props = defineProps({
  annonce: {
    type: Object,
    default: () => ({}),
  },
  isFavorite: Boolean,
})

defineEmits(['toggle-favorite'])

const location = computed(() => {
  return ''
})

const seller = computed(() => {
  const email = props.annonce?.user?.email
  if (typeof email !== 'undefined') return `${email}`
  return ''
})

// const seller = computed(() => {
//   const prenom = props.annonce?.utilisateur?.prenom
//   const email = props.annonce?.utilisateur?.email
//   if (prenom && typeof note !== 'undefined') return `${prenom} - ${email}`
//   if (prenom) return prenom
//   if (typeof email !== 'undefined') return `${email}`
//   return ''
// })
</script>

<template>
  <div class="card">
    <img :src="annonce.photos?.[0]" alt="photo" class="card-img" />
    <div class="card-body">
      <div class="card-title">{{ annonce.titre }}</div>
      <div class="card-location">{{ location }}</div>
      <div class="card-footer">
        <div class="card-user">{{ seller }}</div>
        <div class="card-price">{{ annonce.prix }}€</div>
      </div>
    </div>
    <div class="card-heart" @click="$emit('toggle-favorite', annonce)">
      <span :class="{ active: isFavorite }">❤️</span>
    </div>
  </div>
</template>

<style scoped>
.card {
  position: relative;
  width: 180px;
  border-radius: 10px;
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.card-img {
  width: 100%;
  height: 110px;
  object-fit: cover;
}
.card-body {
  padding: 10px;
}
.card-title {
  font-weight: bold;
}
.card-location {
  font-size: 0.85rem;
  color: #777;
}
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  margin-top: 5px;
}
.card-user {
  color: #444;
}
.card-price {
  color: #008f24;
  font-weight: bold;
}
.card-heart {
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 1.2rem;
  cursor: pointer;
}
.card-heart span.active {
  color: orange;
}
</style>

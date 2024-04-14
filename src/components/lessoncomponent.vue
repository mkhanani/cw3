<template>
  <div class="lesson-container">
    <!-- Loop through lessons -->
    <div v-for="lesson in lessons" :key="lesson._id" class="lesson"> <!-- Make sure the key is using lesson._id -->
      <!-- Lesson information -->
      <figure>
        <img :src="lesson.image" alt="Lesson Image"> <!-- Adjust the src binding to point to the correct image URL -->
      </figure>
      <h2>{{ lesson.title }}</h2>
      <p v-html="lesson.description"></p>
      <p>Price: {{ lesson.price }}</p>
      <p>Spaces: {{ lesson.spaces }}</p>
      <p>Location: {{ lesson.location }}</p>
      <!-- Display 'Add to Cart' button based on availability -->
      <button @click="addToCart(lesson)" :disabled="!canAddToCart(lesson)">Add To Cart</button>
      <!-- Show availability message -->
      <span v-if="lesson.spaces === 0">All Out!</span>
      <span v-else-if="lesson.spaces < 10">Only {{ lesson.spaces }} left!</span>
      <span v-else>Buy Now!</span>
      <!-- Display lesson ratings -->
      <div>
        <span v-for="n in lesson.rating" :key="n">★</span> <!-- Make sure the logic for showing stars is correct -->
        <span v-for="n in 5 - lesson.rating" :key="n">☆</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LessonComponent',
  props: ['lessons'], // Only expect lessons as prop
  methods: {
    addToCart(products) {
      // Emit event to add lesson to cart
      this.$emit('add-to-cart', products);
    },
    canAddToCart(products) {
      return products.spaces > 0; // Adjusted logic to check if there are spaces available
    },
    cartCount(id) {
      let count = 0;
      for (let i = 0; i < this.cart.length; i++) {
        if (this.cart[i] === id) {
          count++;
        }
      }
      return count;
    }
  }
}
</script>

<style scoped>
/* Include the styles from styles.css */
.lesson-container {
  text-align: center;
  margin-top: 20px;
}

.product {
  box-sizing: border-box;
  width: 30%;
  margin: 1%;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  display: inline-block;
  vertical-align: top;
}

.product figure {
  margin: 0;
}

.product img {
  width: 100%;
  height: auto;
  border-radius: 5px;
}

.product h2 {
  margin-top: 0;
}

.product button {
  background-color: #1ea5da;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  cursor: pointer;
}

.product button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.product span {
  display: block;
  margin-top: 5px;
}

.product div {
  margin-top: 10px;
}

.product div span {
  color: #f44336;
}

.product div span:last-child {
  color: #4caf50;
}

</style>

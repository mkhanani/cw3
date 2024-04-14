<template>
  <div id="app">
    <header>
      <h1>{{ sitename }}</h1>
      <button @click="showCheckout">
        {{ cartItemCount }} <span class="fas fa-cart-plus"></span> Checkout
      </button>
    </header>
    <main>
      <lesson-component
        v-if="showProduct"
        :lessons="products"
        @add-to-cart="addToCart"
      ></lesson-component>
      <checkout-component
        v-else
        :cart="cart"
        :products="products"
        @back-to-lessons="showCheckout"
        @remove-from-cart="handleRemoveFromCart"
      ></checkout-component>
    </main>
  </div>
</template>

<script>
import LessonComponent from './components/lessoncomponent.vue';
import CheckoutComponent from './components/checkoutcomponent.vue';

export default {
  name: 'App',
  components: {
    LessonComponent,
    CheckoutComponent,
  },
  data() {
    return {
      sitename: 'Learn Lounge - After School Classes',
      showProduct: true,
      products: [],
      cart: [],
    };
  },
  methods: {
    addToCart(product) {
      const cartItem = this.cart.find(item => item.id === product.id);
      if (cartItem) {
        cartItem.quantity++;
      } else {
        this.cart.push({...product, quantity: 1});
        this.updateLessonSpaces(product.id, -1);
      }
    },
    showCheckout() {
      this.showProduct = !this.showProduct;
    },
    removeFromCart(productId) {
      const cartItemIndex = this.cart.findIndex(item => item.id === productId);
      if (cartItemIndex > -1) {
        this.updateLessonSpaces(productId, this.cart[cartItemIndex].quantity);
        this.cart.splice(cartItemIndex, 1);
      }
    },
    handleRemoveFromCart(productId) {
      const index = this.cart.findIndex(item => item.id === productId);
      if (index !== -1) {
        const newCart = [...this.cart];
        newCart.splice(index, 1);
        this.cart = newCart;
      }
    },
    fetchLessons() {
      fetch('http://localhost:3000/collection/lessons')
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          this.products = data;
        })
        .catch(error => console.error('Error fetching lessons:', error));
    },
    updateLessonSpaces(lessonId, change) {
      const lesson = this.products.find(p => p.id === lessonId);
      if (lesson) {
        const newSpaces = lesson.spaces + change;
        fetch(`http://localhost:3000/collection/lessons/${lessonId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ spaces: newSpaces })
        })
        .then(response => response.json())
        .then(() => {
          lesson.spaces = newSpaces;  // Update the client side data
        })
        .catch(error => console.error('Error updating lesson spaces:', error));
      }
    },
  },
  mounted() {
    this.fetchLessons();
  },
  computed: {
    cartItemCount() {
      return this.cart.reduce((count, item) => count + item.quantity, 0);
    },
  },
};
</script>

<style scoped>
/* Your styles */
header {
  text-align: center;
  background-image: radial-gradient(circle, #06bdc7 0%, #008cff 100%);
  color: #fff;
  padding: 10px;
  font-family: 'Bradley Hand', cursive;
}

header h1 {
  margin: 0;
}

header button {
  background-color: #1ea5da;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  cursor: pointer;
}

header button span {
  margin-right: 5px;
}

.lesson-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Adjust minmax for your desired card size */
  grid-gap: 20px; /* Space between cards */
  padding: 20px;
  border: #000000;
  border-radius: 10px;
}

.product {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  background-color: #fff;
}

/* Add other styles for alignment, fonts, etc. */

</style>

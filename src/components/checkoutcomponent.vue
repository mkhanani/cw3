<template>
  <div class="checkout-container">
    <h2>Checkout</h2>
    <div class="cart-items">
      <h3>Cart Items</h3>
      <div v-if="cart.length === 0">
        <p>Your cart is empty.</p>
      </div>
      <div v-else>
        <ul>
          <li v-for="item in cart" :key="item.id">
            {{ getProductById(item.id).title }} - {{ item.quantity }} x ${{ getProductById(item.id).price }}
            <button @click="emitRemoveFromCart(item.id)">Remove</button>
          </li>
        </ul>
      </div>
    </div>

    <form @submit.prevent="submitOrder" class="order-form">
      <div class="form-group">
        <label for="firstName">First Name:</label>
        <input type="text" id="firstName" v-model="order.firstName" required>
      </div>
      <div class="form-group">
        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" v-model="order.lastName" required>
      </div>
      <div class="form-group">
        <label for="address">Address:</label>
        <input type="text" id="address" v-model="order.address" required>
      </div>
      <div class="form-group">
        <label for="city">City:</label>
        <input type="text" id="city" v-model="order.city" required>
      </div>
      <div class="form-group">
        <label for="state">State:</label>
        <select id="state" v-model="order.state" required>
          <option v-for="(name, code) in states" :key="code" :value="code">{{ name }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="zip">Zip/Postal Code:</label>
        <input type="number" id="zip" v-model.number="order.zip" required>
      </div>
      <div class="form-group">
        <label for="gift">Ship as Gift?</label>
        <select id="gift" v-model="order.sendGift" required>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div class="form-group">
        <label for="method">Delivery Location:</label>
        <select id="method" v-model="order.method" required>
          <option value="Home">Home</option>
          <option value="Business">Business</option>
        </select>
      </div>
      <button type="submit" class="btn-submit">Place Order</button>
    </form>
    <button @click="$emit('back-to-lessons')">Back to Lessons</button>
  </div>
</template>

<script>
export default {
  name: 'CheckoutComponent',
  props: {
    cart: Array,
    products: Array
  },
  data() {
    return {
      order: {
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        sendGift: 'No',
        method: 'Home',
      },
      states: {
        NH: 'Nahda',
        DG: 'Discovery Gardens',
        MR: 'Mirdiff',
        KV: 'Knowledge Village',
        GD: 'Garhoud',
        DA: 'Deira'
      }
    };
  },
  methods: {
    getProductById(productId) {
      return this.products.find(product => product.id === productId) || {};
    },
    emitRemoveFromCart(productId) {
      this.$emit('remove-from-cart', productId);
    },
    submitOrder() {
      console.log('Order submitted:', this.order);
      alert('Order placed successfully!');
      this.resetOrderForm();
    },
    resetOrderForm() {
      this.order = {
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        sendGift: 'No',
        method: 'Home',
      };
    }
  }
};
</script>

<style scoped>
.checkout-container {
  padding: 20px;
}

.form-group {
  margin-bottom: 10px;
}

.btn-submit {
  background-color: #4CAF50; /* Green */
  color: white;
  padding: 15px 32px;
  text-align: center;
  display: inline-block;
  font-size: 16px;
  margin-top: 10px;
  cursor: pointer;
}

.btn-submit:hover {
  background-color: #45a049;
}

/* Additional styles as required */
</style>

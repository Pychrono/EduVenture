
console.log('Vue instance initialized')
new Vue({
  el: "#app",
  data() {
    return {
      searchQuery: '',
      viewActivities: true,
      classes: [
        {
          id: 1,
          title: "English Language",
          location: "Brent",
          price: 50,
          totalSpaces: 5,
          availableSpaces: 5,
          addedToCart: false,
          purchasedSpaces: 0,
          disableAddToCart: false,
          image: "https://images.unsplash.com/photo-1455540904194-fc101941273a?auto=format&fit=crop&q=60&w=900&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZW5nbGlzaHxlbnwwfHwwfHx8MA%3D%3D"
        },
        {
          id: 2,
          title: "Football Training",
          location: "Hendon",
          price: 70,
          totalSpaces: 5,
          availableSpaces: 5,
          addedToCart: false,
          purchasedSpaces: 0,
          disableAddToCart: false,
          image: "https://images.unsplash.com/photo-1589487391730-58f20eb2c308?auto=format&fit=crop&q=60&w=900&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Zm9vdGJhbGx8ZW58MHx8MHx8fDA%3D"
        },
        {
          id: 3,
          title: "Mathematics",
          location: "Hackney",
          price: 150,
          totalSpaces: 5,
          availableSpaces: 5,
          addedToCart: false,
          purchasedSpaces: 0,
          disableAddToCart: false,
          image: "https://images.unsplash.com/photo-1613905780946-26b73b6f6e11?auto=format&fit=crop&q=60&w=900&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG1hdGhzfGVufDB8fDB8fHww"
        },
        {
          id: 4,
          title: "Music",
          location: "Hackney",
          price: 50,
          totalSpaces: 5,
          availableSpaces: 5,
          addedToCart: false,
          purchasedSpaces: 0,
          disableAddToCart: false,
          image: "https://images.unsplash.com/photo-1485579149621-3123dd979885?auto=format&fit=crop&q=60&w=900&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG11c2ljfGVufDB8fDB8fHww"
        },
        {
          id: 5,
          title: "Dance Club",
          location: "Brent",
          price: 80,
          totalSpaces: 5,
          availableSpaces: 5,
          addedToCart: false,
          purchasedSpaces: 0,
          disableAddToCart: false,
          image: "https://images.unsplash.com/photo-1519925610903-381054cc2a1c?auto=format&fit=crop&q=60&w=900&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGRhbmNlfGVufDB8fDB8fHww"
        },
        {
          id: 6,
          title: "Chemisty",
          location: "Brent",
          price: 50,
          totalSpaces: 5,
          availableSpaces: 5,
          addedToCart: false,
          purchasedSpaces: 0,
          disableAddToCart: false,
          image: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&q=60&w=900&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hlbWlzdHJ5fGVufDB8fDB8fHww"
        },
        {
          id: 7,
          title: "Data Analysis",
          location: "Hendon",
          price: 90,
          totalSpaces: 5,
          availableSpaces: 5,
          addedToCart: false,
          purchasedSpaces: 0,
          disableAddToCart: false,
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=60&w=900&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGJ1c2luZXNzfGVufDB8fDB8fHww"
        },
        {
          id: 8,
          title: "Web Development",
          location: "Brent",
          price: 200,
          totalSpaces: 5,
          availableSpaces: 5,
          addedToCart: false,
          purchasedSpaces: 0,
          disableAddToCart: false,
          image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&q=60&w=900&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fHdlYiUyMGRldmVsb3BtZW50fGVufDB8fDB8fHww"
        },
        {
          id: 9,
          title: "Weight Lifting",
          location: "Hendon",
          price: 40,
          totalSpaces: 5,
          availableSpaces: 5,
          addedToCart: false,
          purchasedSpaces: 0,
          disableAddToCart: false,
          image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=60&w=900&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2VpZ2h0JTIwbGlmdGluZ3xlbnwwfHwwfHx8MA%3D%3D"
        },
        {
          id: 10,
          title: "Karate",
          location: "Karate Town",
          price: 120,
          totalSpaces: 0,
          availableSpaces: 5,
          addedToCart: false,
          purchasedSpaces: 0,
          disableAddToCart: false,
          image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&q=60&w=900&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a2FyYXRlfGVufDB8fDB8fHww"
        }
      ],
      cart: [],
    }
  },
  computed: {
    filteredItems: function () {
      const query = this.searchQuery.toLowerCase();
      return this.classes.filter(item => {
        return item.title.toLowerCase().includes(query) || item.location.toLowerCase().includes(query);
      });
    },
    totalCartItems() {
      return this.cart.length;
    }
    
  },
  methods: {
    changePage: function () {
      this.viewActivities = !this.viewActivities;
    },
    sortByPrice: function () {
      this.classes.sort((a, b) => a.price - b.price);
    },
    sortBySpaces: function () {
      this.classes.sort((a, b) => a.spaces - b.spaces);
    },
    addToCart(item) {
      const cartItem = this.cart.find(cartItem => cartItem.id === item.id);
      if (cartItem) {
        if (cartItem.purchasedSpaces < cartItem.totalSpaces) {
          cartItem.purchasedSpaces++;
        } else {
          alert("No more available spaces for this activity.");
        }
      } else {
        this.cart.push({
          ...item,
          addedToCart: true,
          purchasedSpaces: 1,
        });
      }
    },    
    removeFromCart(item) {
      const index = this.cart.indexOf(item);
      if (index !== -1) {
        this.cart.splice(index, 1);
        item.addedToCart = false; // Reset addedToCart flag
        item.availableSpaces++; // Increment availableSpaces
        item.purchasedSpaces--; // Decrement purchasedSpaces
      }
    },
  
    
    
    },
});

console.log("Vue instance initialized");
new Vue({
  el: "#app",
  data() {
    return {
      searchQuery: "",
      viewActivities: true,
      sortOrder: 1,
      sortCriterion: "title",
      classes: [
        {
          title: "Painting",
          location: "Ealing",
          price: 50,
          totalSpaces: 5,
          availableSpaces: 5,
          addedToCart: false,
          purchasedSpaces: 0,
          disableAddToCart: false,
          image:
            "https://plus.unsplash.com/premium_photo-1664476936865-24bc3d21cd9c?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTd8fHBhaW50aW5nJTIwY2xhc3N8ZW58MHx8MHx8fDA%3D",
        },
        {
          title: "Football Practice",
          location: "Acton",
          price: 70,
          totalSpaces: 5,
          availableSpaces: 5,
          addedToCart: false,
          purchasedSpaces: 0,
          disableAddToCart: false,
          image:
            "https://images.unsplash.com/photo-1600679472829-3044539ce8ed?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fEZvb3RiYWxsfGVufDB8fDB8fHww",
        },
        {
          title: "Cooking",
          location: "Harrow",
          price: 150,
          totalSpaces: 5,
          availableSpaces: 5,
          addedToCart: false,
          purchasedSpaces: 0,
          disableAddToCart: false,
          image:
            "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29va2luZyUyMGNsYXNzfGVufDB8fDB8fHww",
        },
        {
          title: "Music",
          location: "Wembley",
          price: 50,
          totalSpaces: 5,
          availableSpaces: 5,
          addedToCart: false,
          purchasedSpaces: 0,
          disableAddToCart: false,
          image:
            "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fE11c2ljfGVufDB8fDB8fHww",
        },
        {
          title: "Dance Club",
          location: "Romford",
          price: 80,
          totalSpaces: 5,
          availableSpaces: 5,
          addedToCart: false,
          purchasedSpaces: 0,
          disableAddToCart: false,
          image:
            "https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fERhbmNpbmd8ZW58MHx8MHx8fDA%3D",
        },
        {
          title: "Chemisty",
          location: "Stratford",
          price: 50,
          totalSpaces: 5,
          availableSpaces: 5,
          addedToCart: false,
          purchasedSpaces: 0,
          disableAddToCart: false,
          image:
            "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&q=60&w=900&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hlbWlzdHJ5fGVufDB8fDB8fHww",
        },
        {
          title: "Data Analysis",
          location: "Hendon",
          price: 90,
          totalSpaces: 5,
          availableSpaces: 5,
          addedToCart: false,
          purchasedSpaces: 0,
          disableAddToCart: false,
          image:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=60&w=900&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGJ1c2luZXNzfGVufDB8fDB8fHww",
        },
        {
          title: "Web Development",
          location: "London Central",
          price: 200,
          totalSpaces: 5,
          availableSpaces: 5,
          addedToCart: false,
          purchasedSpaces: 0,
          disableAddToCart: false,
          image:
            "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2ViJTIwZGV2ZWxvcG1lbnR8ZW58MHx8MHx8fDA%3D",
        },
        {
          title: "Yoga",
          location:"Cricklewood",
          price: 40,
          totalSpaces: 5,
          availableSpaces: 5,
          addedToCart: false,
          purchasedSpaces: 0,
          disableAddToCart: false,
          image:
            "https://images.unsplash.com/photo-1588286840104-8957b019727f?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8eW9nYXxlbnwwfHwwfHx8MA%3D%3D",
        },
        {
          title: "Karate",
          location: "China Town",
          price: 120,
          totalSpaces: 0,
          availableSpaces: 5,
          addedToCart: false,
          purchasedSpaces: 0,
          disableAddToCart: false,
          image:
            "https://images.unsplash.com/photo-1514050566906-8d077bae7046?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8S2FyYXRlfGVufDB8fDB8fHww",
        },
      ],
      cart: [],
    };
  },
  computed: {
    filteredItems: function () {
      const query = this.searchQuery.toLowerCase();
      return this.classes
        .filter((item) => {
          return (
            item.title.toLowerCase().includes(query) ||
            item.location.toLowerCase().includes(query)
          );
        })
        .sort((a, b) => {
          if (
            this.sortCriterion === "title" ||
            this.sortCriterion === "location"
          ) {
            return (
              a[this.sortCriterion].localeCompare(b[this.sortCriterion]) *
              (this.sortOrder === "asc" ? 1 : -1)
            );
          } else {
            return (
              (a[this.sortCriterion] - b[this.sortCriterion]) *
              (this.sortOrder === "asc" ? 1 : -1)
            );
          }
        });
    },
    totalCartItems() {
      return this.cart.reduce((total, item) => total + item.purchasedSpaces, 0);
    },
  },

  methods: {
    changePage: function () {
      this.viewActivities = !this.viewActivities;
    },
    sortBy(criteria) {
      this.sortCriterion = criteria;
    },
    sortBy(criteria) {
      this.sortCriterion = criteria;
      this.filteredItems.sort((a, b) => {
        if (criteria === "title" || criteria === "location") {
          return a[criteria].localeCompare(b[criteria]);
        } else {
          return a[criteria] - b[criteria];
        }
      });
    },
    toggleSortOrder() {
      this.sortOrder *= -1;
    },
    addToCart(item) {
      const cartItem = this.cart.find((cartItem) => cartItem.id === item.id);
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
      item.availableSpaces--; // Decrease available spaces

      if (item.availableSpaces === 0) {
        item.isSoldOut = true; // Set the item as sold out
      }
    },
    removeFromCart(item) {
      const index = this.cart.findIndex((cartItem) => cartItem.id === item.id);
      if (index !== -1) {
        if (this.cart[index].purchasedSpaces > 0) {
          const spacesToRemove = 1; // Define the number of spaces to remove
          this.cart[index].purchasedSpaces -= spacesToRemove;
          item.availableSpaces += spacesToRemove; // Increment available spaces
          if (this.cart[index].purchasedSpaces === 0) {
            this.cart.splice(index, 1);
            item.addedToCart = false;
          }
        }
      }
    },
    setOrder(order) {
      this.sortOrder = order;
    },
    goToActivities() {
      this.viewActivities = true;
    },
  },
});

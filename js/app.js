// Log initialization of Vue instance
console.log("Vue instance initialized");

new Vue({
    el: "#app",
    data() {
        // Initial data setup
        return {
            searchQuery: "",
            viewActivities: true,
            sortOrder: 1,
            sortCriterion: "title",
            classes: classes,
            cart: [],
            checkoutForm: {
                name: '',
                phone: '',
            },
            selectedSort: "Sort By", // Default value for selected sort
        };
    },
    computed: {
        // Calculate total value of items in the cart
        totalCheckoutValue() {
            return this.cart.reduce((total, item) => total + item.price * item.purchasedSpaces, 0);
        },
        // Filter and sort items based on search and sorting criteria
        filteredItems: function() {
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
        // Calculate total number of items in the cart
        totalCartItems() {
            return this.cart.reduce((total, item) => total + item.purchasedSpaces, 0);
        },
        // Check if the checkout form is valid
        isCheckoutFormValid() {
            const nameRegex = /^[A-Za-z\s]+$/; // Allow full names with spaces
            const phoneRegex = /^[0-9]{10}$/; // 10-digit phone number

            return (
                nameRegex.test(this.checkoutForm.name) &&
                phoneRegex.test(this.checkoutForm.phone)
            );
        },
    },

    methods: {
        // Toggle between Activities and Cart view
        changePage: function() {
            this.viewActivities = !this.viewActivities;
        },
        // Set sorting criterion
        sortBy(criteria) {
            this.sortCriterion = criteria;
            this.filteredItems.sort((a, b) => {
                if (criteria === "title" || criteria === "location") {
                    return a[criteria].localeCompare(b[criteria]);
                } else {
                    return a[criteria] - b[criteria];
                }
            });
            // Update selectedSort based on the sorting criterion
            this.selectedSort = this.getSortLabel(criteria);
        },
        // Get the label for the selected sorting criterion
        getSortLabel(criteria) {
            const labels = {
                title: "Title",
                location: "Location",
                price: "Price",
                availableSpaces: "Available Spaces",
            };
            return labels[criteria] || "Sort By";
        },
        // Toggle sorting order
        toggleSortOrder() {
            this.sortOrder *= -1;
        },
        // Display an alert for successful checkout
        checkoutAlert() {
            alert(`Checkout successful! Total amount: £${this.totalCheckoutValue}`);
        },
        // Add an item to the cart
        addToCart(item) {
            const cartItem = this.cart.find((cartItem) => cartItem.title === item.title);

            if (cartItem) {
                // Item is already in the cart, increase purchasedSpaces
                if (cartItem.purchasedSpaces < cartItem.totalSpaces) {
                    cartItem.purchasedSpaces++;
                }
            } else {
                // Item is not in the cart, add it
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
        // Remove an item from the cart
        removeFromCart(item) {
            const index = this.cart.findIndex((cartItem) => cartItem.title === item.title);
            if (index !== -1) {
                if (this.cart[index].purchasedSpaces > 0) {
                    const spacesToRemove = 1; // Remove one space at a time
                    item.availableSpaces += spacesToRemove; // Increment available spaces
                    const lessonIndex = this.classes.findIndex((lesson) => lesson.title === item.title);
                    if (lessonIndex !== -1) {
                        this.classes[lessonIndex].availableSpaces += spacesToRemove;
                        this.classes[lessonIndex].isSoldOut = false;
                    }
                    this.cart[index].purchasedSpaces -= spacesToRemove;
                    if (this.cart[index].purchasedSpaces === 0) {
                        this.cart.splice(index, 1);
                        item.addedToCart = false;
                    }
                }
            }
        },
        // Set sorting order
        setOrder(order) {
            this.sortOrder = order;
        },
        // Switch to Activities view
        goToActivities() {
            this.viewActivities = true;
        },
        // Submit the order and display an alert
        submitOrder() {
            if (this.isCheckoutFormValid) {
                alert(`Order submitted!\nName: ${this.checkoutForm.name}\nPhone: ${this.checkoutForm.phone}`);
                this.checkoutForm.name = '';
                this.checkoutForm.phone = '';
            } else {
                alert('Please provide valid information.');
            }
        },
    },
});
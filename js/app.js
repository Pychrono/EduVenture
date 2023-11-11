console.log("Vue instance initialized");
new Vue({
    el: "#app",
    data() {
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
            selectedSort: "Sort By",
        };
    },
    computed: {
        totalCheckoutValue() {
            return this.cart.reduce((total, item) => total + item.price * item.purchasedSpaces, 0);
        },
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
        totalCartItems() {
            return this.cart.reduce((total, item) => total + item.purchasedSpaces, 0);
        },
        isCheckoutFormValid() {
            // Basic validation
            const nameRegex = /^[A-Za-z\s]+$/;
            const phoneRegex = /^[0-9]{10}$/;

            return (
                nameRegex.test(this.checkoutForm.name) &&
                phoneRegex.test(this.checkoutForm.phone)
            );
        },
    },

    methods: {
        changePage: function() {
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
            this.selectedSort = this.getSortLabel(criteria);
        },

        getSortLabel(criteria) {
            const labels = {
                title: "Title",
                location: "Location",
                price: "Price",
                availableSpaces: "Available Spaces",
            };
            return labels[criteria] || "Sort By";
        },
        toggleSortOrder() {
            this.sortOrder *= -1;
        },
        checkoutAlert() {
            alert(`Checkout successful! Total amount: £${this.totalCheckoutValue}`);
        },
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
        setOrder(order) {
            this.sortOrder = order;
        },
        goToActivities() {
            this.viewActivities = true;
        },
        submitOrder() {
            if (this.isCheckoutFormValid) {
                // Process the order, e.g., display a confirmation message
                alert(`Order submitted!\nName: ${this.checkoutForm.name}\nPhone: ${this.checkoutForm.phone}`);
                // Reset the form after submission
                this.checkoutForm.name = '';
                this.checkoutForm.phone = '';
            } else {
                alert('Please provide valid information.');
            }
        },
    },
});
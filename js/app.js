console.log("Vue instance initialized");

new Vue({
    el: "#app",
    data() {
        return {
            searchQuery: "",
            viewActivities: true,
            classes: [],
            cart: [],
            checkoutForm: {
                name: '',
                phone: '',
            },
            selectedSort: "Sort By",
        };
    },
    created() {
        this.fetchClasses();
    },
    computed: {
        // ... existing computed properties ...
        filteredItems() {
            return this.classes; // For now, showing all classes. Will be updated with search functionality
        },
        totalCartItems() {
            return this.cart.reduce((total, item) => total + item.purchasedSpaces, 0);
        },
        totalCheckoutValue() {
            return this.cart.reduce((total, item) => total + (item.price * item.purchasedSpaces), 0);
        },
        isCheckoutFormValid() {
            // Example validation logic
            return (
                this.checkoutForm.name.length > 0 &&
                this.checkoutForm.phone.match(/^\d{10}$/) // Simple regex for 10-digit phone number
            );
        },
    },
    watch: {
        searchQuery(newQuery) {
            this.performSearch();
        }
    },
    methods: {
        async fetchClasses() {
            try {
                const response = await fetch('http://testapp-env.eba-9yiukzwh.eu-north-1.elasticbeanstalk.com/classes');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                this.classes = await response.json();
            } catch (error) {
                console.error('Error fetching classes:', error);
            }
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
        setOrder(order) {
            this.sortOrder = order;
        },
        // Toggle between Activities and Cart view
        goToActivities() {
            this.viewActivities = true;
        },
        async submitOrder() {
            try {
                // Prepare order details
                const orderDetails = {
                    name: this.checkoutForm.name,
                    phone: this.checkoutForm.phone,
                    items: this.cart.map(item => ({
                        id: item._id,
                        purchasedSpaces: item.purchasedSpaces
                    }))
                };

                // Send order details to backend
                const orderResponse = await fetch('http://testapp-env.eba-9yiukzwh.eu-north-1.elasticbeanstalk.com/orders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(orderDetails)
                });

                if (!orderResponse.ok) {
                    throw new Error(`HTTP error! status: ${orderResponse.status}`);
                }

                // After successful order submission, update class spaces
                for (const item of this.cart) {
                    await this.updateClassSpace(item._id, item.availableSpaces - item.purchasedSpaces);
                }

                // Reset form and cart after successful submission
                this.checkoutForm.name = '';
                this.checkoutForm.phone = '';
                this.cart = [];

                alert('Order submitted successfully!');
            } catch (error) {
                console.error('Error submitting order:', error);
            }
        },

        async changePage() {
            this.viewActivities = !this.viewActivities;
        },
        async submitOrder() {
            try {
                const orderDetails = {
                    name: this.checkoutForm.name,
                    phone: this.checkoutForm.phone,
                    items: this.cart.map(item => ({ id: item._id, purchasedSpaces: item.purchasedSpaces })),
                };

                const response = await fetch('http://testapp-env.eba-9yiukzwh.eu-north-1.elasticbeanstalk.com/orders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(orderDetails)
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                // Handle post-order tasks here (e.g., updating class spaces, resetting form/cart)
                // ...

                alert('Order submitted successfully!');

                // Reset form and cart after successful submission
                this.checkoutForm.name = '';
                this.checkoutForm.phone = '';
                this.cart = [];

            } catch (error) {
                console.error('Error submitting order:', error);
            }
        },

        async updateClassSpace(classId, newSpaces) {
            try {
                const updatedData = {
                    availableSpaces: newSpaces
                };

                const response = await fetch(`http://testapp-env.eba-9yiukzwh.eu-north-1.elasticbeanstalk.com/classes/${classId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedData)
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const updatedClass = await response.json();
                this.updateLocalClassData(updatedClass);
                alert('Class updated successfully!');
            } catch (error) {
                console.error('Error updating class space:', error);
            }
        },

        updateLocalClassData(updatedClass) {
            const index = this.classes.findIndex(item => item._id === updatedClass._id);
            if (index !== -1) {
                this.classes.splice(index, 1, updatedClass);
            }
        },
        async performSearch() {
            try {
                const response = await fetch(`http://testapp-env.eba-9yiukzwh.eu-north-1.elasticbeanstalk.com/search?q=${encodeURIComponent(this.searchQuery)}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                this.classes = await response.json(); // Update the classes with the search result
            } catch (error) {
                console.error('Error performing search:', error);
            }
        },


        async updateClassSpace(classId, purchasedSpaces) {
            try {
                const response = await fetch(`http://testapp-env.eba-9yiukzwh.eu-north-1.elasticbeanstalk.com/classes/${classId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ purchasedSpaces })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                // Fetch updated class list
                this.fetchClasses();
            } catch (error) {
                console.error('Error updating class space:', error);
            }
        },
        // ... other methods like addToCart, removeFromCart, etc. ...
    }
});
// Initialize Vue instance
console.log("Vue instance initialized");

new Vue({
    el: "#app", // Element to mount the Vue instance
    data() {
        return {
            searchQuery: "", // User's search input
            viewActivities: true, // Boolean to toggle between activities and cart view
            classes: [], // Array to store classes fetched from the backend
            cart: [], // Array to store items added to the cart
            checkoutForm: { // Object to store checkout form data
                name: '',
                phone: '',
            },
            selectedSort: "Sort By", // Selected sorting criterion
        };
    },
    created() {
        this.fetchClasses(); // Fetch classes when the Vue instance is created
    },
    computed: {
        // Returns classes filtered by the search query
        filteredItems() {
            return this.classes; // Placeholder for search functionality
        },
        // Computes the total number of items in the cart
        totalCartItems() {
            return this.cart.reduce((total, item) => total + item.purchasedSpaces, 0);
        },
        // Computes the total checkout value of items in the cart
        totalCheckoutValue() {
            return this.cart.reduce((total, item) => total + (item.price * item.purchasedSpaces), 0);
        },
        // Validates the checkout form
        isCheckoutFormValid() {
            return (
                this.checkoutForm.name.length > 0 &&
                this.checkoutForm.phone.match(/^\d{10}$/) // Validates a 10-digit phone number
            );
        },
    },
    watch: {
        // Watches for changes in the search query and triggers the search function
        searchQuery(newQuery) {
            this.performSearch();
        }
    },
    methods: {
        // Fetches classes from the backend
        async fetchClasses() {
            try {
                const response = await fetch('https://testapp-env.eba-9yiukzwh.eu-north-1.elasticbeanstalk.com/classes');
                if (!response.ok) {
                    throw new Error(`HTTPs error! status: ${response.status}`);
                }
                this.classes = await response.json();
            } catch (error) {
                console.error('Error fetching classes:', error);
            }
        },

        // Sorts classes based on the selected criterion
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
        // Returns the label for the selected sorting criterion
        getSortLabel(criteria) {
            const labels = {
                title: "Title",
                location: "Location",
                price: "Price",
                availableSpaces: "Available Spaces",
            };
            return labels[criteria] || "Sort By";
        },
        // Toggles the sorting order
        toggleSortOrder() {
            this.sortOrder *= -1;
        },
        // Displays a checkout success alert
        checkoutAlert() {
            alert(`Checkout successful! Total amount: £${this.totalCheckoutValue}`);
        },
        // Adds an item to the cart
        addToCart(item) {
            const cartItem = this.cart.find((cartItem) => cartItem.title === item.title);

            if (cartItem) {
                // Increase purchasedSpaces if the item is already in the cart
                if (cartItem.purchasedSpaces < cartItem.totalSpaces) {
                    cartItem.purchasedSpaces++;
                }
            } else {
                // Add the item to the cart if it's not already there
                this.cart.push({
                    ...item,
                    addedToCart: true,
                    purchasedSpaces: 1,
                });
            }

            // Decrease available spaces for the item
            item.availableSpaces--;
            if (item.availableSpaces === 0) {
                item.isSoldOut = true; // Mark as sold out if no spaces are left
            }
        },
        // Removes an item from the cart
        removeFromCart(item) {
            const index = this.cart.findIndex((cartItem) => cartItem.title === item.title);
            if (index !== -1) {
                // Remove one purchased space at a time
                if (this.cart[index].purchasedSpaces > 0) {
                    const spacesToRemove = 1;
                    item.availableSpaces += spacesToRemove;
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
        // Sets the sorting order for displaying the classes
        setOrder(order) {
            this.sortOrder = order;
        },

        // Switches the view to display the activities list, hiding the cart view
        goToActivities() {
            this.viewActivities = true;
        },

        // Submits the order to the backend and updates the classes' available spaces
        async submitOrder() {
            try {
                // Prepare the order details for submission
                const orderDetails = {
                    name: this.checkoutForm.name,
                    phone: this.checkoutForm.phone,
                    items: this.cart.map(item => ({
                        id: item._id,
                        purchasedSpaces: item.purchasedSpaces
                    }))
                };

                // Send the order details to the backend via a POST request
                const orderResponse = await fetch('https://testapp-env.eba-9yiukzwh.eu-north-1.elasticbeanstalk.com/orders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(orderDetails)
                });

                // Check for a successful response, otherwise throw an error
                if (!orderResponse.ok) {
                    throw new Error(`HTTPs error! status: ${orderResponse.status}`);
                }

                // Update the available spaces for each class that was part of the order
                for (const item of this.cart) {
                    await this.updateClassSpace(item._id, item.availableSpaces - item.purchasedSpaces);
                }

                // Reset the checkout form and cart to their initial states
                this.checkoutForm.name = '';
                this.checkoutForm.phone = '';
                this.cart = [];

                // Notify the user of a successful order submission
                alert('Order submitted successfully!');
            } catch (error) {
                console.error('Error submitting order:', error);
            }
        },

        // Changes the page view between activities and cart
        async changePage() {
            this.viewActivities = !this.viewActivities;
        },

        // Updates the available space for a specific class
        async updateClassSpace(classId, newSpaces) {
            try {
                // Prepare the data to update the class's available spaces
                const updatedData = {
                    availableSpaces: newSpaces
                };

                // Send the update request to the backend
                const response = await fetch(`https://testapp-env.eba-9yiukzwh.eu-north-1.elasticbeanstalk.com/classes/${classId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedData)
                });

                // Check for a successful response, otherwise throw an error
                if (!response.ok) {
                    throw new Error(`HTTPs error! status: ${response.status}`);
                }

                // Update the local data to reflect the changes made on the server
                const updatedClass = await response.json();
                this.updateLocalClassData(updatedClass);

                // Notify the user that the class was updated successfully
                alert('Class updated successfully!');
            } catch (error) {
                console.error('Error updating class space:', error);
            }
        },

        // Updates the local class data with the new data from the server
        updateLocalClassData(updatedClass) {
            const index = this.classes.findIndex(item => item._id === updatedClass._id);
            if (index !== -1) {
                this.classes.splice(index, 1, updatedClass);
            }
        },

        // Performs a search based on the user's query
        async performSearch() {
            try {
                // Send the search query to the backend
                const response = await fetch(`https://testapp-env.eba-9yiukzwh.eu-north-1.elasticbeanstalk.com/search?q=${encodeURIComponent(this.searchQuery)}`);
                if (!response.ok) {
                    throw new Error(`HTTPs error! status: ${response.status}`);
                }

                // Update the classes with the search result
                this.classes = await response.json();
            } catch (error) {
                console.error('Error performing search:', error);
            }
        },

        // Updates the class space based on the number of spaces purchased
        async updateClassSpace(classId, purchasedSpaces) {
            try {
                // Send the update request to the backend
                const response = await fetch(`https://testapp-env.eba-9yiukzwh.eu-north-1.elasticbeanstalk.com/classes/${classId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ purchasedSpaces })
                });

                // Check for a successful response, otherwise throw an error
                if (!response.ok) {
                    throw new Error(`HTTPs error! status: ${response.status}`);
                }

                // Fetch the updated class list to reflect the

                // Fetch updated class list
                this.fetchClasses();
            } catch (error) {
                console.error('Error updating class space:', error);
            }
        },
        // ... other methods like addToCart, removeFromCart, etc. ...
    }
});
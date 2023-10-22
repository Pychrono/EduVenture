const app = Vue.createApp({
    data() {
        return{
            showBooks: true,
            title: 'The Final Empire',
            author: 'Brandon Sanderson',
            age: 45
        }
    },
    methods: {
        toggleshowBooks() {
            this.showBooks = !this.showBooks
        }
    },
})

app.mount('#app')
  
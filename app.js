Vue.component('todo-item', {
    props: ['todo'],
    template: '<h1>{{ todo.text }}</h1>'
  })

new Vue({
    el: '#vue-app',
    data: {
        name: 'Shaun',
        age:'20',
        groceryList: [
            { id: 0, text: 'Vegetables' },
            { id: 1, text: 'Cheese' },
            { id: 2, text: 'Whatever else humans are supposed to eat' }
          ],
        website: 'https://getbootstrap.com/docs/5.3/examples/sidebars/'
    },
    methods:{
        greet:function(time){
           return "Good Morning Cunts" + time + " Im talking to you " + this.name; 
        },
        add:function(){
            this.age++;
        },
        subtract:function(){
            this.age--;
        }
    }
});

  
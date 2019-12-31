import Vue, {value} from "vue-next"

const App = {
    data:{
        // time: Date.now()
    },
    setup(){
        const time=value(new Date)
        onMounted(()=>{
            setInterval(()=>{
                time = new Date
            }, 800)
        })
        return {
            time
        }
    }

}
Vue.createApp().mount(App, '#app')
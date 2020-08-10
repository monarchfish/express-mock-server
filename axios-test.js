const axios = require('axios')

axios.get('http://localhost:80/vue-element-admin/article/pv')
.then(response => {
    console.dir(response.data)
})
.catch(error => {
    console.dir(error.message)
})

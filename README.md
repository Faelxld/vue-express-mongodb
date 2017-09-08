# vue-express-mongodb

> Vue.js and Express and MongoDB project

# Thanks

- [vue-login](https://github.com/ykloveyxk/vue-login)
- [vue-koa2-login](https://github.com/sinner77/vue-koa2-login)
- [vue-axios-github](https://github.com/superman66/vue-axios-github)

# Function

- [x] find user
- [x] add user
- [x] token validate
- [x] login intercept

# Technology

- [x] vue
- [x] vue-router
- [x] vuex
- [x] express
- [x] mongodb
- [x] less/scss
- [x] axios
- [x] ElementUI

# API

- `/api/user/useradd`
- `/api/user/login`
- `/api/user/getuser`

# Schema

```javascript
const userSchema = mongoose.Schema({
  userId: {
    type: Number,
    required: true
  },
  userPwd: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  create_time: {
    type: Date,
    required: true
  }
})
```

# demo

## start server

![vue-express-mongodb](https://github.com/vxhly/vue-express-mongodb/blob/master/static/vue-express-mongodb-1.gif)

## Login and Register successfully

![vue-express-mongodb](https://github.com/vxhly/vue-express-mongodb/blob/master/static/vue-express-mongodb-2.gif)

## Token validate

![vue-express-mongodb](https://github.com/vxhly/vue-express-mongodb/blob/master/static/vue-express-mongodb-3.gif)

## Register validate

![vue-express-mongodb](https://github.com/vxhly/vue-express-mongodb/blob/master/static/vue-express-mongodb-4.gif)

## Login validate

![vue-express-mongodb](https://github.com/vxhly/vue-express-mongodb/blob/master/static/vue-express-mongodb-5.gif)

# Build Setup

```bash
# install dependencies
npm install

# run express server，this should be the first execution
# the server api run on localhost:3000
npm run server

# serve with hot reload at localhost:8080
# [HPM] Proxy created: /api  ->  http://127.0.0.1:3000/api/
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const { User } = require("./models/User");

const config = require("./config/key");

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); // 클라이언트가 보낸 정보를 서버가 분석해서 가져올 수 있게 해주는 건데,

// applciation/json
app.use(bodyParser.json());

const { User } = require("./models/User");

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
    }
  )
  .then(() => console.log("MongoDB Connected...")) // 연결 잘되면
  .catch((err) => console.log(err)); // 연결이 안됐을 때

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", (req, res) => {
  //회원가입할 때 필요한 정보들을 client에서 가져오면
  //그것들을 데이터베이스에 넣어준다
  // {
  //   id:"hello",
  //   password:"123"
  // } 이 정보가 body-parser덕분에 req.body 에 있음
  const user = new User(req.body);
  user.save((err, userInfo) => {
    // user는 mongoDB에서 오는 method. 정보들이 user모델에 저장이 됨
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

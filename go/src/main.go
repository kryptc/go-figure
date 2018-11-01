package main

import (
   "fmt"
   "net/http"
   "hash/crc32"
   "strconv"
   "math/rand"
   "github.com/gin-contrib/cors"                        // Why do we need this package?
   "github.com/gin-gonic/gin"
   // "github.com/gin-gonic/contrib/static"
   "github.com/jinzhu/gorm"
   _ "github.com/jinzhu/gorm/dialects/sqlite"           // If you want to use mysql or any other db, replace this line
)

var db *gorm.DB                                         // declaring the db globally
var err error

type User struct
{
   ID uint `json:"id"`
   Username string `json:"username"`
   Email string `json:"email"`
   PasswordHash string `json:"passwordhash"`
   IsAdmin bool `json:"isadmin"`
   Score int `json:"score"`
   // LoggedIn bool `json:"loggedin"`
}
type LoginUser struct
{
   Username string `json:"username"`
   Password string `json:"password"`
}
type Genre struct 
{
   ID uint `json:"id"`
   Name string `json:"name"`
   // QuizCount uint `json:"quizcount"`
   // Quizzes []Quiz
}

type Quiz struct 
{
   ID uint `json:"id"`
   Name string `json:"name"`
   // QuestionCount uint `json:"questioncount"`
   Genre string `json:"genre"`
   Difficulty string `json:"difficulty"`
}

type Question struct 
{
   ID uint `json:"id"`
   Text string `json:"text"`
   OptionA string `json:"optiona"`
   OptionB string `json:"optionb"`
   OptionC string `json:"optionc"`
   OptionD string `json:"optiond"`
   IsA bool `json:"isa"`
   IsB bool `json:"isb"`
   IsC bool `json:"isc"`
   IsD bool `json:"isd"`
   // Genre string `json:"genre"`
   QuizName string `json:"quizname"`
   // QuizID string `json:"quizid"`
}


func main() {
   db, err = gorm.Open("sqlite3", "./quiz.db")
   if err != nil {
      fmt.Println(err)
   }
   defer db.Close()

   db.AutoMigrate(&User{}, &Genre{}, &Quiz{}, &Question{})
   router := gin.Default()
   router.Use((cors.Default()))

   router.GET("/genres", GetGenres)  
   router.POST("/register", Register)
   router.POST("/login", Login)
   router.POST("/logout", Logout)
   router.GET("/genres/:genreName/:quizName", GetSingleQuiz)

   router.GET("/genres/:genreName", GetQuizzes)

   // router.POST("/admin/genres/:genreName/createquiz", CreateQuiz)  
   router.POST("/admin/creategenre", CreateGenre)

   router.GET("/admin/viewusers", ViewUsers)
   router.DELETE("/admin/viewusers/:id", DeleteUser)
   router.GET("/admin/viewquizzes", ViewQuizzes)
   // router.GET("/admin/:quizName", GetSingleQuiz)

   router.POST("/admin/createquiz", CreateQuiz)
   router.GET("/admin/plswork/:quizName", GetSingleQuiz)

   router.POST("/admin/createquestions", CreateQuestions)
   router.DELETE("/admin/viewquizzes/:id", DeleteQuiz)


   router.Run(":8080")    

}

func Register(c *gin.Context) {
   var user User
   c.BindJSON(&user)
   fmt.Println(user)
   // pw := user.PasswordHash
   // var temp uint32
   // temp = getHash(pw)
   // user.PasswordHash = string (temp)
   // user.LoggedIn = true
   db.Create(&user)
   token := generateSessionToken()
   c.SetCookie("token", token, 3600, "", "", false, true)
   c.Set("is_logged_in", true)
   c.Header("access-control-allow-origin", "*") 
   c.JSON(200, user)
   
}

func Login(c *gin.Context) {
   var loginuser LoginUser
   var user User
   c.BindJSON(&loginuser)
   fmt.Println(loginuser)
   uname := loginuser.Username
   pass := loginuser.Password
   if err := db.Where("username = ?", uname).First(&user).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      rightpass := user.PasswordHash
      // temp := getHash(pass)
      fmt.Println("%v",pass)
      fmt.Println("%v",rightpass)

      if pass == rightpass {
      // if string(temp) == rightpass {
         // user.LoggedIn = true
         token := generateSessionToken()
         c.SetCookie("token", token, 3600, "", "", false, true)
         c.Set("is_logged_in", true)
         c.Header("access-control-allow-origin", "*") 
         c.JSON(200, user)
      } else {
         c.AbortWithStatus(401) 
      } 
   }
}

func generateSessionToken() string {
   return strconv.FormatInt(rand.Int63(), 16)
}

func Logout(c *gin.Context) {
   // Clear the cookie
   c.SetCookie("token", "", -1, "", "", false, true)

   // Redirect to the home page
   c.AbortWithStatus(200)
}

func GetGenres(c *gin.Context) {
   var quizlist []Quiz

   // var questionlist []Question

   if err := db.Select([]string{"genre"}).Find(&quizlist).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("Content-Type", "application/json")
      c.JSON(http.StatusOK, quizlist)
   }

}

func ViewQuizzes(c *gin.Context) {
   var quizlist []Quiz
   if err := db.Find(&quizlist).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("Content-Type", "application/json")
      c.JSON(http.StatusOK, quizlist)
   }

}

func DeleteQuiz(c *gin.Context) {
   id := c.Params.ByName("id")
   // quizname := c.Params.ByName("name")
   var quiz Quiz
   // var question Question
   d := db.Where("id = ?", id).Delete(&quiz)
   // e := db.Where("quiz_name = ?", quizname).Delete(&question)
   fmt.Println("%v",d)
   // fmt.Println("%v",e)
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, gin.H{"id #" + id: "deleted"})
}


func GetQuizzes(c *gin.Context) {
   genre := c.Params.ByName("genreName")
   var quizlist []Quiz
   fmt.Println("%v", genre)
   if err := db.Where("genre = ?", genre).First(&quizlist).Error; err != nil {

   // if err := db.Find(&quizlist).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("Content-Type", "application/json")
      c.JSON(http.StatusOK, quizlist)
   }

}

func GetSingleQuiz(c *gin.Context) {
   quizname := c.Params.ByName("quizName")

   var questionlist []Question
   if err := db.Where("quiz_name = ?", quizname).Find(&questionlist).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*")
      c.JSON(200, questionlist)
      fmt.Println("qlist:%v",questionlist)
   }
}



func DeleteUser(c *gin.Context) {
   id := c.Params.ByName("id")
   var user User
   d := db.Where("id = ?", id).Delete(&user)
   fmt.Println(d)
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, gin.H{"id #" + id: "deleted"})
}

func ViewUsers(c *gin.Context) {
   var userlist []User
   if err := db.Find(&userlist).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*")
      c.JSON(200, userlist)
   }
}


func CreateGenre(c *gin.Context) {
   var genre Genre
   c.BindJSON(&genre)
   db.Create(&genre)
   c.Header("access-control-allow-origin", "*") 
   c.JSON(200, genre)
}

func CreateQuiz(c *gin.Context) {
   var quiz Quiz
   c.BindJSON(&quiz)
   fmt.Println("hisup")
   // for i := 0; i < int (quiz.QuestionCount); i++ {
   //    fmt.Println("asdfg")
   //    CreateQuestions(c)
   // }
   db.Create(&quiz)
   c.Header("access-control-allow-origin", "*") 
   c.JSON(200, quiz)
}

func CreateQuestions(c *gin.Context) {
   var question Question
   c.BindJSON(&question)
   fmt.Println("question sent->%v",question)
   db.Create(&question)
   c.Header("access-control-allow-origin", "*") 
   c.JSON(200, question)
}

func getHash(pwtext string) (uint32) {
  h := crc32.NewIEEE()
  h.Write([]byte(pwtext))
  return h.Sum32()
}



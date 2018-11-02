# GO FIGURE
A quiz application written with React JS in the frontend and GoLang in the backend and Gin as the ORM. Users can register and login and play any quiz in any genre.
1. Each genre should have at least two quizzes.
2. Each quiz must have at least 5 questions.
3. Two different types of questions 
- MCQ Single Correct
- MCQ Multiple Correct

Admin privileges are given to one user, along with an admin panel. Admin panel features:-
- View/Create/Delete quizzes
- Create/Delete/Edit questions/options in each quiz
- View all users
- Delete users

The app is designed in Bootstrap. All errors are appropriately handled at both the backend and frontend of the application.

## Go packages used

   - fmt
   - net/http
   - hash/crc32
   - strconv
   - math/rand
   - github.com/gin-contrib/cors                 
   - github.com/gin-gonic/gin
   - github.com/jinzhu/gorm
   - github.com/jinzhu/gorm/dialects/sqlite 
   
## To run the app:
All commands are from the main directory. Install dependencies first.
- `go run go/src/main.go`
- `yarn start`

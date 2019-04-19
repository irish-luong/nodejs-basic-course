A. Project Structure:
	Follow this Guide: https://expressjs.com/en/starter/generator.html.

B. Generate Express Project follow a template:
	1. npm install express-generator -g
	2. express -h
	3. Express --view=pug myapp
	4. cd myapp
	5. npm install
	6. DEBUG=myapp:* nodemon ./bin/www (for auto restart server)

C. Note in class
- Http request:

Là trao đổi giữa các web server với nhau theo dạng text
Xuất phát từ quân đội Mỹ.
port default cùa http là 80:
port default cùa https là 443.
postman cho phép tạo trực tiếp 1 http request lên server.
Hiện có 2 version http.
Request:
+ Request header: 
Session được back end tạo vào lưu trong database.
Cookie lưu trên browser

+ Hppt method:
GET: lấy data từ server (không có body trong request).
POST:
PUT
- Htpp server:
model: resquest-response, server-push

- forEach là 1 hàm của Array không phải là 1 câu lệnh native cùa Javascript
- Định nghĩa end-point cho chú ý conflict vs các route khác./bin/www

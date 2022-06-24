# TKPM - PHẦN MỀM QUẢN LÝ NHÀ SÁCH ONLINE
## Link website: https://online-book-store-tkpm.herokuapp.com

## Tổng quan
Phần mềm quản lý nhà sách online bao gồm các tính năng sau:
- Đăng ký
- Đăng nhập
- Sửa thông tin cá nhân
- Sửa mật khẩu
- Xem danh sách sách.
- Lọc sách theo thể loại.
- Tìm kiếm sách theo tên.
- Xem chi tiết sách.
- Xem sách liên quan.
- Thêm vào giỏ hàng
- Thanh toán
- Nạp tiền
- Tạo và xem hóa đơn
- Xem các đánh giá của sách
- Thêm đánh giá cho sách
- Admin - Quản lý, cập nhật sách

## Công cụ sử dụng
Frontend: HTML, CSS, Javascript, ReactJS
Backend: NodeJS
Database: MongoDB
IDE: Visual Studio Code
OS: Windows 10

## Mã nguồn
Link github Frontend: https://github.com/hthang0308/onlinebookstore
Link github Backend: https://github.com/hthang0308/onlinebookstore_server

## Hướng dẫn cách build source
1. Clone từ đường dẫn github ở phần mã nguồn về máy, cả phần Frontend và Backend
2. Mở các thư mục đã Clone bằng Visual Studio Code
3. Ở file .env ở phần Frontend, sửa "REACT_APP_ROOT_API_URL = https://secret-beyond-25454.herokuapp.com" thành "REACT_APP_ROOT_API_URL = localhost:5000"
4. Ở Backend, tại terminal, nhập các dòng lệnh "npm i", "npm start" theo đúng thứ tự
5. Ở Frontend, tại terminal, nhập các dòng lệnh "npm i", "npm start" theo đúng thứ tự
6. Trang web có thể truy cập ở đường dẫn "localhost:3000"

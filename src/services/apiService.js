const API_URL = 'http://localhost:3000';

async function fetchAPI(endpoint, method = 'GET', body = null) {
    const response = await fetch(`${API_URL}${endpoint}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : null,
    });
    return response.json();
}
// Đăng ký và đăng nhập
export const registerUser = (user) => fetchAPI('/users/register', 'POST', user);
export const loginUser = (user) => fetchAPI('/users/login', 'POST', user);



// Lấy dữ liệu categories
export const getCategories = () => fetchAPI('/categories');
// Tạo một category mới
export const createCategory = (category) => fetchAPI('/categories', 'POST', category);




// Lấy dữ liệu user
export const getUsers = () => fetchAPI('/users/user');
//Tìm user theo id
export const findUser = (id) => fetchAPI('/users/Finduser', 'POST',{id});
// Cập nhật user
export const updateUser = (id,userData) => fetchAPI('/users/UpdateUser', 'PUT',{id,...userData});
// Delete User
export const DelUser = (id) => fetchAPI('/users/DeleteUser', 'DELETE',{id});





// Lấy dữ liệu goats
export const getTransactions = (UserAccountID) => fetchAPI('/transactions/transactions', 'POST', {UserAccountID});
// Lấy tạo transactions
export const createTransaction = (transaction) => fetchAPI('/transactions/Createtransaction', 'POST', transaction);



// Lấy dữ liệu goats
export const getGoats = (UserAccountID) => fetchAPI('/goats/goats', 'POST', {UserAccountID});
// Tạo một goat mới
export const Creategoat = (user) => fetchAPI('/goats/Creategoat', 'POST', user);
// Xóa một goat
export const DelGoat = (id) => fetchAPI('/goats/Deletegoat', 'DELETE', {id});
// Cập nhật goat
export const updateGoat = (id, goatData) => fetchAPI('/goats/Updategoat', 'PUT', { id , ...goatData });
// Lấy dữ liệu goat  theo id
export const findGoat = (id) => fetchAPI('/goats/Findgoat', 'POST',{id});



// Lấy dữ liệu goats
export const getPlans = (UserAccountID) => fetchAPI('/plans/plans', 'POST', {UserAccountID});
// Tạo một goat mới
export const CreatePlan = (user) => fetchAPI('/plans/Createplan', 'POST', user);
// Xóa một goat
export const DelPlan = (id) => fetchAPI('/plans/Deleteplan', 'DELETE', {id});
// Cập nhật goat
export const updatePlan = (id, Data) => fetchAPI('/plans/Updateplan', 'PUT', { id , ...Data });
// Lấy dữ liệu goat  theo id
export const findPlan = (id) => fetchAPI('/plans/Findplan', 'POST',{id});



// Check token
export const AuthToken = (token) => fetchAPI('/users/AuthToken', 'POST', {token});

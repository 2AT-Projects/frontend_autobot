import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/app';

class UserService {
    getPublicContent() {
        return axios.get(`${API_URL}/all`);
    }

    getUserBoard() {
        return axios.get(`${API_URL}/user`, { headers: authHeader() });
    }

    getUserDepositList() {
        return axios.get(`${API_URL}/user/deposit/list`, { headers: authHeader() });
    }

    getUserBalanceFromUfabet() {
        return axios.get(`${API_URL}/user/balance`, { headers: authHeader() })
    }

    postUserWithdraw(credential) {
        return axios.post(`${API_URL}/user/withdraw`, credential, { headers: authHeader() })
    }

    getUserWithdrawList() {
        return axios.get(`${API_URL}/user/withdraw/list`, { headers: authHeader() })
    }

    getModeratorBoard() {
        return axios.get(`${API_URL}/mod`, { headers: authHeader() });
    }

    getAdminBoard() {
        return axios.get(`${API_URL}/admin`, { headers: authHeader() });
    }

    getAdminScbDeposit() {
        return axios.get(`${API_URL}/admin/scb/deposit/list`, { headers: authHeader() })
    }

    getAdminScbDepositBetweenDate(startDate, toDate) {
        return axios.get(`${API_URL}/admin/scb/deposit/`, {
            headers: authHeader(),
            params: {
                startDate: startDate,
                toDate: toDate
            }
        });
    }

    getAdminScbDepositToDay(today) {
        return axios.get(`${API_URL}/admin/scb/deposit/today`, {
            headers: authHeader(),
            params: {
                toDay: today
            }
        });
    }


    getAdminWithdraw(params) {
        return axios.get(`${API_URL}/admin/withdraw`, {
            headers: authHeader(),
            params: params
        })
    }

    getAdminWithdrawByStatus(params) {
        return axios.get(`${API_URL}/admin/withdraw/status`, {
            headers: authHeader(),
            params: params
        })
    }

    getAdminWithdrawToDay(today) {
        return axios.get(`${API_URL}/admin/withdraw/today`, {
            headers: authHeader(),
            params: {
                toDay: today
            }
        });
    }

    updateStatus(ob) {
        return axios.post(`${API_URL}/admin/update-withdraw`, ob, {
            headers: authHeader(),
        });
    }
}

export default new UserService();
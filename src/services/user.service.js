import axios from 'axios';
import authHeader from './auth-header';

// const API_URL = 'https://api-ufaautoapp.herokuapp.com/api/app';
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

    getAdminKbankDeposit() {
        return axios.get(`${API_URL}/admin/kbank/deposit/`, { headers: authHeader() })
    }

    getAdminKbankDepositWithStatus() {
        return axios.get(`${API_URL}/admin/kbank/deposit/status`, { headers: authHeader() })
    }

    getAdminScbDepositWithStatus() {
        return axios.get(`${API_URL}/admin/scb/deposit/status`, { headers: authHeader() })
    }

    getAdminScbDepositSevenday() {
        return axios.get(`${API_URL}/admin/scb/deposit/sevenday`, { headers: authHeader() })
    }

    getAdminKbankDepositSevenDay() {
        return axios.get(`${API_URL}/admin/kbank/deposit/sevenday`, { headers: authHeader() })
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

    getAdminWithdrawList() {
        return axios.get(`${API_URL}/admin/withdraw/list`, { headers: authHeader() })
    }

    getAdminWithdraw(params) {
        return axios.get(`${API_URL}/admin/withdraw`, {
            headers: authHeader(),
            params: params
        })
    }

    getAdminWithdrawSevenDay() {
        return axios.get(`${API_URL}/admin/withdraw/sevenday`, { headers: authHeader() })
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
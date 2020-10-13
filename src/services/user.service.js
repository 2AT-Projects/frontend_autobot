import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/app/';
const API_URL_1 = 'http://localhost:8080/api/agent/';

class UserService {
    getPublicContent() {
        return axios.get(API_URL + 'all');
    }

    getUserBoard() {
        return axios.get(API_URL + 'user', { headers: authHeader() });
    }

    getUserDepositList() {
        return axios.get(API_URL + 'user/deposit-list', { headers: authHeader() });
    }

    getUserBalanceFromUserbet() {
        return axios.get(API_URL + 'user/balance', { headers: authHeader() })
    }

    getModeratorBoard() {
        return axios.get(API_URL + 'mod', { headers: authHeader() });
    }

    getAdminBoard() {
        return axios.get(API_URL + 'admin', { headers: authHeader() });
    }

    getAdminScbDeposit() {
        return axios.get(API_URL + 'admin/scb-deposit-list', { headers: authHeader() })
    }

    getAdminScbDepositBetweenDate(startDate, toDate) {
        return axios.get(API_URL + 'admin/scb-deposit-date', {
            headers: authHeader(),
            params: {
                startDate: startDate,
                toDate: toDate
            }
        });
    }

    getAdminScbDepositToDay(today) {
        return axios.get(API_URL + 'admin/scb-deposit-today', {
            headers: authHeader(),
            params: {
                toDay: today
            }
        });
    }

    getAdminQueTransfer() {
        return axios.get(API_URL_1 + 'topup', { headers: authHeader() })
    }
}

export default new UserService();
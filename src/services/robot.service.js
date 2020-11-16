import axios from 'axios';
import authHeader from './auth-header';

const API_URL_AGENT = 'http://api-ufaautoapp.herokuapp.com/api/agent';
const API_URL_SCB = 'http://api-ufaautoapp.herokuapp.com/api/scb';

class RobotService {
    getUserDataFromUfabetAgent() {
        return axios.get(`${API_URL_AGENT}/get-user`, { headers: authHeader() });
    }

    stopTimerAgent() {
        return axios.get(`${API_URL_AGENT}/stop`, { headers: authHeader() });
    }

    topUp() {
        return axios.get(`${API_URL_AGENT}/topup`, { headers: authHeader() })
    }

    getDepositFromScb() {
        return axios.get(`${API_URL_SCB}/get-deposit`, { headers: authHeader() })
    }

    stopTimerScb() {
        return axios.get(`${API_URL_SCB}/stop`, { headers: authHeader() })
    }
}

export default new RobotService();
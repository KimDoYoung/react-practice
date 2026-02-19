import axios from 'axios';

const apiClient = axios.create({
    baseURL: '/api', //vite proxy 설정 -> localhost:3001 로 요청됨
    timeout : 5_000,
    headers: {
        'Content-Type': 'application/json',
    },
});

//----------- 요청 인터셉터 -------------------
// 모든 API 요청이 나가기 전에 이 함수를 거침
// 실제 프로젝트에서는 여기서 JWT 토큰을 헤더에 자동으로 첨부하거나, 로딩 스피너를 켜는 등의 작업을 할 수 있음
apiClient.interceptors.request.use(
    (config) => {
        console.log(`[요청]${config.method?.toUpperCase()} ${config.url}`);
        // 요청이 시작되기 전에 수행할 작업 (예: 토큰 추가)
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // 요청 오류가 발생했을 때 수행할 작업
        return Promise.reject(error);
    }
);
//----------- 응답 인터셉터 -------------------
// 모든 API 응답이 들어올 때 이 함수를 거침
// 실제 프로젝트에서는 여기서 응답 데이터를 가공하거나, 에러 메시지를 통일하는 등의 작업을 할 수 있음
apiClient.interceptors.response.use(
    (response) => {
        console.log(`[응답]${response.status} ${response.config.url}`);
        return response;
    },
    (error) => {
        const status = error.response?.status;
        console.error(`[응답 오류]${status} ${error.config?.url}`);

        if (status === 401) {
            console.error('[인증 오류] 인증이 실패했습니다. 로그인 페이지로 이동합니다.');
            // 인증 실패 (예: 토큰 만료) 시 로그인 페이지로 리다이렉트
            //window.location.href = '/login';
        }
        if (status === 500) {
            console.error('[서버 오류] 서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
        }
        return Promise.reject(error);
    }
);

export default apiClient;   
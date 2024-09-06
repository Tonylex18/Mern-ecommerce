const backendDomain = "http://localhost:8080"

const SummaryApi = {
    signUp: {
        url : `${backendDomain}/api/user/signUp`,
        method: "post"
    },
    login: {
        url: `${backendDomain}/api/user/login`,
        method: "post"
    },
    current_user: {
        url: `${backendDomain}/api/user/user-details`,
        method: "get"
    },
    loggout_user: {
        url: `${backendDomain}/api/user/sign-out`,
        method: "get",
    }
}

export default SummaryApi
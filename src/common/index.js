const backendDomain = "http://localhost:8080"

const SummaryApi = {
    signUp: {
        url : `${backendDomain}/api/user/signUp`,
        method: "post"
    },
    login: {
        url: `${backendDomain}/api/user/login`,
        method: "post"
    }
}

export default SummaryApi
const isLoggedIn = () => {
    try {
        let userData = JSON.parse(localStorage.getItem("userData"));

        if (userData?.isLoggedIn) {
            return true
        }

        return false
    }
    catch (err) {
        return false
    }
}

const getUserData = () => {
    try {
        let userData = JSON.parse(localStorage.getItem("userData"));

        if (userData) {
            return userData
        }

        return null
    }
    catch (err) {
        return null
    }
}


const getUserQuestionData = () => {
    try {
        let userData = JSON.parse(localStorage.getItem("userQuestionData"));

        if (userData) {
            return userData
        }

        return null
    }
    catch (err) {
        return null
    }
}

const convertToEmbedLink = (youtubeUrl) => {
    const url = new URL(youtubeUrl);
    const videoId = url.searchParams.get('v');
    return `https://www.youtube.com/embed/${videoId}`;
}

const handleLogOut = () => {
    localStorage.removeItem("userData");
}


export {
    isLoggedIn,
    getUserData,
    convertToEmbedLink,
    getUserQuestionData,
    handleLogOut
}
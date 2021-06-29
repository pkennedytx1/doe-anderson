const getNewUserData = async () => {
    const response = await axios.get('https://randomuser.me/api');
    console.log(response);
}

const handleGenerateNewUser = () => {
    getNewUserData();
}
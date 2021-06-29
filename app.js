const getNewUserData = async () => {
    try {
        const response = await axios.get('https://randomuser.me/api');
        updateUserInformation(response.data.results[0]);
    } catch (error) {
        throw new Error('An error occured retriecing user information.');
    }
}

const handleGenerateNewUser = () => {
    getNewUserData();
}

if( document.readyState !== 'loading' ) {
    handleGenerateNewUser();
} else {
    document.addEventListener('DOMContentLoaded', function () {
        handleGenerateNewUser();
    });
}

const updateUserInformation = (userData) => {
    console.log(userData);
    const userName = document.getElementById('user-name');
    const userDetails = document.getElementById('user-text');
    const userImage = document.getElementById('user-image');

    userName.innerText = `${userData.name.title} ${userData.name.first} ${userData.name.last}`;
    userDetails.innerText = `Hello, my name is ${userData.name.first} ${userData.name.last}. I live in ${userData.location.city}, ${userData.location.state} in ${userData.location.country}.`
    userImage.src = `${userData.picture.large}`;
}
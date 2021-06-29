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
    const userName = document.getElementById('user-name');
    const userDetails = document.getElementById('user-text');
    const userImage = document.getElementById('user-image');

    userName.innerText = `${userData.name.title} ${userData.name.first} ${userData.name.last}`;
    userDetails.innerText = `Hello, my name is ${userData.name.first} ${userData.name.last}. I live in ${userData.location.city}, ${userData.location.state} in ${userData.location.country}.`
    userImage.src = `${userData.picture.large}`;
}

const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const handleFormValidation = (data) => {
    document.getElementById('form-error').innerText = '';
    if (data.name === '' || data.email === '' || data.message == '') {
        document.getElementById('form-error').innerText = 'All fields must be filled out.';
        return false
    }
    if (!validateEmail(data.email)) {
        document.getElementById('form-error').innerText = 'Invalid Email';
        return false;
    }
    return true;
}

const writeContactUser = (data) => {
    try {
        firebase.database().ref('contactUsers').push({
            username: data.name,
            email: data.email,
            message: data.message,
        });
        document.getElementById('form-success').innerText = 'Message Successfully Saved!';
        const form = document.querySelector('form');
        form.reset();
        setTimeout(() => {
            document.getElementById('form-success').innerText = '';
        }, 3000);
    } catch (error) {
        document.getElementById('form-error').innerText = 'There was an error saving your message.';
        console.error(error);
    }
}

const handleFormSubmit = (e) => {
    const form = document.querySelector('form');
    const data = Object.fromEntries(new FormData(form).entries());
    if (handleFormValidation(data)) {
        writeContactUser(data);
    };
}
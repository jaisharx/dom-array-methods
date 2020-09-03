const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

const addData = (obj) => {
    data.push(obj);
    updateDOM(); // adding person to the dom
};

const formatNumberToMoney = (number) => {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

const updateDOM = (providedData = data) => {
    // reseting the html
    main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;

    providedData.forEach((user) => {
        const userEl = document.createElement('div');
        userEl.classList.add('person');
        userEl.innerHTML = `<strong>${user.name}</strong>${formatNumberToMoney(user.money)}`;

        main.appendChild(userEl);
    });
};

// fetch random user and add money
const getRandomUser = async () => {
    const res = await fetch('https://randomuser.me/api/');
    const resData = await res.json();

    const user = resData.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000),
    };

    addData(newUser);
};
getRandomUser(); // populating on inital load
getRandomUser(); // populating on inital load

const doubleUserMoney = () => {
    data = data.map((user) => {
        return {
            ...user,
            money: user.money * 2,
        };
    });
    updateDOM(); // updating to reflect new value
};

const sortByRichest = () => {
    data.sort((a, b) => b.money - a.money);
    updateDOM(); // updating to reflect new order
};

const showOnlyMillionares = () => {
    data = data.filter((user) => user.money > 1000000);
    updateDOM(); // updating to reflect filtered list
};

const calculateEntireWealth = () => {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0);
    const wealthEl = document.createElement('div');
    
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatNumberToMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthEl);

};

// btn event listerners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleUserMoney);
showMillionairesBtn.addEventListener('click', showOnlyMillionares);
sortBtn.addEventListener('click', sortByRichest);
calculateWealthBtn.addEventListener('click', calculateEntireWealth);
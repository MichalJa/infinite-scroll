
let preLoading = false;

const showPreloader = () => {
    let preloader = document.getElementById('preloader');
    preloader.style.display = 'block';
    preLoading = true;
}

const hidePreloader = () => {
    let preloader = document.getElementById('preloader');
    preloader.style.display = 'none';
    preLoading = false;
}

const getData = () => {
    if (!preLoading) {
        showPreloader();

        fetch('https://akademia108.pl/api/ajax/get-users.php')
            .then(response => response.json())
            .then((data) => {

                let body = document.body;
                let hr = document.createElement('hr');

                for (let user of data) {
                    let id = document.createElement('p');
                    let name = document.createElement('p');
                    let website = document.createElement('p');

                    id.innerText = `User ID: ${user.id}`;
                    name.innerText = `User Name: ${user.name}`;
                    website.innerHTML = `User URL: ${user.website}<br/>------- `;

                    body.appendChild(id);
                    body.appendChild(name);
                    body.appendChild(website);
                }
                body.appendChild(hr);
                hidePreloader();
            })
            .catch(error => {
                console.log(error);
            });
    }

};

const scrollToEndOfPage = () => {

    let d = document.documentElement;

    let scrollHeight = d.scrollHeight;

    let scrollTop = d.scrollTop;

    let clientHeight = d.clientHeight;

    if (scrollHeight - scrollTop === clientHeight) {
        getData();
    }

}


window.addEventListener('scroll', scrollToEndOfPage);


// Intersection Observer API 

//zauważyłem że gdy nie ma scrolla to nie doładowuje się content do strony więc na konsultacji Krystian polecił mi użyć Intersection Observer, toteż nie wiem czy dobrze go wykorzystałem ale działa tak jak chciałem

window.addEventListener("load", function () {
    const Observer = new IntersectionObserver((entries, hrObserver) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                firstData = getData();
                hrObserver.unobserve(entry.target);
            }
        })
    });
    const hr = document.querySelectorAll('.superHr')
    hr.forEach((v) => {
        Observer.observe(v);
    });
});

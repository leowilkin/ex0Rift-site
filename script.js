
//fetch for grabbing githib api repository infomation
fetch("https://api.github.com/users/ex0Rift/repos?sort=updated&direction=desc")
    .then(r => r.json())
    .then(repos => {
        const latest = repos[0];
        document.getElementById("current-project-title").textContent = latest.name;

        var language = document.getElementById("current-project-language");
        language.textContent = latest.language;
        if (language.textContent === "HTML"){
            language.className = "cyan";
        }else if (language.textContent === "Python"){
            language.className = "blue";
        }else if (language.textContent === "C"){
            language.className = "yellow";
        }else if (language.textContent === "C++"){
            language.className = "pink";
        }

        document.getElementById("current-project-description").textContent = latest.description;

        document.getElementById("current-project-link").href = latest.html_url;

        //for push date
        const pushed = new Date(latest.pushed_at);
        const now = new Date();
        const difftmp = now - pushed;
        const diffDays = Math.floor(difftmp / (1000 * 60 * 60));

        document.getElementById("current-project-time-since-text").textContent = diffDays + " hours ago";
    });

//fetch for hackatime status

fetch("https://hackatime.hackclub.com/api/v1/users/22317/stats")
    .then(d => d.json())
    .then(hackatime_stats => {
        //get variables for each of the languages from data
        const cpp = hackatime_stats.data.languages.find(l => l.name === "C++") ?? null;
        const c = hackatime_stats.data.languages.find(l => l.name === "C") ?? null;
        const python = hackatime_stats.data.languages.find(l => l.name === "Python") ?? null;
        const html = hackatime_stats.data.languages.find(l => l.name === "HTML") ?? null;
        const css = hackatime_stats.data.languages.find(l => l.name === "CSS") ?? null;

        //set total time 
        document.getElementById("code-time-text").textContent = hackatime_stats.data.human_readable_total;

        //set the bar and time for cpp language
        document.getElementById("c++-time-data").textContent = `C++: ${cpp.text}`;
        document.getElementById("cpp-bar").style.width = `${cpp.percent}%`;

        //set the bar and time for c language
        document.getElementById("c-time-data").textContent = `C: ${c.text}`;
        document.getElementById("c-bar").style.width = `${c.percent}%`;

        //set the bar and time for python language
        document.getElementById("python-time-data").textContent = `Python: ${python.text}`;
        document.getElementById("python-bar").style.width = `${python.percent}%`;

        //set the bar and time for HTML language
        document.getElementById("html-time-data").textContent = `HTML: ${html.text}`;
        document.getElementById("html-bar").style.width = `${html.percent}%`;

        //set the bar and time for python language
        document.getElementById("css-time-data").textContent = `CSS: ${css.text}`;
        document.getElementById("css-bar").style.width = `${css.percent}%`;

    });



function ScrollToBottom(){
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    });
}

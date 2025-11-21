fetch("https://api.github.com/users/ex0Rift/repos?sort=updated&direction=desc")
    .then(r => r.json())
    .then(repos => {
        const latest = repos[0];
        console.log(latest);
        document.getElementById("current-project-title").textContent = latest.name;

        var language = document.getElementById("current-project-language");
        language.textContent = latest.language;
        if (language.textContent === "HTML"){
            language.className = "cyan";
        }else if (language.textContent === "Python"){
            language.className = "blue";
        }else if (language.textContent === "C"){
            language.className = "yellow";
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

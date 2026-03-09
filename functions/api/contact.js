export async function onRequestPost(context) {

try{

const data = await context.request.json();

const message = `
New message from v4ucloud.com

Name: ${data.name}
Email: ${data.email}

Message:
${data.message}
`;

const response = await fetch("https://api.mailchannels.net/tx/v1/send", {
method: "POST",
headers: {
"content-type": "application/json"
},
body: JSON.stringify({
personalizations: [
{
to: [{ email: "info@v4ucloud.com" }]
}
],
from: {
email: "info@v4ucloud.com",
name: "V4U Cloud Website"
},
reply_to: {
email: data.email
},
subject: "New Contact Message - V4U Cloud",
content: [
{
type: "text/plain",
value: message
}
]
})
});

if(response.ok){
return new Response("Email sent",{status:200});
}

return new Response("Email failed",{status:500});

}catch(error){

return new Response("Server error",{status:500});

}

}
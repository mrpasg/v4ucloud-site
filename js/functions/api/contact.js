export async function onRequestPost(context){

const data = await context.request.json();

const message = `
New contact form message

Name: ${data.name}
Email: ${data.email}

Message:
${data.message}
`;

await fetch("https://api.mailchannels.net/tx/v1/send",{
method:"POST",
headers:{
"content-type":"application/json"
},
body:JSON.stringify({
personalizations:[
{
to:[{email:"[info@v4ucloud.com](mailto:info@v4ucloud.com)"}]
}
],
from:{
email:"[contact@v4ucloud.com](mailto:contact@v4ucloud.com)",
name:"V4U Cloud Website"
},
subject:"New Website Message",
content:[
{
type:"text/plain",
value:message
}
]
})
});

return new Response("Email sent",{status:200});

}

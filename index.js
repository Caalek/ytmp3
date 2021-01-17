const convertBtn = document.getElementById('convert-btn')
const reloadBtn = document.getElementById('reload-btn')
const resultDiv = document.getElementById('result-div')
const downloadLink = document.getElementById('download-link')
const videoTitle = document.getElementById('video-title')

reloadBtn.onmousedown = () => {
    location = location
}

convertBtn.onmousedown = () => {
    console.log('clicked')
    const link = document.getElementById('link-input').value
    const loading = document.getElementById('loading-div')
    loading.style.display = 'flex'
    resultDiv.style.display = 'none'
    downloadLink.style.display = 'inline'
    reloadBtn.style.display = 'inline'
    postData('https://ytmp3.calek.repl.co/convert-mp3', {link: link})
      .then(data => {
          loading.style.display = 'none'
          if (data['message'] === 'error') {
            resultDiv.style.display = 'flex'
            videoTitle.innerHTML = 'That is not a YouTube URL.'
            downloadLink.style.display = 'none'
            reloadBtn.style.display = 'none'
          } else {
            resultDiv.style.display = 'flex'
            videoTitle.innerHTML = data['title']
            downloadLink.href = `https://ytmp3.calek.repl.co/download/${data['filename']}`
          }
      })
}

async function postData(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        redirect: 'follow', 
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    })
    return response.json()
}
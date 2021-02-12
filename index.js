const convertBtn = document.getElementById('convert-btn')
const reloadBtn = document.getElementById('reload-btn')
const resultDiv = document.getElementById('result-div')
const downloadLink = document.getElementById('download-link')
const videoTitle = document.getElementById('video-title')
const link = document.getElementById('link-input')
const loading = document.getElementById('loading-div')

let choice = 1

document.getElementById('choice1').onclick = () => {
  choice = 1
  link.placeholder = 'Convert YouTube to MP3'
}
document.getElementById('choice2').onclick = () => {
  choice = 2
  link.placeholder = 'Convert YouTube to MP3 playlist'
}
document.getElementById('choice3').onclick = () => {
  choice = 3
  link.placeholder = 'Convert YouTube to MP4'
}

reloadBtn.onclick = () => {location = location}

convertBtn.onclick = () => {
    loading.style.display = 'flex'
    resultDiv.style.display = 'none'
    downloadLink.style.display = 'inline'
    reloadBtn.style.display = 'inline'

    let endpoint
    if (choice === 1) {
      endpoint = 'convert-mp3'
    } else if (choice === 2) {
      endpoint = 'convert-mp3-playlist'
    } else if (choice === 3) {
      endpoint = 'convert-mp4'
    }

    postData(`https://ytmp3.calek.repl.co/${endpoint}`, {link: link.value})
      .then(data => {
          loading.style.display = 'none'
          if (data['message'] === 'error') {
            resultDiv.style.display = 'flex'
            videoTitle.innerHTML = 'An error occured.'
            downloadLink.style.display = 'none'
            reloadBtn.style.display = 'none'
          } else {
            resultDiv.style.display = 'flex'
            videoTitle.innerHTML = data['title']
            downloadLink.href = `https://ytmp3.calek.repl.co/dl/${data['filename']}`
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

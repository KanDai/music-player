const songs = [
    {
        src: 'music/catlife.mp3',
        title: '猫',
        artist: 'アーティスト名',
        album: 'アルバム名',
        artwork: [{
            src: 'music/catlife.jpg',
            sizes: '600x600',
            type: 'image/jpeg'
        }]
    },
    {
        src: 'music/honobono.mp3',
        title: 'ほのぼの',
        artist: 'アーティスト名',
        album: 'アルバム名',
        artwork: [{
            src: 'music/honobono.jpg',
            sizes: '1000x1000',
            type: 'image/png'
        }]
    },
    {
        src: 'music/morning.mp3',
        title: 'さわやか',
        artist: 'アーティスト名',
        album: 'アルバム名',
        artwork: [{
            src: 'music/morning.jpg',
            sizes: '800x800',
            type: 'image/png'
        }]
    }
]

const audio = document.querySelector('#js-audio')
const artwork = document.querySelector('#js-artwork')
const title = document.querySelector('#js-title')
const album = document.querySelector('#js-album')
const artist = document.querySelector('#js-artist')
const control = document.querySelector('#js-control')
const play = document.querySelector('#js-play')
const pause = document.querySelector('#js-pause')
const prev = document.querySelector('#js-prev')
const next = document.querySelector('#js-next')
const back = document.querySelector('#js-back')
const forward = document.querySelector('#js-forward')

let isPlaying = false
let currentSongNumber = 0

const updateSong = (number) => {
    audio.src = songs[number].src

    navigator.mediaSession.metadata = new MediaMetadata({
        title: songs[number].title,
        artist: songs[number].artist,
        album: songs[number].album,
        artwork: [{
            src: songs[number].artwork[0].src,
            sizes: songs[number].artwork[0].sizes,
            type: songs[number].artwork[0].type,
        }]
    })

    artwork.setAttribute('src', songs[number].artwork[0].src)
    title.innerHTML = songs[number].title
    album.innerHTML = songs[number].album
    artist.innerHTML = songs[number].artist
}

const playSong = () => {
    audio.play()

    control.classList.add('is-playing')
    control.classList.remove('is-pause')
    isPlaying = true
}

const pauseSong = () => {
    audio.pause()

    control.classList.remove('is-playing')
    control.classList.add('is-pause')
    isPlaying = false
}

const changeSong = (action) => {

    if ( action === 'prev') {
        currentSongNumber = ( currentSongNumber > 0 ) ? currentSongNumber - 1 : songs.length - 1
    }

    if ( action === 'next') {
        currentSongNumber = ( currentSongNumber < songs.length - 1 ) ? currentSongNumber + 1 : 0
    }

    updateSong(currentSongNumber)

    if (isPlaying) audio.play()
}

const init = function() {
    updateSong(currentSongNumber)
}

play.addEventListener('click', playSong)
pause.addEventListener('click', pauseSong)
prev.addEventListener('click', () => { changeSong('prev') })
next.addEventListener('click', () => { changeSong('next') })
back.addEventListener('click', () => { audio.currentTime = audio.currentTime - 10 })
forward.addEventListener('click', () => { audio.currentTime = audio.currentTime + 10 })

navigator.mediaSession.setActionHandler('play', playSong )
navigator.mediaSession.setActionHandler('pause', pauseSong )
navigator.mediaSession.setActionHandler('previoustrack', () => { changeSong('prev') })
navigator.mediaSession.setActionHandler('nexttrack', () => { changeSong('next') })
navigator.mediaSession.setActionHandler('seekbackward', () => { audio.currentTime = audio.currentTime - 10 })
navigator.mediaSession.setActionHandler('seekforward', () => { audio.currentTime = audio.currentTime + 10 })

init(currentSongNumber)

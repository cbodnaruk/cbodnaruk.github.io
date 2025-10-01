

class Song {
    /**
     * Represents a song.
     * @constructor
     * @param {object} params - The parameters for the song.
     * @param {string} params.title - The title of the song.
     * @param {string} params.artist - The artist of the song.
     * @param {string} params.id - The ID to the song.
     * @param {string} params.image - The album art for the song.
     */
    constructor(params) {
        this.title = params.title;
        this.artist = params.artist;
        this.id = params.id;
        this.image = params.image
    }
}

const CLIENT_ID = "b9974f2274fe496d9092f02a4fe8dfcd"
let CLIENT_SECRET = null
const PLAYLIST_ID = "4PVIOcNYFmaSaiDqvcdQFF"



let allSongs = []
let currentSongs = []
let comparisonMap = {}
let timeComplexity = 0
let completedSorts = 0

// This will be used to pause the sorting algorithm while we wait for user input
let resolveComparison

const main = document.querySelector("main")

// Pull playlist data from Spotify
async function getPlaylistData() {
    let endpoint = "https://api.spotify.com/v1/playlists/" + PLAYLIST_ID + "?fields=tracks.items(track(name,artists(name),id,album(images)))"
    let accessToken = await getAccessToken()

    let rawPlaylist = await fetch(endpoint, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + accessToken.access_token
        }
    })
    let playlist = await rawPlaylist.json()

    let songs = []
    for (let item of playlist.tracks.items) {
        songs.push(new Song({ title: item.track.name, artist: item.track.artists[0].name, id: item.track.id, image: item.track.album.images[0].url }))
    }
    let n = songs.length

    timeComplexity = Math.log2(n) * n
    console.log(timeComplexity);

    return songs
}

async function getAccessToken() {
    let token = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Basic " + btoa(CLIENT_ID + ":" + CLIENT_SECRET)
        },
        body: "grant_type=client_credentials"
    })
    return await token.json()
}

const SongBox = (song) => {
    const songBox = document.createElement("div")
    songBox.classList.add("song-box")

    const heading = document.createElement("div")
    heading.classList.add("song-heading")

    const title = document.createElement("h2")
    title.textContent = song.title

    const artist = document.createElement("p")
    artist.textContent = song.artist

    const spacer = document.createElement("div")
    spacer.classList.add("spacer")


    heading.appendChild(title)
    heading.appendChild(artist)
    songBox.appendChild(spacer)
    songBox.appendChild(heading)
    // songBox.appendChild(trackEmbed(song.id))
    songBox.style.backgroundImage = `url(${song.image})`

    songBox.addEventListener("click", () => {
        selectSong(song.id)
    })

    return songBox
}

function selectSong(id) {
    const winner = currentSongs.find(song => song.id === id);
    const loser = currentSongs.find(song => song.id !== id);

    // Save the comparison result
    if (winner && loser) {
        saveComparison(winner, loser);
    }

    // If a comparison is waiting to be resolved, resolve it with the winner.
    if (resolveComparison) {
        resolveComparison(winner);
    }
}

function saveComparison(winner, loser) {
    // Create a canonical key to avoid duplicates (e.g., A_B vs B_A)
    const key = [winner.id, loser.id].sort().join('__');
    comparisonMap[key] = winner.id;

    // Save the entire map to localStorage
    localStorage.setItem('songComparisons', JSON.stringify(comparisonMap));
}


const trackEmbed = (id) => {
    const embed = document.createElement("iframe")
    embed.src = `https://open.spotify.com/embed/track/${id}?utm_source=generator`
    embed.allow = "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    embed.loading = "lazy"
    embed.allowFullscreen = true
    embed.classList.add("track-embed")

    return embed
}

function setSongs(songs) {
    // Clear the main view
    main.innerHTML = '';

    currentSongs = songs
    main.appendChild(SongBox(songs[0]))
    main.appendChild(SongBox(songs[1]))
}

/**
 * Asks the user to choose between two songs.
 * @param {Song} song1 The first song.
 * @param {Song} song2 The second song.
 * @returns {Promise<Song>} A promise that resolves with the chosen song.
 */
function compareSongs(song1, song2) {
    // Check if we already have a saved comparison for these two songs
    const key = [song1.id, song2.id].sort().join('__');
    if (comparisonMap[key]) {
        const winnerId = comparisonMap[key];
        const winner = winnerId === song1.id ? song1 : song2;
        // Immediately resolve with the saved winner, skipping user input
        return Promise.resolve(winner);
    }

    setSongs([song1, song2]);
    // Return a new promise that will be resolved when the user makes a selection
    // This is where the algorithm "pauses" for user input
    return new Promise(resolve => {
        resolveComparison = resolve;
    });
}

/**
 * Sorts an array of songs using a merge sort algorithm, prompting the user for comparisons.
 * @param {Song[]} songs The array of songs to sort.
 * @returns {Promise<Song[]>} A promise that resolves with the sorted array of songs.
 */
async function mergeSort(songs) {
    if (songs.length <= 1) {
        return songs;
    }

    const middle = Math.floor(songs.length / 2);
    const left = songs.slice(0, middle);
    const right = songs.slice(middle);

    // Recursively sort both halves
    const sortedLeft = await mergeSort(left);
    const sortedRight = await mergeSort(right);

    // Merge the sorted halves
    return await merge(sortedLeft, sortedRight);
}

/**
 * Merges two sorted arrays of songs by asking the user for preferences.
 * @param {Song[]} left The left sorted array.
 * @param {Song[]} right The right sorted array.
 * @returns {Promise<Song[]>} A promise that resolves with the merged and sorted array.
 */
async function merge(left, right) {
    let resultArray = [], leftIndex = 0, rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        const winner = await compareSongs(left[leftIndex], right[rightIndex]);
        if (winner.id === left[leftIndex].id) {
            resultArray.push(left[leftIndex]);
            leftIndex++;
        } else {
            resultArray.push(right[rightIndex]);
            rightIndex++;
        }
    }

    completedSorts++
    setPercent(Math.round((completedSorts / timeComplexity) * 100))


    // Concat the remaining elements
    return resultArray
        .concat(left.slice(leftIndex))
        .concat(right.slice(rightIndex));

}


function setPercent(num) {
    const footer = document.querySelector('footer')
    footer.textContent = `${num}\%`
    footer.style.width = `${num}vw`
}

const songResult = (song, rank) => {
    const result = document.createElement("div")
    result.classList.add("song-result")

    const title = document.createElement("h2")
    title.textContent = song.title

    const artist = document.createElement("p")
    artist.textContent = song.artist

    const text = document.createElement("div")
    text.classList.add("text")
    text.appendChild(title)
    text.appendChild(artist)

    const art = document.createElement("div")
    art.classList.add("art")
    art.style.backgroundImage = `url(${song.image})`
    art.textContent = rank
    result.appendChild(art)
    result.appendChild(text)

    return result

}

function showResults(songs) {
    main.innerHTML = '';
    document.getElementById("leftright").style.display = 'none';
    document.querySelector('footer').style.display = 'none';


    const controls = document.createElement("div")
    controls.classList.add("controls")


    const copyButton = document.createElement("button")
    copyButton.classList.add("copy-button")
    copyButton.textContent = "Copy ranks to Clipboard"
    copyButton.addEventListener("click", () => {
        let rankList = ''
        for (let song of allSongs) {
            let rank = songs.indexOf(song) + 1
            rankList += `${rank}\n`
        }
        navigator.clipboard.writeText(rankList)
    })
    controls.append(copyButton)
    const results = document.createElement("div")
    results.classList.add("results")

    for (let song of songs) {
        results.appendChild(songResult(song, songs.indexOf(song) + 1))
    }
    main.append(controls)
    main.append(results)
}

document.addEventListener("DOMContentLoaded", async () => {
    // Check for API secret
    const params = new URLSearchParams(window.location.search);
    const keyParam = params.get('key');
    if (keyParam) {
        CLIENT_SECRET = keyParam
    } else if (!localStorage.getItem('apiSecret') || localStorage.getItem('apiSecret').length === 0) {
        CLIENT_SECRET = prompt("Please enter the password I sent here (security thing)")
        localStorage.setItem('apiSecret', CLIENT_SECRET)

    } else {
        CLIENT_SECRET = localStorage.getItem('apiSecret')
    }


    // Load saved comparisons from localStorage
    const savedComparisons = localStorage.getItem('songComparisons');
    if (savedComparisons) {
        comparisonMap = JSON.parse(savedComparisons);
    }

    allSongs = await getPlaylistData()
    const sortedSongs = await mergeSort(allSongs.slice()); // Use a copy for sorting

    console.log("Sorted Songs:", sortedSongs);
    showResults(sortedSongs)
    localStorage.setItem('sortedSongs', JSON.stringify(sortedSongs));
    localStorage.removeItem('songComparisons'); // Clean up after sorting is complete
})

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        selectSong(currentSongs[1].id)
    } else if (event.key === 'ArrowLeft') {
        selectSong(currentSongs[0].id)
    }
}, true);
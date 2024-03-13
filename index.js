const TILE_SIZE = 256;
const TILES_UPDATE_TIMEOUT = 1000;
const TILES_LOADING_TIMEOUT = 15000;
const { innerWidth, innerHeight } = window;
const rowsCount = Math.floor(innerHeight / TILE_SIZE);
const colsCount = Math.floor(innerWidth / TILE_SIZE);
const tilesCount = rowsCount * colsCount;
const tilesContainer = document.getElementById('tiles');

function generateTileUrl() {
    const x = 5000 + Math.floor(Math.random() * 2000);
    const y = 2000 + Math.floor(Math.random() * 900);

    return `https://core-sat.maps.yandex.net/tiles?l=sat&v=3.1155.0&x=${x}&y=${y}&z=13&lang=ru_RU`;
}

function updateTiles() {
    tilesContainer.innerHTML = '';

    let loadedTilesCount = 0;
    const tilesLoadingTimeoutCancellationToken = setTimeout(
        () => {
            console.error('tiles not loaded!!!');
        },
        TILES_LOADING_TIMEOUT
    );

    for(let i = 0; i < tilesCount; i++) {
        const img = new Image(TILE_SIZE, TILE_SIZE);

        img.onload = () => {
            loadedTilesCount++;

            if(loadedTilesCount === tilesCount) {
                window.clearTimeout(tilesLoadingTimeoutCancellationToken);
                console.log('tiles loaded!');

                window.setTimeout(updateTiles, TILES_UPDATE_TIMEOUT);
            }
        };

        img.src = generateTileUrl();

        tilesContainer.appendChild(img);
    }
}

updateTiles();

# Foxhole Inventory Report (fir)

This tool prepares [Foxhole](https://www.foxholegame.com/about-foxhole) stockpile screenshots into a visual report and machine-readable numbers.

1. Screenshot multiple inventories from the map view in-game.  Do this in the order you'd like them to appear in the report.
2. Select your screenshots in the tool.
3. Wait for processing.
4. Edit the titles for each inventory in the report by clicking on them.
5. Download the result as a PNG, text report, TSV, or append to a google spreadsheet.

## Status

Under development. However, it is already being used "in production" within regiment(s) for evaluation. 

## Development

Standalone website:
```
cd fir
python3 -m http.server
```

To build the google spreadsheet sidebar, run `./sundial/gs-build.sh` and find the files to be added to Google Apps Script in `./sundial/gs-build`.

## Training

### Standalone

The standalone method will require you to manually install all the necessary dependencies, such as Node, NPM, TensorFlow, etc.
To begin training, simply run `build.sh <FModel-Data-Directory>`.

### Docker

Training can also be performed using a Docker container instead. [https://docs.docker.com/desktop/features/wsl/]
Make sure you are running Docker Desktop when training.
 
#### CPU-Only Training

To train using only your CPU, first run the following command `docker build -f Dockerfile.cpu --tag 'fir_trainer' .`.
Once the image is built, run `docker run -it --rm -v $PWD:/tmp -w /tmp -e WAR_LOCATION=<FModel-Data-Directory> fir_trainer`.

#### GPU-Enabled Training

Install and configure the NVIDIA drivers and Container NVIDIA Toolkit. [https://docs.nvidia.com/ai-enterprise/deployment/vmware/latest/docker.html]
To train using your GPU, first run the following command `docker build -f Dockerfile.gpu --tag 'fir_trainer' .`.
Once the image is built, run `docker run --runtime=nvidia -it --rm -v $PWD:/tmp -w /tmp -e WAR_LOCATION=<FModel-Data-Directory> fir_trainer`.

## License

All original source code and contributions available under MIT License.

Catalog details and icons processed from the game Foxhole (created by [Siege Camp](https://www.siegecamp.com/)) are made available only under Fair Use.

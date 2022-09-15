# Foxhole Inventory Report (fir)

This tool prepares [Foxhole](https://www.foxholegame.com/about-foxhole) stockpile screenshots into a visual report and machine-readable numbers.

1. Screenshot multiple inventories from the map view in-game.  Do this in the order you'd like them to appear in the report.
2. Select your screenshots in the tool.
3. Wait for processing.
4. Edit the titles for each inventory in the report by clicking on them.
5. Download the result as a PNG, text report, TSV, or append to a google spreadsheet.


## Status

Under development. However, it is already being used "in production" within clan(s) for evaluation. 

## Development

Standalone website:

```
cd fir
python3 -m http.server
```

To build the google spreadsheet sidebar, run `./sundial/gs-build.sh` and find the files to be added to Google Apps Script in `./sundial/gs-build`.

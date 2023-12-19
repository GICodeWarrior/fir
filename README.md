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

## Example spreadsheet

Try it yourself: [Sun Stocks v7.1 demo](https://docs.google.com/spreadsheets/d/1cAZ4CWbBQvpGNQ4EtrgNj9YiBu5rozQNGJuw7SmFqKU/edit?usp=share_link)

Copy the template: [Sun Stocks v7.1 template](https://docs.google.com/spreadsheets/d/14ldb5FTKHEFWi8qWmTLl-bYeoU6xkGMVg_OpkrZCCCU/copy)

## License

All original source code and contributions available under MIT License.

Catalog details and icons processed from the game Foxhole (created by [Siege Camp](https://www.siegecamp.com/)) are made available only under Fair Use.

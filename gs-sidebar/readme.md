# Template for a Google Script sidebar to use FIR inside a Google spreadsheet


## Remote sources / CDN config

- The sidebar is loading the FIR scripts from remote.
- Modify the `fir-sidebar/fir-sidebar.html` header accordingly and choose an import source that fits your use case. Examples are included.
- Modify or replace the `fir-sidebar/fir-sidebar-gs.gs` google scripts if your spreadsheet doesn't match the defaults of this repository.

## Installation
- [Inside a Google spreadsheet] Menubar > Extensions > App Script
- Create two new files, one HTML named `fir-sidebar` and another one SCRIPT named `fir-sidebar-gs`
- Copy the contents of the two files in `fir-sidebar/` into your Google Apps Scripts.

> The script will now add an extra menubar item to your spreadsheet that will open the FIR sidebar. (on next reload)  
> Make sure to use one of the spreadsheet templates outlined in this repo OR modify the `fir-sidebar-gs.gs` according to your sheet.
// Script cannot work without widget module so check before
checkSdkFeatures(["widget"]);

let widget = require("widget");

let demo_seconds = 30;

print("Loading file", __filename);
print("From directory", __dirname);

// addText supports "Primary" and "Secondary" font sizes.
widget.addText(10, 10, "Primary", "Example JS widget");
widget.addText(10, 20, "Secondary", "Example widget from JS!");

// load a Xbm file from the same directory as this script.
widget.addText(0, 30, "Secondary", __filename);
let logo = widget.loadImageXbm(__dirname + "/widget-js.fxbm");

// add a line (x1, y1, x2, y2)
widget.addLine(10, 35, 120, 35);

// add a circle/disc (x, y, radius)
widget.addCircle(12, 52, 10);
widget.addDisc(12, 52, 5);

// add a frame/box (x, y, width, height)
widget.addFrame(30, 45, 10, 10);
widget.addBox(32, 47, 6, 6);

// add a rounded frame/box (x, y, width, height, radius)
widget.addRframe(50, 45, 15, 15, 3);
widget.addRbox(53, 48, 6, 6, 2);

// add a dot (x, y)
widget.addDot(100, 45);
widget.addDot(102, 44);
widget.addDot(104, 43);

// add an icon (x, y, icon)
// not available in all firmwares, but not essential for this script's
// functionality, so we just check at runtime and use it if it is available
if (doesSdkSupport(["widget-addicon"])) {
    widget.addIcon(100, 50, "ButtonUp_7x4");
    widget.addIcon(100, 55, "ButtonDown_7x4");
}

// add a glyph (x, y, glyph)
widget.addGlyph(115, 50, "#".charCodeAt(0));

// Show the widget (drawing the layers in the orderer they were added)
widget.show();

let i = 1;
let bitmap = undefined;
while (widget.isOpen() && i <= demo_seconds) {
    // Print statements will only show up once the widget is closed.
    print("count is at", i++);

    // You can call remove on any added item, it does not impact the other ids.
    if (bitmap) { widget.remove(bitmap); bitmap = undefined; }
    // All of the addXXX functions return an id that can be used to remove the item.
    else { bitmap = widget.addXbm(77, 45, logo); }

    delay(1000);
}

// If user did not press the back button, close the widget.
if (widget.isOpen()) {
    widget.close();
}
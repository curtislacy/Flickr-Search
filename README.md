# flickr-search

![screenshot](Sample.png)

## Build & development

Run `grunt` for building and `grunt serve` for preview.  The default browser will be launched, pointed at http://localhost:9000/#/

## Testing

This project includes the framework for unit testing.  Running `grunt test` will run the unit tests with karma, however no unit tests have been written at this time.

## Requirements met by this project:

1. **The tool must accept a string value (a "tag" value) by which to search.**  Tags can be entered at the field at the top of the page.
2. **The tool should display a list of photos returned by the API when searching against that tag.**  When the user clicks "Search!", a list of image names will be displayed.
3. **The tool should either give the user the option to see the actual visual representation of the listed images within the tool itself, or via a resource locator that the tool's computing environment can utilize to view the photo (either via another app or a web browser).** When the user clicks on the name of a file, the image will be displayed to the right of the list of filenames.
4. **Presentation of further meta-info about the photos presented.**  Metadata is recovered when an image is displayed.  The image description is displayed next to the image once it is recovered, and the image owner's name or username (as available) is displayed as the "Photo credit".

## Likely next steps (What I would do in the next four hours, if I was spending an entire day on this):

1. Hitting "Enter" in the text field should perform the search, rather than the user needing to click.
2. Scrolling should be managed better - the image list should be scrollable without losing sight of the search field or the image.
3. Thumbnails would be useful in addition to image names in the list, and enough information has probably already been downloaded to recover them.

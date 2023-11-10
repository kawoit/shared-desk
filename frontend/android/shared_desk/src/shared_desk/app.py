import toga
from toga.style import Pack
from toga.style.pack import COLUMN, ROW
import nfc

class shared_desk(toga.App):

    def startup(self):
        """
        Construct and show the Toga application.

        Usually, you would add your application to a main content box.
        We then create a main window (with a name matching the app), and
        show the main window.
        """

        main_box = toga.Box(style=Pack(direction=COLUMN))

        # add scrollable view
        scroll_view = toga.ScrollContainer(style=Pack(flex=1), horizontal=False, vertical=True)
        scroll_view.content = toga.Box(
            style=Pack(direction=COLUMN, padding=5),
            children=self.dummy_boxes(100)
        )
        main_box.add(toga.Label(self.read_nfc_tag))
        main_box.add(scroll_view)

        self.main_window = toga.MainWindow(title=self.formal_name)
        self.main_window.content = main_box
        self.main_window.show()

    def dummy_boxes(self, amount):
        boxes = []
        for i in range(amount):
            boxes.append(self.dummy_box_content(i))
        return boxes
    
    def dummy_box_content(self, number):
        return toga.Box(
            style=Pack(direction=ROW, padding=10),
            children=[
                toga.Label(str(number)),
                toga.Label('Hello world'),
                toga.Button('Press me',id=str(number), on_press=self.button_handler),
            ]
        )
    
    def button_handler(self, widget):
        print("button handler called")
        name = self.main_window.info_dialog(
            'TEST',
            f"{widget.id}"
        )

    def read_nfc_tag(self) -> str:
        clf = nfc.ContactlessFrontend('usb')
        data = clf.connect(rdwr={'on-connect': lambda tag: False})
        clf.close()

        return data

def main():
    return shared_desk()

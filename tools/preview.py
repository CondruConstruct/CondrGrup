"""Local-only preview with fresh assets during editing: python tools/preview.py."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


class PreviewHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


if __name__ == "__main__":
    root = Path(__file__).resolve().parent.parent
    server = ThreadingHTTPServer(("127.0.0.1", 4173), partial(PreviewHandler, directory=str(root)))
    print("Condr Grup preview: http://127.0.0.1:4173/", flush=True)
    server.serve_forever()

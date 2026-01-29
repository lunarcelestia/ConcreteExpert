
import http.server
import socketserver
import os
import webbrowser
import threading

PORT = 5555
DIRECTORY = os.path.dirname(os.path.abspath(__file__))


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, request, client_address, server):
        super().__init__(request, client_address, server, directory=DIRECTORY)


def open_browser():
    webbrowser.open(f"http://localhost:{PORT}/")


if __name__ == "__main__":
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Сервер запущен: http://localhost:{PORT}/")
        print("Остановка: Ctrl+C")
        threading.Timer(1.0, open_browser).start()
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nСервер остановлен.")


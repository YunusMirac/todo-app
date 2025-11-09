# Full-Stack To-Do App (Bewerbungsprojekt)

Dies ist eine To-Do-Anwendung, die mit Django (Backend) und React (Frontend) erstellt wurde, basierend auf der Aufgabenstellung der DSP Academy.

## Verwendete Technologien

* **Backend:** Python Django, Django REST Framework, PostgreSQL
* **Frontend:** React, TypeScript, Tailwind CSS, Vite, Axios
* **Datenbank:** PostgreSQL

---

## Setup & Installation

Das Projekt besteht aus zwei Teilen (Backend und Frontend), die separat gestartet werden müssen.

### 1. Backend (Django)

1.  Navigieren Sie in das Hauptverzeichnis.
2.  Erstellen Sie eine virtuelle Umgebung: `python3 -m venv venv`
3.  Aktivieren Sie die Umgebung: `source venv/bin/activate`
4.  Installieren Sie die Abhängigkeiten: `pip install -r requirements.txt`
5.  Erstellen Sie eine `.env`-Datei im Hauptverzeichnis (Informationen zu den benötigten Schlüsseln wie `DB_NAME` sind in der `settings.py` ersichtlich).
6.  Stellen Sie sicher, dass Ihre PostgreSQL-Datenbank läuft und erstellt ist.
7.  Führen Sie die Migrationen aus: `python manage.py migrate`
8.  Starten Sie den Server: `python manage.py runserver` (läuft auf Port 8000)

### 2. Frontend (React)

1.  Öffnen Sie ein **zweites Terminal**.
2.  Navigieren Sie in den `frontend`-Ordner: `cd frontend`
3.  Installieren Sie die Abhängigkeiten: `npm install`
4.  Starten Sie den Server: `npm run dev` (läuft auf Port 5173)

---

## Implementierte Funktionen

* Vollständiges CRUD (Erstellen, Lesen, Aktualisieren, Löschen)
* Getrennte Ansichten für Listen, Erstellung und Bearbeitung (React Router)
* Responsives UI (Tailwind CSS)
* **Optional:** Backend-Filterung und Suchfunktion (`?search=...`, `?status=...`)
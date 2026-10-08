"""
scrape.py — regenerates the MusicPlayer playlist from 25mxfu's Bandcamp.

Run from the portfolio root:
    pip install requests beautifulsoup4
    export SPOTIFY_CLIENT_ID=...        # from developer.spotify.com/dashboard
    export SPOTIFY_CLIENT_SECRET=...
    python scrape.py

Outputs:
    public/music/<Artist> - <Title>.mp3     (skipped if already present)
    public/img/covers/<...>.png             (skipped if already present)
    public/music/songs.json                 (always rewritten — the playlist)

Link per track: Spotify (via Web API search) when found, Bandcamp otherwise.
"""

import base64
import json
import os
import re
import time

import requests
from bs4 import BeautifulSoup

# ——— config ———
BASE_URL = "https://25mxfu.bandcamp.com/"
MUSIC_DIR = "public/music"
COVER_DIR = "public/img/covers"
SONGS_JSON = "public/music/songs.json"

SPOTIFY_ID = os.environ.get("SPOTIFY_CLIENT_ID", "your-client-id")
SPOTIFY_SECRET = os.environ.get("SPOTIFY_CLIENT_SECRET", "your-client-secret")

HEADERS = {"User-Agent": "kz-portfolio/1.0 (you@example.com)"}

os.makedirs(MUSIC_DIR, exist_ok=True)
os.makedirs(COVER_DIR, exist_ok=True)


def safe(s: str) -> str:
    return re.sub(r'[<>:"/\\|?*]', "_", s).strip()[:60]


def strip_suffix(title: str) -> str:
    """Remove ' - 2026 Remaster'-style suffixes that break title matching."""
    return re.sub(
        r"\s*-\s*(20\d\d\s+Remaster|Remaster(?:ed)?\s*\d*|Deluxe|Single).*$",
        "", title, flags=re.I,
    ).strip()


# ——— Spotify Web API ———
_token = {"value": None, "expires": 0.0}


def spotify_token() -> str:
    if _token["value"] and time.time() < _token["expires"]:
        return _token["value"]
    r = requests.post(
        "https://accounts.spotify.com/api/token",
        data={"grant_type": "client_credentials"},
        headers={
            "Authorization": "Basic "
            + base64.b64encode(f"{SPOTIFY_ID}:{SPOTIFY_SECRET}".encode()).decode()
        },
        timeout=15,
    )
    r.raise_for_status()
    j = r.json()
    _token["value"] = j["access_token"]
    _token["expires"] = time.time() + j["expires_in"] - 60
    return _token["value"]


def spotify_link(title: str, artist: str):
    try:
        r = requests.get(
            "https://api.spotify.com/v1/search",
            params={
                "q": f"track:{strip_suffix(title)} artist:{artist}",
                "type": "track",
                "limit": 3,
            },
            headers={"Authorization": f"Bearer {spotify_token()}"},
            timeout=15,
        )
        r.raise_for_status()
        for t in r.json().get("tracks", {}).get("items", []):
            artists = " ".join(a["name"].lower() for a in t["artists"])
            if artist.lower() in artists:  # sanity check against wrong-artist matches
                return t["external_urls"]["spotify"]
    except Exception as e:
        print(f"    spotify: {type(e).__name__}: {e}")
    return None


# ——— Bandcamp ———
def release_urls():
    soup = BeautifulSoup(
        requests.get(BASE_URL, headers=HEADERS, timeout=20).text, "html.parser"
    )
    urls = []
    for a in soup.find_all("a", href=True):
        if a["href"].startswith(("/album/", "/track/")):
            u = requests.compat.urljoin(BASE_URL, a["href"])
            if u not in urls:
                urls.append(u)
    return urls


def download(url: str, path: str, referer: str):
    if os.path.exists(path):
        return
    print(f"    dl {os.path.basename(path)}")
    r = requests.get(
        url, headers={**HEADERS, "Referer": referer}, stream=True, timeout=30
    )
    r.raise_for_status()
    with open(path, "wb") as f:
        for chunk in r.iter_content(1 << 20):
            if chunk:
                f.write(chunk)


def main():
    songs, seen = [], set()

    for rel_url in release_urls():
        print(f"\n{rel_url}")
        soup = BeautifulSoup(
            requests.get(rel_url, headers=HEADERS, timeout=20).text, "html.parser"
        )
        tag = soup.find("script", {"data-tralbum": True})
        if not tag:
            print("    no tralbum data")
            continue
        tr = json.loads(tag["data-tralbum"])
        artist = tr.get("artist", "25mxfu")

        art_id = tr.get("art_id") or (tr.get("album_release") or {}).get("art_id")
        cover = None
        if art_id:
            cover = f"{safe(artist)} - {safe(str(art_id))}.png"
            download(
                f"https://f4.bcbits.com/img/a{art_id}_10.jpg",
                os.path.join(COVER_DIR, cover),
                rel_url,
            )

        for t in tr.get("trackinfo", []):
            title = t.get("title")
            print(f"  {title}")
            stream = (t.get("file") or {}).get("mp3-128")
            if not title or not stream or title in seen:
                continue
            seen.add(title)

            fname = f"{safe(artist)} - {safe(title)}.mp3"
            download(stream, os.path.join(MUSIC_DIR, fname), rel_url)

            print(f"  spotify {title}")
            link = spotify_link(title, artist) or rel_url

            songs.append({
                "title": f"{artist} - {title}".strip(" -"),
                "src": fname,
                "cover": f"/img/covers/{cover}" if cover else None,
                "link": link,
            })

    json.dump(songs, open(SONGS_JSON, "w"), indent=2)
    print(f"\n{len(songs)} tracks -> {SONGS_JSON}")


if __name__ == "__main__":
    main()
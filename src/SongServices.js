const { Pool } = require('pg')
 
class SongServices {
  constructor() {
    this._pool = new Pool()
  }
 
  async getSongs(playlistId) {
    const songQuery = {
      text: 'SELECT songs.id, songs.title, songs.performer FROM songs LEFT JOIN playlist_songs ON playlist_songs.song_id = songs.id WHERE playlist_songs.playlist_id = $1',
      values: [playlistId],
    }
    
    const song = await this._pool.query(songQuery)

    return song.rows
  }

  async getPlaylist(playlistId) {
    const playlistQuery = {
        text: 'SELECT id, name FROM playlists WHERE id = $1',
        values: [playlistId],
    }

    const playlist = await this._pool.query(playlistQuery)

    return playlist.rows[0]
  }
}
 
module.exports = SongServices
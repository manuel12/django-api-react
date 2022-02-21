from django.test import TestCase
from resources.models import Podcast

class PodcastModelTests(TestCase):
    """Creates a podcast and tests the fields."""

    def setUp(self):
        self.test_podcast = Podcast.objects.create(
            title="Impact Theory",
            author="Tom Bilyeu",
            website_url="https://impacttheory.com/",
            youtube_url="https://www.youtube.com/channel/UCnYMOamNKLGVlJgRUbamveA",
            spotify_url="https://open.spotify.com/show/1nARKz2vTIOb7gC9dusE4b")

    def test_website_url(self):
        self.assertEqual(self.test_podcast.website_url,
                         "https://impacttheory.com/")

    def test_website_url_max_length(self):
        website_url_max_length = self.test_podcast._meta.get_field(
            'website_url').max_length
        self.assertEqual(website_url_max_length, 200)

    def test_youtube_url(self):
        self.assertEqual(self.test_podcast.youtube_url,
                         "https://www.youtube.com/channel/UCnYMOamNKLGVlJgRUbamveA")

    def test_youtube_url_max_length(self):
        youtube_url_max_length = self.test_podcast._meta.get_field(
            'youtube_url').max_length
        self.assertEqual(youtube_url_max_length, 200)

    def test_spotify_url(self):
        self.assertEqual(self.test_podcast.spotify_url,
                         "https://open.spotify.com/show/1nARKz2vTIOb7gC9dusE4b")

    def test_spotify_url_max_length(self):
        spotify_url_max_length = self.test_podcast._meta.get_field(
            'spotify_url').max_length
        self.assertEqual(spotify_url_max_length, 200)
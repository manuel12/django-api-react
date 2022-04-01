/// <reference types="cypress" />

const resourceTestData = require("../../fixtures/resourceAPITestData.json");
const testuserData = require("../../fixtures/testuser.json");

describe("Podacst Episode API 'GET' request", () => {
  before(() => {
    cy.deleteTestData();
    cy.addResourceWithAPI("podcasts-episode", resourceTestData);
  });

  it("should have status code 200", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:8000/api/podcast-episodes/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token  ${testuserData.token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("should return JSON", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:8000/api/podcast-episodes/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token  ${testuserData.token}`,
      },
    }).then((response) => {
      expect(response.headers).to.have.property(
        "content-type",
        "application/json"
      );
    });
  });

  it("should have podcast episode fields", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:8000/api/podcast-episodes/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token  ${testuserData.token}`,
      },
    }).then((response) => {
      const firstPodcastEpisode = response.body[0];
      expect(firstPodcastEpisode).to.have.property("id");
      expect(firstPodcastEpisode).to.have.property("title", "Test Title");
      expect(firstPodcastEpisode).to.have.property("author", "Test Author");
      expect(firstPodcastEpisode).to.have.property("description");
      expect(firstPodcastEpisode).to.have.property("imageURL");
      expect(firstPodcastEpisode).to.have.property("from_podcast");
      expect(firstPodcastEpisode).to.have.property("youtube_episode_url");
      expect(firstPodcastEpisode).to.have.property("spotify_episode_url");
      expect(firstPodcastEpisode).to.have.property("avg_rating", 0);
      expect(firstPodcastEpisode).to.have.property("num_ratings", 0);
    });
  });
});

describe("Podcast Episode API 'POST' request", () => {
  it("should have status code 201", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:8000/api/podcast-episodes/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token  ${testuserData.token}`,
      },
      body: JSON.stringify(resourceTestData),
    }).then((response) => {
      expect(response.status).to.eq(201);
    });
  });

  it("should return JSON", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:8000/api/podcast-episodes/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token  ${testuserData.token}`,
      },
      body: JSON.stringify(resourceTestData),
    }).then((response) => {
      expect(response.headers).to.have.property(
        "content-type",
        "application/json"
      );
    });
  });

  it("should have podcast episode fields", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:8000/api/podcast-episodes/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token  ${testuserData.token}`,
      },
      body: JSON.stringify(resourceTestData),
    }).then((response) => {
      const podcastEpisode = response.body;
      expect(podcastEpisode).to.have.property("id");
      expect(podcastEpisode).to.have.property("title", resourceTestData.title);
      expect(podcastEpisode).to.have.property("author", resourceTestData.author);
      expect(podcastEpisode).to.have.property("description");
      expect(podcastEpisode).to.have.property("imageURL");
      expect(podcastEpisode).to.have.property(
        "from_podcast",
        resourceTestData.from_podcast
      );
      expect(podcastEpisode).to.have.property(
        "youtube_episode_url",
        resourceTestData.youtube_episode_url
      );
      expect(podcastEpisode).to.have.property(
        "spotify_episode_url",
        resourceTestData.spotify_episode_url
      );
      expect(podcastEpisode).to.have.property("avg_rating", 0);
      expect(podcastEpisode).to.have.property("num_ratings", 0);
    });
  });
});

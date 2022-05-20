import { getResourceTypePlural } from "./utils";

const _fetch = (url, token) => {
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
};

const _send = (url, token, data) => {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(data),
  });
};

const _update = (url, token, data) => {
  return fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(data),
  });
};

const _delete = (url, token) => {
  return fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
};

export class API {
  static loginUser(body) {
    return fetch(`http://127.0.0.1:8000/auth/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((resp) => resp.json())
      .catch((error) => console.error(error));
  }

  static registerUser(body) {
    return fetch(`http://127.0.0.1:8000/api/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static isValidToken(token, callback) {
    _fetch(`http://127.0.0.1:8000/api/`, token)
      .then((resp) => resp.status === 200)
      .then(callback);
  }

  static _clearInvalidToken(resp) {
    if (resp.detail === "Invalid token.") {
      delete localStorage.token;
      window.location.href = "/";
    } else {
      return resp;
    }
  }

  static fetchAllResources(token, setResourceFunc) {
    _fetch("http://127.0.0.1:8000/api/", token)
      .then((resp) => resp.json())
      .then((resp) => API._clearInvalidToken(resp))
      .then((resp) => setResourceFunc(resp))
      .catch((error) => console.error(error));
  }

  static fetchAllResourcesOfType(resourceType, token, setResourceFunc) {
    _fetch(`http://127.0.0.1:8000/api/${resourceType}/`, token)
      .then((resp) => resp.json())
      .then((resp) => API._clearInvalidToken(resp))
      .then((resp) => setResourceFunc(resp))
      .catch((error) => console.error(error));
  }

  static fetchResource(id, token, setResourceFunc) {
    return _fetch(`http://127.0.0.1:8000/api/${id}/`, token)
      .then((resp) => resp.json())
      .then((resp) => API._clearInvalidToken(resp))
      .then((resp) => {
        setResourceFunc(resp);
        return resp;
      })
      .catch((error) => console.error(error));
  }

  static fetchResourceOfType(resourceType, id, token, setResourceFunc) {
    resourceType = getResourceTypePlural(resourceType);

    return _fetch(`http://127.0.0.1:8000/api/${resourceType}/${id}/`, token)
      .then((resp) => resp.json())
      .then((resp) => API._clearInvalidToken(resp))
      .then((resp) => {
        setResourceFunc(resp);
        return resp;
      })
      .catch((error) => console.error(error));
  }

  static createResource(resourceType, token, resourceData) {
    resourceType = getResourceTypePlural(resourceType);

    _send(`http://127.0.0.1:8000/api/${resourceType}/`, token, resourceData)
      .then((resp) => resp.json())
      .then((resp) => {
        window.location.href = "/";
      })
      .catch((error) => console.error(error));
  }

  static updateResource(resourceType, id, token, resourceData) {
    resourceType = getResourceTypePlural(resourceType);

    _update(
      `http://127.0.0.1:8000/api/${resourceType}/${id}/`,
      token,
      resourceData
    )
      .then((resp) => resp.json())
      .then((resp) => {
        window.location.href = `http://localhost:3000/${id}/`;
      })
      .catch((error) => console.error(error));
  }

  static deleteResource(resourceType, id, token) {
    resourceType = getResourceTypePlural(resourceType);

    _delete(`http://127.0.0.1:8000/api/${resourceType}/${id}/`, token)
      .then((resp) => {
        console.log(resp);
        window.location.href = `http://localhost:3000/`;
      })
      .catch((error) => console.error(error));
  }

  static createComment(token, commentData, callback) {
    _send(`http://127.0.0.1:8000/api/comments/`, token, commentData)
      .then((resp) => resp.json())
      .then((resp) => callback(resp))
      .catch((error) => console.error(error));
  }

  static postRating(token, ratingData, callback) {
    _send(`http://127.0.0.1:8000/api/ratings/`, token, ratingData)
      .then((resp) => resp.json())
      .then((resp) => callback(resp))
      .catch((error) => console.error(error));
  }
}

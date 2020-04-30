/* global google */

export function basicXhr (url, method = 'GET', data = null, headers = {}) {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  }
  headers = Object.assign({}, defaultHeaders, headers)

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url)
    for (let key of Object.keys(headers)) {
      xhr.setRequestHeader(key, headers[key])
    }
    xhr.withCredentials = false // allows ALLOW_ALL CORS but no cookies
    xhr.onerror = reject
    xhr.onload = function () {
      if ([200, 201, 301, 302].includes(xhr.status)) {
        if (xhr.responseText !== '') {
          resolve(JSON.parse(xhr.responseText))
        } else {
          resolve()
        }
      }
      reject(xhr)
    }
    xhr.send(data)
  })
}

export function getPositionIcon () {
  return {
    path: google.maps.SymbolPath.CIRCLE,
    scale: 6,
    fillOpacity: 0.9,
    strokeOpacity: 0.8,
    strokeColor: 'red',
    fillColor: 'red',
    strokeWeight: 1,
    labelOrigin: new google.maps.Point(0, -3),
  }
}

export function getMapIcon () {
  return {
    path: google.maps.SymbolPath.CIRCLE,
    scale: 6,
    fillOpacity: 0.8,
    strokeOpacity: 0.7,
    strokeColor: '#801E6E',
    fillColor: '#801E6E',
    strokeWeight: 1,
  }
}

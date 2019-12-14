export function handleHttpErrors(res) {
    if (!res.ok) {
      throw Error(res.statusText);
    }
    return res.json();
}

export function makeOptions(type, data) {
    return {
      method: type,
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    }
  }